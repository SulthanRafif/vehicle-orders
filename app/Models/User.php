<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasRoles, HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
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

    public function scopeSearch(Builder $query, $search)
    {
        return $query->when(!empty($search), function (Builder $query) use ($search) {
            return $query
                ->where('name', 'like', "%{$search}%")
                ->orWhere('email', 'like', "%{$search}%");
        });
    }

    public function vehicleOrderCreatedBy()
    {
        return $this->hasMany(VehicleOrder::class, 'created_by');
    }

    public function vehicleOrderUpdatedBy()
    {
        return $this->hasMany(VehicleOrder::class, 'updated_by');
    }

    public function vehicleOrderAprrovalOne()
    {
        return $this->hasMany(VehicleOrder::class, 'approval_one');
    }

    public function vehicleOrderApprovalTwo()
    {
        return $this->hasMany(VehicleOrder::class, 'approval_two');
    }
}
