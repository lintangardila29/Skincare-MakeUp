import { Overview } from "@/Components/overview";
import { RecentProducts } from "@/Components/recent";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
// import { ScrollArea } from "@/Components/ui/scroll-area";
import { Head, usePage } from "@inertiajs/react";
import Clock from "@/Components/clock";
import { ContactIcon, LayersIcon, SchoolIcon, SeparatorVerticalIcon, ShoppingBagIcon, TagIcon, UsersIcon } from "lucide-react";
import { PageProps } from "@/types";
import { Product, User } from "@/types/model";

interface DashboardPageProps extends PageProps {
    latestProducts: Product[];
    productsOverview: {
        [key: string]: number | string;
    }[];
    productCount: number;
    brandCount: number;
    categoryCount: number;
    userCount: number;
}

const DashboardPage = ({
    productCount,
    latestProducts,
    productsOverview,
    brandCount,
    categoryCount,
    userCount,
}: DashboardPageProps) => {
    const { user } = usePage().props.auth
    return (
        <>
            <Head title="Dashboard" />
            {/* <ScrollArea className="h-full"> */}
            <div className="flex-1 space-y-4 p-4 md:p-6 pt-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-2">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center flex-col justify-center text-center md:text-start md:flex-row md:justify-normal text-3xl font-bold tracking-tight">
                            Hi, {user.name} 👋
                        </div>
                        <Clock />
                    </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Product
                            </CardTitle>
                            <ShoppingBagIcon className="h-8 w-8 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{productCount}</div>
                            <p className="text-xs text-muted-foreground">
                                {/* +180.1% from last month */}
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Kategori
                            </CardTitle>
                            <TagIcon className="h-8 w-8 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{categoryCount}</div>
                            <p className="text-xs text-muted-foreground">
                                {/* +201 since last hour */}
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Brand</CardTitle>
                            <LayersIcon className="h-8 w-8 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{brandCount}</div>
                            <p className="text-xs text-muted-foreground">
                                {/* +19% from last month */}
                            </p>
                        </CardContent>
                    </Card>
                    {user.role.name === "Super Admin" &&
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    User
                                </CardTitle>
                                <UsersIcon className="h-8 w-8 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between text-2xl font-bold">
                                    <span className="mr-4">{userCount}</span>
                                </div>
                            </CardContent>
                        </Card>
                    }
                </div>
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
                    <div className="col-span-4">
                        <Overview data={productsOverview} />
                    </div>
                    <Card className="col-span-4 md:col-span-3">
                        <CardHeader>
                            <CardTitle>Produk Terbaru</CardTitle>
                            <CardDescription>
                                Beberapa produk terbaru
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                            <RecentProducts data={latestProducts} />
                        </CardContent>
                    </Card>
                </div>
            </div>
            {/* </ScrollArea> */}
        </>
    );
}

export default DashboardPage;
