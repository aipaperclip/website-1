<?php
namespace App\Http\Controllers;

use App\ChristmasCalendarTask;
use Illuminate\Http\Request;

class ChristmasCalendarController extends Controller
{
    public function getView()   {
        if(!empty($_COOKIE['dev_christmas_calendar'])) {
            /*if((new UserController())->checkSession()) {
                return view('pages/logged-user/christmas-calendar-logged');
            } else {
                return view('pages/christmas-calendar');
            }*/
            return view('pages/logged-user/christmas-calendar-logged', ['tasks' => $this->getAllJobOffers()->toArray()]);
        }else {
            return abort(404);
        }
    }

    public function getAllJobOffers() {
        return ChristmasCalendarTask::all();
    }
}
