import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    InputGroup
} from "@chakra-ui/react"
import React from "react";

const TextInput = ({
    name,
    label,
    errors = [],
    isRequired = true,
    isGroup = false,
    children,
    w = "full",
    ...props
}) => {
    return (
        <FormControl isRequired={isRequired} isInvalid={errors.length} width={w}>
            <FormLabel htmlFor={name} fontWeight="bold">
                {label}
            </FormLabel>
            {isGroup ? (
                <InputGroup>
                    <Input id={name} name={name} bg="white" width={w}  {...props} />
                    {children}
                </InputGroup>
            ) : (
                <Input id={name} name={name} bg="white" width={w} {...props} />
            )}
            {errors && <FormErrorMessage>{errors}</FormErrorMessage>}
        </FormControl>
    )
}

export default TextInput;
