import React from "react";
import ReactDatePicker, {
    registerLocale,
    setDefaultLocale
} from "react-datepicker";
import id from "date-fns/locale/id";
import "react-datepicker/dist/react-datepicker.css";
import "./date-picker.css";

registerLocale("id", id);
setDefaultLocale("id");

const Datepicker = ({
    selectedDate,
    onChange,
    isClearable = false,
    showPopperArrow = false,
    ...props
}) => {
    return (
        <ReactDatePicker
            selected={selectedDate}
            onChange={onChange}
            isClearable={isClearable}
            showPopperArrow={showPopperArrow}
            autoComplete="off"
            dateFormat={`dd/MM/yyyy`}
            {...props}
        />
    );
};

export default Datepicker;
