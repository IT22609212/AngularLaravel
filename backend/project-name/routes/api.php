<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;

// Public Routes
Route::post('register', [UserController::class, 'store']); // Resourceful routes for UserController
Route::post('UserLogin', [LoginController::class, 'login']); // Login route


// Authenticated Routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/userProfile', [LoginController::class, 'userProfile']); // Fetch user profile
    Route::get('/logout', [LogoutController::class, 'logout']); // Logout route

    // Product-related routes
    Route::post('addProduct', [ProductController::class, 'store']); // Add product
    Route::get('/getAllproduct', [ProductController::class, 'index']); // List products
    Route::get('viewProduct/{id}', [ProductController::class, 'show']); // View a specific product
    Route::delete('deleteProduct/{id}', [ProductController::class, 'destroy']); // Delete a product

    //user-related
    Route::get('/getUser', [LoginController::class, 'getUser']); // Get user details
    Route::get('/getAll', [UserController::class, 'index']);
    Route::delete('deleteUser/{id}', [UserController::class, 'destroy']);
    Route::get('findUser/{id}', [UserController::class, 'show']);

    ///cart
    Route::post('/addCart', [ProductController::class, 'addToCart']);
    Route::get('getCart', [ProductController::class, 'viewCart']);
    Route::delete('/removeCart/{cartItemId}', [ProductController::class, 'removeFromCart']);
    Route::put('/updateCart/{cartItemId}', [ProductController::class, 'updateCartQuantity']);
});
