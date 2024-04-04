<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB; // para poder usar las transacciones
use App\Models\Mercado;
use App\Models\Coleccion;
use App\Models\Usuarios;
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
    public function GetAllUsuarioMercado($usuario){
        // SELECT * FROM mercado WHERE id_coleccion IN (SELECT id FROM coleccion WHERE id_usuario  = $id);
        $cartas = Mercado::whereIn('id_coleccion', function($query) use ($usuario) {
            $query->select('id')->from('coleccion')->where('id_usuario', $usuario);
        })->get();
        
        if($cartas){
            return $cartas;
        }

        return response()->json(['error' => 'No se ha encontrado ninguna entrada en el mercado del usuario dado'], 404); // con esto devuelvo un json con un mensaje de error y un codigo 404
    }

    // Devolver todas las cartas en venta de un usuario (solo si vendida = false)
    public function GetUsuarioMercado($usuario){
        // SELECT * FROM mercado WHERE id_coleccion IN (SELECT id FROM coleccion WHERE id_usuario  = $id) AND vendida = FALSE;
        $cartas = Mercado::whereIn('id_coleccion', function($query) use ($usuario) {
            $query->select('id')->from('coleccion')->where('id_usuario', $usuario);
        })->where('vendida', false)->get();
        
        if($cartas){
            return $cartas;
        }

        return response()->json(['error' => 'No se ha encontrado ninguna entrada en el mercado del usuario dado que se encuentre a la venta'], 404); // con esto devuelvo un json con un mensaje de error y un codigo 404
    }

    // Devolver si una carta de una coleccion esta en venta
    // $router->get('/coleccion/{id}/mercado', ['uses'=> 'MercadoController@GetColeccionMercado']);
    // TODO: COMPROBAR QUE NO ESTA EN VENTA
    public function GetColeccionMercado($id){
        $cartas = Mercado::where('id_coleccion', $id)->get(); // con esto hago un select * from mercado where id_coleccion = $id

        if($cartas){
            return $cartas;
        }

        return response()->json(['error' => 'No se ha encontrado ninguna entrada en el mercado con esa id de coleccion'], 404); // con esto devuelvo un json con un mensaje de error y un codigo 404
    }

    /** 
     *  FUNCION POST
     */

    // Poner una carta de una coleccion en venta
    public function InsertMercado(Request $request){ // (WIP)
        // Lista de claves que deseas verificar
        // 'cantidad' no es un valor de la tabla, para facilitar venta individual de cartas, cada carta es una entrada en el mercado
        $keysToCheck = ['id_coleccion', 'precio', 'cantidad'];

        // Verificar si todas las claves están presentes en la solicitud
        if (!$this->hasKeys($request, $keysToCheck)) { // funcion hasKeys, abajo del todo
            return response()->json(['error' => 'Se necesitan todas los campos requeridos'], 404);
        }

        // compruebo que no este ya en el mercado, por lo que cuento los id de coleccion que existen en la bbdd, 1 si hay y 0 si no hay
        $mercado = Mercado::where('id_coleccion', $request->id_coleccion)->count();
        
        // si igual a 0 seguimos, si distinto de cero devolvemos un error
        if($mercado){
            return response()->json(['error' => 'Carta ya en venta'], 400); // con esto devuelvo un json con un mensaje de error y un codigo 400
        }

        // compruebo que el precio no sea negativo
        if($request->precio < 0){
            return response()->json(['error' => 'Precio no puede ser negativo'], 400); // con esto devuelvo un json con un mensaje de error y un codigo 400
        }

        // compruebo que cantidad no sea negativo, ni mayor a la cantidad que tiene el usuario
        if($request->cantidad < 0){
            return response()->json(['error' => 'Cantidad no puede ser negativa'], 400); // con esto devuelvo un json con un mensaje de error y un codigo 400
        }
        // para saber si es mayor a la cantidad que tiene el usuario, necesito hacer un select * from coleccion where id = $request->id_coleccion, mirar columna cantidad
        if($request->cantidad > 0){
            // SELECT cantidad FROM coleccion WHERE id = $request->id_coleccion;
            $cantidad = Coleccion::select('cantidad')->where('id', $request->id_coleccion)->get();
            if($request->cantidad > $cantidad){
                return response()->json(['error' => 'Cantidad no puede ser mayor a la cantidad que tiene el usuario'], 400); // con esto devuelvo un json con un mensaje de error y un codigo 400
            }
        }

        // Finalmente ya hechas las compobaciones, inserto en la tabla mercado, una tupla por cada numero en 'cantidad'
        for($i = 0; $i < $request->cantidad; $i++){
            return Mercado::create([ //arreglo asociativo
                'id_coleccion' => $request->id_coleccion,
                'vendida' => false,
                'precio' => $request->precio
            ]); // con esto hago un insert into mercado (id_coleccion, id_usuario, precio, vendida) values ($request->id_coleccion, $request->id_usuario, $request->precio, false)
        }

    }

    /** 
     *  FUNCION PUT/PATCH 
     */

    // Marcar una entrada del mercado como vendida
    public function Comprar(Request $request, $id){
        // Lista de claves que deseas verificar
        $keysToCheck = ['id_comprador'];

        // Verificar si todas las claves están presentes en la solicitud
        if (!$this->hasKeys($request, $keysToCheck)) { // funcion hasKeys, abajo del todo
            return response()->json(['error' => 'Se necesitan todas los campos requeridos'], 404);
        }

        // Sacamos el id del vendedor de la entrada en mercado

        // SELECT id_usuario FROM Coleccion  WHERE id IN 
        // ( SELECT id_coleccion FROM Mercado WHERE id = ? );
        $id_vendedor = Coleccion::select('id_usuario')
                        ->whereIn('id', function($query) use ($request) {
                            $query->select('id_coleccion')
                                ->from('mercado')
                                ->where('id', $request->id);
        })->get()->pluck('id_usuario')->first(); // selecciono la columna que quiero, ya que el get me lo devuelve todo el objeto, y cojo el primer resultado

        // Comprobamos que la entrada en mercado existe
        $mercado = Mercado::find($id); // con esto hago un select * from mercado where id = $id
        if(!$mercado){
            return response()->json(['error' => 'Entrada en mercado no encontrada'], 404); // con esto devuelvo un json con un mensaje de error y un codigo 404
        }

        // Comprobamos que la entrada en mercado no esté vendida
        if($mercado->vendida){
            return response()->json(['error' => 'Entrada en mercado ya vendida'], 400); // con esto devuelvo un json con un mensaje de error y un codigo 400
        }

        // Comprobamos que el comprador no sea el vendedor
        // these are strings
        if($mercado->id_comprador === $id_vendedor){
            return response()->json(['error' => 'No puedes comprar tu propia carta'], 400); // con esto devuelvo un json con un mensaje de error y un codigo 400
        }
  
        // creo un objeto de la clase UsuariosController
        $usuario = new UsuariosController();
        $comprador = $usuario->GetUsuario($request->id_comprador);
        $vendedor = $usuario->GetUsuario($id_vendedor);

        if($comprador->saldo < $mercado->precio){
            return response()->json(['error' => 'No tienes suficiente dinero para comprar la carta'], 400);
        }

        // Como puede haber algun error durante el codigo y no queremos dejar a medias los cambios, usamos transacciones
        // Esto permite que si hay un error, se deshagan todos los cambios
        DB::beginTransaction();

        // usamos una transaccion con rollback, ya que se tocan tablas diferentes
        // si por ejemplo se ha modificado en mercado pero da error en usuarios, se deshacen los cambios

        try {
            // 1. Marcar como vendida (hemos comprobado antes que no está vendida)
            $mercado->vendida = true;
            $mercado->save();

            // 2. Modificar en vendedor cantidad en su coleccion (restar 1)
            $coleccionVendedor = Coleccion::find($mercado->id_coleccion);
            $cantidadVendedor = $coleccionVendedor->cantidad - 1;
            Coleccion::where('id', $mercado->id_coleccion)->update(['cantidad' => $cantidadVendedor]);

            // 3. Modificar en vendedor el saldo en usuario (sumar precio)
            $saldoVendedor = $vendedor->saldo + $mercado->precio;
            Usuarios::where('id', $id_vendedor)->update(['saldo' => $saldoVendedor]);

            // 4. Modificar en comprador cantidad en su coleccion (sumar 1)
            $coleccionComprador = Coleccion::select('cantidad')->where('id_usuario', $request->id_comprador)->where('id_carta',$coleccionVendedor->id_carta)->first();
            if($coleccionComprador){
                $coleccionComprador->cantidad + 1;
                Coleccion::where('id', $mercado->id_coleccion)->update(['cantidad' => $cantidadComprador]);
            } else{
                $resultado = $this->createRequest($request->id_comprador,$coleccionVendedor->id_carta, 1);
                if($resultado === "Error, coleccion no actualizada"){
                    return response()->json(['error' => 'Error al comprar la carta'], 500);
                }
            } 
            

            // 5. Modificar en comprador el saldo en usuario (restar precio)
            $saldoComprador = $comprador->saldo - $mercado->precio;
            Usuarios::where('id', $request->id_comprador)->update(['saldo' => $saldoComprador]);

            DB::commit();
            return response()->json(['success' => 'Carta comprada'], 200);
        } catch (Exception $e) {
            DB::rollback();
            return response()->json(['error' => 'Error al comprar la carta'], 500);
        }
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
    private function hasKeys(Request $request, $keysToCheck) {
        foreach ($keysToCheck as $key) {
            if (!$request->has($key)) {
                return false; // Retorna falso si alguna clave no está presente
            }
        }
        return true; // Retorna verdadero si todas las claves están presentes
    }

    // funcion para crear json con los datos de la coleccion
    private function createRequest($id_usuario, $id_carta, $cantidad){

        //creamos un objeto resquest ya que es lo que pide el controlador
        $request = new Request([
            'id_usuario' => $id_usuario,
            'id_carta' => $id_carta,
            'cantidad' => $cantidad
        ]);
        
        // creo una instancia de ColeccionController para llamar a insertColeccion
        $coleccion = new ColeccionController();

        return $coleccion->InsertColeccion($request);

    }
}