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
$router->get('/usuarios', ['uses' => 'UsuariosController@getUsuarios']); // este seria el primer endpoint

/**
 * devolver usuario por id
 */
$router->get('/usuarios/{id}', ['uses' => 'UsuariosController@getUsuario']);

/**
 * inserccion de datos
 */
$router->post('/usuario', ['uses' => 'UsuariosController@insertUsuario']);