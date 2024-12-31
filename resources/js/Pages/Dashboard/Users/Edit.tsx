import BreadCrumb from "@/Components/breadcrumb";
// import { ScrollArea } from "@/Components/ui/scroll-area";
import { User, Role } from "@/types/model";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import UserForm from "@/Components/forms/user-form";

const UserEdit = ({ user, roles }: PageProps & { user: User, roles: Role[] }) => {
    const breadcrumbItems = [
        { title: "User", link: "/dashboard/users" },
        { title: `${user.name}`, link: `/dashboard/users/${user.id}` },
        { title: `Edit`, link: `/dashboard/users/${user.id}/edit` },
    ];
    return (
        <>
        <Head title="Edit User" />
            {/* <ScrollArea className="h-full"> */}
            <div className="flex-1 space-y-4 p-6">
                <BreadCrumb items={breadcrumbItems} />
                <UserForm
                    roles={roles}
                    defaultValues={user}
                />
            </div>
            {/* </ScrollArea> */}
        </>
    );
}

export default UserEdit;
