"use client";
import { DataTable } from "@/Components/data-table/data-table";
import { Heading } from "@/Components/ui/heading";
import { Separator } from "@/Components/ui/separator";
import { columns } from "./columns";
import { User } from "@/types/model";
import { Link } from "@inertiajs/react";
import { formatDate } from "@/Lib/utils";
import { Button } from "@/Components/ui/button";
import { PlusCircleIcon } from "lucide-react";

interface UsersClientProps {
    data: User[];
}

export interface FilterKey {
    key: string;
    title: string;
    options: any[];
}

export const UsersClientTable: React.FC<UsersClientProps> = ({ data }) => {
    const filterKeys: FilterKey[] = [
        {
            key: "role_name",
            title: "Role",
            options: data.map((user) => user.role?.name).filter((value, index, self) => self.indexOf(value) === index).map((value) => ({ label: value, value })),
        },
        {
            key: "created_at",
            title: "Tanggal Dibuat",
            options: data.map((user) => formatDate(new Date(user.created_at))).filter((value, index, self) => self.indexOf(value) === index).map((value) => ({ label: value, value })),
        },
    ];

    return (
        <>
            <div className="flex flex-col items-center justify-center md:flex-row md:justify-between gap-2">
                <Heading
                    title={`User (${data.length})`}
                    description="Semua User"
                />
                <Link href="/dashboard/users/create" prefetch={['mount']} cacheFor="3m">
                    <Button>
                        <PlusCircleIcon />
                        Buat
                    </Button>
                </Link>
            </div>
            <Separator />
            <DataTable
                model="users"
                data={data}
                columns={columns}
                searchKey="user_name"
                searchLabel="Nama"
                fileName="User"
                filterKeys={filterKeys}
            />
        </>
    );
};
