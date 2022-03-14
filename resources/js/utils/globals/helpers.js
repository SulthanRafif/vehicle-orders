import { usePage } from "@inertiajs/inertia-react";

export const serializeQuery = (obj, prefix) => {
    var str = [],
      p;

    for (p in obj) {
      if (obj.hasOwnProperty(p)) {
        var k = prefix ? prefix + "[" + p + "]" : p,
          v = obj[p];
        str.push(
          v !== null && typeof v === "object" ? serialize(v, k) : encodeURIComponent(k) + "=" + encodeURIComponent(v)
        );
      }
    }

    return str.join("&");
};

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
