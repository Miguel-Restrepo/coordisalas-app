<?php

namespace App\Enums;

enum StateRoom: string {
    case Free = 'Libre';
    case Reserved = 'Reservada';
    case Occupied = 'Ocupada';
}
