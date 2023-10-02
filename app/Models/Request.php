<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RequestRoom extends Model
{
    use HasFactory;
    protected $table= "request";
    public $timestamps = true;
    protected $primaryKey = 'id';
    protected $guarded= [];

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = [
        'date', 'start_date', 'end_date'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'date' => 'datetime:Y-m-d',
        'start_date' => 'datetime:H:i:s',
        'end_date' => 'datetime:H:i:s'
    ];
}
