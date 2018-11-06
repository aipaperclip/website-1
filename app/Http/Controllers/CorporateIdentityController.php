<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CorporateIdentityController extends Controller
{
    public function getView()   {
        return view('pages/corporate-identity');
    }
}
