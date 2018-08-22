<?php

namespace App\Http\Controllers;

use App\Publications;
use App\UserExpressions;
use Illuminate\Http\Request;

class PrivacyPolicyController extends Controller
{
    protected function getView()   {
        return view("pages/privacy-policy");
    }
}
