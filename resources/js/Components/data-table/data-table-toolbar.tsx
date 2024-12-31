"use client"

import { Table } from "@tanstack/react-table"
import { Trash2Icon, X } from "lucide-react"

import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { DataTableViewOptions } from "./data-table-view-options"

import { DataTableFacetedFilter } from "./data-table-faceted-filter"
import { DataTableExportOptions } from "./data-table-export-options"
import { router, usePage } from "@inertiajs/react"
import { AlertModal } from "../modal/alert-modal"
import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "sonner"
import { FilterKey } from "@/types"

interface DataTableToolbarProps<TData> {
    model?: string
    table: Table<TData>
    searchKey: string
    searchLabel: string
    filterKeys?: FilterKey[]
    fileName: string
}

export function DataTableToolbar<TData>({
    model,
    table,
    searchKey,
    searchLabel,
    filterKeys,
    fileName,
}: DataTableToolbarProps<TData>) {
    const isPresencesPage = window.location.pathname === '/dashboard/presences'
    const params = new URLSearchParams(window.location.search)
    const { auth } = usePage().props
    const isFiltered = table.getState().columnFilters.length > 0
    const [loading, setLoading] = useState(false);
    const [nameQuery, setNameQuery] = useState(params.get("name") ?? '');
    const [open, setOpen] = useState(false);
    const onConfirm = async () => {
        setLoading(true);
        // @ts-expect-error it actually exists
        const ids = table.getFilteredSelectedRowModel().rows.map((row) => row.original.id);
        const deleteMany = axios.delete(`/dashboard/${model}/delete-many`, {
            data: { ids }
        });
        toast.promise(deleteMany, {
            loading: 'Loading...',
            success: () => {
                router.reload();
                return `Berhasil menghapus ${ids.length} data.`;
            },
            error: (error) => {
                return `Error: ${error.response.data.message}`;
            },
            position: 'top-center',
        });
        setLoading(false);
        setOpen(false);
    };

    const canDeleteMany = (auth.user.role.name === "Super Admin" && location.pathname !== "/dashboard/interns")
        || ((model === "tasks" || model === "permits" || model === "daily-reports") && auth.user.role.name === "Intern")

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        table.getColumn(searchKey)?.setFilterValue(event.target.value)
    }

    useEffect(() => {
        if (nameQuery) {
            table.getColumn(searchKey)?.setFilterValue(nameQuery)
        }
    }, [])

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onConfirm}
                loading={loading}
            />
            <div className="flex items-center justify-between py-1 overflow-x-scroll md:overflow-visible">
                <div className="flex flex-1 items-center space-x-2 px-0.5 md:px-0">
                    {!isPresencesPage &&
                        <Input
                            placeholder={`Cari ${searchLabel}...`}
                            value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
                            onChange={(event) => { handleSearch(event) }}
                            className="h-8 w-[160px] lg:w-[250px] text-sm"
                        />
                    }
                    {!isPresencesPage && canDeleteMany && table.getFilteredSelectedRowModel().rows.length > 0 && (
                        <Button onClick={() => setOpen(true)} variant="destructive" size="sm" className="h-8">
                            <Trash2Icon />
                        </Button>
                    )}
                    {!isPresencesPage && filterKeys?.map((key) => (
                        <DataTableFacetedFilter
                            key={key.key}
                            column={table.getColumn(key.key)}
                            title={key.title}
                            options={key.options}
                        />
                    ))}
                    {isFiltered && (
                        <Button
                            variant="ghost"
                            onClick={() => table.resetColumnFilters()}
                            className="h-8 px-2 lg:px-3"
                        >
                            Reset
                            <X />
                        </Button>
                    )}
                </div>
                <div className="flex flex-1 items-center space-x-2">
                    {!(model === "interns" && auth.user.role.name == "Intern") && <DataTableExportOptions table={table} fileName={fileName} />}
                    <DataTableViewOptions table={table} />
                </div>
            </div>
        </>
    )
}
