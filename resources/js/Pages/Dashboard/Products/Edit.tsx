import BreadCrumb from "@/Components/breadcrumb";
// import { ScrollArea } from "@/Components/ui/scroll-area";
import { Product, Category, Brand } from "@/types/model";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import ProductForm from "@/Components/forms/product-form";

const ProductEdit = ({ product, brands, categories }: PageProps & { product: Product, brands: Brand[], categories: Category[] }) => {
    const breadcrumbItems = [
        { title: "Product", link: "/dashboard/products" },
        { title: `${product.name}`, link: `/dashboard/products/${product.id}` },
        { title: `Edit`, link: `/dashboard/products/${product.id}/edit` },
    ];
    return (
        <>
        <Head title="Edit Product" />
            {/* <ScrollArea className="h-full"> */}
            <div className="flex-1 space-y-4 p-6">
                <BreadCrumb items={breadcrumbItems} />
                <ProductForm
                    brands={brands}
                    categories={categories}
                    defaultValues={product}
                />
            </div>
            {/* </ScrollArea> */}
        </>
    );
}

export default ProductEdit;
