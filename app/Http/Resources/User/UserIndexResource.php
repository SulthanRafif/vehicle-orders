<?php

namespace App\Http\Resources\User;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Str;

class UserIndexResource extends JsonResource

{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $role_name = collect($this->getRoleNames())->implode('');

        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'created_at' => $this->created_at->translatedFormat('d-M-Y'),
            'role_name' => !empty($role_name) ? Str::title(Str::replace('_', ' ', $role_name)) : '_',
        ];
    }
}
