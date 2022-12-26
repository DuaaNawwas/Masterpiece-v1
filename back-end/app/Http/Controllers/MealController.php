<?php

namespace App\Http\Controllers;

use App\Models\Meal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MealController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Display recommended meals for a user.
     *
     * @return \Illuminate\Http\Response
     */
    public function recommendedMeals()
    {

        $categs = Auth::user()->preferredcategories;
        $meals = [];
        $recMeals = [];
        foreach ($categs as $categ) {
            array_push($meals,  Meal::where('category_id', $categ->category_id)->get());
        }
        foreach ($meals as $meal) {
            foreach ($meal as $item) {
                array_push($recMeals, $item);
            }
        }
        return response()->json([
            'status' => 200,
            'meals' => $recMeals
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Meal $meal)
    {
        $meal->ingredients;
        $meal->nutrients;
        return response()->json(
            [
                'status' => 200,
                'meal' => $meal
            ]
        );
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
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
    public function update(Request $request, $id)
    {
        //
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
