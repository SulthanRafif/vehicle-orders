<?php

namespace Database\Seeders;

use App\Enums\RoleType;
use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $roles = [RoleType::ADMIN, RoleType::PENYETUJU_SATU, RoleType::PENYETUJU_DUA];

        foreach ($roles as $role) {
            Role::create(['name' => $role]);
        }
    }
}
