"use client";
import { DataTable } from "@/Components/data-table/data-table";
import { Heading } from "@/Components/ui/heading";
import { Separator } from "@/Components/ui/separator";
import { columns } from "./columns";
import { Product } from "@/types/model";
import { Link} from "@inertiajs/react";
import { formatDate } from "@/Lib/utils";
import { Button } from "@/Components/ui/button";
import { PlusCircleIcon } from "lucide-react";

interface ProductsClientProps {
    data: Product[];
}

export interface FilterKey {
    key: string;
    title: string;
    options: any[];
}

export const ProductsClientTable: React.FC<ProductsClientProps> = ({ data }) => {
    const filterKeys: FilterKey[] = [
        {
            key: "brand_name",
            title: "Brand",
            options: data.map((product) => product.brand?.name).filter((value, index, self) => self.indexOf(value) === index).map((value) => ({ label: value, value })),
        },
        {
            key: "category_name",
            title: "Kategori",
            options: data.map((product) => product.category?.name).filter((value, index, self) => self.indexOf(value) === index).map((value) => ({ label: value, value })),
        },
        {
            key: "created_at",
            title: "Tanggal Dibuat",
            options: data.map((product) => formatDate(new Date(product.created_at))).filter((value, index, self) => self.indexOf(value) === index).map((value) => ({ label: value, value })),
        },
    ];

    return (
        <>
            <div className="flex flex-col items-center justify-center md:flex-row md:justify-between gap-2">
                <Heading
                    title={`Product (${data.length})`}
                    description="Semua Product"
                />
                <Link href="/dashboard/products/create" prefetch={['mount']} cacheFor="3m">
                    <Button>
                        <PlusCircleIcon />
                        Buat
                    </Button>
                </Link>
            </div>
            <Separator />
            <DataTable
                model="products"
                data={data}
                columns={columns}
                searchKey="user_name"
                searchLabel="Nama"
                fileName="Product"
                filterKeys={filterKeys}
            />
        </>
    );
};
