<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Models\Payment;
use App\Models\Pending;
use App\Models\Subscription;
use App\Models\PreferredCategory;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    // Relations----------------------------------

    // Get all payments for a user
    public function payments()
    {
        return $this->hasMany(Payment::class);
    }


    // Get preferred categories for a user
    public function preferredcategories()
    {
        return $this->hasMany(PreferredCategory::class);
    }

    // Get all Subscriptions for a user
    public function subscriptions()
    {
        return $this->hasMany(Subscription::class);
    }

    // Get pending data for a user
    public function pendings()
    {
        return $this->hasOne(Pending::class);
    }

    // Relations----------------------------------



    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'image',
        'email',
        'password',
        'google_id',
        'facebook_id',
        'phone',
        'address',
        'role',
        'floor',
        'building',
        'street',
        'city',
        'is_sub',
        'is_auto_renewed'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
}
