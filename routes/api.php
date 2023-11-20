<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\RequestController;
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


Route::post('/login', [LoginController::class, 'login']);
Route::post('/register', [RegisterController::class, 'register']);
Route::post('/logout', [LogoutController::class, 'logout'])->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->group(function () {
  // Rutas protegidas
});


Route::controller(RoomController::class)->group(function () {
    Route::get('room', 'index');
    Route::get('room/{id}', 'show');
    Route::post('room', 'store');
    Route::put('room/{id}', 'update');
    Route::delete('room/{id}/delete', 'destroy');
});

Route::controller(RequestController::class)->group(function () {
    Route::get('request-room', 'index');
    Route::get('request-room/approve', 'approve');
    Route::get('request-room/approve/user/{user_id}', 'filterByUser');
    Route::get('request-room/approve/room/{room_id}', 'filterByRoom');
    Route::get('request-room/rejected', 'rejected');
    Route::get('request-room/pending', 'pending');
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
/*
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
  return $request->user();
});*/
