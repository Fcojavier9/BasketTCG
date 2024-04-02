<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory; // esta linea se agrega para que funcione el modelo

class Mercado extends Model{
    use HasFactory;

    protected $table = 'mercado'; // Nombre de la tabla en la base de datos, obligo a que no la pluralice

    /**
     * campos de la tabla usuarios que se pueden rellenar
     * 
     * la variable es protegida y se llama fillable, es un array con los campos permitidos
     *  */ 
    
    protected $fillable = [
        'id_coleccion', // revisar
        'vendida',
        'precio',
    ];
}

?>