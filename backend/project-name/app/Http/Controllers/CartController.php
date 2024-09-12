<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function addToCart(Request $request)
{
    $validatedData = $request->validate([
        'product_id' => 'required|exists:products,id',
        'quantity' => 'required|integer|min:1',
    ]);

    // Assuming the user is logged in and available via auth()->id()
    $cartItem = Cart::where('user_id', auth()->id())
                    ->where('product_id', $validatedData['product_id'])
                    ->first();

    if ($cartItem) {
        // If the product is already in the cart, update the quantity
        $cartItem->quantity += $validatedData['quantity'];
        $cartItem->save();
    } else {
        // Otherwise, add a new cart item
        Cart::create([
            'user_id' => auth()->id(),
            'product_id' => $validatedData['product_id'],
            'quantity' => $validatedData['quantity'],
        ]);
    }

    return response()->json(['message' => 'Product added to cart successfully']);
}

public function viewCart()
{
    $cartItems = Cart::with('product')
                     ->where('user_id', auth()->id())
                     ->get();

    return response()->json($cartItems);
}

public function removeFromCart($cartItemId)
{
    $cartItem = Cart::findOrFail($cartItemId);

    if ($cartItem->user_id !== auth()->id()) {
        return response()->json(['message' => 'Unauthorized'], 403);
    }

    $cartItem->delete();

    return response()->json(['message' => 'Product removed from cart successfully']);
}

public function updateCartQuantity(Request $request, $cartItemId)
{
    $validatedData = $request->validate([
        'quantity' => 'required|integer|min:1',
    ]);

    $cartItem = Cart::findOrFail($cartItemId);

    if ($cartItem->user_id !== auth()->id()) {
        return response()->json(['message' => 'Unauthorized'], 403);
    }

    $cartItem->quantity = $validatedData['quantity'];
    $cartItem->save();

    return response()->json(['message' => 'Cart updated successfully']);
}
}
