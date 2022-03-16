
import Layout from "../../Containers/Layout";
import Pagination from "../../Components/Pagination";
import TableRowAction from "../../Components/TableRowAction";
import TableSearch from "../../Components/TableSearch";
import TableFilterDate from "../../Components/TableFilterDate";

import {
    Box,
    Button,
    HStack,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr
} from "@chakra-ui/react";
import { Link, usePage } from "@inertiajs/inertia-react";
import React from "react";

const Index = () => {
    const { vehicles } = usePage().props;
    const {
        data,
        meta: { links }
    } = vehicles;

    return (
        <Layout
            title="Data Kendaraan"
        >
            <HStack
                mt="2"
                mb="4"
                align={`end`}
            >
                <TableSearch />
                <TableFilterDate label="Tanggal Masuk Kendaraan" />
                <Button
                    as={Link}
                    colorScheme="orange"
                    color="white"
                    href={route("vehicles.create")}
                    _hover={{ color: "black" }}
                >
                    Tambah Data
                </Button>
            </HStack>

            <Box
                bg="white"
                rounded="lg"
                shadow="sm"
                display="flow-root"
                overflowX="auto"
            >
                <Table
                    whiteSpace={`nowrap`}
                >
                    <Thead>
                        <Tr>
                            <Th>No</Th>
                            <Th>Nama Kendaraan</Th>
                            <Th>Tipe Kendaraan</Th>
                            <Th>Gambar Kendaraan</Th>
                            <Th>Jumlah Pemakaian</Th>
                            <Th>Konsumsi Bahan Bakar</Th>
                            <Th>Tanggal Masuk Kendaraan</Th>
                            <Th>Tanggal Service</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data.map((vehicle, index) => {
                            return (
                                <Tr key={index + 1}>
                                    <Td>{index + 1}</Td>
                                    <Td>{vehicle.name}</Td>
                                    <Td>{vehicle.vehicle_details.vehicle_type}</Td>
                                    <Td>{vehicle.vehicle_image ? (<img src={vehicle.vehicle_image.image} width="200" />) : (<div>-</div>)}</Td>
                                    <Td>{vehicle.vehicle_details.number_of_usage} Kali</Td>
                                    <Td>{vehicle.vehicle_details.fuel_consumption} Liter</Td>
                                    <Td>{vehicle.created_at}</Td>
                                    <Td>{vehicle.vehicle_details.service_schedule}</Td>
                                    <Td>
                                        <TableRowAction id={vehicle.id} routeName="vehicles" isShow={false} />
                                    </Td>
                                </Tr>
                            );
                        })}

                        {!data.length && (
                            <Tr>
                                <Td colSpan={6}>Data tidak tersedia.</Td>
                            </Tr>
                        )}
                    </Tbody>
                </Table>

                <Pagination links={links} />
            </Box>
        </Layout>
    )
}

export default Index;
