<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [

                'email' => 'required|email',
                'message' => 'required',

            ]
        );

        if ($validator->fails()) {
            return response()->json([
                'status' => 'failure',
                'errors' => $validator->messages(),
            ]);
        }

        $message = Contact::create([
            'email' => $request->email,
            'message' => $request->message,
        ]);

        return response()->json([
            'status' => 200,
            'message' => $message,
        ]);
    }
}
