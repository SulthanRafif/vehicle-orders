<?php

namespace App\Http\Controllers;

use App\Http\Resources\VehicleOrderStatus\VehicleOrderStatusIndexResource;
use App\Models\VehicleDetail;
use App\Models\VehicleOrder;
use Carbon\Carbon;
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
        VehicleDetail::where('vehicle_id', $vehicle_order->vehicle->id)->update(['borrow_status' => false]);
        $vehicle_order->update(['return_date' => Carbon::today()]);

        return redirect()
            ->route('vehicle-order-statuses.index')
            ->with('success', 'Kendaraan Telah Dikembalikan.');
    }
}
