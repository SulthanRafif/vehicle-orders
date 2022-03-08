import { Alert, AlertIcon, Stack } from "@chakra-ui/react";
import { usePage } from "@inertiajs/inertia-react";
import React from "react";

const FlashMessage = ({ ...props }) => {
    const { flash } = usePage().props;

    return (
        <Stack>
            {flash.error && (
                <Alert status="error" rounded="lg" shadow="md" {...props}>
                    <AlertIcon />
                    {flash.error}
                </Alert>
            )}

            {flash.success && (
                <Alert status="success" rounded="lg" shadow="md" {...props}>
                    <AlertIcon />
                    {flash.success}
                </Alert>
            )}
        </Stack>
    );
};

export default FlashMessage;
