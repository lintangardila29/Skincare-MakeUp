import { Icons } from "@/Components/icons";
import { Intern, User } from "./model";

export interface Auth {
    user: User;
    permissions: any;
    notifications: Notification[];
}

export interface Notification {
    id: string;
    notifiable_id: number;
    data: {
        title: string;
        message: string;
        url: string;
    }
    read_at: Date;
    updated_at: Date;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: Auth;
    flash?: {
        success?: string;
        error?: string;
        warning?: string;
    }
};

export interface Role {
    id: number;
    name: "Super Admin" | "Influencer" | "Customer";
}

export interface CRUDPermissions {
    viewAny?: boolean;
    view?: boolean;
    create?: boolean;
    update?: boolean;
    delete?: boolean;
    restore?: boolean;
    forceDelete?: boolean;
}

export interface NavItem {
    title: string;
    href?: string;
    disabled?: boolean;
    external?: boolean;
    icon?: keyof typeof Icons;
    label?: string;
    description?: string;
    children?: NavItem[];
}

export interface NavItemWithChildren extends NavItem {
    items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
    items?: NavItemWithChildren[];
}

export interface FooterItem {
    title: string;
    items: {
        title: string;
        href: string;
        external?: boolean;
    }[];
}

export interface InternPresence {
    date: Date;
    check_in: string;
    check_out: string;
    status: string;
}

export type MainNavItem = NavItemWithOptionalChildren;

export type SidebarNavItem = NavItemWithChildren;

export interface FilterKey {
    key: string;
    title: string;
    options: any[];
}
