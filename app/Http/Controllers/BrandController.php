<?php

namespace App\Http\Controllers;

use App\Http\Requests\DestroyManyBrandRequest;
use App\Http\Requests\StoreBrandRequest;
use App\Http\Requests\UpdateBrandRequest;
use App\Models\Brand;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class BrandController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        Gate::authorize('viewAny', Brand::class);

        $brands = Brand::orderByDesc('created_at')->get();

        $brands->map(function ($brand) {
            $brand->product_count = Product::where('brand_id', $brand->id)->count();
            return $brand;
        });

        return Inertia::render('Dashboard/Brands/Index', [
            'brands' => $brands,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBrandRequest $request)
    {
        $validated = $request->validated();

        if (!$validated) {
            return Redirect::back()->with('error', 'Brand gagal dibuat');
        }

        $brand = Brand::create([
            'name' => $validated['name'],
            'website' => $validated['website'] ?? "",
            'description' => $validated['description'] ?? "",
        ]);

        if ($validated['logo']) {
            $logo_name = 'logo_' . $request->user()->id . '.' . $request->logo->getClientOriginalExtension();
            $request->logo->move(storage_path('/app/public/logos/'), $logo_name);
            $brand->update(['logo' => 'logos/' . $logo_name]);
        }

        return Redirect::route('brands.index')->with('success', 'Brand berhasil dibuat');
    }

    /**
     * Display the specified resource.
     */
    public function show(Brand $brand)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Brand $brand)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBrandRequest $request, Brand $brand)
    {
        Gate::authorize('update', $brand);
        $validated = $request->validated();

        if (!$validated) {
            return Redirect::back()->with('error', 'Brand gagal diupdate');
        }

        $brand->update([
            'name' => $validated['name'],
            'website' => $validated['website'] ?? "",
            'description' => $validated['description'] ?? "",
        ]);

        if ($validated['logo']) {
            $logo_name = 'logo_' . $request->user()->id . '.' . $request->logo->getClientOriginalExtension();
            $request->logo->move(storage_path('/app/public/logos/'), $logo_name);
            $brand->update(['logo' => 'logos/' . $logo_name]);
        }

        return Redirect::route('brands.index')->with('success', 'Brand berhasil diupdate');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Brand $brand)
    {
        Gate::authorize('delete', $brand);
        try {
            $brand->delete();
        } catch (\Exception $e) {
            return response()->json(['message' => 'Brand failed to delete:' + $e], 500);
        }

        return response()->json(['message' => 'Brand deleted successfully']);
    }

    public function destroyMany(DestroyManyBrandRequest $request)
    {
        $validated = $request->validated();

        Brand::destroy($validated['ids']);

        return response()->json(['message' => 'Brands deleted successfully']);
    }
}
