<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CorporateDesignController extends Controller
{
    public function getView($slug)   {
        return view('pages/corporate-design', ['page' => $slug]);
    }
}
