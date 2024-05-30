<?php

namespace App\Http\Controllers;

use App\Models\Coleccion;
use App\Http\Controllers\MercadoController; //se llama al controlador de eliminar las colecciones que esten en el mercado
use Illuminate\Http\Request; // para poder usar el request en cualquier inserccion/actualizacion de bbdd


class ColeccionController extends Controller
{
    private $error = [];
    /** 
     *  FUNCION GET
     */
    
    // devolver carta por id
    public function GetColeccion($usuario){        
        $data = []; //Variable que contendra los datos de las colecciones
        if(!intval($usuario)){ //se comprobara si el usuario se ha introducido por id o por su nombre de usuario y en el segundo caso se buscara su id
            $usuario = $this->checkIfExists('username',$usuario, '\Usuarios')->id;
            
        }
        
        $colecciones = Coleccion::where("id_usuario",$usuario)->get(); // con esto hago un select * from coleccion where id = $id
           
          //se asigna el controlador a una variable y se usa el metodo get por id para mostrar el nombre de usuario en lugar del id y lo mismo para el nombre de la carta
        foreach($colecciones as $coleccion){
            array_push($data, [
                'id'=> $coleccion->id,
                'Usuario' => $coleccion->id_usuario,
                'Nombre de usuario'=> $this->checkIfExists('id',$usuario, '\Usuarios')->username,
                'carta' => $coleccion->id_carta,
                'Jugador' => $this->checkIfExists('id', $coleccion->id_carta, '\Cartas')->nombre,
                'Imagen' => $this->checkIfExists('id', $coleccion->id_carta, '\Cartas')->img_url,
                'cantidad' => $coleccion->cantidad
            ]);

        }

        //si la variable contiene datos se mostraran, de lo contrario se devolvera el error
        return $data? $data : response()->json(['error' => 'No se han encontrado datos'], 404);;
    }

    // devolver id coleccion por usuario y carta
    public function GetColeccionCarta($usuario, $carta){        
        if(!intval($usuario)){ //se comprobara si el usuario se ha introducido por id o por su nombre de usuario y en el segundo caso se buscara su id
            $usuario = $this->checkIfExists('username',$usuario, '\Usuarios')->id;
        }

        $coleccion = Coleccion::where("id_usuario",$usuario)->where("id_carta",$carta)->first(); // con esto hago un select * from coleccion where id = $id

        //si la variable contiene datos se mostraran, de lo contrario se devolvera el error
        return $coleccion ? $coleccion : response()->json(['error' => 'No se han encontrado datos'], 404);;
    }

    /** 
     *  FUNCION POST
     */

    //  Funcion para introducir una nueva coleccion
     public function InsertColeccion(Request $request){
        $keysToCheck = [ 
            'id_usuario',
            'id_carta', 
            'cantidad' 
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
       
         $this->checkMercado(($id));//se llama a la funcion para comprobar y eliminar las colecciones que esten puestas a la venta en el mercado

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

        // se cuenta la cantidad de filas que se deberian ver afectadas 
        $count = Coleccion::where('id_usuario',$usuario)->count(); 

        $sales = Coleccion::where('id_usuario',$usuario)->get();
        foreach($sales as $sale){
            $this->checkMercado($sale->id);
        }

        //se eliminan las filas donde el id del usuario coincida
        $delete = Coleccion::where('id_usuario',$usuario)->delete();
        //si las cantidades no coinciden se muestra el mensaje de error
        return ($delete == $count)? "Ok, Colecciones eliminadas correctamente" : "Error, no se ha podido eliminar alguna coleccion";
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
    
    /** 
     * Funcion para comprobar y eliminar las colecciones del mercado en el caso de que el usuario la elimine o elimine su cuenta
     */
    private function checkMercado($idColeccion){
        // se crea un nuevo objeto controlador de mercado
        $mercado = new MercadoController();

        //  se toman las colecciones del mercado basandose en la id que se le pasa a la funcion
        $onSale = $this->checkIfExists("id_coleccion", $idColeccion, "\Mercado");
        if($onSale){ // en caso de que haya alguna coleccion en el mercado se usa la funcion de eliminar del MercadoController
            $mercado->DeleteMercado($onSale->id);
        }
    }
}