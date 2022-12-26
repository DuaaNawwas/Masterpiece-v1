<?php

namespace App\Http\Controllers;

use App\Models\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ApplicationController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [

                'email' => 'required|email',
                'message' => 'required',
                'name' => 'required',
                'email' => 'required',
                'company' => 'required',
                'service' => 'required',
                'phone' => 'required',
                'location' => 'required',

            ]
        );

        if ($validator->fails()) {
            return response()->json([
                'status' => 'failure',
                'errors' => $validator->messages(),
            ]);
        }


        $application = Application::create([
            'name' => $request->name,
            'email' => $request->email,
            'company' => $request->company,
            'service' => $request->service,
            'phone' => $request->phone,
            'location' => $request->location,
            'message' => $request->message,

        ]);

        return response()->json([
            'status' => 200,
            'application' => $application,
        ]);
    }
}
