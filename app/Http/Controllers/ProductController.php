<?php

namespace App\Http\Controllers;

use App\Http\Requests\DestroyManyProductRequest;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Brand;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        Gate::authorize('viewAny', Product::class);

        $products = Product::orderByDesc('created_at')->get();

        $products->load(['brand', 'category']);

        return Inertia::render('Dashboard/Products/Index', [
            'products' => $products,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        Gate::authorize('create', Product::class);

        $brands = Brand::get();
        $categories = Category::get();

        return Inertia::render('Dashboard/Products/Create', [
            'brands' => $brands,
            'categories' => $categories,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        $validated = $request->validated();

        if (!$validated) {
            return Redirect::back()->with('error', 'Produk gagal dibuat');
        }

        $product = Product::create([
            'name' => $validated['name'],
            'brand_id' => $validated['brand_id'],
            'category_id' => $validated['category_id'],
            'description' => $validated['description'],
            'price' => $validated['price'],
            'ctaLink' => $validated['ctaLink'],
        ]);

        if ($validated['image']) {
            $image_name = 'product_' . $validated['name'] . '.' . $request->image->getClientOriginalExtension();
            $request->image->move(storage_path('/app/public/products/'), $image_name);
            $product->update([
                'image' => 'products/' . $image_name,
            ]);
        }

        return Redirect::route('products.index')->with('success', 'Produk berhasil dibuat');
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        Gate::authorize('update', $product);

        $product->load(['brand', 'category']);

        $brands = Brand::get();
        $categories = Category::get();

        return Inertia::render('Dashboard/Products/Edit', [
            'product' => $product,
            'brands' => $brands,
            'categories' => $categories,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        $validated = $request->validated();

        if (!$validated) {
            return Redirect::back()->with('error', 'Gagal memperbarui produk');
        }

        $product->update([
            'name' => $validated['name'],
            'brand_id' => $validated['brand_id'],
            'category_id' => $validated['category_id'],
            'description' => $validated['description'],
            'price' => $validated['price'],
            'ctaLink' => $validated['ctaLink'],
        ]);

        if ($validated['image']) {
            $image_name = 'product_' . $validated['name'] . '.' . $request->image->getClientOriginalExtension();
            $request->image->move(storage_path('/app/public/products/'), $image_name);

            $product->update([
                'image' => 'products/' . $image_name,
            ]);
        }

        return Redirect::route('products.index')->with('success', 'Produk berhasil diperbarui');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        Gate::authorize('delete', $product);
        try {
            $product->delete();
        } catch (\Exception $e) {
            return response()->json(['message' => 'Product failed to delete:' + $e], 500);
        }

        return response()->json(['message' => 'Product deleted successfully']);
    }

    public function destroyMany(DestroyManyProductRequest $request)
    {
        $validated = $request->validated();

        Product::destroy($validated['ids']);

        return response()->json(['message' => 'Products deleted successfully']);
    }
}
