<?php

namespace App\Http\Controllers;

use App\Models\Vehicle;
use App\Models\VehicleDetail;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __invoke()
    {
        $vehicle_names = Vehicle::select('name')->get();
        $vehicle_usage_numbers =  VehicleDetail::select('number_of_usage')->get();
        $vehicle_fuel_consumptions = VehicleDetail::select('fuel_consumption')->get();

        $vehicle_name_array = [];
        $vehicle_usage_array = [];
        $vehicle_fuel_consumption_array = [];

        foreach ($vehicle_names as $vehicle_name) {
            array_push($vehicle_name_array, $vehicle_name->name);
        }

        foreach ($vehicle_usage_numbers as $vehicle_usage_number) {
            array_push($vehicle_usage_array, $vehicle_usage_number->number_of_usage);
        }

        foreach ($vehicle_fuel_consumptions as $vehicle_fuel_consumption) {
            array_push($vehicle_fuel_consumption_array, $vehicle_fuel_consumption->fuel_consumption);
        }

        return Inertia::render('Dashboard/Index', [
            'vehicle_name' => $vehicle_name_array,
            'vehicle_usage_number' => $vehicle_usage_array,
            'vehicle_fuel_consumption' => $vehicle_fuel_consumption_array
        ]);
    }
}
