<?php

use App\Http\Controllers\BrandController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::middleware(['auth:sanctum'])->group(function () {
    Route::delete('/brands/delete-many', [BrandController::class, 'destroyMany'])->name('api.brands.destroyMany');
    Route::delete('/categories/delete-many', [CategoryController::class, 'destroyMany'])->name('api.categories.destroyMany');
    Route::delete('/products/delete-many', [ProductController::class, 'destroyMany'])->name('api.products.destroyMany');

    Route::apiResource('/brands', BrandController::class)->except(['show']);
    Route::apiResource('/categories', CategoryController::class)->except(['show']);
    Route::apiResource('/products', ProductController::class)->except(['show']);
});
