import React from "react";
import {
    IconButton,
    Avatar,
    Box,
    CloseButton,
    Flex,
    HStack,
    VStack,
    Icon,
    useColorModeValue,
    Link,
    Drawer,
    DrawerContent,
    Text,
    useDisclosure,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Heading,
    Image
} from "@chakra-ui/react";
import { FiMenu, FiChevronDown } from "react-icons/fi";
import { Head, Link as InertiaLink, usePage } from "@inertiajs/inertia-react";
import { LinkItems } from "./LinkItems";
import FlashMessage from "../Components/FlashMessage";
import { Inertia } from "@inertiajs/inertia";
import { can } from "../utils/globals/helpers";
import { values } from "lodash";

export default function Layout({ title, children }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
            <Head title={title} />
            <SidebarContent onClose={() => onClose} display={{ base: "none", md: "block" }} />
            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full"
            >
                <DrawerContent>
                    <SidebarContent onClose={onClose} />
                </DrawerContent>
            </Drawer>
            {/* mobilenav */}
            <MobileNav onOpen={onOpen} />
            <Box ml={{ base: 0, md: 60 }} p="4">
                <Heading size="lg" mb="6">
                    {title}
                </Heading>

                <FlashMessage mb={4} />

                {children}
            </Box>
        </Box>
    );
}

const SidebarContent = ({ onClose, ...rest }) => {
    const { appName, logoUrl } = usePage().props;

    return (
        <Box
            transition="3s ease"
            bg={useColorModeValue("white", "gray.900")}
            borderRight="1px"
            borderRightColor={useColorModeValue("gray.200", "gray.700")}
            w={{ base: "full", md: 60 }}
            pos="fixed"
            h="full"
            overflowY="auto"
            {...rest}
        >
            <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
                <Image src={logoUrl} alt="Logo Aplikasi" w={`50px`} mr={4} />
                <Text fontSize="lg" fontFamily="monospace" fontWeight="bold">
                    {appName}
                </Text>
                <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
            </Flex>
            {LinkItems.map(link => {
                return (
                    link.hasOwnProperty("roles") &&
                    can(link.roles) &&
                    (
                        <NavItem key={link.name} icon={link.icon} urlPath={link.urlPath} isExact={link.isExact}>
                            {link.name}
                        </NavItem>
                    )
                );
            })}
        </Box>
    );
};

const NavItem = ({ icon, children, urlPath, isExact, ...rest }) => {
    const { url } = usePage();
    const active = isExact ? url === urlPath : url.startsWith(urlPath);

    return (
        <Link as={InertiaLink} href={urlPath} style={{ textDecoration: "none" }} _focus={{ boxShadow: "none" }}>
            <Flex
                align="center"
                p="4"
                mx="4"
                mt="1"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                _hover={{
                    bg: "orange.400",
                    color: "white"
                }}
                color={active ? "white" : "black"}
                bg={active ? "orange.400" : "white"}
                {...rest}
            >
                {icon && (
                    <Icon
                        mr="4"
                        fontSize="16"
                        _groupHover={{
                            color: "white"
                        }}
                        as={icon}
                    />
                )}
                {children}
            </Flex>
        </Link>
    );
};

const MobileNav = ({ onOpen, ...rest }) => {
    const { auth, appName } = usePage().props;

    const handleLogout = () => {
        Inertia.post(route("logout"));
    };

    return (
        <Flex
            ml={{ base: 0, md: 60 }}
            px={{ base: 4, md: 4 }}
            height="20"
            alignItems="center"
            bg={useColorModeValue("white", "gray.900")}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue("gray.200", "gray.700")}
            justifyContent={{ base: "space-between", md: "flex-end" }}
            {...rest}
        >
            <IconButton
                display={{ base: "flex", md: "none" }}
                onClick={onOpen}
                variant="outline"
                aria-label="open menu"
                icon={<FiMenu />}
            />

            <Text display={{ base: "flex", md: "none" }} fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                {appName}
            </Text>

            <HStack spacing={{ base: "0", md: "6" }}>
                <Flex alignItems={"center"}>
                    <Menu>
                        <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: "none" }}>
                            <HStack>
                                <Avatar
                                    size={"sm"}
                                    src={
                                        "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                                    }
                                />
                                <VStack display={{ base: "none", md: "flex" }} alignItems="flex-start" spacing="1px" ml="2">
                                    <Text fontSize="sm">{auth.user.name}</Text>
                                    <Text fontSize="xs" color="orange.600">
                                        {values(auth.user.roles)[0]}
                                    </Text>
                                </VStack>
                                <Box display={{ base: "none", md: "flex" }}>
                                    <FiChevronDown />
                                </Box>
                            </HStack>
                        </MenuButton>
                        <MenuList
                            bg={useColorModeValue("white", "orange.900")}
                            borderColor={useColorModeValue("orange.200", "orange.700")}
                        >
                            <MenuItem
                                as={InertiaLink}
                            // href={route("profile")}
                            >
                                Profil Saya
                            </MenuItem>
                            <MenuDivider />
                            <MenuItem onClick={handleLogout} color={`red.500`} >
                                Logout
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </HStack>
        </Flex>
    );
};
