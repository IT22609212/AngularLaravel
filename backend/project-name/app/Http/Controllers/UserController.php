<?php

namespace App\Http\Controllers;

use App\Models\Register;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::all();
        return response()->json($users);
    }

    /**
     * Show the form for creating a new resource.
     */
    
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $input=$request->all();
        User::create($input);
        return response()->json(null,200); //200 means success
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = User::find($id);
        if(is_null($user)){
             return response()->json(['message'=>'post not found'],404);
            }
       return response()->json($user);
    }

    /**
     * Show the form for editing the specified resource.
     */
    // public function edit(string $id)
    // {
    //     //
    // }

    /**
     * Update the specified resource in storage.
     */
    // public function update(Request $request, string $id)
    // {
    //     //
    // }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
{
    try {
       $user = User::findOrFail($id);
        $user-> delete();
    } catch (\Exception $e) {
        // Log the error for debugging purposes
        \Log::error('Error deleting register: ' . $e->getMessage());
        return response()->json(['message' => 'Failed to delete', 'error' => $e->getMessage()], 500);
    }
}
public function getUser(){
    $user = auth()->user();

    return response()->json(['user' => $user]);
}

    
}
