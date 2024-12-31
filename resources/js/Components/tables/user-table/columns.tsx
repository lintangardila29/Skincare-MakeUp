"use client";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Checkbox } from "@/Components/ui/checkbox";
import { User } from "@/types/model";
import { DataTableColumnHeader } from "@/Components/data-table/data-table-column-header";
import { formatDate } from "@/Lib/utils";
import { Link } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/Components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { getImageSrc } from "@/Lib/getImageSrc";

export const columns: ColumnDef<User>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: "actions_start",
        cell: ({ row }) => <CellAction data={row.original} />,
    },
    {
        accessorKey: "avatar",
        header: ({ column }) => (
            <Button variant="ghost" size="sm">Foto</Button>
        ),
        cell: ({ row }) => (
            <Dialog>
                <DialogTrigger className="w-full place-items-center">
                    <Avatar className="flex h-12 w-12 items-center justify-center space-y-0 border">
                        <AvatarImage src={getImageSrc(row.original.avatar)} alt={row.original.name} />
                        <AvatarFallback>{row.original.name?.[0]}</AvatarFallback>
                    </Avatar>
                </DialogTrigger>
                <DialogContent className="bg-none bg-transparent border-0 shadow-none">
                    <img src={getImageSrc(row.original.avatar)} alt={row.original.name} className="w-full h-auto place-self-center" />
                </DialogContent>
            </Dialog>
        ),
    },
    {
        accessorKey: "name",
        header: ({ column }) => (
            <DataTableColumnHeader className="min-w-56" column={column} title="Nama" />
        ),
        cell: ({ row }) => (
            <Link
                href={`/dashboard/users/${row.original.id}/edit`}
                className="hover:cursor-pointer">
                {row.original.name}
            </Link>
        )
    },
    {
        accessorKey: "email",
        header: ({ column }) => (
            <DataTableColumnHeader className="min-w-56" column={column} title="Email" />
        ),
        cell: ({ row }) => (
            <a
                href={`mailto:${row.original.email}`}
                className="hover:cursor-pointer">
                <Button variant="link">{row.original.email}</Button>
            </a>
        )
    },
    {
        accessorKey: "role.name",
        header: ({ column }) => (
            <DataTableColumnHeader className="min-w-56" column={column} title="Role" />
        ),
    },
    {
        accessorKey: "created_at",
        header: ({ column }) => (
            <DataTableColumnHeader className="min-w-36 max-w-max" column={column} title="Tanggal Dibuat" />
        ),
        cell: ({ row }) => (
            <span>{formatDate(new Date(row.original.created_at))}</span>
        ),
        filterFn: (row, id, value) => {
            return value.includes(formatDate(row.getValue(id)))
        },
    },
    {
        id: "actions_end",
        cell: ({ row }) => <CellAction data={row.original} />,
    },
];
