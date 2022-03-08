<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    use HasFactory;

    protected $fillable = [
        'name'
    ];

    public function vehicleOrders()
    {
        return $this->hasMany(VehicleOrders::class, 'vehicle_id');
    }
}
