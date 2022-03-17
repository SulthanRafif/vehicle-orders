import TextInput from '../../Components/TextInput';
import Layout from '../../Containers/Layout';
import { Box, Button, HStack, SimpleGrid } from "@chakra-ui/react";
import { Inertia } from "@inertiajs/inertia";
import { useForm, usePage } from "@inertiajs/inertia-react";
import React from "react";

const Create = () => {
    const { driver } = usePage().props;
    const { data, setData, put, processing, errors } = useForm({
        name: driver.data.name || "",
    });

    const handleSubmit = e => {
        e.preventDefault();
        put(route("drivers.update", driver.data.id));
    };

    return (
        <Layout
            title="Edit Data Pengemudi"
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
                            label="Nama Pengemudi"
                            value={data.name}
                            errors={errors.name}
                            onChange={e => setData("name", e.target.value)}
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
                            colorScheme="blue"
                            onClick={() => Inertia.get(route("drivers.index"))}
                        >
                            Kembali Ke Menu Data Pengemudi
                        </Button>
                    </HStack>
                </form>
            </Box>
        </Layout>
    )
}

export default Create;
