import BreadCrumb from "@/Components/breadcrumb";
import { UsersClientTable } from "@/Components/tables/user-table/client";
import { PageProps } from "@/types";
import { User } from "@/types/model";
import { Head } from "@inertiajs/react";

const breadcrumbItems = [{ title: "User", link: "/dashboard/users" }];

const UserIndex = ({ users }: PageProps & { users: User[] }) => {
    return (
        <>
            <Head title="User" />
            <div className="flex-1 space-y-4 p-4 md:p-6 pt-6">
                <BreadCrumb items={breadcrumbItems} />
                <UsersClientTable data={users} />
            </div>
        </>
    );
}

export default UserIndex;
