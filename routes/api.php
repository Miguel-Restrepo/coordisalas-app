<?php

use App\Http\Controllers\RoomController;
use App\Http\Controllers\TimeBussyController;
use App\Http\Controllers\UserController;
use App\Models\RequestRoom;
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

Route::controller(RoomController::class)->group(function () {
    Route::get('room', 'index');
    Route::get('room/{id}', 'show');
    Route::post('room', 'store');
    Route::put('room/{id}', 'update');
    Route::delete('room/{id}/delete', 'destroy');
});

Route::controller(RequestRoom::class)->group(function () {
    Route::get('request-room', 'index');
    Route::get('request-room/{id}', 'show');
    Route::post('request-room', 'store');
    Route::put('request-room/{id}', 'update');
    Route::delete('request-room/{id}/delete', 'destroy');
});

Route::controller(TimeBussyController::class)->group(function () {
    Route::get('time-bussy', 'index');
    Route::get('time-bussy/{id}', 'show');
    Route::post('time-bussy', 'store');
    Route::put('time-bussy/{id}', 'update');
    Route::delete('time-bussy/{id}/delete', 'destroy');
});

Route::controller(UserController::class)->group(function () {
    Route::get('user', 'index');
    Route::get('user/{id}', 'show');
    Route::post('user', 'store');
    Route::put('user/{id}', 'update');
    Route::delete('user/{id}/delete', 'destroy');
});
