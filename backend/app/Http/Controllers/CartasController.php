<?php

namespace App\Http\Controllers;

use App\Models\Cartas;
use Illuminate\Http\Request; // para poder usar el request en cualquier inserccion/actualizacion de bbdd

class CartasController extends Controller
{
    /** 
     *  FUNCIONES GET
     */
    // devolver todos las cartas
    public function GetCartas(){
        return Cartas::all(); // con esto hago un select * from cartas
    }

    // devolver carta por id
    public function GetCarta($id){
        $card = Cartas::find($id); // con esto hago un select * from cartas where id = $id
        
        if($card){
            return $card;
        }

        return response()->json(['error' => 'Carta no encontrada'], 404); // con esto devuelvo un json con un mensaje de error y un codigo 404
    }

    /** 
     *  FUNCION POST
     */

    public function InsertCarta(Request $request){

        // Lista de claves que deseas verificar
        $keysToCheck = ['nombre', 'position', 'rarity', 'puntuacion','img_url'];

        // Verificar si todas las claves están presentes en la solicitud
        if (!$this->hasKeys($request, $keysToCheck)) { // funcion hasKeys, abajo del todo
            return response()->json(['error' => 'Se necesitan todas los campos requeridos'], 404);
        }

        // compruebo que el saldo no sea negativo
        if($request->puntuacion < 0){
            return response()->json(['error' => 'Puntuacion no puede ser negativa'], 400); // con esto devuelvo un json con un mensaje de error y un codigo 400
        }

        // Comprueba que la puntuacion no sea mayor que 100
        if ($request->puntuacion > 100) {
            return response()->json(['error' => 'La puntuacion no puede ser mayor que 100'], 400);
        }

        // lista de posiciones permitidas
        $posiciones = ['pg', 'sg', 'sf', 'pf', 'c'];

        if(!in_array($request->position, $posiciones)){
            return response()->json(['error' => 'Posicion no puede ser diferente a: pg, sg, sf, pf, c '], 400);
        }

        // lista para rareza permitida
        $rareza = ['comun', 'rara', 'heroe'];

        if(!in_array($request->rarity, $rareza)){
            return response()->json(['error' => 'Rareza no puede ser diferente a: comun, rara, heroe'], 400);
        }

        return Cartas::create([ //arreglo asociativo
            'nombre' => $request->nombre,
            'position' => $request->position,
            'rarity' => $request->rarity,
            'puntuacion'=> $request->puntuacion,
            'img_url' => $request->img_url
        ]); // con esto hago un insert into users (nombre, position, rarity, puntuacion, img_url) values ($request->nombre, $request->position, $request->rarity, $request->puntuacion, $request->img_url)
    }

    /** 
     *  FUNCION PUT/PATCH
     */
    public function UpdateCarta(Request $request, $id){

        // Comprueba que la carta exista
        $carta = $this->GetCarta($id);// compruebo que la carta exista
        if(!$carta){ 
            return response()->json(['error' => 'Carta no encontrada'], 404); // con esto devuelvo un json con un mensaje de error y un codigo 404
        }

        // Verifica si el parámetro 'puntuacion' está presente en la solicitud
        if ($request->has('puntuacion')) {
                        
            // Comprueba que la puntuacion no sea negativa
            if ($request->puntuacion < 0) {
                return response()->json(['error' => 'La puntuacion no puede ser negativa'], 400);
            }

            // Comprueba que la puntuacion no sea mayor que 100
            if ($request->puntuacion > 100) {
                return response()->json(['error' => 'La puntuacion no puede ser mayor que 100'], 400);
            }
        }

        // lista de posiciones permitidas
        // Verifica si el parámetro 'position' está presente en la solicitud
        if ($request->has('position')) {
            $posiciones = ['pg', 'sg', 'sf', 'pf', 'c'];

            if(!in_array($request->position, $posiciones)){
                return response()->json(['error' => 'Posicion no puede ser diferente a: pg, sg, sf, pf, c '], 400);
            }
        }

        // lista para rareza permitida
        // Verifica si el parámetro 'rarity' está presente en la solicitud
        if ($request->has('rarity')) {
            $rareza = ['comun', 'rara', 'heroe'];

            if(!in_array($request->rarity, $rareza)){
                return response()->json(['error' => 'Rareza no puede ser diferente a: comun, rara, heroe'], 400);
            }
        }

        // Array para almacenar los campos no nulos
        $dataToUpdate = []; 

        // Recorremos los campos del objeto $request
        foreach ($request->all() as $key => $value) {
            // Verificamos si el valor no es nulo y el campo no es '_token'
            if ($value !== null && $key !== '_token') {
                // Añadimos el campo y su valor al array de datos a actualizar
                $dataToUpdate[$key] = $value;
            }
        }
        
        // Si no se han recibido campos para actualizar, devuelvo un error, ya que debe haber campos para actualizar
        if(empty($dataToUpdate)){
            return response()->json(['error' => 'No se han recibido campos para actualizar'], 400); // con esto devuelvo un json con un mensaje de error y un codigo 400
        }

        $resultado = Cartas::where('id',$id)->update( //arreglo asociativo
            $dataToUpdate // con esto hago un update users set nombre = $request->nombre, position = $request->position, rarity = $request->rarity, puntuacion = $request->puntuacion, img_url = $request->img_url where id = $id
        );

        return ($resultado == 1) ? "Ok, Carta actualizada correctamente" : "Error, Carta no actualizada"; 
    }

    /** 
     *  FUNCION DELETE
     */
    public function DeleteCarta($id){
        $resultado = Cartas::where('id',$id)->delete(); // con esto hago un delete from cartas where id = $id
        return ($resultado = 1) ? "Ok, carta eliminada correctamente" : "Error, Carta no eliminada"; 
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
