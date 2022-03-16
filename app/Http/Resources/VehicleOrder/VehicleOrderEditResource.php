<?php

namespace App\Http\Resources\VehicleOrder;

use Illuminate\Http\Resources\Json\JsonResource;

class VehicleOrderEditResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'vehicle_id' => $this->vehicle->id,
            'customer_name' => $this->customer_name,
            'approval_one' => (int)$this->approvalOne->id,
            'approval_two' => (int)$this->approvalTwo->id,
            'approval_one_status' => (int)$this->approval_one_status,
            'approval_two_status' => (int)$this->approval_two_status,
            'order_date' => $this->order_date,
            'driver_id' => $this->driver->id,
        ];
    }
}
