<?php

namespace App\Http\Controllers;

use App\Http\Requests\DestroyManyCategoryRequest;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        Gate::authorize('viewAny', Category::class);

        $categories = Category::orderByDesc('created_at')->get();

        $categories->map(function ($category) {
            $category->product_count = Product::where('category_id', $category->id)->count();
            return $category;
        });

        return Inertia::render('Dashboard/Categories/Index', [
            'categories' => $categories,
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
    public function store(StoreCategoryRequest $request)
    {
        $validated = $request->validated();

        if (!$validated) {
            return response()->json(['message' => 'Failed to create category'], 500);
        }

        Category::create([
            'name' => $validated['name'],
            'description' => $validated['description'] ?? "",
        ]);

        return response()->json(['message' => 'Category created successfully']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoryRequest $request, Category $category)
    {
        Gate::authorize('update', $category);

        $validated = $request->validated();

        if (!$validated) {
            return response()->json(['message' => 'Failed to update category'], 500);
        }

        $category->update([
            'name' => $validated['name'],
            'description' => $validated['description'] ?? "",
        ]);

        return response()->json(['message' => 'Category created successfully']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        Gate::authorize('delete', $category);
        try {
            $category->delete();
        } catch (\Exception $e) {
            return response()->json(['message' => 'Category failed to delete:' + $e], 500);
        }

        return response()->json(['message' => 'Category deleted successfully']);
    }

    public function destroyMany(DestroyManyCategoryRequest $request)
    {
        if (!auth()->user()->isSuperAdmin()) {
            return response()->json(['message' => 'You are not authorized to delete categories'], 403);
        }
        $validated = $request->validated();

        Category::destroy($validated['ids']);

        return response()->json(['message' => 'Categories deleted successfully']);
    }
}
