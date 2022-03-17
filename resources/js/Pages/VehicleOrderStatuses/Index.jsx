
import React from "react";
import Layout from "../../Containers/Layout";
import Pagination from "../../Components/Pagination";
import TableRowAction from "../../Components/TableRowAction";
import TableFilterDate from "../../Components/TableFilterDate";
import TableSearch from "../../Components/TableSearch";
import { Inertia } from "@inertiajs/inertia";
import { can, RoleType } from '../../utils/globals/helpers';

import {
    HStack,
    Box,
    Button,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr
} from "@chakra-ui/react";
import { Link, usePage } from "@inertiajs/inertia-react";

const Index = () => {
    const { vehicleOrders } = usePage().props;
    const {
        data,
        meta: { links }
    } = vehicleOrders;

    const handleApprove = (event, vehicleOrderId) => {
        event.preventDefault();
        Inertia.put(route("vehicle-order-statuses.update-return-status", vehicleOrderId))
    }

    console.log(vehicleOrders);

    return (
        <Layout
            title="Data Kendaraan Yang Belum Kembali"
        >
            <HStack
                mt="2"
                mb="4"
                align={`end`}
            >
                <TableSearch />
                <TableFilterDate label="Tanggal Pemesanan" />
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
                            <Th>ID</Th>
                            <Th>Nama Kendaraan</Th>
                            <Th>Nama Pemesan</Th>
                            <Th>Nama Pengemudi</Th>
                            <Th>Nama Petugas</Th>
                            <Th>Penyetuju Satu</Th>
                            <Th>Penyetuju Dua</Th>
                            <Th>Status Kembali</Th>
                            <Th>Tanggal Pinjam</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data.map((vehicle, index) => {
                            {
                                return vehicle.approval_two_status === 1 && vehicle.borrow_status === 1 && vehicle.return_date === null ? (<Tr key={index + 1}>
                                    <Td>{index + 1}</Td>
                                    <Td>{vehicle.vehicle_name}</Td>
                                    <Td>{vehicle.customer_name}</Td>
                                    <Td>{vehicle.driver_name}</Td>
                                    <Td>{vehicle.created_by}</Td>
                                    <Td>{vehicle.approval_one_name}</Td>
                                    <Td>{vehicle.approval_two_name}</Td>
                                    <Td>{vehicle.order_status ? (<div>Sudah Kembali</div>) : (<div>Belum Kembali</div>)}</Td>
                                    <Td>{vehicle.order_date}</Td>
                                    <Td>
                                        <Button
                                            as={Link}
                                            type="submit"
                                            colorScheme="orange"
                                            color="white"
                                            _hover={{ color: "black" }}
                                            onClick={(event) => handleApprove(event, vehicle.id)}
                                        >
                                            Proses Pengembalian
                                        </Button>
                                    </Td>
                                </Tr>) : (<></>)
                            }
                        })}

                        {!data.length && (
                            <Tr>
                                <Td colSpan={6}>Data tidak tersedia.</Td>
                            </Tr>
                        )}
                    </Tbody>
                </Table>

                <Pagination
                    links={links}
                />
            </Box>
        </Layout>
    )
}

export default Index;
