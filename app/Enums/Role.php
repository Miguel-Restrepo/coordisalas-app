<?php

namespace App\Enums;

enum Role: string
{
    case Admin = 'Administrador';
    case Student = 'Estudiante';
    case Professor = 'Docente';
}
