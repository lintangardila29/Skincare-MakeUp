import BreadCrumb from "@/Components/breadcrumb";
import { CategoriesClientTable } from "@/Components/tables/category-table/client";
import { PageProps } from "@/types";
import { Category } from "@/types/model";
import { Head } from "@inertiajs/react";

const breadcrumbItems = [{ title: "Kategori", link: "/dashboard/categories" }];

const CategoryIndex = ({ categories }: PageProps & { categories: Category[] }) => {
    return (
        <>
            <Head title="Kategori" />
            <div className="flex-1 space-y-4 p-4 md:p-6 pt-6">
                <BreadCrumb items={breadcrumbItems} />
                <CategoriesClientTable data={categories} />
            </div>
        </>
    );
}

export default CategoryIndex;
