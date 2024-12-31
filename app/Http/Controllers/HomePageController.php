<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

class HomePageController extends Controller
{
    public function index()
    {
        // latest 6 products
        $products = Product::latest()->take(6)->get();
        $products->load(['brand', 'category']);
        return Inertia::render(
            'Welcome',
            [
                'products' => $products,
                'canLogin' => Route::has('login'),
                'canRegister' => Route::has('register'),
            ]
        );
    }
}
