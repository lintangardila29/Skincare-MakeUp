import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { getImageSrc } from "@/Lib/getImageSrc";
import { Product } from "@/types/model";
import { Link } from "@inertiajs/react";

export function RecentProducts({ data, disabled }: { data: Product[], disabled?: boolean }) {
    return (
        <div>
            {data.map((product) =>
                <Link
                    href={`/dashboard/products/${product.id}`}
                    key={product.id}
                    disabled={disabled}
                    className="cursor px-6 flex items-center hover:bg-accent-foreground/10 py-4 hover:text-primary-500"
                >
                    <Avatar className="h-9 w-9">
                        <AvatarImage src={getImageSrc(product.image)} alt={product.name} />
                        <AvatarFallback>
                            {product.name[0]}
                        </AvatarFallback>
                    </Avatar>
                    <div className="ml-4 w-full flex flex-col items-start justify-normal md:flex-row md:items-center md:justify-between">
                        <div className="space-y-1 mr-2">
                            <p className="text-sm font-medium leading-none">{product.name}</p>
                            <p className="text-sm text-muted-foreground">
                                {product.category?.name}
                            </p>
                        </div>
                        <div className="md:ml-auto font-medium text-ellipsis overflow-hidden text-nowrap">{product.brand?.name}</div>
                    </div>
                </Link>
            )}
        </div>
    );
}
