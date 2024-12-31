import BreadCrumb from "@/Components/breadcrumb";
import ProductForm from "@/Components/forms/product-form";
import { PageProps } from "@/types";
import { Brand, Category } from "@/types/model";
import { Head } from "@inertiajs/react";

interface ProductProps extends PageProps {
    brands: Brand[];
    categories: Category[];
}

const ProductCreate = ({ brands, categories }: ProductProps) => {
    const breadcrumbItems = [
        { title: "Product", link: "/dashboard/products" },
        { title: "Buat", link: "/dashboard/products/create" },
    ];
    return (
        <>
            <Head title="Buat Product" />
            {/* <ScrollArea className="h-full"> */}
            <div className="flex-1 space-y-4 p-6">
                <BreadCrumb items={breadcrumbItems} />
                <ProductForm
                    brands={brands}
                    categories={categories}
                    defaultValues={null}
                />
            </div>
            {/* </ScrollArea> */}
        </>
    );
}

export default ProductCreate;
