import TextInput from '../../Components/TextInput';
import Layout from '../../Containers/Layout';
import { Box, Button, HStack, SimpleGrid } from "@chakra-ui/react";
import { Inertia } from "@inertiajs/inertia";
import { useForm } from "@inertiajs/inertia-react";
import React from "react";

const Create = () => {

    const { data, setData, post, processing, errors } = useForm({
        name: "",
        qty: "",
        fuel_consumption: "",
        service_schedule: "",
        // image: "",
    });

    const handleSubmit = e => {
        e.preventDefault();
        post(route("vehicles.store"));
    };


    return (
        <Layout
            title="Tambah Data Kendaraan"
        >
            <Box
                p={4}
                bg="white"
                rounded="lg"
                shadow="sm"
                w="3xl"
            >
                <form
                    onSubmit={handleSubmit}
                >
                    <SimpleGrid
                        columns={2}
                        spacing={4}
                    >
                        <TextInput
                            name="name"
                            label="Nama Kendaraan"
                            value={data.name}
                            errors={errors.name}
                            onChange={e => setData("name", e.target.value)}
                        />

                        {/* <TextInput
                            name="image"
                            type="file"
                            label="Gambar Kendaraan"
                            value={data.image}
                            errors={errors.image}
                            onChange={e => setData("image", e.target.files[0])}
                        /> */}

                        <TextInput
                            name="qty"
                            label="Jumlah Unit Kendaraan"
                            type="number"
                            value={data.qty}
                            errors={errors.qty}
                            onChange={e => setData("qty", e.target.value)}
                        />

                        <TextInput
                            name="fuel_consumption"
                            label="Jumlah Konsumsi Bahan Bakar (galon)"
                            type="number"
                            value={data.fuel_consumption}
                            errors={errors.fuel_consumption}
                            onChange={e => setData("fuel_consumption", e.target.value)}
                        />

                        <TextInput
                            name="service_schedule"
                            label="Tanggal Service"
                            type="date"
                            value={data.service_schedule}
                            errors={errors.service_schedule}
                            onChange={e => setData("service_schedule", e.target.value)}
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
                            onClick={() => Inertia.get(route("vehicles.index"))}
                        >
                            Batalkan
                        </Button>
                    </HStack>
                </form>
            </Box>
        </Layout>
    )
}

export default Create;
