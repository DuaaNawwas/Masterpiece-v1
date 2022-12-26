<?php

namespace App\Models;

use App\Models\Meal;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [

        'name',
        'image',

    ];

    // Relations --------------
    // Get meals in a specific category
    public function meals()
    {
        return $this->hasMany(Meal::class);
    }
}
