<?php

namespace App\Http\Controllers;

use App\Models\Pending;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PendingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $pending = Pending::where('user_id', Auth::user()->id)->first();

        if ($pending) {

            return response()->json([
                'status' => 200,
                'pending' => $pending
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No pending data'
            ]);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $existingPending = Pending::where('user_id', Auth::user()->id)->first();
        if ($existingPending) {

            $existingPending->update($request->all());
            return response()->json([
                'status' => 200,
                'pending' => $existingPending
            ]);
        } else {

            $pending = Pending::create([
                'user_id' => Auth::user()->id,
                'people_num' => $request->people_num,
                'meals_per_week' => $request->meals_per_week,
                'categories' => $request->categories,
                'day_of_delivery' => $request->day_of_delivery,
            ]);
            return response()->json([
                'status' => 200,
                'pending' => $pending
            ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Pending $pending)
    {


        return response()->json([
            'status' => 200,
            'pending' => $pending
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
