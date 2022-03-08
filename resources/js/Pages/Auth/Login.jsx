import TextInput from "../../Components/TextInput";
import { Box, Button, Checkbox, Flex, Heading, Stack } from "@chakra-ui/react";
import { Head, useForm, usePage } from "@inertiajs/inertia-react";
import React from "react";

const Login = () => {
    const { appName } = usePage().props;
    const { data, setData, post, errors, processing } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const handleSubmit = e => {
        e.preventDefault();

        post(route("login"));
    };

    return (
        <Flex minH={"100vh"} align={"center"} justify={"center"} bg="gray.50">
            <Head title="Login" />
            <Stack spacing={8} mx={"auto"} w={"lg"} py={12} px={6}>
                <Stack align={"center"}>
                    <Heading fontSize={"4xl"}>{appName}</Heading>
                    <Heading fontSize={"lg"}>Login</Heading>
                </Stack>
                <Box rounded={"lg"} bg="white" boxShadow={"lg"} p={8}>
                    <form onSubmit={handleSubmit}>
                        <Stack spacing={4}>
                            <TextInput
                                label="Email"
                                name="email"
                                type="email"
                                value={data.email}
                                errors={errors.email}
                                autoFocus={true}
                                onChange={e => setData("email", e.target.value)}
                            />
                            <TextInput
                                label="Password"
                                name="password"
                                type="password"
                                value={data.password}
                                errors={errors.password}
                                onChange={e => setData("password", e.target.value)}
                            />

                            <Stack spacing={10}>
                                <Stack direction={{ base: "column", sm: "row" }} align={"start"} justify={"space-between"}>
                                    <Checkbox
                                        name="remember"
                                        checked={data.remember}
                                        onChange={e => setData("remember", e.target.checked)}
                                    >
                                        Ingatkan saya
                                    </Checkbox>
                                </Stack>
                                <Button
                                    type="submit"
                                    bg={"orange.400"}
                                    color={"white"}
                                    _hover={{
                                        bg: "orange.500"
                                    }}
                                    isLoading={processing}
                                    loadingText="Sedang Proses"
                                >
                                    Masuk
                                </Button>
                            </Stack>
                        </Stack>
                    </form>
                </Box>
            </Stack>
        </Flex>
    )
}

export default Login;

