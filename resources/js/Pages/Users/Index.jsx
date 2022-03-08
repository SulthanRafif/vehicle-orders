
import Layout from "../../Containers/Layout";
import Pagination from "../../Components/Pagination";
import TableRowAction from "../../Components/TableRowAction";
import TableSearch from "../../Components/TableSearch";

import {
    Box,
    Button,
    Flex,
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
    const { users } = usePage().props;
    const {
        data,
        meta: { links }
    } = users;

    return (
        <Layout
            title="Data Semua Pengguna"
        >
            <Flex justify="space-between" mb="4">
                <TableSearch />
                <Button
                    as={Link}
                    colorScheme="orange"
                    color="white"
                    href={route("users.create")}
                    _hover={{ color: "black" }}
                >
                    Tambah Data
                </Button>
            </Flex>

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
                            <Th>Nama</Th>
                            <Th>Email</Th>
                            <Th>Hak Akses</Th>
                            <Th>Tanggal Buat</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data.map((user, index) => {
                            return (
                                <Tr key={index + 1}>
                                    <Td>{index + 1}</Td>
                                    <Td>{user.name}</Td>
                                    <Td>{user.email}</Td>
                                    <Td>{user.role_name}</Td>
                                    <Td>{user.created_at}</Td>
                                    <Td>
                                        <TableRowAction id={user.id} routeName="users" isShow={false} />
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
