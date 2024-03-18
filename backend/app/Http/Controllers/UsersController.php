<?php

namespace App\Http\Controllers;

use App\Models\Users;

class UsersController extends Controller
{
    public function getUsers(){
        return Users::all(); // con esto hago un select * from users
    }
}
