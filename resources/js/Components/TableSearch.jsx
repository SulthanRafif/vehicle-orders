import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/inertia-react";
import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { usePrevious } from "react-use";

const TableSearch = ({ ...props }) => {
    const { propSearch } = usePage().props;
    const [search, setSearch] = useState(propSearch || "");

    const prevValue = usePrevious(search);

    useEffect(() => {
        if (prevValue) {
            const query = search !== "" ? { search: search } : {};

            Inertia.get(route(route().current()), query, {
                replace: true,
                preserveState: true
            });
        }
    }, [search]);

    const handleChange = e => {
        setSearch(e.target.value);
    };

    return (
        <InputGroup w="xs" {...props}>
            <InputLeftElement
                pointerEvents="none"
                children={<FiSearch color="gray.300" />}
            />
            <Input
                type="text"
                placeholder="Pencarian"
                bg="white"
                name="search"
                value={search}
                onChange={handleChange}
                autoComplete="off"
            />
        </InputGroup>
    );
};

export default TableSearch;
