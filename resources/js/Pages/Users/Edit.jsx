import SelectInput from '../../Components/SelectInput';
import TextInput from '../../Components/TextInput';
import Layout from '../../Containers/Layout';
import { Box, Button, HStack, SimpleGrid } from "@chakra-ui/react";
import { Inertia } from "@inertiajs/inertia";
import { useForm, usePage } from "@inertiajs/inertia-react";
import React from "react";

const Edit = () => {
    const { user, roles } = usePage().props;
    const { data, setData, put, processing, errors } = useForm({
        name: user.data.name || "",
        email: user.data.email || "",
        password: "",
        password_confirmation: "",
        role_id: user.data.role_id
    });

    const handleSubmit = e => {
        e.preventDefault();
        put(route("users.update", user.data.id));
    };

    return (
        <Layout
            title="Edit Data Pengguna"
        >
            <Box
                p={4}
                bg="white"
                rounded="lg"
                shadow="sm"
                w="3xl"
            >
                <form onSubmit={handleSubmit}>
                    <SimpleGrid
                        columns={2}
                        spacing={4}
                    >
                        <TextInput
                            name="name"
                            label="Nama"
                            value={data.name}
                            errors={errors.name}
                            onChange={e => setData("name", e.target.value)}
                        />

                        <TextInput
                            name="email"
                            label="Email"
                            type="email"
                            value={data.email}
                            errors={errors.email}
                            onChange={e => setData("email", e.target.value)}
                        />

                        <TextInput
                            name="password"
                            label="Password"
                            type="password"
                            value={data.password}
                            errors={errors.password}
                            onChange={e => setData("password", e.target.value)}
                        />

                        <TextInput
                            name="password_confirmation"
                            label="Konfirmasi Password"
                            type="password"
                            value={data.password_confirmation}
                            errors={errors.password_confirmation}
                            onChange={e => setData("password_confirmation", e.target.value)}
                        />

                        <SelectInput
                            name="role_id"
                            label="Hak Akses"
                            defaultValue={data.role_id}
                            options={roles}
                            errors={errors.role_id}
                            onChange={e => setData("role_id", e.target.value)}
                        />
                    </SimpleGrid>

                    <HStack mt={10}>
                        <Button
                            type="submit"
                            colorScheme="teal"
                            isLoading={processing}
                            loadingText="Sedang Menyimpan"
                        >
                            Simpan
                        </Button>

                        <Button
                            type="button"
                            colorScheme="red"
                            onClick={() => Inertia.get(route("users.index"))}
                        >
                            Batalkan
                        </Button>
                    </HStack>
                </form>
            </Box>
        </Layout>
    )
}

export default Edit;
