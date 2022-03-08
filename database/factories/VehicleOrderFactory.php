<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Vehicle;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\VehicleOrder>
 */
class VehicleOrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'vehicle_id' => Vehicle::pluck('id')->random(),
            'created_by' => User::whereHas('roles', function ($q) {
                $q->where('name', 'admin');
            })->pluck('id')->random(),
            'updated_by' =>  User::whereHas('roles', function ($q) {
                $q->where('name', 'admin');
            })->pluck('id')->random(),
            'approval_one' => User::whereHas('roles', function ($q) {
                $q->where('name', 'penyetuju_satu');
            })->pluck('id')->random(),
            'approval_two' => User::whereHas('roles', function ($q) {
                $q->where('name', 'penyetuju_dua');
            })->pluck('id')->random(),
            'customer_name' => $this->faker->name(),
            'order_date' => Carbon::now()->format('Y-m-d'),
        ];
    }
}
