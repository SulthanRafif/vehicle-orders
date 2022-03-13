<?php

namespace App\Http\Requests\Vehicle;

use Illuminate\Foundation\Http\FormRequest;

class VehicleStoreRequest extends FormRequest
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
            'name' => ['required', 'string'],
            'qty' => ['required', 'integer'],
            'fuel_consumption' => ['required', 'integer'],
            'service_schedule' => ['required'],
            'image' => 'required | mimes:jpeg,jpg,png | max:1000',
        ];
    }
}
