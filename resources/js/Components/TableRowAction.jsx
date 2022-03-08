import { Flex, Icon, Link } from "@chakra-ui/react";
import React from "react";
import { Link as InertiaLink } from "@inertiajs/inertia-react";
import { FiEdit, FiEye, FiTrash2 } from "react-icons/fi";
import { Inertia } from "@inertiajs/inertia";

const TableRowAction = ({
    id,
    routeName,
    isShow = true,
    isEdit = true,
    isDestroy = true,
    children
}) => {
    function confirmDelete(e) {
        if (confirm("Apakah anda yakin akan menghapus data ini?")) {
            Inertia.delete(route(`${routeName}.destroy`, id));
        }
        e.preventDefault();
    }

    return (
        <Flex justify="start" align="center">
            {children}

            {isShow && (
                <Link
                    as={InertiaLink}
                    href={route(`${routeName}.show`, id)}
                    mr="4"
                    title="Detail Data"
                >
                    <Icon as={FiEye} color="gray.500" _hover={{ color: "gray.800" }} />
                </Link>
            )}
            {isEdit && (
                <Link
                    as={InertiaLink}
                    href={route(`${routeName}.edit`, id)}
                    mr="4"
                    title="Edit Data"
                >
                    <Icon as={FiEdit} color="gray.500" _hover={{ color: "gray.800" }} />
                </Link>
            )}
            {isDestroy && (
                <Link as="button" onClick={confirmDelete} title="Hapus Data">
                    <Icon as={FiTrash2} color="red.500" _hover={{ color: "red.800" }} />
                </Link>
            )}
        </Flex>
    );
};

export default TableRowAction;
