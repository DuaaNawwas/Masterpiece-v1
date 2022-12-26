<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\ApplicationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MealController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\PendingController;
use App\Http\Controllers\SubscriptionController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WeekController;
use App\Models\Subscription;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Public routes-------------------------------------

// Endpoint for login api
Route::post('/login', [AuthController::class, 'login']);
// Endpoint for registration api
Route::post('/register', [AuthController::class, 'register']);
// Endpoint for login with google api
Route::post('/googleLogin', [AuthController::class, 'googleLogin']);
// Endpoint for login with facebook api
Route::post('/facebookLogin', [AuthController::class, 'facebookLogin']);
// Endpoints for categories
Route::resource('/categories', CategoryController::class);
// Endpoints for meals
Route::resource('/meals', MealController::class);

// Endpoint for getting pricings
Route::get('/pricing', [SubscriptionController::class, 'pricings']);
// Endpoint for submitting contact message
Route::post('/contact', [ContactController::class, 'store']);
Route::post('/apply', [ApplicationController::class, 'store']);


// Protected routes---------------------------------------
Route::group(['middleware' => ['auth:sanctum']], function () {
    // Endpoint for logout api
    Route::get('/logout', [AuthController::class, 'logout']);
    // Endpoint for getting user
    Route::get('/user', [AuthController::class, 'user']);
    // Endpoint to change profile pic
    Route::post('/profileimage', [UserController::class, 'uploadImage']);
    // Endpoint for getting recommended meals for a user
    Route::get('/recommendedMeals', [MealController::class, 'recommendedMeals']);
    // Endpoints for user
    Route::resource('/users', UserController::class);
    Route::put('/adddetails/{user}', [UserController::class, 'addDetails']);
    // Endpoint for changing password
    Route::put('/changepassword', [UserController::class, 'updatePassword']);
    // Endpoint to get payment history for a user
    Route::get('/paymenthistory', [UserController::class, 'paymentHistory']);
    // Endpoint to get active subscription for a user
    Route::get('/activesubscription', [UserController::class, 'activeSubscription']);
    Route::get('/plan', [UserController::class, 'plan']);
    Route::get('/oneweek/{num}', [UserController::class, 'getOneWeek']);
    // Endpoint for pendings
    Route::resource('/pending', PendingController::class);
    // Endpoint for subscriptions
    Route::get('/cancelauto', [SubscriptionController::class, 'cancelAutoSubscription']);
    Route::get('/activateauto', [SubscriptionController::class, 'activateAutoSubscription']);
    Route::resource('/subscription', SubscriptionController::class);
    // Endpoint for weeks
    Route::resource('/weeks', WeekController::class);
    Route::post('/deletemeal', [WeekController::class, 'deleteMeal']);
});


// Admin Routes ---------------------------------------
// Route::group(['middleware' => ['auth:sanctum', 'abilities:admin']], function () {
Route::post('/categories/add', [AdminController::class, 'addCategory']);
Route::delete('/category/{id}', [AdminController::class, 'deleteCategory']);
Route::post('/category/edit', [AdminController::class, 'editCategory']);
Route::post('/meal/add', [AdminController::class, 'addMeal']);
Route::get('/allmeals/get', [AdminController::class, 'getMeals']);
Route::delete('/meal/{id}', [AdminController::class, 'deleteMeal']);
Route::put('/editMeal', [AdminController::class, 'editMeal']);
Route::post('/editMealImage', [AdminController::class, 'editMealImage']);
Route::put('/editIngredients', [AdminController::class, 'editIngredients']);
Route::put('/editNutrients', [AdminController::class, 'editNutrients']);
Route::get('/orders', [AdminController::class, 'allOrders']);
Route::get('/orders/week/{id}', [AdminController::class, 'orderWeek']);
Route::post('/makeDelivered', [AdminController::class, 'makeDelivered']);
Route::get('/stats', [AdminController::class, 'stats']);
Route::get('/payments', [AdminController::class, 'allPayment']);
Route::get('/allContacts', [AdminController::class, 'allContacts']);
Route::get('/allApplications', [AdminController::class, 'allApplications']);
// });
