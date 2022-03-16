<?php

namespace App\Http\Controllers;

use App\Http\Resources\VehicleOrderStatus\VehicleOrderStatusIndexResource;
use App\Models\VehicleOrder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class VehicleOrderStatusController extends Controller
{
    public function index(Request $request)
    {
        $modelsVehicleOrder = VehicleOrder::search($request->search)
            ->filterByOrderDate($request->date)
            ->latest()
            ->paginate();

        return Inertia::render('VehicleOrderStatuses/Index', [
            'vehicleOrders' => VehicleOrderStatusIndexResource::collection($modelsVehicleOrder),
            'propSearch' => $request->search,
            'propOrderDate' => $request->date,
        ]);
    }

    public function updateReturnStatus(VehicleOrder $vehicle_order)
    {
        $vehicle_order->update([
            'return_status' => true,
            'updated_by' => Auth::id(),
        ]);

        return redirect()
            ->route('vehicle-order-statuses.index')
            ->with('success', 'Kendaraan Telah Dikembalikan.');
    }
}
