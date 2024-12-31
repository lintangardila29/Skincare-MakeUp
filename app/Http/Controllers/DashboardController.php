<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\Product;
use App\Models\Category;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function show()
    {
        $latestProducts = Product::with([
            'brand',
            'category',
        ])->latest('created_at')->limit(5)->get();

        // Get categories, count the total number of products in each category name this year, group by month
        $productsOverview = DB::table('products')
            ->selectRaw('
                MONTH(created_at) as month,
                COUNT(*) as total
            ')
            ->whereYear('created_at', date('Y'))
            ->groupBy('month')
            ->orderBy('month')
            ->get()
            ->map(function ($item) {
                return [
                    'month' => date('F', mktime(0, 0, 0, $item->month, 1)),
                    'total' => (int)$item->total,
                ];
            });

        $productCount = Product::count();
        $categoryCount = Category::count();
        $brandCount = Brand::count();
        $userCount = User::count();

        return Inertia::render('Dashboard/Page', [
            'latestProducts' => $latestProducts,
            'productsOverview' => $productsOverview,
            'productCount' => $productCount,
            'brandCount' => $brandCount,
            'categoryCount' => $categoryCount,
            'userCount' => $userCount,
        ]);
    }
}
