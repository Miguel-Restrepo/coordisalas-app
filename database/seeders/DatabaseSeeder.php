<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(RoomSeeder::class);
        $this->call(UserSedeer::class);
        $this->call(RequestSeeder::class);
        $this->call(TimeBussySeeder::class);
    }
}
