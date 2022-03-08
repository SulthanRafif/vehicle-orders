import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Select
} from "@chakra-ui/react";
import React from "react";

const SelectInput = ({
    name,
    label,
    errors = [],
    isRequired = true,
    options = [],
    defaultValue,
    ...props
}) => {
    return (
        <FormControl
            isRequired={isRequired}
            isInvalid={errors.length}
        >
            <FormLabel
                htmlFor={name}
                fontWeight="bold"
            >
                {label}
            </FormLabel>
            <Select
                name={name}
                id={name}
                placeholder={`Pilih ${label}`}
                defaultValue={defaultValue}
                {...props}
            >
                {options.map(option => {
                    return (
                        <option key={option.id} value={option.id}>
                            {option.name}
                        </option>
                    )
                })}
            </Select>
            {errors && <FormErrorMessage>{errors}</FormErrorMessage>}
        </FormControl>
    )
};

export default SelectInput;
