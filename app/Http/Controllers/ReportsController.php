<?php

namespace App\Http\Controllers;

use App\Models\Reports;
use Illuminate\Http\Request;

class ReportsController extends Controller
{
    //
    // Get all
    public function index()
    {
        $acercades = Reports::all();
        return $acercades;
    }

    //Get find id
    public function show($id)
    {
        $objeto = Reports::find($id);
        return $objeto;
    }

    //new register
    public function store(Request $request)
    {
        $objeto = Reports::create($request->all());
        $objeto->save();
        return $objeto;
    }

    // update
    public function update(Request $request, $id)
    {
        $objeto = Reports::find($id);
        $objeto->update($request->all());
        return $objeto;
    }

    //delete
    public function destroy($id)
    {
        $objeto = Reports::find($id);
        $objeto->delete();
        return $objeto;
    }
}
