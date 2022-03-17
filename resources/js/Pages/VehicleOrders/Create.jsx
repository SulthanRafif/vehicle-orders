import SelectInput from '../../Components/SelectInput';
import TextInput from '../../Components/TextInput';
import Layout from '../../Containers/Layout';
import { Box, Button, HStack, SimpleGrid } from "@chakra-ui/react";
import { Inertia } from "@inertiajs/inertia";
import { useForm, usePage } from "@inertiajs/inertia-react";
import React from "react";

const Create = () => {
    const { vehicles, penyetujuSatu, penyetujuDua, driverName } = usePage().props;
    const { data, setData, post, processing, errors } = useForm({
        customer_name: "",
        vehicle_id: "",
        approval_one: "",
        approval_two: "",
        order_date: "",
        driver_id: "",
    });


    console.log((penyetujuSatu))

    const handleSubmit = e => {
        e.preventDefault();
        post(route("vehicle-orders.store"));
    };

    return (
        <Layout
            title="Tambah Data Pemesanan Kendaraan"
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
                            name="customer_name"
                            label="Customer Name"
                            value={data.customer_name}
                            errors={errors.customer_name}
                            onChange={e => setData("customer_name", e.target.value)}
                        />

                        <SelectInput
                            name="driver_id"
                            label="Nama Pengemudi"
                            defaultValue={data.driver_id}
                            options={driverName}
                            errors={errors.driver_id}
                            onChange={e => setData("driver_id", e.target.value)}
                        />

                        <SelectInput
                            name="vehicle_id"
                            label="Nama Kendaraan"
                            defaultValue={data.vehicle_id}
                            options={vehicles}
                            errors={errors.vehicle_id}
                            onChange={e => setData("vehicle_id", e.target.value)}
                        />

                        <SelectInput
                            name="penyetuju_satu"
                            label="Nama Penyetuju Satu"
                            defaultValue={data.approval_one}
                            options={penyetujuSatu}
                            errors={errors.approval_one}
                            onChange={e => setData("approval_one", e.target.value)}
                        />

                        <SelectInput
                            name="penyetuju_dua"
                            label="Nama Penyetuju Dua"
                            defaultValue={data.approval_two}
                            options={penyetujuDua}
                            errors={errors.approval_two}
                            onChange={e => setData("approval_two", e.target.value)}
                        />

                        <TextInput
                            label="Tanggal Pemesanan"
                            type="date"
                            name="order_date"
                            value={data.order_date}
                            errors={errors.order_date}
                            onChange={e => {
                                setData("order_date", e.target.value);
                            }}
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
                            onClick={() => Inertia.get(route("vehicle-orders.index"))}
                        >
                            Kembali Ke Menu Data Pemesanan Kendaraan
                        </Button>
                    </HStack>
                </form>
            </Box>
        </Layout>
    )
}

export default Create;
