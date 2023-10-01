<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    use HasFactory;
    protected $table= "room";
    public $timestamps = true;
    protected $primaryKey = 'name';
    protected $keyType = 'string';
    protected $guarded= [];
}
