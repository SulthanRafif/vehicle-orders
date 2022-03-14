<?php

namespace App\Http\Controllers;

use App\Http\Requests\Vehicle\VehicleStoreRequest;
use App\Http\Requests\Vehicle\VehicleUpdateRequest;
use App\Http\Resources\Vehicle\VehicleEditResource;
use App\Http\Resources\Vehicle\VehicleIndexResource;
use App\Models\Vehicle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class VehicleController extends Controller
{
    public function index(Request $request)
    {
        $modelsVehicle = Vehicle::search($request->search)
            ->latest()
            ->paginate(5);

        return Inertia::render('Vehicles/Index', [
            'vehicles' => VehicleIndexResource::collection($modelsVehicle),
        ]);
    }

    public function create()
    {
        return Inertia::render('Vehicles/Create');
    }

    public function store(VehicleStoreRequest $request)
    {
        // dd($request->all());

        // $image_path = '';

        // if ($request->hasFile('image')) {
        //     $image_path = $request->file('image')->store('image', 'public');
        // }

        DB::transaction(function () use (
            $request,
        ) {
            $vehicle = Vehicle::create([
                'name' => $request->name,
            ]);

            $vehicle->vehicleDetail()->create(array_merge($request->only('qty', 'fuel_consumption', 'service_schedule')));

            // $vehicle->imageVehicle()->create([
            //     'image' => $image_path,
            // ]);

            return $vehicle;
        });

        return redirect()
            ->route('vehicles.index')
            ->with('success', 'Data berhasil ditambahkan');
    }

    public function edit(Vehicle $vehicle)
    {
        return Inertia::render('Vehicles/Edit', [
            'vehicle' => new VehicleEditResource(($vehicle))
        ]);
    }

    public function update(VehicleUpdateRequest $request, Vehicle $vehicle)
    {
        DB::transaction(function () use ($request, $vehicle) {
            $vehicle->update(array_merge($request->only('name')));
            $vehicle->vehicleDetail()->update(array_merge($request->only('qty', 'fuel_consumption', 'service_schedule')));

            return $vehicle;
        });

        return redirect()
            ->route('vehicles.index')
            ->with('success', 'Data berhasil diedit');
    }

    public function destroy(Vehicle $vehicle)
    {
        DB::transaction(function () use ($vehicle) {
            $vehicle->vehicleDetail()->delete();
            $vehicle->delete();
        });

        return redirect()
            ->route('vehicles.index')
            ->with('success', 'Data berhasil dihapus');
    }
}
