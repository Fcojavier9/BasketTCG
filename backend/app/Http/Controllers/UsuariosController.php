<?php

namespace App\Http\Controllers;

use App\Models\Usuarios;
use App\Models\Coleccion;
use Illuminate\Http\Request; // para poder usar el request en cualquier inserccion/actualizacion de bbdd

class UsuariosController extends Controller
{
    /** 
     *  FUNCIONES GET
     */
    // devolver todos los usuarios
    public function GetUsuarios(){
        return Usuarios::all(); // con esto hago un select * from usuarios
    }

    // devolver usuario por id
    public function GetUsuario($id){
        $user = Usuarios::find($id); // con esto hago un select * from usuarios where id = $id
        
        if($user){
            return $user;
        }

        return response()->json(['error' => 'Usuario no encontrado'], 404); // con esto devuelvo un json con un mensaje de error y un codigo 404
    }

    /** 
     *  FUNCION POST
     */

    public function InsertUsuario(Request $request){

        // Lista de claves que deseas verificar
        $keysToCheck = ['username', 'email', 'password'];

        // Verificar si todas las claves están presentes en la solicitud
        if (!$this->hasKeys($request, $keysToCheck)) { // funcion hasKeys, abajo del todo
            return response()->json(['error' => 'Se necesitan todos los campos requeridos'], 400);
        }

        // Verificar si el usuario ya existe
        $userExists = $this->checkIfExists('username', $request->username); // funcion checkIfExists, abajo del todo
        $emailExists = $this->checkIfExists('email', $request->email);
        if($userExists || $emailExists){
            return response()->json(['error' => 'El usuario o email ya existe'], 400);
        }

        // Comprobacion y cifrado de la contraseña
        $password = $request->password;
        $passwordCifrada = hash('sha256', $password);

        $resultadoCheckPassword = $this->checkPassword($password, $passwordCifrada); // funcion checkPassword, abajo del todo
        if($resultadoCheckPassword !== true){
            return $resultadoCheckPassword;
        };

        $usuarioCreado = Usuarios::create([ //arreglo asociativo
            'username' => $request->username,
            'email' => $request->email,
            'name' => $request->name ? $request->name : null, // si no se envia name, se pone null
            'password' => $passwordCifrada,
            'saldo'=> ($request->saldo) ? $request->saldo : 500, // si no se envia saldo, se pone 500
            'img_url' => $request->img_url ? $request->img_url : "sin imagen" // si no se envia img_url, se pone null
        ]); // con esto hago un insert into users (username, name, password, img_url) values ($request->username, $request->name, $request->password, $request->img_url)
    
        $arrayColeccion = [];
        for($i = 1; $i < 49; $i++){
            array_push($arrayColeccion, Coleccion::create([ //arreglo asociativo
                'id_usuario' => $usuarioCreado->id,
                'id_carta' => $i,
                'cantidad' => 0
            ])); // con esto hago un insert into mercado (id_coleccion, id_usuario, precio, vendida) values ($request->id_coleccion, $request->id_usuario, $request->precio, false)
        }

        return [$usuarioCreado, $arrayColeccion];
    }

    
    /** 
     *  FUNCION PUT/PATCH
     */
    public function UpdateUsuario(Request $request, $id){

        // Comprueba si el usuario existe
        $user = $this->GetUsuario($id);// compruebo que el usuario exista
        if(!$user){ 
            return response()->json(['error' => 'Usuario no encontrado'], 404); // con esto devuelvo un json con un mensaje de error y un codigo 404
        }

        // Verifica si el parámetro 'saldo' está presente en la solicitud
        if ($request->has('saldo')) {
                        
            // Comprueba que el saldo no sea negativo
            if ($request->saldo < 0) {
                return response()->json(['error' => 'El saldo no puede ser negativo'], 400);
            }
        }

        // Verificar si el usuario ya existe
        
        if ($request->has('username') && $this->checkIfExists('username', $request->username) && $request->username != $user->username) { 
            // si el usuario existe y el usuario que se quiere actualizar no es el mismo    
            return response()->json(['error' => 'El usuario ya existe'], 400);
        }

        // Verificar si el email ya existe 
        if ($request->has('email') && $this->checkIfExists('email', $request->email) && $request->email != $user->email) {
            // si el email existe y el email que se quiere actualizar no es el mismo
            return response()->json(['error' => 'El email ya existe'], 400);
        }

        //verificar la contraseña
        if ($request->has('password')) {

            $password = $request->password;
            $passwordBBDD = $user->password;
            $passwordCifrada = hash('sha256', $password);

            // funcion checkPassword, abajo del todo
            $resultadoCheckPassword = $this->checkPassword($password, $passwordCifrada, $passwordBBDD); 
            if($resultadoCheckPassword !== true){
                return $resultadoCheckPassword;
            }; 
            
        }

        // Array para almacenar los campos no nulos
        $dataToUpdate = []; 

        // Recorremos los campos del objeto $request
        foreach ($request->all() as $key => $value) {
            // Verificamos si el valor no es nulo y el campo no es '_token'
            if ($value !== null && $key !== '_token' && $key !== 'password') {
                // Añadimos el campo y su valor al array de datos a actualizar
                $dataToUpdate[$key] = $value;
            }

            // si esta password, la actualizo con la password cifrada
            if($key == 'password'){
                $dataToUpdate['password'] = $passwordCifrada;
            }
        }
        
        // Si no se han recibido campos para actualizar, devuelvo un error, ya que debe haber campos para actualizar
        if(empty($dataToUpdate)){
            return response()->json(['error' => 'No se han recibido campos para actualizar'], 400); // con esto devuelvo un json con un mensaje de error y un codigo 400
        }

        // Actualizamos los campos en la base de datos
        $resultado = Usuarios::where('id',$id)->update( //arreglo asociativo
            $dataToUpdate // con esto hago un update usuarios set username = $request->username, name = $request->name, password = $request->password, img_url = $request->img_url where id = $id
        );

        return ($resultado == 1) ? "Ok, Usuario actualizado correctamente" : "Error, Usuario no actualizado"; 
    }

