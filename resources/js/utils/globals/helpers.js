import { usePage } from "@inertiajs/inertia-react";

export const can = roles => {
    const { auth } = usePage().props;

    if (Array.isArray(roles)) {
        for (let i in roles) {
            if (auth.user.roles[roles[i]]) {
                return true;
            }
        }
    }

    return !!auth.user.roles[roles];
};

export const RoleType = {
    admin: "admin",
    penyetujuSatu: "penyetuju_satu",
    penyetujuDua: "penyetuju_dua"
};
