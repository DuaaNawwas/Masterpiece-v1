<?php

namespace App\Models;

use App\Models\Meal;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Ingredient extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'meal_id',
        'name',
        'is_optional',
    ];

    // Relations ----------------

    // Get the meal for specific ingredients
    public function meal()
    {
        return $this->belongsTo(Meal::class);
    }
}
