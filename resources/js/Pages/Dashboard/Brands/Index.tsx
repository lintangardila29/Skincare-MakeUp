import BreadCrumb from "@/Components/breadcrumb";
import { BrandsClientTable } from "@/Components/tables/brand-table/client";
import { PageProps } from "@/types";
import { Brand } from "@/types/model";
import { Head } from "@inertiajs/react";

const breadcrumbItems = [{ title: "Kategori", link: "/dashboard/brands" }];

const BrandIndex = ({ brands }: PageProps & { brands: Brand[] }) => {
    return (
        <>
            <Head title="Kategori" />
            <div className="flex-1 space-y-4 p-4 md:p-6 pt-6">
                <BreadCrumb items={breadcrumbItems} />
                <BrandsClientTable data={brands} />
            </div>
        </>
    );
}

export default BrandIndex;
