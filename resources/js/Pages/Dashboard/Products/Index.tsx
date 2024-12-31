import BreadCrumb from "@/Components/breadcrumb";
import { ProductsClientTable } from "@/Components/tables/product-table/client";
import { PageProps } from "@/types";
import { Product } from "@/types/model";
import { Head } from "@inertiajs/react";

const breadcrumbItems = [{ title: "Produk", link: "/dashboard/products" }];

const ProductIndex = ({ products }: PageProps & { products: Product[] }) => {
    return (
        <>
            <Head title="Produk" />
            <div className="flex-1 space-y-4 p-4 md:p-6 pt-6">
                <BreadCrumb items={breadcrumbItems} />
                <ProductsClientTable data={products} />
            </div>
        </>
    );
}

export default ProductIndex;
