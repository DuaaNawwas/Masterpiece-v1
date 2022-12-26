<?php

namespace App\Models;

use App\Models\Week;
use App\Models\Category;
use App\Models\Nutrient;
use App\Models\Ingredient;
use App\Models\RemovedIngredient;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Meal extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'category_id',
        'image',
        'name',
        'short_desc',
        'long_desc',
        'prep_time',
        'tags',
        'note',
        'cost'

    ];

    // Relations ---------------------

    // Get nutrients for a specific meal
    public function nutrients()
    {
        return $this->hasOne(Nutrient::class);
    }

    // Get ingredients for a specific meal
    public function ingredients()
    {
        return $this->hasMany(Ingredient::class);
    }

    // Get the category of a specific meal
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    // Get removed ingredients for a specific meal
    public function removedingredients()
    {
        return $this->hasMany(RemovedIngredient::class);
    }

    // Get weeks that has meal???????????? not sure if it works? should i add one to every id?
    public function weeks()
    {
        return $this->hasMany(Week::class, ['meal1_id', 'meal2_id', 'meal3_id', 'meal4_id', 'meal5_id', 'meal6_id']);
    }
}
