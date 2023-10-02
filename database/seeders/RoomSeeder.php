<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoomSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $arrays = array(
            'Sala A',
            'Sala B',
            'Sala C',
            'Sala D Cisco',
            'Sala L',
            'Sala 218',
            'Sala F',
            'Sala E',
            'Laboratorio 319 Hardware',
            'Laboratorio 316 Moviles',
            'Laboratorio 318 Electronica',
            'Sala H1',
            'Sala H2',
            'Sala I',
            'Sala J',
            'Sala M (C308)',
            'Sala D221',
            'Sala D208 Auditorio ingenierias',
            'Aula 308',
            'Aula 310',
            'Aula 312',
            'Aula 317', 
            'Aula 320',
            'Aula 321',
            'Aula 322',
            'Aula 324',
            'Aula 325',
            'Aula 326',
            'Aula 327',
            'Aula D001',
            'Aula D002',
            'Aula D003'
        );

        foreach ($arrays as $name) {
            DB::table('room')->insert([
                'name' => $name,
            ]);
        }
    }
}
