import BreadCrumb from "@/Components/breadcrumb";
import UserForm from "@/Components/forms/user-form";
import { PageProps } from "@/types";
import { Role } from "@/types/model";
import { Head } from "@inertiajs/react";

interface UserProps extends PageProps {
    roles: Role[];
}

const UserCreate = ({ roles }: UserProps) => {
    const breadcrumbItems = [
        { title: "User", link: "/dashboard/users" },
        { title: "Buat", link: "/dashboard/users/create" },
    ];
    return (
        <>
            <Head title="Buat User" />
            {/* <ScrollArea className="h-full"> */}
            <div className="flex-1 space-y-4 p-6">
                <BreadCrumb items={breadcrumbItems} />
                <UserForm
                    roles={roles}
                    defaultValues={null}
                />
            </div>
            {/* </ScrollArea> */}
        </>
    );
}

export default UserCreate;
