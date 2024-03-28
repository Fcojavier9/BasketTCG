<?php

namespace App\Http\Controllers;

use App\Models\Mercado;
use Illuminate\Http\Request; // para poder usar el request en cualquier inserccion/actualizacion de bbdd

class MercadoController extends Controller
{
    /** 
     *  FUNCIONES GET
     */
    // Devolver todas las cartas en venta (todas las entradas en mercado con vendida = false)
    public function GetMercado(){
        $cartas = Mercado::where('vendida', false)->get(); // con esto hago un select * from mercado where vendida = false
        
        if($cartas){
            return $cartas;
        }
        
        return response()->json(['error' => 'No se ha encontrado ninguna carta en venta en el mercado'], 404); // con esto devuelvo un json con un mensaje de error y un codigo 404
    }

    // Devolver entrada en el mercado por id
    public function GetMercadoById($id){
        $mercado = Mercado::find($id); // con esto hago un select * from mercado where id = $id
        
        if($mercado){
            return $mercado;
        }

        return response()->json(['error' => 'Entrada en mercado no encontrada'], 404); // con esto devuelvo un json con un mensaje de error y un codigo 404
    }

    // Devolver todas las cartas en venta por id de carta, incluyendo si esta vendida
    public function GetAllCartasMercado($id){
        // SELECT * FROM mercado WHERE id_coleccion IN (SELECT id FROM coleccion WHERE id_carta  = $id);
        $cartas = Mercado::whereIn('id_coleccion', function($query) use ($id) {
            // (SELECT id FROM coleccion WHERE id_carta  = $id)
            $query->select('id')->from('coleccion')->where('id_carta', $id);
        })->get();
        
        if($cartas){
            return $cartas;
        }

        return response()->json(['error' => 'No se ha encontrado ninguna entrada en el mercado con esa id de carta'], 404); // con esto devuelvo un json con un mensaje de error y un codigo 404
    }

    // Devolver todas las cartas en venta por id de carta (solo si vendida = false)
    public function GetCartaMercado($id){
        // SELECT * FROM mercado WHERE id_coleccion IN (SELECT id FROM coleccion WHERE id_carta  = $id) AND vendida = FALSE;
        $cartas = Mercado::whereIn('id_coleccion', function($query) use ($id) {
            $query->select('id')->from('coleccion')->where('id_carta', $id);
        })->where('vendida', false)->get();
        
        if($cartas){
            return $cartas;
        }

        return response()->json(['error' => 'No se ha encontrado ninguna entrada en el mercado con esa id de carta a la venta'], 404); // con esto devuelvo un json con un mensaje de error y un codigo 404
    }

    // Devolver todas las cartas en venta de un usuario (incluyendo si esta vendida)
    public function GetAllUsuarioMercado($id){
        // SELECT * FROM mercado WHERE id_coleccion IN (SELECT id FROM coleccion WHERE id_usuario  = $id);
        $cartas = Mercado::whereIn('id_coleccion', function($query) use ($id) {
            $query->select('id')->from('coleccion')->where('id_usuario', $id);
        })->get();
        
        if($cartas){
            return $cartas;
        }

        return response()->json(['error' => 'No se ha encontrado ninguna entrada en el mercado del usuario dado'], 404); // con esto devuelvo un json con un mensaje de error y un codigo 404
    }

    // Devolver todas las cartas en venta de un usuario (solo si vendida = false)
    public function GetUsuarioMercado($id){
        // SELECT * FROM mercado WHERE id_coleccion IN (SELECT id FROM coleccion WHERE id_usuario  = $id) AND vendida = FALSE;
        $cartas = Mercado::whereIn('id_coleccion', function($query) use ($id) {
            $query->select('id')->from('coleccion')->where('id_usuario', $id);
        })->where('vendida', false)->get();
        
        if($cartas){
            return $cartas;
        }

        return response()->json(['error' => 'No se ha encontrado ninguna entrada en el mercado del usuario dado que se encuentre a la venta'], 404); // con esto devuelvo un json con un mensaje de error y un codigo 404
    }

    // Devolver si una carta de una coleccion esta en venta
    public function GetColeccionMercado($id){
        $cartas = Mercado::where('id_coleccion', $id)->get(); // con esto hago un select * from mercado where id_coleccion = $id

        if($cartas){
            return $cartas;
        }

        return response()->json(['error' => 'No se ha encontrado ninguna entrada en el mercado con esa id de coleccion'], 404); // con esto devuelvo un json con un mensaje de error y un codigo 404
    }

    /** 
     *  FUNCION POST (WIP)
     */

    // Poner una carta de una coleccion en venta
    public function InsertMercado(Request $request){ // (WIP)
        // Lista de claves que deseas verificar
        $keysToCheck = [];

        // Verificar si todas las claves están presentes en la solicitud
        if (!$this->hasKeys($request, $keysToCheck)) { // funcion hasKeys, abajo del todo
            return response()->json(['error' => 'Se necesitan todas los campos requeridos'], 404);
        }

        return Mercado::create([ //arreglo asociativo
            'vendida' => false
        ]); // con esto hago un insert into mercado (id_coleccion, id_usuario, precio, vendida) values ($request->id_coleccion, $request->id_usuario, $request->precio, false)
    }

    /** 
     *  FUNCION PUT/PATCH (WIP)
     */

    // Marcar una entrada del mercado como vendida
    public function UpdateVendida($id){ // (WIP)
        $mercado = Mercado::find($id); // con esto hago un select * from mercado where id = $id
        
        if($mercado){
            $mercado->vendida = true;
            $mercado->save();
            return $mercado;
        }

        return response()->json(['error' => 'Entrada en mercado no encontrada'], 404); // con esto devuelvo un json con un mensaje de error y un codigo 404
    }

    /**
     * FUNCION DELETE
     */

    // Eliminar una entrada del mercado
    // Normalmente no se debería eliminar una entrada del mercado. La tabla mercado contiene un historico de todas sus entradas
    public function DeleteMercado($id){
        $mercado = Mercado::find($id); // con esto hago un select * from mercado where id = $id
        
        if($mercado){
            $mercado->delete();
            return response()->json(['success' => 'Entrada en mercado eliminada'], 200);
        }

        return response()->json(['error' => 'Entrada en mercado no encontrada'], 404); // con esto devuelvo un json con un mensaje de error y un codigo 404
    }

    // Funcion extra para comprobar que request tenga las claves que necesitamos
    public function hasKeys(Request $request, $keysToCheck) {
        foreach ($keysToCheck as $key) {
            if (!$request->has($key)) {
                return false; // Retorna falso si alguna clave no está presente
            }
        }
        return true; // Retorna verdadero si todas las claves están presentes
    }
}