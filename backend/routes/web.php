<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});


// Ejemplo de ruta con parámetros a una tabla, en este caso es un get pero se puede hacer con post, put, delete, etc.
/**
 * $router->get('/usuarios', ['uses' => 'UsuariosController@getUsuarios']); // este seria el primer endpoint
 * 
 * Para que funcione, se debe crear el controlador, en este caso UsersController.php en la carpeta app/Http/Controllers
 * Copiamos y pegamos el ejemplo que ya viene cambiandole el nombre del controlador y el nombre de la función
 * 
 * Tambien se debe crear el modelo, en este caso User.php en la carpeta app/Models
 */


/**
 *                                          TABLA USUARIOS
 */


/**
 * devolver usuarios
 */
$router->get('/usuarios', ['uses' => 'UsuariosController@GetUsuarios']); // este seria el primer endpoint

/**
 * devolver usuario por id
 */
$router->get('/usuario/{id}', ['uses' => 'UsuariosController@GetUsuario']);

/**
 * inserccion de datos
 */
$router->post('/insertUsuario', ['uses' => 'UsuariosController@InsertUsuario']);

/**
 * actualizar usuario por id
 */
$router->put('/updateUsuario/{id}', ['uses' => 'UsuariosController@UpdateUsuario']);

/**
 * eliminar usuario por id
 */
$router->delete('/deleteUsuario/{id}', ['uses' => 'UsuariosController@DeleteUsuario']);


/**
 *                                          TABLA CARTAS
 */

/**
 * devolver cartas
 */
$router->get('/cartas', ['uses' => 'CartasController@Getcartas']); // este seria el primer endpoint

/**
 * devolver carta por id
 */
$router->get('/carta/{id}', ['uses' => 'CartasController@Getcarta']);

/**
 * inserccion de datos
 */
$router->post('/insertCarta', ['uses' => 'CartasController@InsertCarta']);

/**
 * actualizar carta por id
 */
$router->put('/updateCarta/{id}', ['uses' => 'CartasController@UpdateCarta']);

/**
 * eliminar carta por id
 */
$router->delete('/deleteCarta/{id}', ['uses' => 'CartasController@DeleteCarta']);

/**
 *                                          TABLA XXXXX
 */