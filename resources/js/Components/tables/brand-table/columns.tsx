"use client";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Checkbox } from "@/Components/ui/checkbox";
import { Brand } from "@/types/model";
import { DataTableColumnHeader } from "@/Components/data-table/data-table-column-header";
import { formatDate } from "@/Lib/utils";
import { Button } from "@/Components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/Components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { getImageSrc } from "@/Lib/getImageSrc";

export const columns: ColumnDef<Brand>[] = [
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
        accessorKey: "image",
        header: ({ column }) => (
            <Button variant="ghost" size="sm">Logo</Button>
        ),
        cell: ({ row }) => (
            <Dialog>
                <DialogTrigger className="w-full place-items-center">
                    <Avatar className="flex h-12 w-12 items-center justify-center space-y-0 border">
                        <AvatarImage src={getImageSrc(row.original.logo)} alt={row.original.name} />
                        <AvatarFallback>{row.original.name?.[0]}</AvatarFallback>
                    </Avatar>
                </DialogTrigger>
                <DialogContent className="bg-none bg-transparent border-0 shadow-none">
                    <img src={getImageSrc(row.original.logo)} alt={row.original.name} className="w-full h-auto place-self-center" />
                </DialogContent>
            </Dialog>
        ),
    },
    {
        accessorKey: "name",
        header: ({ column }) => (
            <DataTableColumnHeader className="min-w-56" column={column} title="Nama" />
        ),
    },
    {
        accessorKey: "website",
        header: ({ column }) => (
            <DataTableColumnHeader className="min-w-56" column={column} title="Website" />
        ),
    },
    {
        accessorKey: "description",
        header: ({ column }) => (
            <DataTableColumnHeader className="min-w-56" column={column} title="Deskripsi" />
        ),
    },
    {
        accessorKey: "product_count",
        header: ({ column }) => (
            <DataTableColumnHeader className="min-w-24 max-w-max" column={column} title="Jumlah Produk" />
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
