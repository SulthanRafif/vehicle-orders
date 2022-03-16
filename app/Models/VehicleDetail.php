<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VehicleDetail extends Model
{
    use HasFactory;

    protected $fillable = [
        'vehicle_id',
        'qty',
        'fuel_consumption',
        'service_schedule',
        'number_of_usage'
    ];

    public function vehicle()
    {
        return $this->hasOne(Vehicle::class);
    }
}
