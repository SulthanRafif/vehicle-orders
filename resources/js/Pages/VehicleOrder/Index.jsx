
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
import { values } from "lodash";

const Index = () => {
    const { vehicleOrders, auth } = usePage().props;
    const {
        data,
        meta: { links }
    } = vehicleOrders;

    const handleApprove = (event, vehicleOrderId) => {
        event.preventDefault();
        Inertia.put(route("vehicle-orders.update-approval-status", vehicleOrderId))
    }

    return (
        <Layout
            title="Data Pemesanan Kendaraan"
        >
            <HStack
                mt="2"
                mb="4"
                align={`end`}
            >
                <TableSearch />
                <TableFilterDate label="Tanggal Pemesanan" />
                <Button
                    as={Link}
                    colorScheme="orange"
                    color="white"
                    href={route("vehicle-orders.create")}
                    _hover={{ color: "black" }}
                >
                    Tambah Data
                </Button>
                {
                    can([RoleType.admin]) && (<Button
                        as={Link}
                        colorScheme="orange"
                        color="white"
                        href={route('vehicle-orders.export')}
                        _hover={{ color: "black" }}
                    >
                        Export Excel
                    </Button>)
                }
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
                            <Th>Nama Peminjam</Th>
                            <Th>Nama Petugas</Th>
                            <Th>Penyetuju Satu</Th>
                            <Th>Status Persetujuan Satu</Th>
                            <Th>Penyetuju Dua</Th>
                            <Th>Status Persetujuan Dua</Th>
                            <Th>Tanggal Pinjam</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data.map((vehicle, index) => {
                            return (
                                <Tr key={index + 1}>
                                    <Td>{index + 1}</Td>
                                    <Td>{vehicle.vehicle_name}</Td>
                                    <Td>{vehicle.customer_name}</Td>
                                    <Td>{vehicle.created_by}</Td>
                                    <Td>{vehicle.approval_one}</Td>
                                    {vehicle.approval_one_status === 0 ? (<Td>Belum Disetujui</Td>) : (<Td>Sudah Disetujui</Td>)}
                                    <Td>{vehicle.approval_two}</Td>
                                    {vehicle.approval_two_status === 0 ? (<Td>Belum Disetujui</Td>) : (<Td>Sudah Disetujui</Td>)}
                                    <Td>{vehicle.order_date}</Td>
                                    <Td>
                                        {values(auth.user.roles)[0] === 'admin' ?
                                            (
                                                <TableRowAction id={vehicle.id} routeName="vehicle-orders" isShow={false} />
                                            ) : (
                                                values(auth.user.roles)[0] === 'penyetuju_satu' ?
                                                    (vehicle.approval_one_status === 0 && vehicle.approval_two_status === 0 ? (

                                                        <Button
                                                            as={Link}
                                                            type="submit"
                                                            colorScheme="orange"
                                                            color="white"
                                                            _hover={{ color: "black" }}
                                                            onClick={(event) => handleApprove(event, vehicle.id)}
                                                        >
                                                            Proses Persetujuan
                                                        </Button>

                                                    ) : (
                                                        <Button
                                                            type="submit"
                                                            colorScheme="orange"
                                                            color="white"
                                                            _hover={{ color: "black" }}
                                                            isDisabled={true}
                                                        >
                                                            Proses Persetujuan
                                                        </Button>
                                                    )) : (vehicle.approval_one_status === 1 && vehicle.approval_two_status === 0 ? (
                                                        <Button
                                                            as={Link}
                                                            type="submit"
                                                            colorScheme="orange"
                                                            color="white"
                                                            _hover={{ color: "black" }}
                                                            onClick={(event) => handleApprove(event, vehicle.id)}
                                                        >
                                                            Proses Persetujuan
                                                        </Button>) : (<Button
                                                            as={Link}
                                                            colorScheme="orange"
                                                            color="white"
                                                            isDisabled={true}
                                                        >
                                                            Proses Persetujuan
                                                        </Button>))

                                            )

                                        }
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

                <Pagination
                    links={links}
                />
            </Box>
        </Layout>
    )
}

export default Index;
