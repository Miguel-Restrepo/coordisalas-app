<?php

namespace App\Http\Controllers;

use App\Enums\StatusRequest;
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

  // Get all approve
  public function approve()
  {
    $rooms = RequestRoom::with('room', 'users')->where('status', StatusRequest::Approved->value)->get();
    $transformedRooms = $rooms->map(function ($room) {
      return [
        'id' => $room->id,
        'title' => $room->users->name . " " . $room->room->name,
        'start' => $room->start_date,
        'end' => $room->end_date,
        'startRecur' => $room->start_date_recurrent,
        'endRecur'=> $room->end_date_recurrent,
        'isRecur'=> $room->is_recurring_event
      ];
    });
    return $transformedRooms;
  }

  public function filterByUser($user_id)
  {
    $rooms = RequestRoom::with('room', 'users')->where('status', StatusRequest::Approved->value)->where('user_id', $user_id)->get();
    $transformedRooms = $rooms->map(function ($room) {
      return [
        'id' => $room->id,
        'title' => $room->users->name . " " . $room->room->name,
        'start' => $room->start_date,
        'end' => $room->end_date,
        'startRecur' => $room->start_date_recurrent,
        'endRecur'=> $room->end_date_recurrent,
        'isRecur'=> $room->is_recurring_event
      ];
    });
    return $transformedRooms;
  }

  public function filterByRoom($room_id)
  {
    $room_id = str_replace('_', ' ', $room_id);
    $rooms = RequestRoom::with('room', 'users')->where('status', StatusRequest::Approved->value)->where('room_id', $room_id)->get();
    $transformedRooms = $rooms->map(function ($room) {
      return [
        'id' => $room->id,
        'title' => $room->users->name . " " . $room->room->name,
        'start' => $room->start_date,
        'end' => $room->end_date,
        'startRecur' => $room->start_date_recurrent,
        'endRecur'=> $room->end_date_recurrent,
        'isRecur'=> $room->is_recurring_event
      ];
    });
    return $transformedRooms;
  }

  // Get all rejected
  public function rejected()
  {
    $rooms = RequestRoom::with('room', 'users')->where('status', StatusRequest::Rejected->value)->get();
    return $rooms;
  }

  // Get all pending
  public function pending()
  {
    $rooms = RequestRoom::with('room', 'users')->where('status', StatusRequest::Pending->value)->get();
    return $rooms;
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
    return $objeto;
  }
}
