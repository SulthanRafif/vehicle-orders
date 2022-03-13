<?php

namespace Database\Seeders;

use App\Models\Vehicle;
use App\Models\VehicleDetail;
use App\Models\VehicleOrder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(RoleSeeder::class);
        $this->call(UserSeeder::class);

        Vehicle::factory(5)->create()->each(function ($vehicle) {
            $vehicle->vehicleDetails()
                ->saveMany(
                    VehicleDetail::factory(1)->make()
                );
        });


        $this->call(VehicleOrderSeeder::class);
    }
}
