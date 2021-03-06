
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

    console.log(vehicleOrders);

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
                {
                    can(RoleType.admin) ? (
                        <>
                            <Button
                                as={Link}
                                colorScheme="orange"
                                color="white"
                                href={route("vehicle-orders.create")}
                                _hover={{ color: "black" }}
                            >
                                Tambah Data
                            </Button>
                            <Button
                                type="submit"
                                colorScheme="orange"
                                color="white"
                                _hover={{ color: "black" }}
                                href={route("vehicle-orders.export")}
                                as="a"
                                target={`_blank`}
                            >
                                Export Excel
                            </Button>
                        </>
                    ) : (<></>)
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
                            <Th>Nama Pemesan</Th>
                            <Th>Nama Pengemudi</Th>
                            <Th>Nama Petugas</Th>
                            <Th>Penyetuju Satu</Th>
                            <Th>Status Persetujuan Satu</Th>
                            <Th>Penyetuju Dua</Th>
                            <Th>Status Persetujuan Dua</Th>
                            <Th>Status Kendaraan</Th>
                            <Th>Tanggal Pinjam</Th>
                            <Th>Tanggal Kembali</Th>
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
                                    <Td>{vehicle.driver_name}</Td>
                                    <Td>{vehicle.created_by}</Td>
                                    <Td>{vehicle.approval_one_name}</Td>
                                    {vehicle.approval_one_status === 0 ? (<Td>Belum Disetujui</Td>) : (<Td>Sudah Disetujui</Td>)}
                                    <Td>{vehicle.approval_two_name}</Td>
                                    {vehicle.approval_two_status === 0 ? (<Td>Belum Disetujui</Td>) : (<Td>Sudah Disetujui</Td>)}
                                    {vehicle.borrow_status === 0 ? (<Td>Tersedia</Td>) : (<Td>Sedang Dipinjam</Td>)}
                                    <Td>{vehicle.order_date}</Td>
                                    {vehicle.return_date ? (<Td>{vehicle.return_date}</Td>) : (<Td>-</Td>)}
                                    <Td>
                                        {values(auth.user.roles)[0] === 'admin' ?
                                            (
                                                <TableRowAction id={vehicle.id} routeName="vehicle-orders" isShow={false} />
                                            ) : (
                                                vehicle.return_date === null ? (vehicle.borrow_status === 0 ? (values(auth.user.roles)[0] === 'penyetuju_satu' ?
                                                    (vehicle.approval_one_status === 0 && vehicle.approval_two_status === 0 ? (

                                                        vehicle.approval_one_id === auth.user.id ? (<Button
                                                            as={Link}
                                                            type="submit"
                                                            colorScheme="orange"
                                                            color="white"
                                                            _hover={{ color: "black" }}
                                                            onClick={(event) => handleApprove(event, vehicle.id)}
                                                        >
                                                            Proses Persetujuan
                                                        </Button>) : (<div></div>)

                                                    ) : (
                                                        vehicle.approval_one_id === auth.user.id ? (<Button
                                                            type="submit"
                                                            colorScheme="orange"
                                                            color="white"
                                                            _hover={{ color: "black" }}
                                                            isDisabled={true}
                                                        >
                                                            Proses Persetujuan
                                                        </Button>) : (<div></div>)
                                                    )) : (vehicle.approval_one_status === 1 && vehicle.approval_two_status === 0 ? (
                                                        vehicle.approval_two_id === auth.user.id ? (<Button
                                                            as={Link}
                                                            type="submit"
                                                            colorScheme="orange"
                                                            color="white"
                                                            _hover={{ color: "black" }}
                                                            onClick={(event) => handleApprove(event, vehicle.id)}
                                                        >
                                                            Proses Persetujuan
                                                        </Button>) : (<div></div>)) : (vehicle.approval_two_id === auth.user.id ? (<Button
                                                            type="submit"
                                                            colorScheme="orange"
                                                            color="white"
                                                            _hover={{ color: "black" }}
                                                            isDisabled={true}
                                                        >
                                                            Proses Persetujuan
                                                        </Button>) : (<div></div>)))) : (<Button
                                                            type="submit"
                                                            colorScheme="orange"
                                                            color="white"
                                                            _hover={{ color: "black" }}
                                                            isDisabled={true}
                                                        >
                                                            Proses Persetujuan
                                                        </Button>)) : (<div></div>)

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
