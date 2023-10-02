<?php

namespace App\Http\Controllers;

use App\Models\TimeBussy;
use Illuminate\Http\Request;

class TimeBussyController extends Controller
{
    // Get all
    public function index()
    {
        $acercades = TimeBussy::all();
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
        $objeto = TimeBussy::create($request->all());
        $objeto->save();
        return $objeto;
    }

    // update
    public function update(Request $request, $id)
    {
        $objeto = TimeBussy::find($id);
        $objeto->update($request->all());
        return $objeto;
    }

    //delete
    public function destroy($id)
    {
        $objeto = TimeBussy::find($id);
        $objeto->delete();
        return "OK";
    }
}
