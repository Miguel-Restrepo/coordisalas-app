<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TimeBussy extends Model
{
    use HasFactory;

    protected $table= "time_bussy";
    public $timestamps = true;
    protected $primaryKey = 'id';
    protected $guarded= [];
}
