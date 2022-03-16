import Layout from "../../Containers/Layout";
import { Box, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";
import Chart from "../../Components/Chart";

const Dashboard = () => {
    return (
        <Layout title="Beranda">
            <Box textAlign={`center`} mt={5}>
                <Chart marginTop={20} />
            </Box>
        </Layout>
    )
}

export default Dashboard;
