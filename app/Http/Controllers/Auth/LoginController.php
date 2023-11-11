<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Laravel\Sanctum\PersonalAccessToken;

class LoginController extends Controller
{
  public function login(Request $request)
  {
    $request->validate([
      'document' => 'required|string',
      'password' => 'required|string',
    ]);

    $user = User::where('document', $request->document)->first();

    if ($user && password_verify($request->password, $user->password)) {
      unset($user->password);
      $token = $user->generateToken();

      return response()->json(['token' => $token, 'user' => $user], 200);
    } else {
      return response()->json(['message' => 'Credenciales incorrectas'], 401);
    }
  }


  public function logout(Request $request)
  {
    $user = $request->user();
    $user->tokens->each(function (PersonalAccessToken $token) {
      $token->delete();
    });

    return response()->json(['message' => 'Cierre de sesión exitoso'], 200);
  }
}
