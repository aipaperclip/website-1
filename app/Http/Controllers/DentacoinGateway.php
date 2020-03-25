<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DentacoinGateway extends Controller
{
    public function getView()   {
        $view = view('partials/dentacoin-gateway');
        $view = $view->render();

        return response()->json(['success' => $view]);
    }
}
