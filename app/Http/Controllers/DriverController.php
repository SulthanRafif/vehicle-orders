<?php

namespace App\Http\Controllers;

use App\Http\Requests\Driver\DriverStoreRequest;
use App\Http\Requests\Driver\DriverUpdateRequest;
use App\Http\Resources\Driver\DriverEditResource;
use App\Http\Resources\Driver\DriverIndexResource;
use App\Models\Driver;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DriverController extends Controller
{
    public function index(Request $request)
    {
        $modelsDrivers = Driver::search($request->search)
            ->filterByOrderDate($request->date)
            ->latest()
            ->paginate(5);

        return Inertia::render('Drivers/Index', [
            'drivers' => DriverIndexResource::collection($modelsDrivers),
        ]);
    }

    public function create()
    {
        return Inertia::render('Drivers/Create');
    }

    public function store(DriverStoreRequest $request)
    {
        Driver::create([
            'name' => $request->name
        ]);

        return redirect()
            ->route('drivers.index')
            ->with('success', 'Data berhasil ditambahkan');
    }

    public function edit(Driver $driver)
    {
        return Inertia::render('Drivers/Edit', [
            'driver' => new DriverEditResource($driver),
        ]);
    }

    public function update(DriverUpdateRequest $request, Driver $driver)
    {
        $driver->update([
            'name' => $request->name
        ]);

        return redirect()
            ->route('drivers.index')
            ->with('success', 'Data berhasil diedit');
    }

    public function destroy(Driver $driver)
    {
        $driver->delete();

        return redirect()
            ->route('drivers.index')
            ->with('success', 'Data berhasil dihapus');
    }
}
