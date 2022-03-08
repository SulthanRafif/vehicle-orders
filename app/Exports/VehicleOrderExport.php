<?php

namespace App\Exports;

use App\Models\VehicleOrder;
use Maatwebsite\Excel\Concerns\FromCollection;

class VehicleOrderExport implements FromCollection
{
    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        return VehicleOrder::all();
    }
}
