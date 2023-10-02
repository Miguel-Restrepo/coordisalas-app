<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Illuminate\Http\Request;

class RoomController extends Controller
{
    // Get all
    public function index()
    {
        $acercades = Room::all();
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
        $objeto = Room::create($request->all());
        $objeto->save();
        return $objeto;
    }

    // update
    public function update(Request $request, $id)
    {
        $objeto = Room::find($id);
        $objeto->update($request->all());
        return $objeto;
    }

    //delete
    public function destroy($id)
    {
        $objeto = Room::find($id);
        $objeto->delete();
        return "OK";
    }
}
