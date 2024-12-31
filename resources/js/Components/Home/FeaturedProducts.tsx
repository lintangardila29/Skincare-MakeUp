import { getImageSrc } from "@/Lib/getImageSrc"
import { Product } from "@/types/model"
import { Button } from "../ui/button"
import { formatRupiah } from "@/Lib/utils"

export default function FeaturedProducts({ products }: { products: Product[] }) {
    return (
        <section id="products" className="py-20">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-10 text-center">Featured Products</h2>
                {products.length === 0
                    ? (
                        <p className="text-center text-lg font-light">No products available</p>)
                    : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {products.map((product) => (
                                <div key={product.id} className="relative flex flex-col my-6 bg-zinc-100 dark:bg-zinc-900 shadow-sm border border-background rounded-lg">
                                    <div className="relative p-2.5 h-96 overflow-hidden rounded-xl bg-clip-border">
                                        <img
                                            src={getImageSrc(product.image)}
                                            alt="card-image"
                                            className="h-full w-full object-cover rounded-md"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <div className="mb-2 flex items-center justify-between">
                                            <p className="text-xl font-semibold">
                                                {product.name}
                                            </p>
                                            <p className="text-primary text-xl font-semibold">
                                                {formatRupiah(product.price)}
                                            </p>
                                        </div>
                                        <p className="leading-normal font-light">
                                            {product.description}
                                        </p>
                                        <div className="flex items-center justify-between mt-4 text-xs">
                                            <p className="leading-normal font-light">
                                                {product.brand.name}
                                            </p>
                                            <p className="leading-normal font-light">
                                                {product.category.name}
                                            </p>
                                        </div>
                                        <a href={product.ctaLink ?? "#"} >
                                            <Button className="rounded-md w-full mt-6 bg-primary py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-primary-700 focus:shadow-none active:bg-primary-700 hover:bg-primary-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none uppercase tracking-widest" >
                                                BUY NOW
                                            </Button>
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
            </div>
        </section>
    )
}

