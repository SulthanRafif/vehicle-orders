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
            'qty' => rand(1, 20),
            'fuel_consumption' => rand(1, 25), // Per Galon
            'service_schedule' => Carbon::today()->subDays(rand(0, 365)),
        ];
    }
}
