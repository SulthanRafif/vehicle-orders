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
            ->filterByOrderDate($request->date)
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
        $extFile = $request->image->getClientOriginalExtension();
        $namaFile = 'vehicle' . time() . "." . $extFile;
        $image = $request->image->move('images', $namaFile);

        DB::transaction(function () use (
            $request,
            $image
        ) {
            $vehicle = Vehicle::create([
                'name' => $request->name,
            ]);

            $vehicle->vehicleDetail()->create(array_merge($request->only('fuel_consumption', 'service_schedule', 'vehicle_type')));

            $vehicle->imageVehicle()->create([
                'image' => $image,
            ]);

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
        $image = null;

        if (is_object($request->image)) {
            $extFile = $request->image->getClientOriginalExtension();
            $namaFile = 'vehicle' . time() . "." . $extFile;
            $image = $request->image->move('images', $namaFile);
        }

        DB::transaction(function () use ($request, $vehicle, $image) {
            $vehicle->update(array_merge($request->only('name')));
            $vehicle->vehicleDetail()->update(array_merge($request->only('fuel_consumption', 'service_schedule', 'vehicle_type')));

            if ($image) {
                if ($vehicle->imageVehicle()->get()->isEmpty()) {
                    $vehicle->imageVehicle()->create([
                        'image' => $image,
                    ]);
                } else {
                    $vehicle->imageVehicle()->update([
                        'image' => $image,
                    ]);
                }
            }

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
