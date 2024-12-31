"use client";
import { DataTable } from "@/Components/data-table/data-table";
import { Heading } from "@/Components/ui/heading";
import { Separator } from "@/Components/ui/separator";
import { columns } from "./columns";
import { Category } from "@/types/model";
import { formatDate } from "@/Lib/utils";
import CategoryForm from "@/Components/forms/category-form";
import { Button } from "@/Components/ui/button";
import { PlusCircleIcon } from "lucide-react";

interface ProductsClientProps {
    data: Category[];
}

export interface FilterKey {
    key: string;
    title: string;
    options: any[];
}

export const CategoriesClientTable: React.FC<ProductsClientProps> = ({ data }) => {
    // What the hell is this? LMAO
    const filterKeys: FilterKey[] = [
        {
            key: "created_at",
            title: "Tanggal Dibuat",
            options: data.map((category) => formatDate(new Date(category.created_at))).filter((value, index, self) => self.indexOf(value) === index).map((value) => ({ label: value, value })),
        },
    ];

    return (
        <>
            <div className="flex flex-col items-center justify-center md:flex-row md:justify-between gap-2">
                <Heading
                    title={`Kategori (${data.length})`}
                    description="Semua Kategori"
                />
                <CategoryForm>
                    <Button>
                        <PlusCircleIcon />
                        Buat
                    </Button>
                </CategoryForm>
            </div>
            <Separator />
            <DataTable
                model="categories"
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
