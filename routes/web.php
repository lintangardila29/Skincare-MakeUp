<?php

use App\Http\Controllers\BrandController;
use App\Http\Controllers\HomePageController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\MarkAsReadController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomePageController::class, 'index']);

Route::get('/dashboard', [DashboardController::class, 'show'])
    ->name('dashboard')
    ->middleware(['auth', 'verified']);

Route::group(['middleware' => ['auth', 'verified']], function () {
    Route::delete('/dashboard/brands/delete-many', [BrandController::class, 'destroyMany'])->name('brands.destroyMany');
    Route::delete('/dashboard/categories/delete-many', [CategoryController::class, 'destroyMany'])->name('categories.destroyMany');
    Route::delete('/dashboard/products/delete-many', [ProductController::class, 'destroyMany'])->name('products.destroyMany');
    Route::delete('/dashboard/users/delete-many', [UserController::class, 'destroyMany'])->name('users.destroyMany');

    Route::resource('/dashboard/brands', controller: BrandController::class)->except(['show', 'create', 'edit']);
    Route::resource('/dashboard/categories', controller: CategoryController::class)->except(['show', 'create', 'edit']);
    Route::resource('/dashboard/products', controller: ProductController::class)->except(['show']);
    Route::resource('/dashboard/users', controller: UserController::class)->except(['show']);
});

Route::middleware('auth')->group(callback: function () {
    Route::post('/profile/avatar', [ProfileController::class, 'updateAvatar'])->name('profile.updateAvatar');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('/mark-all-as-read', MarkAsReadController::class)->name('markAsRead');
});

require __DIR__ . '/auth.php';
