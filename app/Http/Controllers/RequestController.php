<?php

namespace App\Http\Controllers;

use App\Models\RequestRoom;
use Illuminate\Http\Request;

class RequestController extends Controller
{
    // Get all
    public function index()
    {
        $acercades = RequestRoom::all();
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
        $objeto = RequestRoom::create($request->all());
        $objeto->save();
        return $objeto;
    }

    // update
    public function update(Request $request, $id)
    {
        $objeto = RequestRoom::find($id);
        $objeto->update($request->all());
        return $objeto;
    }

    //delete
    public function destroy($id)
    {
        $objeto = RequestRoom::find($id);
        $objeto->delete();
        return "OK";
    }
}
