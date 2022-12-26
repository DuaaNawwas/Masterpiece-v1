<?php

namespace App\Http\Controllers;

use App\Models\Application;
use App\Models\Meal;
use App\Models\Category;
use App\Models\Contact;
use App\Models\Nutrient;
use App\Models\Ingredient;
use App\Models\Payment;
use App\Models\Subscription;
use App\Models\User;
use App\Models\Week;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use Illuminate\Validation\Rules\File;
use Illuminate\Support\Facades\Validator;

class AdminController extends Controller
{
    public function addCategory(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [

                'name' => 'required',
                'image' =>  ['required', File::image()->max(20 * 1024)]

            ]
        );

        if ($validator->fails()) {
            return response()->json([
                'status' => 'failure',
                'errors' => $validator->messages(),
            ]);
        }

        $file = $request->file('image');
        $filename = uniqid() . "_" . $file->getClientOriginalName();
        $file->move(public_path('public/images'), $filename);
        $url = URL::to('/') . '/public/images/' . $filename;

        $category = Category::create([
            'name' => $request->name,
            'image' => $url,
        ]);

        $categories = Category::with('meals')->get();

        return response()->json([
            'status' => 200,
            'categories' => $categories

        ]);
    }

    public function deleteCategory($id)
    {
        $category =  Category::find($id);
        Meal::whereBelongsTo($category)->delete();
        $category->delete();
        $categories = Category::with('meals')->get();

        return response()->json([
            'status' => 200,
            'categories' => $categories

        ]);
    }

    public function editCategory(Request $request)
    {
        $category = Category::find($request->id);

        if ($request->file('image')) {

            $file = $request->file('image');
            $filename = uniqid() . "_" . $file->getClientOriginalName();
            $file->move(public_path('public/images'), $filename);
            $url = URL::to('/') . '/public/images/' . $filename;
            $category->image = $url;
        }

        if ($request->name) {

            $category->name = $request->name;
        }

        $category->save();

        $categories = Category::with('meals')->get();

        return response()->json([
            'status' => 200,
            'categories' => $categories

        ]);
    }

    public function getMeals()
    {
        $meals = Meal::with(['ingredients', 'nutrients'])->get();


        return response()->json([
            'status' => 200,
            'meals' => $meals

        ]);
    }

    public function addMeal(Request $request)
    {

        // $ingredients = json_decode($request->ingredients);

        // return response()->json([
        //     'status' => 'failure',
        //     'request' => $ingredients,
        // ]);
        $validator = Validator::make(
            $request->all(),
            [

                'name' => 'required',
                'category_id' => 'required',
                'short_desc' => 'required',
                'long_desc' => 'required',
                'prep_time' => 'required',
                'image' =>  ['required', File::image()->max(20 * 1024)],
                'calories' => 'required',
                'fat' => 'required',
                'saturated_fat' => 'required',
                'carbs' => 'required',
                'sugar' => 'required',
                'fiber' => 'required',
                'protein' => 'required',
                'cholesterol' => 'required',
                'sodium' => 'required',


            ]
        );



        if ($validator->fails()) {
            return response()->json([
                'status' => 'failure',
                'errors' => $validator->messages(),
            ]);
        }

        if ($request->file('image')) {

            $file = $request->file('image');
            $filename = uniqid() . "_" . $file->getClientOriginalName();
            $file->move(public_path('public/images'), $filename);
            $url = URL::to('/') . '/public/images/' . $filename;
        }




        $meal = Meal::create([
            'name' => $request->name,
            'category_id' => $request->category_id,
            'short_desc' => $request->short_desc,
            'long_desc' => $request->long_desc,
            'cost' => $request->cost,
            'note' => $request->note,
            'tags' => $request->tags,
            'prep_time' => $request->prep_time,
            'image' => $url
        ]);

        // for loop
        $ingredientsArr = json_decode($request->ingredients);
        for ($i = 0; $i < count($ingredientsArr); $i++) {
            Ingredient::create([
                'meal_id' => $meal->id,
                'name' => $ingredientsArr[$i]->ingredient,
                'is_optional' => $ingredientsArr[$i]->optional,
            ]);
        }

        $nutrients = Nutrient::create([
            'meal_id' => $meal->id,
            'calories' => $request->calories,
            'fat' => $request->fat,
            'saturated_fat' => $request->saturated_fat,
            'carbs' => $request->carbs,
            'sugar' => $request->sugar,
            'fiber' => $request->fiber,
            'protein' => $request->protein,
            'cholesterol' => $request->cholesterol,
            'sodium' => $request->sodium,
        ]);


        return $this->getMeals();
    }

    public function deleteMeal($id)
    {
        $meal = Meal::find($id);
        Ingredient::whereBelongsTo($meal)->delete();
        Nutrient::whereBelongsTo($meal)->delete();
        $meal->delete();
        return $this->getMeals();
    }

    public function editMeal(Request $request)
    {
        $meal = Meal::find($request->id)->update([$request->key => $request->value]);


        return $this->getMeals();
    }
    public function editMealImage(Request $request)
    {
        $meal = Meal::find($request->id);
        $validator = Validator::make($request->all(), ['image' => ['required', File::image()->max(20 * 1024)]]);

        if ($validator->fails()) return response()->json($validator->messages());



        $file = $request->file('image');
        $filename = uniqid() . "_" . $file->getClientOriginalName();
        $file->move(public_path('public/images'), $filename);
        $url = URL::to('/') . '/public/images/' . $filename;
        $meal['image'] = $url;

        $meal->save();

        return $this->getMeals();
    }
    public function editIngredients(Request $request)
    {
        $ingredient = Ingredient::find($request->id)->update([$request->key => $request->value]);


        return $this->getMeals();
    }
    public function editNutrients(Request $request)
    {
        $nutrient = Nutrient::find($request->id)->update([$request->key => $request->value]);


        return $this->getMeals();
    }

    public function allOrders()
    {


        $subscriptions = Subscription::where('status', 1)->with(['user', 'payment', 'weeks' => function ($query) {
            $query->with(['meal1', 'meal2', 'meal3', 'meal4', 'meal5', 'meal6']);
        }])->get();

        $subscriptions->each(function ($subscription) {
            $subscription->weeks->each(function ($week) {
                $meals = ['meal1', 'meal2', 'meal3', 'meal4', 'meal5', 'meal6'];
                foreach ($meals as $meal) {
                    $week->load([$meal . '.removedingredients' => function ($q) use ($week) {
                        $q->where('week_id', $week->id);
                    }]);
                }
            });
        });



        return response()->json([
            'status' => 200,
            'subscriptions' => $subscriptions
        ]);
    }

    public function orderWeek($id)
    {
        $week = Week::where('id', $id)->with(['subscription.user'])->first();

        if ($week) {
            $meals = ['meal1', 'meal2', 'meal3', 'meal4', 'meal5', 'meal6'];
            foreach ($meals as $meal) {
                $week->load([$meal . '.removedingredients' => function ($q) use ($week) {
                    $q->where('week_id', $week->id);
                }, $meal . '.ingredients']);
            }
        }


        return response()->json([
            'status' => 200,
            'week' => $week,
        ]);
    }

    public function makeDelivered(Request $request)
    {
        $week = Week::where('id', $request->id)->first();

        $week->is_delivered = $request->is_delivered;

        $week->save();

        return $this->orderWeek($request->id);
    }

    public function stats()
    {
        $users = User::count();
        $subbedUsers = User::where('is_sub', 1)->count();
        $usersRenewal = User::where('is_auto_renewed', 1)->count();
        $categories = Category::count();
        $meals = Meal::count();
        $payments = Payment::sum('amount');
        $activeSubscriptions = Subscription::where('status', 1)->count();

        return response()->json([
            'status' => 200,
            'users' => $users,
            'subbedUsers' => $subbedUsers,
            'usersRenewal' => $usersRenewal,
            'categories' => $categories,
            'meals' => $meals,
            'payments' => $payments,
            'activeSubscriptions' => $activeSubscriptions,
        ]);
    }

    public function allPayment()
    {
        return response()->json([
            'status' => 200,
            'payments' => Payment::with('user')->get(),
        ]);
    }

    public function allContacts()
    {
        return response()->json([
            'status' => 200,
            'contacts' => Contact::all(),
        ]);
    }
    public function allApplications()
    {
        return response()->json([
            'status' => 200,
            'applications' => Application::all(),
        ]);
    }
}
