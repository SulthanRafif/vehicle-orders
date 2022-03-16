import { FiDatabase, FiHome } from "react-icons/fi";
import { RoleType } from "../utils/globals/helpers";

export const LinkItems = [
    {
        name: "Beranda",
        icon: FiHome,
        urlPath: "/",
        isExact: true,
        roles: [RoleType.admin, RoleType.penyetujuSatu, RoleType.penyetujuDua]
    },
    {
        name: "Data Pengguna",
        icon: FiDatabase,
        urlPath: "/users",
        isExact: false,
        roles: [RoleType.admin]
    },
    {
        name: "Data Kendaraan",
        icon: FiDatabase,
        urlPath: "/vehicles",
        isExact: false,
        roles: [RoleType.admin]
    },
    {
        name: "Data Pengemudi",
        icon: FiDatabase,
        urlPath: "/drivers",
        isExact: false,
        roles: [RoleType.admin]
    },
    {
        name: "Data Pemesanan Kendaraan",
        icon: FiDatabase,
        urlPath: "/vehicle-orders",
        isExact: false,
        roles: [RoleType.admin, RoleType.penyetujuSatu, RoleType.penyetujuDua]
    },

]
