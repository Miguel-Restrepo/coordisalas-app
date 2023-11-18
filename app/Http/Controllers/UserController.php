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
        return $acercades;
    }

    //Get find id
    public function show($id)
    {
        $objeto = Request::find($id);
        return $objeto;
    }

    //new register
    public function store(Request $request)
    {
        $objeto = User::create($request->all());
        $objeto->save();
        return $objeto;
    }

    // update
    public function update(Request $request, $id)
    {
        $objeto = User::find($id);
        $objeto->update($request->all());
        return $objeto;
    }

    //delete
    public function destroy($id)
    {
        $objeto = User::find($id);
        $objeto->delete();
        return $objeto;
    }
}
