<?php

namespace App\Http\Middleware;

use Closure;
use exception;
use App\Models\Usuarios;
use Illuminate\Http\Request;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Firebase\JWT\ExpiredException;

class JwtMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        // Verificar si el token es correcto
        if(!$request->header('Authorization')){
            return response()->json([
                'error' => 'Se requiere el token'
            ], 401);
        }

        // dividimos la cadena por espacios y obtenemos el token 
        $array_token = explode(' ', $request->header('Authorization'));
        // obtenemos el token, ya que es el segundo elemento del array,
        // la posicion 0 es la palabra Bearer
        // la posicion 1 es el token 
        $token = $array_token[1];

        try{
            // Decodificamos el token
            // recogemos env('JWT_SECRET') y lo convertimos en una instancia de Key
            // ya que lo hemos pasado en el constructor de JWT::decode del controlador
            $jwtSecret = (string) env('JWT_SECRET');
            $credentials = JWT::decode($token, new Key($jwtSecret, 'HS256'));
        }catch(ExpiredException $e){
            return response()->json([
                'error' => 'El token ha expirado'
            ], 400);
        }catch(Exception $e){
            return response()->json([
                'error' => 'Error al decodificar el token'
            ], 400);
        }

        // obtenemos el usuario
        $usuario = Usuarios::find($credentials->sub); // sub es el id del usuario

        // pasamos el usuario a la request
        $request->auth = $usuario;

        // post-middleware action
        return $next($request);
    }
}
