<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(Request $request) {
        $credential = $request->all(['email','password']);
        $token = auth('api')->attempt($credential);
        if ($token) {
            return response()->json(['token' => $token]);
        } else {
            return response()->json('Usuário ou senha inválido!', 403);
        }
        return 'login';
    }

    public function register(Request $request) {
        
        $credential = $request->all(['name','email','password', 'confirmPassword']);
        
        if ($credential['password'] != $credential['confirmPassword']){
            return response()->json('Senhas não conferem!', 400);
        }

        $user = new User();
        $user->name = $request['name'];
        $user->email = $request['email'];
        $user->password = bcrypt($request['password']);

        $request->validate($user->rules());
        $user->save();

        return response()->json('Cadastro Efetuado com sucesso!', 201);
    }

    public function logout() {
        auth('api')->logout();
        return response()->json(['msg' => 'Logout foi realizado com sucesso!']);
    }

    public function refresh() {
        $token = auth('api')->refresh();
        return response()->json(['token' => $token]);
    }

    public function me() {
        return response()->json(auth()->user());
    }
}
