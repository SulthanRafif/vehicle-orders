<?php

namespace App\Http\Resources\VehicleOrder;

use Illuminate\Http\Resources\Json\JsonResource;

class VehicleOrderIndexResource extends JsonResource
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
            'customer_name' => $this->customer_name,
            'driver_name' => $this->driver_name,
            'vehicle_id' => $this->vehicle->id,
            'vehicle_name' => $this->vehicle->name,
            'created_by' => $this->createdBy->name,
            'updated_by_id' => $this->updatedBy->id,
            'updated_by' => optional($this->updatedBy)->name,
            'approval_one_name' => $this->approvalOne->name,
            'approval_two_name' => $this->approvalTwo->name,
            'approval_one_status' => $this->approval_one_status,
            'approval_two_status' => $this->approval_two_status,
            'order_date' => $this->order_date,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
