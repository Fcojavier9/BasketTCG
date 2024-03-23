<?php

namespace App\Http\Controllers;

use App\Models\Usuarios;
use Illuminate\Http\Request; // para poder usar el request en el insertUsuario

class UsuariosController extends Controller
{
    // devolver todos los usuarios
    public function getUsuarios(){
        return Usuarios::all(); // con esto hago un select * from users
    }

    // devolver usuario por id
    public function getUsuario($id){
        return Usuarios::find($id); // con esto hago un select * from users where id = $id
    }

    public function insertUsuario(Request $request){
        return Usuarios::create([
            'username' => $request->username,
            'name' => $request->name,
            'password' => $request->password,
            'img_url' => $request->img_url
        ]); 
    }
}
