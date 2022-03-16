import TextInput from '../../Components/TextInput';
import SelectInput from '../../Components/SelectInput';
import Layout from '../../Containers/Layout';
import { FormLabel, FormControl, Box, Button, HStack, SimpleGrid } from "@chakra-ui/react";
import { Inertia } from "@inertiajs/inertia";
import { useForm, usePage } from "@inertiajs/inertia-react";
import React, { useEffect } from "react";

const Edit = () => {
    const { vehicle, defaultCarImage } = usePage().props;
    const imageRef = React.useRef()
    const { data, setData, processing, errors } = useForm({

        name: vehicle.data.name || "",
        fuel_consumption: vehicle.data.vehicle_details.fuel_consumption || "",
        service_schedule: vehicle.data.vehicle_details.service_schedule || "",
        vehicle_type: vehicle.data.vehicle_details.vehicle_type || "",
    });

    const handleSubmit = e => {
        e.preventDefault();
        const formData = new FormData();
        for (let key in data) {
            formData.append(key, data[key])
        }
        formData.append("image", imageRef.current.files[0])
        formData.append("_method", "put")
        Inertia.post(route("vehicles.update", vehicle.data.id), formData)
    };

    const [image, setImage] = React.useState();

    useEffect(() => {
        vehicle.data.vehicle_image !== null ? setImage(base_url + "/" + vehicle.data.vehicle_image.image) : setImage()
    }, [vehicle.data.vehicle_image])

    const handleUpload = (e) => {
        e.preventDefault()
        let reader = new FileReader()
        reader.onloadend = () => {
            if (reader.readyState === 2) {
                setImage(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }

    return (
        <Layout
            title="Edit Data Kendaraan"
        >
            <Box
                p={4}
                bg="white"
                rounded="lg"
                shadow="sm"
                w="6xl"
            >
                <form onSubmit={handleSubmit}>
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

                        <TextInput
                            name="fuel_consumption"
                            label="Jumlah Konsumsi Bahan Bakar (Liter)"
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

                        <SelectInput
                            name="vehicle_type"
                            label="Tipe Kendaraan"
                            defaultValue={data.vehicle_type}
                            options={[{ name: 'angkutan orang', id: 'angkutan orang' }, { name: 'angkutan barang', id: 'angkutan barang' }]}
                            errors={errors.vehicle_type}
                            onChange={e => setData("vehicle_type", e.target.value)}
                        />

                        <img src={image ? (image) : (defaultCarImage)} alt="Gambar Kendaraan" width="200" />

                        <FormControl
                            isRequired={true}
                            width="full"
                        >
                            <FormLabel htmlFor="image" fontWeight="bold">
                                Gambar Mobil
                            </FormLabel>

                            <input
                                type="file"
                                id="image"
                                name="image"
                                bg="white"
                                width="full"
                                ref={imageRef}
                                className="mt-4"
                                onChange={handleUpload}
                            />
                        </FormControl>
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

export default Edit;
