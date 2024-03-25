<?php

namespace App\Http\Controllers;

use App\Models\Usuarios;
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
        $keysToCheck = ['username', 'name', 'password', 'img_url'];

        // Verificar si todas las claves están presentes en la solicitud
        if (!$this->hasKeys($request, $keysToCheck)) { // funcion hasKeys, abajo del todo
            return response()->json(['error' => 'Se necesitan todas los campos requeridos'], 404);
        }

        return Usuarios::create([ //arreglo asociativo
            'username' => $request->username,
            'name' => $request->name,
            'password' => $request->password,
            'saldo'=> ($request->saldo) ? $request->saldo : 500, // si no se envia saldo, se pone 500
            'img_url' => $request->img_url
        ]); // con esto hago un insert into users (username, name, password, img_url) values ($request->username, $request->name, $request->password, $request->img_url)
    }

    /** 
     *  FUNCION PUT/PATCH
     */
    public function UpdateUsuario(Request $request, $id){
        // Verifica si el parámetro 'saldo' está presente en la solicitud
        if ($request->has('saldo')) {
                        
            // Comprueba que el saldo no sea negativo
            if ($request->saldo < 0) {
                return response()->json(['error' => 'El saldo no puede ser negativo'], 400);
            }
        }

        $user = $this->GetUsuario($id);// compruebo que el usuario exista
        if(!$user){ 
            return response()->json(['error' => 'Usuario no encontrado'], 404); // con esto devuelvo un json con un mensaje de error y un codigo 404
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

        $resultado = Usuarios::where('id',$id)->update( //arreglo asociativo
            $dataToUpdate // con esto hago un update usuarios set username = $request->username, name = $request->name, password = $request->password, img_url = $request->img_url where id = $id
        );

        return ($resultado = 1) ? "Ok, Usuario actualizado correctamente" : "Error, Usuario no actualizado"; 
    }

    /** 
     *  FUNCION DELETE
     */
    public function DeleteUsuario($id){
        $resultado = Usuarios::where('id',$id)->delete(); // con esto hago un delete from usuarios where id = $id
        return ($resultado = 1) ? "Ok, Usuario eliminado correctamente" : "Error, Usuario no eliminado"; 
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
