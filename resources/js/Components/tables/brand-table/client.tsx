"use client";
import { DataTable } from "@/Components/data-table/data-table";
import { Heading } from "@/Components/ui/heading";
import { Separator } from "@/Components/ui/separator";
import { columns } from "./columns";
import { Brand } from "@/types/model";
import { formatDate } from "@/Lib/utils";
import BrandForm from "@/Components/forms/brand-form";
import { Button } from "@/Components/ui/button";
import { PlusCircleIcon } from "lucide-react";

interface ProductsClientProps {
    data: Brand[];
}

export interface FilterKey {
    key: string;
    title: string;
    options: any[];
}

export const BrandsClientTable: React.FC<ProductsClientProps> = ({ data }) => {
    const filterKeys: FilterKey[] = [
        {
            key: "created_at",
            title: "Tanggal Dibuat",
            options: data.map((brand) => formatDate(new Date(brand.created_at))).filter((value, index, self) => self.indexOf(value) === index).map((value) => ({ label: value, value })),
        },
    ];
    return (
        <>
            <div className="flex flex-col items-center justify-center md:flex-row md:justify-between gap-2">
                <Heading
                    title={`Kategori (${data.length})`}
                    description="Semua Kategori"
                />
                <BrandForm>
                    <Button>
                        <PlusCircleIcon />
                        Buat
                    </Button>
                </BrandForm>
            </div>
            <Separator />
            <DataTable
                model="brands"
                data={data}
                columns={columns}
                searchKey="name"
                searchLabel="Nama"
                fileName="Kategori"
                filterKeys={filterKeys}
            />
        </>
    );
};
