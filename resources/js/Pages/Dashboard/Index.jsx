import Layout from "../../Containers/Layout";
import { Box, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { usePage } from "@inertiajs/inertia-react";
import React from "react";

const Dashboard = () => {
    const { results } = usePage().props;

    return (
        <Layout title="Beranda">
            {results.length > 0 ? (
                <SimpleGrid
                    columns={results.length}
                    spacing={10}
                >
                    {results.map((key, i) => (
                        <Box
                            key={i}
                            p={4}
                            bgGradient="linear(to-r, green.400, blue.500)"
                            color={`white`}
                            rounded={`md`}
                            shadow={`md`}
                        >
                            <Heading size={`md`}>
                                {key.label}
                            </Heading>
                            <Heading
                                size={`3xl`}
                                mt={10}
                                textAlign={`right`}
                            >
                                {key.total}
                            </Heading>
                            <Text size={`md`} textAlign={`right`}>
                                Berkas
                            </Text>
                        </Box>
                    ))}
                </SimpleGrid>
            ) : (
                <Box textAlign={`center`} mt={20}>
                    <Heading>Selamat datang di</Heading>
                    <Heading mt={10}>Sistem Informasi Pemesanan Kendaraan</Heading>
                </Box>
            )}
        </Layout>
    )
}

export default Dashboard;
