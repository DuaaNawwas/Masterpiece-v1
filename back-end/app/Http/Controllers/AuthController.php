<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;

class AuthController extends Controller
{
    // Register a new user by form
    public function register(Request $request)
    {

        $validator = Validator::make(
            $request->all(),
            [
                'email' => ['required', 'string', 'max:255', 'unique:users', 'email'],
                'password' => ['required', 'confirmed', Password::defaults(), 'regex:/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/']
            ],
            [
                'password.regex' => 'The password should have minimum eight characters,
    at least one letter, one number and one special character'
            ]
        );

        if ($validator->fails()) {
            return response()->json([
                'status' => 'failure',
                'errors' => $validator->messages(),
            ]);
        }

        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);

        return response()->json([
            'status' => 'success',
            'user' => $user,
            'token' => $user->createToken('API Token of ' . $user->email)->plainTextToken
        ]);
    }

    // Login by form
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => ['required', 'string', 'email'],
            'password' => ['required', 'string', 'min:8']
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->messages(),
            ]);
        }
        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {

            return response()->json([
                'status' => 'failure',
                'errors' => ['email' => 'Credentials do not match!'],
            ]);
        }

        return response()->json([
            'status' => 'success',
            'user' => $user,
            'token' => $user->createToken('API token of ' . $user->email)->plainTextToken
        ]);
    }


    // Login with google
    public function googleLogin(Request $request)
    {
        $finduser = User::where('google_id', $request->google_id)->first();

        if ($finduser) {
            return response()->json([
                'user' => $finduser,
                'token' => $finduser->createToken('API token of ' . $finduser->email)->plainTextToken
            ]);
        } else {
            $user = User::create([
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'image' => $request->image,
                'email' => $request->email,
                'google_id' => $request->google_id
            ]);
            return response()->json([
                'user' => $user,
                'token' => $user->createToken('API Token of ' . $user->email)->plainTextToken
            ]);
        }
    }

    // Login with facebook
    public function facebookLogin(Request $request)
    {
        $finduser = User::where('facebook_id', $request->facebook_id)->first();

        if ($finduser) {
            return response()->json([
                'user' => $finduser,
                'token' => $finduser->createToken('API token of ' . $finduser->email)->plainTextToken
            ]);
        } else {
            $user = User::create([
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'image' => $request->image,
                'email' => $request->email,
                'facebook_id' => $request->facebook_id
            ]);
            return response()->json([
                'user' => $user,
                'token' => $user->createToken('API Token of ' . $user->email)->plainTextToken
            ]);
        }
    }

    // Logout user
    public function logout()
    {

        Auth::user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'you logged out successfully.'
        ]);
    }

    // Get logged in user info
    public function user()
    {
        return response()->json([
            'user' => Auth::user(),
        ]);
    }
}
