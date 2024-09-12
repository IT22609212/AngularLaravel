<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Register;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if(!Auth::attempt($credentials)) {
             return response()->json(['message' => 'Unauthorized'], 401);
         }
        $user = Auth::user();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json(['access_token' => $token, 'token_type' => 'Bearer','userId' => $user->id]);
    }

    public function getUser(){
        $user = auth()->user();
    
        return response()->json(['user' => $user]);
    }

    public function userProfile(Request $request){
        return response()->json([
            'user' => Auth::user()
        ]);
    }
}
