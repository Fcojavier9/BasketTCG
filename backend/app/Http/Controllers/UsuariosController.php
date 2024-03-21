<?php

namespace App\Http\Controllers;

use App\Models\Usuarios;

class UsuariosController extends Controller
{
    public function getUsuarios(){
        return Usuarios::all(); // con esto hago un select * from users
    }
}
