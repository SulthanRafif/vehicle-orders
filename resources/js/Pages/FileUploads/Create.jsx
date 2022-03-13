import React from 'react'
import Layout from '../../Containers/Layout';
import { useForm } from '@inertiajs/inertia-react'
import TextInput from '../../Components/TextInput';
import { Button, HStack, SimpleGrid, Box } from "@chakra-ui/react";

const Create = () => {
    const { data, setData, post, progress } = useForm({
        name: "",
        image: "",
    })

    console.log(data);

    function submit(e) {
        console.log(data)
        // e.preventDefault()
        // post('/file-uploads')
    }

    return (
        <Layout>
            <Box
                p={4}
                bg="white"
                rounded="lg"
                shadow="sm"
                w="3xl"
            >
                <form onSubmit={submit}>
                    <SimpleGrid
                        columns={2}
                        spacing={4}
                    >
                        <TextInput label="name" type="text" value={data.name} onChange={e => setData('name', e.target.value)} />
                        <TextInput label="image" type="file" value={data.image} onChange={e => setData('image', e.target.value)} />
                        {progress && (
                            <progress value={progress.percentage} max="100">
                                {progress.percentage}%
                            </progress>
                        )}
                    </SimpleGrid>
                    <HStack mt={10}>
                        <Button
                            type="submit"
                            colorScheme="red"
                        >
                            Submit
                        </Button>
                    </HStack>
                </form>
            </Box>
        </Layout>
    )
}

export default Create;
