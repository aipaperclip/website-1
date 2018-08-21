<?php

namespace App\Http\Controllers;

use App\Publications;
use App\UserExpressions;
use Illuminate\Http\Request;

class PressCenterController extends Controller
{
    public function getView()   {
        return view("pages/press-center");
    }
}