    /** 
     *  FUNCION DELETE
     */
    public function DeleteUsuario($id){
        // creo un objeto de la clase ColeccionController
        $coleccion = new ColeccionController();

        // compruebo si el usuario tiene coleccion
        $resultadoCol = $coleccion->DeleteColeccionesUsuarios($id);

        // si el resultado es la cadena devuelta NO es la correcta, devuelvo un error
        if($resultadoCol != "Ok, Colecciones eliminadas correctamente"){
            return response()->json(['error' => 'Error al eliminar usuario, no se han podido borrar algunas colecciones'], 400);
        }

        $resultado = Usuarios::where('id',$id)->delete(); // con esto hago un delete from usuarios where id = $id
        return ($resultado == 1) ? "Ok, Usuario eliminado correctamente" : "Error, Usuario no eliminado"; 
    }


    // Funcion extra para comprobar que request tenga las claves que necesitamos
    private function hasKeys(Request $request, $keysToCheck, $condition = "") {
        // variable auxiliar
        $aux = false;
        foreach ($keysToCheck as $key) {
            if (!$request->has($key)) {
                return false; // Retorna falso si alguna clave no está presente
            }

        }
        return true; // Retorna verdadero si todas las claves están presentes
    }

    // Funcion declarativa
    // Funcion extra para comprobar si un parametro ya existe en la bbdd
    private function checkIfExists($key, $value) {
        $user = Usuarios::where($key, $value)->first(); // con esto hago un select * from usuarios where $key = $value
        return $user ? true : false; // si existe el usuario, devuelvo true, si no, devuelvo false
    }

    //
    private function checkPassword($password, $passwordCifrada, $passwordBBDD = ""){
        // Comprueba que la contraseña tenga al menos 8 caracteres
        if(strlen($password) < 8){
            return response()->json(['error' => 'La contraseña debe tener al menos 8 caracteres'], 400);
        }

        // Comprueba que la contraseña tenga al menos un número
        if (!preg_match('/[0-9]/', $password)) {
            return response()->json(['error' => 'La contraseña debe tener al menos un número'], 400);
        }

        // Comprueba que la contraseña tenga al menos una letra
        if (!preg_match('/[a-zA-Z]/', $password)) {
            return response()->json(['error' => 'La contraseña debe tener al menos una letra'], 400);
        }

        // Comprueba que la contraseña tenga al menos un caracter especial
        if (!preg_match('/[^a-zA-Z0-9]/', $password)) {
            return response()->json(['error' => 'La contraseña debe tener al menos un caracter especial'], 400);
        }

        // compruebo que la contraseña no sea la misma que la anterior
        if($passwordCifrada == $passwordBBDD){
            return response()->json(['error' => 'La contraseña no puede ser la misma que la anterior'], 400);
        }

        return true;
    }
}