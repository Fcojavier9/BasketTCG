<?php

namespace App\Http\Controllers;
use App\Models\Usuarios;
use Illuminate\Http\Request;
use Firebase\JWT\JWT;
use Laravel\Lumen\Routing\Controller as BaseController;

class AuthController extends Controller
{
    private $request;

    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    // JWT (JSON Web Token)
    public function jwt(Usuarios $usuario){
        $payload = [
            'iss' => "api-basket-tcg", // Emisor del token
            'sub' => $usuario->id, // Sujeto del token (ID del usuario)
            'iat' => time(), // Tiempo de emisión del token 
            'exp' => time() + 60*60 // Tiempo de expiración del token (1 hora después del tiempo de emisión)
        ];
        $jwtSecret = (string) env('JWT_SECRET');
        return JWT::encode($payload, $jwtSecret, 'HS256');

        /** 
         * ! https://jwt.io/
         * ! https://jwt.io/libraries
         **/
    }

    // funcion de autenticacion
    public function authenticate(Usuarios $usuario){

        // validamos los datos
        $this->validate($this->request, [
            'email' => 'required|email',
            'password' => 'required'
        ]);

        // buscamos el usuario
        $usuario = Usuarios::where('email', $this->request->input('email'))->first();

        // si no existe el usuario
        if(!$usuario){
            return response()->json([
                'error' => 'Email no encontrado'
            ], 400);
        }

        // si la contraseña coincide
        $passwordCifrada = hash('sha256', $this->request->input('password'));
        $passwordUsuario = $usuario->password;
        $aux = ($passwordCifrada == $passwordUsuario);
        if($aux){
            $respuesta = response()->json([
                'token' => $this->jwt($usuario)
            ], 200);
            return $respuesta;
        }

        // si la contraseña no coincide
        return response()->json([
            'error' => 'Email o contraseña incorrectos'
        ], 400);
    }
    
}