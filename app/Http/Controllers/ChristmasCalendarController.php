<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ChristmasCalendarController extends Controller
{
    public function getView()   {
        if(!empty($_COOKIE['dev_christmas_calendar'])) {
            return view('pages/christmas-calendar');
        }else {
            return abort(404);
        }
    }
}
