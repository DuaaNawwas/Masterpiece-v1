<?php

namespace App\Http\Controllers;

use App\Models\RemovedIngredient;
use App\Models\Week;
use App\Models\Subscription;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class WeekController extends Controller
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
        // request -> meal id, week num, removed ingredients ids

        // Get active subscription
        $activeSub = Subscription::where('user_id', Auth::user()->id)->where('status', 1)->first();

        // Get meals per week for active subscription
        $meals_per_week = $activeSub->meals_per_week;

        // Get week for active subscription
        $week = Week::where('subscription_id', $activeSub->id)->where('week_num', $request->week_num)->first();
        // Insert subscription id , meal id (to a null meal_id) === allow inserts only to columns number <= meals per week
        if ($week->meal1_id === null) {
            $week->meal1_id = $request->meal_id;
            $week->save();
            // return;
        } else if ($week->meal2_id === null) {
            $week->meal2_id = $request->meal_id;
            $week->save();
            // return;
        } else if ($week->meal3_id === null && $meals_per_week >= 3) {
            $week->meal3_id = $request->meal_id;
            $week->save();
            // return;
        } else if ($week->meal4_id === null && $meals_per_week >= 4) {
            $week->meal4_id = $request->meal_id;
            $week->save();
            // return;
        } else if ($week->meal5_id === null && $meals_per_week >= 5) {
            $week->meal5_id = $request->meal_id;
            $week->save();
            // return;
        } else if ($week->meal6_id === null && $meals_per_week == 6) {
            $week->meal6_id = $request->meal_id;
            $week->save();
            // return;
        } else {
            return response()->json([
                'status' => 500,
                'error' => "You can't add more meals than your subscription's meals per week"
            ]);
        }
        // Insert meal id, week id, and removed ingredients to removed ingredients table
        $removed = new RemovedIngredient();
        $removed->week_id = $week->id;
        $removed->meal_id = $request->meal_id;

        // remove explode when sending an array from actual request 
        $removedIngredients =  $request->removed_ingredients;
        if (count($removedIngredients) > 0) {
            if ($removed->remove_1 === null && isset($removedIngredients[0])) {
                $removed->remove_1 = $removedIngredients[0];
            }
            if ($removed->remove_2 === null && isset($removedIngredients[1])) {
                $removed->remove_2 = $removedIngredients[1];
            }
            if ($removed->remove_3 === null && isset($removedIngredients[2])) {
                $removed->remove_3 = $removedIngredients[2];
            }
            if ($removed->remove_4 === null && isset($removedIngredients[3])) {
                $removed->remove_4 = $removedIngredients[3];
            }
            if ($removed->remove_5 === null && isset($removedIngredients[4])) {
                $removed->remove_5 = $removedIngredients[4];
            }
            if ($removed->remove_6 === null && isset($removedIngredients[5])) {
                $removed->remove_6 = $removedIngredients[5];
            }
            if ($removed->remove_7 === null && isset($removedIngredients[6])) {
                $removed->remove_7 = $removedIngredients[6];
            }
            if ($removed->remove_8 === null && isset($removedIngredients[7])) {
                $removed->remove_8 = $removedIngredients[7];
            }
            if ($removed->remove_9 === null && isset($removedIngredients[8])) {
                $removed->remove_9 = $removedIngredients[8];
            }
            if ($removed->remove_10 === null && isset($removedIngredients[9])) {
                $removed->remove_10 = $removedIngredients[9];
            }

            $removed->save();
        }


        $week->removedingredients;

        return response()->json([
            'status' => 200,
            'week' => $week,
        ]);
    }

    // Delete a meal from week
    public function deleteMeal(Request $request)
    {
        $week = Week::find($request->week_id);

        if ($week->meal1_id === $request->meal_id) {
            $week->meal1_id = null;
            $week->save();
            // return;
        } else if ($week->meal2_id === $request->meal_id) {
            $week->meal2_id = null;
            $week->save();
            // return;
        } else if ($week->meal3_id === $request->meal_id) {
            $week->meal3_id = null;
            $week->save();
            // return;
        } else if ($week->meal4_id === $request->meal_id) {
            $week->meal4_id = null;
            $week->save();
            // return;
        } else if ($week->meal5_id === $request->meal_id) {
            $week->meal5_id = null;
            $week->save();
            // return;
        } else if ($week->meal6_id === $request->meal_id) {
            $week->meal6_id = null;
            $week->save();
            // return;
        }

        $removedIngredients = RemovedIngredient::where('meal_id', $request->meal_id)->where('week_id', $request->week_id)->first();
        if ($removedIngredients) {

            $removedIngredients->delete();
        }

        $week->meal1;
        $week->meal2;
        $week->meal3;
        $week->meal4;
        $week->meal5;
        $week->meal6;

        return response()->json([
            'status' => 200,
            'week' => $week
        ]);
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
