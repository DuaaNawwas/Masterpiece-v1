<?php

namespace App\Models;

use App\Models\User;
use App\Models\Week;
use App\Models\Payment;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Subscription extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'people_num',
        'meals_per_week',
        'price',
        'ending_date',
        'status'

    ];


    // Relations

    // Get the user that owns the subscription
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Get payment info for the subscription
    public function payment()
    {
        return $this->hasOne(Payment::class);
    }

    // Get weeks/orders for subscription
    public function weeks()
    {
        return $this->hasMany(Week::class);
    }
}
