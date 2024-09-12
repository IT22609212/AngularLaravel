<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Facades\Validator;
use Psy\Readline\Hoa\Console;

class ProductController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'product_name' => 'required',
            'quantity' => 'required|integer',
            'price' => 'required|numeric',
            'product_desc' => 'nullable',
            'image_url' => 'nullable|file|image|max:2048', // Image validation
        ]);
    
        // Handle image upload
        if ($request->hasFile('image_url')) {
            $path = $request->file('image_url')->store('public/products'); // Store the file in 'storage/app/public/products'
            $validatedData['image_url'] = basename($path); // Save the filename in the database
        }
    
        // Save product data to the database
        Product::create($validatedData);
       
        return response()->json(['message' => 'Product added successfully',$path]);
    }
    
    

    public function index()
{
    $products = Product::all();

    // Add the full URL to the image
    $products->transform(function($product) {
        if ($product->image_url) {
            $product->image_url = asset('storage/products/' . $product->image_url);
        }
        return $product;
    });

    return response()->json($products, 200);
}



    public function show(string $id)
    {
        $products = Product::find($id);
        if(is_null($products)){
             return response()->json(['message'=>'post not found'],404);
            }
       return response()->json($products);
    }

    public function destroy($id)
    {
        try {
           $products = Product::findOrFail($id);
            $products-> delete();
        } catch (\Exception $e) {
            // Log the error for debugging purposes
            \Log::error('Error deleting register: ' . $e->getMessage());
            return response()->json(['message' => 'Failed to delete', 'error' => $e->getMessage()], 500);
        }
    }

}
