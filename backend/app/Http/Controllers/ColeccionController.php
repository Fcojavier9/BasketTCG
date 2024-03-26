<?php

namespace App\Http\Controllers;

use App\Models\Coleccion;
use Illuminate\Http\Request; // para poder usar el request en cualquier inserccion/actualizacion de bbdd


class ColeccionController extends Controller
{
    private $error = [];
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

     public function InsertColeccion(Request $request){
        $keysToCheck = [ 
            'id_usuario',
            'id_carta', 
            'cantidad', 
        ];

        
        if (!$this->hasKeys($request, $keysToCheck)){ //se comprueba que todos los campos se han introducido
            return response()->json(['error'=> 'Se necesitan todas los campos requeridos'],400);
        }
        
        $this->comprobar($request); //se compruba que los campos introducidos sean correctos
        if(!empty($this->error)){
            return response()->json(['error'=> $this->error],400);
        }
        
        return Coleccion::create([ //se crea la coleccion
            'id_usuario'=> $request->id_usuario,
            'id_carta'=> $request->id_carta,
            'cantidad'=> $request->cantidad,
        ]);
        
     }

     /**
      *  FUNCION PUT
      */
     public function UpdateColeccion(Request $request, $id){
        if(!$this->checkIfExists($id, '\Coleccion')){ // se comrpueba que la coleccion existe
            return response()->json(['error'=> 'Coleccion no encontrada'],404);
        }

        $this->comprobar($request); //se comrpueba que los campos sean correctos
        if(!empty($this->error)){
            return response()->json(['error'=> $this->error],400);
        }
        
        
        $resultado = Coleccion::where('id',$id)->update(['cantidad'=> $request->cantidad]);
        return ($resultado = 1) ? "Ok, Carta actualizada correctamente" : "Error, coleccion no actualizada"; 
    
    }

    /**
     *  FUNCION DELETE
     */
    public function DeleteColeccion($id){
        $resultado = Coleccion::where('id',$id)->delete(); 
        return ($resultado = 1) ? "Ok, coleccion eliminada correctamente" : "Error, coleccion no eliminada"; 
    }

    /**
     * FUNCIONES EXTRA
     */

     /**
      * Funcion para verificar que se introducen todos los datos requeridos para una nueva 
      * coleccion
      */
     public function hasKeys(Request $request, $keysToCheck) {
        foreach ($keysToCheck as $key) {
            if (!$request->has($key)) {
                return false; // Retorna falso si alguna clave no está presente
            }
        }
        return true; // Retorna verdadero si todas las claves están presentes
    }

   /**
    *  Fncion para verificar si una busqueda existe
    */
     public function checkIfExists( $value, $clase) {
        $modelo = "App\Models".$clase;
        $resultado = $modelo::where('id', $value)->first(); // con esto hago un select * from usuarios where $key = $value
        return $resultado ? true : false; // si existe el resultado, devuelvo true, si no, devuelvo false
    }
    
    /**
     * Funcion para comprobar que los datos son correctos
     */
     private function comprobar($request){ // se pasa request como parametro
        
        if($request->has('id_carta')) { // Comprueba si cada valor que tiene cada valor que se puede introducir
            if(!$this->checkIfExists($request->id_carta,'\Cartas')) $this->error = 'La carta indicada no existe'; //si el id del elemento no existe se establece el error correspondiente 
        }
        if($request->has('id_usuario')){
            if(!$this->checkIfExists($request->id_usuario,'\Usuarios')) $this->error = 'El usuario no existe';
        }
        if($request->has('cantidad')) {
            if(!$request->cantidad < 0) $this->error = 'La cantidad no puede ser negativa';
        } else $this->error = 'no hay datos que actualizar'; //el unico parametro modificable sera cantidad
    }
}