<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    // Get all
    public function index()
    {
        $acercades = User::all();
        unset($acercades->password);
        return $acercades;
    }

    //Get find id
    public function show($id)
    {
        $objeto = User::find($id);
        unset($objeto->password);
        return $objeto;
    }

    //new register
    public function store(Request $request)
    {
        $objeto = User::create($request->all());
        $objeto['password'] = bcrypt($objeto['password']); 
        $objeto->save();
        unset($objeto->password);
        return $objeto;
    }

    // update
    public function update(Request $request, $id)
    {
        $objeto = User::find($id);
        $objeto->update($request->all());
        unset($objeto->password);
        return $objeto;
    }

    //delete
    public function destroy($id)
    {
        $objeto = User::find($id);
        $objeto->delete();
        unset($objeto->password);
        return $objeto;
    }
}
