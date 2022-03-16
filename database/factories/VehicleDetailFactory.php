<?php

namespace Database\Factories;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class VehicleDetailFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'fuel_consumption' => rand(1, 25), // Per Liter
            'vehicle_type' => rand(0, 1) ? 'angkutan orang' : 'angkutan barang',
            'service_schedule' => Carbon::today()->subDays(rand(0, 365)),
        ];
    }
}
