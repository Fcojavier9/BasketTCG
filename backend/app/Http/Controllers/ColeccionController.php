<?php

namespace App\Http\Controllers;

use App\Models\Coleccion;
use Illuminate\Http\Request; // para poder usar el request en cualquier inserccion/actualizacion de bbdd

class ColeccionController extends Controller
{
    /** 
     *  FUNCION GET
     */

    // devolver carta por id
    public function GetColeccion($usuario){
        $coleccion = Coleccion::where("id_usuario",$usuario)->get(); // con esto hago un select * from cartas where id = $id
        
        if($coleccion){
            return $coleccion;
        }

        return response()->json(['error' => 'El usuario no tiene coleccion disponible'], 404); // con esto devuelvo un json con un mensaje de error y un codigo 404
    }

    /** 
     *  FUNCION POST
     */

}