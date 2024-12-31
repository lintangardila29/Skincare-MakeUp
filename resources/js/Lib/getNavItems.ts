import { superadminNavItems, influencerNavItems, defaultNavItems } from "@/Constants/data";
import { Auth } from "@/types";

export const getNavItems = (auth: Auth) => {
    switch (auth.user?.role?.name) {
        case "Super Admin":
            return superadminNavItems;
        case "Influencer":
            return influencerNavItems;
        default:
            return defaultNavItems;
    }
};
