
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
import { values } from "lodash";

const Index = () => {
    const { drivers, auth } = usePage().props;
    const {
        data,
        meta: { links }
    } = drivers;

    return (
        <Layout
            title="Data Pengemudi"
        >
            <HStack
                mt="2"
                mb="4"
                align={`end`}
            >
                <TableSearch />
                <TableFilterDate label="Tanggal Masuk Pengemudi" />
                <Button
                    as={Link}
                    colorScheme="orange"
                    color="white"
                    href={route("drivers.create")}
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
                            <Th>Nama Pengemudi</Th>
                            <Th>Tanggal Masuk Pengemudi</Th>
                            {values(auth.user.roles)[0] === 'admin' ? (<Th>Action</Th>) : <Th />}
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data.map((driver, index) => {
                            return (
                                <Tr key={index + 1}>
                                    <Td>{index + 1}</Td>
                                    <Td>{driver.name}</Td>
                                    <Td>{driver.created_at}</Td>
                                    <Td>
                                        {values(auth.user.roles)[0] === 'admin' ? (<TableRowAction id={driver.id} routeName="drivers" isShow={false} />) : (<></>)}
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
