import { Box, Flex, Link, Text } from "@chakra-ui/react";
import React from "react";
import { Link as InertiaLink } from "@inertiajs/inertia-react";

const PageLink = ({ active, label, url }) => {
    return (
        <Link
            as={InertiaLink}
            preserveScroll
            href={url}
            px={4}
            py={2}
            mr={1}
            bg={active ? "cyan.400" : "white"}
            color={active ? "white" : "black"}
            rounded="lg"
            border="1px"
            borderColor={active ? "cyan.400" : "gray.100"}
            _hover={{
                textDecor: "none",
                bg: "cyan.400",
                borderColor: "cyan.400",
                color: "white"
            }}
        >
            <span dangerouslySetInnerHTML={{ __html: label }} />
        </Link>
    );
}

const PageInactive = ({ label }) => {
    return (
        <Text
            px={4}
            py={2}
            mr={1}
            bg="white"
            color="gray.400"
            rounded="lg"
            border="1px"
            borderColor="gray.100"
            cursor="not-allowed"
        >
            <span dangerouslySetInnerHTML={{ __html: label }} />
        </Text>
    );
};

const Pagination = ({ links = [] }) => {
    if (links.length === 3) return null;

    return (
        <Box m={4} whiteSpace={`nowrap`}>
            <Flex align="center" justify="center">
                {links.map(({ active, label, url }) => {
                    return url === null ? (
                        <PageInactive key={label} label={label} />
                    ) : (
                        <PageLink key={label} label={label} active={active} url={url} />
                    );
                })}
            </Flex>
        </Box>
    );
};

export default Pagination;

