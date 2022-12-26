<?php

namespace App\Models;

use App\Models\Meal;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Nutrient extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'meal_id',
        'calories',
        'fat',
        'saturated_fat',
        'carbs',
        'sugar',
        'fiber',
        'protein',
        'cholesterol',
        'sodium'

    ];

    // Relations ----------------

    // With meals
    // Get the meal that has the nutrients
    public function meal()
    {
        return $this->belongsTo(Meal::class);
    }
}
