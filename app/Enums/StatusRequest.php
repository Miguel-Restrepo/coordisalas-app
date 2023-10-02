<?php

namespace App\Enums;

enum StatusRequest: string
{
    case Pending = 'Pendiente';
    case Rejected = 'Rechaza';
    case Approved = 'Aprobada';
}
