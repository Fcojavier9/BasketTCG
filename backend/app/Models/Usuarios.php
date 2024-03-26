<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory; // esta linea se agrega para que funcione el modelo

class Usuarios extends Model{
    use HasFactory;

    /**
     * campos de la tabla usuarios que se pueden rellenar
     * 
     * la variable es protegida y se llama fillable, es un array con los campos permitidos
     *  */ 
    
    protected $fillable = [
        'username',
        'email', 
        'name',
        'password',
        'saldo', 
        'img_url'
    ];
}

?>