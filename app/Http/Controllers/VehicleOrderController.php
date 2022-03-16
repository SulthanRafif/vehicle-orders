<?php

namespace App\Http\Controllers;

use App\Exports\VehicleOrderExport;
use App\Http\Resources\VehicleOrder\VehicleOrderIndexResource;
use App\Http\Resources\VehicleOrder\VehicleOrderEditResource;
use App\Models\User;
use App\Models\Vehicle;
use App\Models\VehicleDetail;
use App\Models\VehicleOrder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Str;

class VehicleOrderController extends Controller
{
    public function index(Request $request)
    {
        $modelsVehicleOrder = VehicleOrder::search($request->search)
            ->filterByOrderDate($request->date)
            ->latest()
            ->paginate();

        return Inertia::render('VehicleOrders/Index', [
            'vehicleOrders' => VehicleOrderIndexResource::collection($modelsVehicleOrder),
            'propSearch' => $request->search,
            'propOrderDate' => $request->date,
        ]);
    }

    public function create()
    {
        $vehicles = Vehicle::get();
        $penyetuju_satu =
            User::whereHas('roles', function ($q) {
                $q->where('name', 'penyetuju_satu');
            })->get();
        $penyetuju_dua =
            User::whereHas('roles', function ($q) {
                $q->where('name', 'penyetuju_dua');
            })->get();

        return Inertia::render('VehicleOrders/Create', [
            'vehicles' => $vehicles,
            'penyetujuSatu' => $penyetuju_satu,
            'penyetujuDua' => $penyetuju_dua,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'vehicle_id' => ['required'],
            'customer_name' => ['required'],
            'approval_one' => ['required'],
            'approval_two' => ['required'],
            'order_date' => ['required']
        ]);

        VehicleOrder::create([
            'vehicle_id' => $request->vehicle_id,
            'customer_name' => $request->customer_name,
            'approval_one' => $request->approval_one,
            'approval_two' => $request->approval_two,
            'order_date' => $request->order_date,
            'approval_one_status' => 0,
            'approval_two_status' => 0,
            'created_by' => Auth::id(),
        ]);

        return redirect()
            ->route('vehicle-orders.index')
            ->with('success', 'Data berhasil di tambahkan.');
    }

    public function edit(VehicleOrder $vehicleOrder)
    {
        $vehicles = Vehicle::get();
        $penyetuju_satu =
            User::whereHas('roles', function ($q) {
                $q->where('name', 'penyetuju_satu');
            })->get();
        $penyetuju_dua =
            User::whereHas('roles', function ($q) {
                $q->where('name', 'penyetuju_dua');
            })->get();

        return Inertia::render('VehicleOrders/Edit', [
            'vehicles' => $vehicles,
            'penyetujuSatu' => $penyetuju_satu,
            'penyetujuDua' => $penyetuju_dua,
            'vehicleOrder' => new VehicleOrderEditResource($vehicleOrder),
        ]);
    }

    public function update(Request $request, VehicleOrder $vehicleOrder)
    {
        $request->validate([
            'vehicle_id' => ['required'],
            'customer_name' => ['required'],
            'approval_one' => ['required'],
            'approval_two' => ['required'],
            'order_date' => ['required']
        ]);

        $vehicleOrder->update([
            'vehicle_id' => $request->vehicle_id,
            'customer_name' => $request->customer_name,
            'order_date' => $request->order_date,
            'approval_one' => $request->approval_one,
            'approval_one_status' => 0,
            'approval_two' => $request->approval_two,
            'approval_two_status' => 0
        ]);

        return redirect()
            ->route('vehicle-orders.index')
            ->with('success', 'Data berhasil di ubah.');
    }

    public function destroy(VehicleOrder $vehicleOrder)
    {
        $vehicleOrder->delete();

        return redirect()
            ->route('vehicle-orders.index')
            ->with('success', 'Data berhasil di hapus.');
    }

    public function updateApprovalStatus(VehicleOrder $vehicleOrder)
    {
        if (Auth::user()->roles[0]->name === 'penyetuju_satu') {
            $vehicleOrder->update([
                'approval_one_status' => true,
                'updated_by' => Auth::id(),
            ]);
        } else {
            DB::transaction(function () use ($vehicleOrder) {
                $vehicleOrder->update([
                    'approval_two_status' => true,
                    'updated_by' => Auth::id()
                ]);

                VehicleDetail::where('vehicle_id', $vehicleOrder->vehicle->id)->increment('number_of_usage', 1);
            });
        }

        return redirect()
            ->route('vehicle-orders.index')
            ->with('success', 'Persetujuan Berhasil Dilakukan.');
    }

    public function export()
    {
        $vehicle_orders = VehicleOrder::with('createdBy')->with('vehicle')->with('approvalOne')->with('approvalTwo')->get()->toArray();

        return Excel::download(new VehicleOrderExport($vehicle_orders), 'vehicle-order-reports-' . Str::random() . '.xlsx');
    }
}
