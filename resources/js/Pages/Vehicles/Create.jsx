import TextInput from '../../Components/TextInput';
import Layout from '../../Containers/Layout';
import { FormLabel, FormControl, Box, Button, HStack, SimpleGrid } from "@chakra-ui/react";
import { Inertia } from "@inertiajs/inertia";
import { useForm, usePage } from "@inertiajs/inertia-react";
import React from "react";

const Create = () => {
    const { defaultCarImage } = usePage().props;

    const imageRef = React.useRef()

    const { data, setData, processing, errors } = useForm({
        name: "",
        qty: "",
        fuel_consumption: "",
        service_schedule: "",
    });

    const handleSubmit = e => {
        e.preventDefault();
        const formData = new FormData();
        for (let key in data) {
            formData.append(key, data[key])
        }
        formData.append("image", imageRef.current.files[0])

        Inertia.post(route("vehicles.store"), formData)
    };

    const [image, setImage] = React.useState();
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

    console.log(image);

    return (
        <Layout
            title="Tambah Data Kendaraan"
        >
            <Box
                p={4}
                bg="white"
                rounded="lg"
                shadow="sm"
                w="6xl"
            >
                <form
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
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

export default Create;
