<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix('v1')->middleware('jwt.auth')->group(function () {
    Route::post('me', 'App\Http\Controllers\AuthController@me');
    Route::post('logout', 'App\Http\Controllers\AuthController@logout');
    Route::post('refresh', 'App\Http\Controllers\AuthController@refresh');
    Route::apiResource('category', 'App\Http\Controllers\CategoryController');
    Route::apiResource('category-mains', 'App\Http\Controllers\CategoryController');
    //Route::apiResource('carro', 'App\Http\Controllers\CarroController');
    //Route::apiResource('locacao', 'App\Http\Controllers\LocacaoController');
    //Route::apiResource('marca', 'App\Http\Controllers\MarcaController');
    //Route::apiResource('modelo', 'App\Http\Controllers\ModeloController');
});

Route::post('login', 'App\Http\Controllers\AuthController@login');
Route::post('register', 'App\Http\Controllers\AuthController@register');
