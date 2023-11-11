<?php

namespace Database\Seeders;

use App\Enums\Role;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSedeer extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      DB::table('users')->insert([
        'document' => "123456789",
        'name' => "admin",
        'last_name' => "primary",
        'password'=> bcrypt("Admin1234"),
        'role'=> Role::Admin->value
    ]);
    }
}
