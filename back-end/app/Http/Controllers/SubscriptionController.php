<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Models\Pending;
use App\Models\PreferredCategory;
use App\Models\Pricing;
use App\Models\Subscription;
use App\Models\Week;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SubscriptionController extends Controller
{
    /**
     * Display pricings for plans.
     *
     * @return \Illuminate\Http\Response
     */
    public function pricings()
    {
        return response()->json([
            'status' => 200,
            'pricings' => Pricing::all()
        ]);
    }

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
     * Subscribe a user with payment and all related info and add weeks.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $current_date = Carbon::today();
        // insert subscription
        $subscription = Subscription::create([
            'user_id' => Auth::user()->id,
            'people_num' => $request->people_num,
            'meals_per_week' => $request->meals_per_week,
            'price' => $request->price,
            'ending_date' => $current_date->addWeeks(4),
            // 'ending_date' => $request->ending_date,
        ]);
        // insert payment
        $card_info = json_encode($request->card);
        $payment = Payment::create([
            'user_id' => Auth::user()->id,
            'subscription_id' => $subscription->id,
            'card_num' => $card_info,
            'amount' => $request->price
        ]);
        // update user is_sub and is_auto_renewed
        $user = Auth::user();
        $user->is_sub = 1;
        $user->is_auto_renewed = 1;
        $user->save();

        // insert preferred categories
        if ($request->categories) {
            for ($i = 0; $i < count($request->categories); $i++) {
                $preferred_categs = PreferredCategory::create([
                    'user_id' => Auth::user()->id,
                    'category_id' => $request->categories[$i]
                ]);
            }
        }

        // create 4 weeks
        $today = Carbon::today();
        $last_week = Carbon::today()->subWeek();
        for ($i = 1; $i <= 4; $i++) {
            $weeks = Week::create([
                'subscription_id' => $subscription->id,
                'week_num' => $i,
                'day_of_delivery' => $request->day_of_delivery,
                'starting_date' =>  $last_week->addWeek(),
                'ending_date' => $today->addWeek(),
            ]);
        }
        // delete pending
        Pending::where('user_id', Auth::user()->id)->delete();

        return response()->json([
            'status' => 200,
            'user' => $user,
            'subscription' => $subscription,
            'payment' => $payment,
            'weeks' => $weeks,
        ]);
    }

    // Cancel subscription
    public function cancelAutoSubscription()
    {
        $user = Auth::user();
        $user->is_auto_renewed = 0;
        $user->save();
    }
    // Activate subscription
    public function activateAutoSubscription()
    {
        $user = Auth::user();
        $user->is_auto_renewed = 1;
        $user->save();
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
