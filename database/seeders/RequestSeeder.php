<?php

namespace Database\Seeders;

use App\Enums\StatusRequest;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RequestSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('request')->insert([
          'id' => "1",
          'date' => "2023-11-18",
          'start_date' => "14:30:00",
          'end_date' => "18:30:00",
          'user_id' => "123456789",
          'room_id' => "Sala A",
          'status'=> StatusRequest::Approved->value
      ]);
    }
}
