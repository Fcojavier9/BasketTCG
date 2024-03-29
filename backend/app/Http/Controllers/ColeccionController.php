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
        // MOSTRAR DATOS DE CARTA (imagen carta, nombre carta, id carta ) y id usuario;

        if(!intval($usuario)){ //se comprobara si el usuario se ha introducido por id o por su nombre de usuario y en el segundo caso se buscara su id
            $usuario = $this->checkIfExists('username',$usuario, '\Usuarios')->id;
        }
        
        $colecciones = Coleccion::where("id_usuario",$usuario)->get(); // con esto hago un select * from coleccion where id = $id
        
        if(!$colecciones){ 
            return response()->json(['error' => 'El usuario no tiene coleccion disponible'], 404); // con esto devuelvo un json con un mensaje de error y un codigo 404 si el usuario no tinene ninguna coleccion
        }

       
          //se asigna el controlador a una variable y se usa el metodo get por id para mostrar el nombre de usuario en lugar del id y lo mismo para el nombre de la carta
        foreach($colecciones as $coleccion){
            $data[] = [
                'Usuario' => $coleccion->id_usuario,
                'Nombre de usuario'=> $this->checkIfExists('id',$usuario, '\Usuarios')->username,
                'carta' => $coleccion->id_carta,
                'Jugador' => $this->checkIfExists('id', $coleccion->id_carta, '\Cartas')->nombre,
                'Imagen' => $this->checkIfExists('id', $coleccion->id_carta, '\Cartas')->img_url
            ];
        }
        return $data;
    }

    /** 
     *  FUNCION POST
     */

    //  Funcion para introducir una nueva coleccion
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

    //   funcion mara modificfar los datos de una entrada de la tabla coleecion
     public function UpdateColeccion(Request $request, $id){
        if(!$this->checkIfExists('id',$id, '\Coleccion')){ // se comrpueba que la coleccion existe
            return response()->json(['error'=> 'Coleccion no encontrada'],404);
        }

        $this->comprobar($request); //se comrpueba que los campos sean correctos
        if(!empty($this->error)){
            return response()->json(['error'=> $this->error],400);
        }
        
        // se verifica que se ha eliminado una entrada de la tabla coleccion
        $resultado = Coleccion::where('id',$id)->update(['cantidad'=> $request->cantidad]);
        return ($resultado == 1) ? "Ok, Coleccion actualizada correctamente" : "Error, coleccion no actualizada"; 
    
    }

    /**
     *  FUNCION DELETE
     */
    // funcion para eliminnar una coleccion
    public function DeleteColeccion($id){
        // se asigna la cantidad de columnas afectadas a una variable
        $resultado = Coleccion::where('id',$id)->delete(); 
        // se comprueba que la cantidad sea igual a uno y se manda el mensaje correspondiente
        return ($resultado == 1) ? "Ok, coleccion eliminada correctamente" : "Error, coleccion no eliminada"; 
    }

    // funcion para eliminar todas las colecciones de un usuaraio 
    public function DeleteColeccionesUsuarios($usuario){

        
        if(!intval($usuario)){ //se comprobara si el usuario se ha introducido por id o por su nombre de usuario y en el segundo caso se buscara su id
            // se toma el id en el caso de que se haya introducido el nombre de usuario
            $usuario = $this->checkIfExists('username',$usuario, '\Usuarios')->id;
        }

        // se cuenta la cantidad de columnas que se deberian ver afectadas 
        $count = Coleccion::where('id_usuario',$usuario)->count(); 

        //se eliminan las columnas donde el id del usuario coincida
        $delete = Coleccion::where('id_usuario',$usuario)->delete();
        //si las cantidades no coinciden se muestra el mensaje de error
        return ($delete == $count)? "Ok, Colecciones eliminadas correctametne" : "Error, no se ha podido eliminar alguna coleccion";
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
     public function checkIfExists( $key, $value, $clase) {
        $modelo = "App\Models".$clase;
        $resultado = $modelo::where($key, $value)->first(); // con esto hago un select * from usuarios where $key = $value
        return $resultado; // si existe el resultado, devuelvo true, si no, devuelvo false
    }
    
    /**
     * Funcion para comprobar que los datos son correctos
     */
     private function comprobar($request){ // se pasa request como parametro
        
        if($request->has('id_carta')) { // Comprueba si cada valor que tiene cada valor que se puede introducir
            if(!$this->checkIfExists('id',$request->id_carta,'\Cartas')) $this->error = 'La carta indicada no existe'; //si el id del elemento no existe se establece el error correspondiente 
        }
        if($request->has('id_usuario')){
            if(!$this->checkIfExists('id',$request->id_usuario,'\Usuarios')) $this->error = 'El usuario no existe';
        }
        if($request->has('cantidad')) {
            if($request->cantidad < 0) $this->error = 'La cantidad no puede ser negativa';
        } else $this->error = 'no hay datos que actualizar'; //el unico parametro modificable sera cantidad
    }
}