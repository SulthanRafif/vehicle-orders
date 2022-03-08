import Datepicker from "../Plugins/DatePicker/DatePicker";
import { FormControl, FormLabel } from "@chakra-ui/react";
import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/inertia-react";
import React, { useState } from "react";
import TextInput from "./TextInput";

const TableFilterDate = ({
    labels,
    label,
    w = 64,
    isMultiple = false,
    ...props
}) => {
    const { propDate, propStartDate, propEndDate } = usePage().props;
    const [date, setDate] = useState(propDate || "");
    const [startDate, setStartDate] = useState(
        propStartDate ? new Date(propStartDate) : ""
    );
    const [endDate, setEndDate] = useState(
        propEndDate ? new Date(propEndDate) : ""
    );

    const handleChange = e => {
        const query = e.target.value !== "" ? { date: e.target.value } : {};

        Inertia.get(route(route().current()), query, {
            replace: true,
            preserveState: true
        });

        setDate(e.target.value);
    };

    const handleStartDate = value => {
        const query = value !== "" ? { startDate: value, endDate: endDate } : {};

        Inertia.get(route(route().current()), query, {
            replace: true,
            preserveState: true
        });

        setStartDate(value);
    };

    const handleEndDate = value => {
        const query = value !== "" ? { startDate: startDate, endDate: value } : {};

        Inertia.get(route(route().current()), query, {
            replace: true,
            preserveState: true
        });

        setEndDate(value);
    };

    return (
        <>
            {!isMultiple ? (
                <TextInput
                    w={w}
                    label={label}
                    name="date"
                    value={date}
                    type="date"
                    isRequired={false}
                    onChange={handleChange}
                    {...props}
                />
            ) : (
                <>
                    <FormControl width={w}>
                        <FormLabel htmlFor={`startDate`} fontWeight="bold">
                            {labels[0]}
                        </FormLabel>
                        <Datepicker
                            id={`startDate`}
                            selectedDate={startDate}
                            onChange={handleStartDate}
                            showPopperArrow={true}
                            isClearable={true}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                        />
                    </FormControl>

                    <FormControl width={w}>
                        <FormLabel htmlFor={`endDate`} fontWeight="bold">
                            {labels[1]}
                        </FormLabel>
                        <Datepicker
                            id={`endDate`}
                            selectedDate={endDate}
                            onChange={handleEndDate}
                            showPopperArrow={true}
                            isClearable={true}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate}
                        />
                    </FormControl>
                </>
            )}
        </>
    );
};

export default TableFilterDate;
