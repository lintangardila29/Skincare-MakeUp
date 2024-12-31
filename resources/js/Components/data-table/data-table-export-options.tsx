"use client"

import { Table } from "@tanstack/react-table"

import { Button } from "@/Components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"
import { exportData } from "@/Lib/exportData"
import { DownloadIcon, HardDriveDownloadIcon } from "lucide-react"
import { Separator } from "../ui/separator"
interface DataTableExportOptionsProps<TData> {
    table: Table<TData>
    fileName: string
}

export function DataTableExportOptions<TData>({
    table,
    fileName,
}: DataTableExportOptionsProps<TData>) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="ml-auto hidden h-8 lg:flex"
                >
                    <HardDriveDownloadIcon />
                    Export
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Excel</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => exportData(table, fileName, "excel", "all")} className="focus:bg-emerald-500/30 focus:cursor-pointer"
                >
                    <DownloadIcon className="mr-2 h-4 w-4" /> Semua Data
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => exportData(table, fileName, "excel", "filtered")} className="focus:bg-emerald-500/30 focus:cursor-pointer"
                >
                    <DownloadIcon className="mr-2 h-4 w-4" /> Data Terfilter
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => exportData(table, fileName, "excel", "selected")} className="focus:bg-emerald-500/30 focus:cursor-pointer"
                >
                    <DownloadIcon className="mr-2 h-4 w-4" /> Data Terpilih
                </DropdownMenuItem>

                <Separator className="my-2" />

                <DropdownMenuLabel>CSV</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => exportData(table, fileName, "csv", "all")} className="focus:bg-zinc-500/30 focus:cursor-pointer"
                >
                    <DownloadIcon className="mr-2 h-4 w-4" /> Semua Data
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => exportData(table, fileName, "csv", "filtered")} className="focus:bg-zinc-500/30 focus:cursor-pointer"
                >
                    <DownloadIcon className="mr-2 h-4 w-4" /> Data Terfilter
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => exportData(table, fileName, "csv", "selected")} className="focus:bg-zinc-500/30 focus:cursor-pointer"
                >
                    <DownloadIcon className="mr-2 h-4 w-4" /> Data Terpilih
                </DropdownMenuItem>

                <Separator className="my-2" />

                <DropdownMenuLabel>PDF</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => exportData(table, fileName, "pdf", "all")} className="focus:bg-red-500/30 focus:cursor-pointer"
                >
                    <DownloadIcon className="mr-2 h-4 w-4" /> Semua Data
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => exportData(table, fileName, "pdf", "filtered")} className="focus:bg-red-500/30 focus:cursor-pointer"
                >
                    <DownloadIcon className="mr-2 h-4 w-4" /> Data Terfilter
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => exportData(table, fileName, "pdf", "selected")} className="focus:bg-red-500/30 focus:cursor-pointer"
                >
                    <DownloadIcon className="mr-2 h-4 w-4" /> Data Terpilih
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
