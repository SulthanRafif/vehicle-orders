<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ImageVehicle extends Model
{
    protected $fillable = ['image'];

    use HasFactory;

    public function vehicle()
    {
        return $this->hasOne(Vehicle::class);
    }
}
