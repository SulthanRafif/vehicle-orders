<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Driver extends Model
{
    use HasFactory;

    protected $fillable = [
        'name'
    ];

    public function vehicleOrders()
    {
        return $this->hasMany(VehicleOrder::class, 'driver_id');
    }

    public function scopeSearch(Builder $query, $search)
    {
        return $query->when(!empty($search), function (Builder $query) use ($search) {
            return $query
                ->where('name', 'like', "%{$search}%");
        });
    }

    public function scopeFilterByOrderDate(Builder $query, $date)
    {
        return $query->when(!empty($date), function (Builder $query) use ($date) {
            return $query->where('created_at', 'like', "%{$date}%");
        });
    }
}
