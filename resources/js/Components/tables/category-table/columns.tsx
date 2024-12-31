"use client";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Checkbox } from "@/Components/ui/checkbox";
import { Category } from "@/types/model";
import { DataTableColumnHeader } from "@/Components/data-table/data-table-column-header";
import { formatDate } from "@/Lib/utils";

export const columns: ColumnDef<Category>[] = [
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
        accessorKey: "name",
        header: ({ column }) => (
            <DataTableColumnHeader className="min-w-56" column={column} title="Nama" />
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
            <DataTableColumnHeader className="min-w-56 max-w-max" column={column} title="Jumlah Produk" />
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
