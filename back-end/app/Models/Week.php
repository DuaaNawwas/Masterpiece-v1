<?php

namespace App\Models;

use App\Models\Meal;
use App\Models\RemovedIngredient;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Week extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'subscription_id',
        'week_num',
        'meal1_id',
        'meal2_id',
        'meal3_id',
        'meal4_id',
        'meal5_id',
        'meal6_id',
        'day_of_delivery',
        'ending_date',
        'starting_date',
        'is_delivered'

    ];

    // Relations--------------

    // Get all the removed ingredients for meals in a specific week
    public function removedingredients()
    {
        return $this->hasMany(RemovedIngredient::class);
    }

    // Get the subscription that a specific week/order belongs to
    public function subscription()
    {
        return $this->belongsTo(Subscription::class);
    }

    // Get meal for specific week/order
    public function meal1()
    {
        return $this->belongsTo(Meal::class, 'meal1_id');
    }
    public function meal2()
    {
        return $this->belongsTo(Meal::class, 'meal2_id');
    }
    public function meal3()
    {
        return $this->belongsTo(Meal::class, 'meal3_id');
    }
    public function meal4()
    {
        return $this->belongsTo(Meal::class, 'meal4_id');
    }
    public function meal5()
    {
        return $this->belongsTo(Meal::class, 'meal5_id');
    }
    public function meal6()
    {
        return $this->belongsTo(Meal::class, 'meal6_id');
    }
}
