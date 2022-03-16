<?php

namespace App\Http\Requests\VehicleOrder;

use Illuminate\Foundation\Http\FormRequest;

class VehicleOrderUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'vehicle_id' => ['required'],
            'customer_name' => ['required', 'string'],
            'approval_one' => ['required'],
            'approval_two' => ['required'],
            'order_date' => ['required'],
            'driver_id' => ['required'],
        ];
    }
}
