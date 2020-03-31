<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DentacoinLoginGateway extends Controller
{
    public function getView(Request $request)   {
        $user_ip = $request->input('user_ip');
        if (empty($user_ip)) {
            return response()->json(['error' => false, 'message' => 'Missing user IP.']);
        }

        $view = view('partials/dentacoin-login-gateway', ['client_ip' => $request->input('user_ip'), 'type' => $request->input('type')]);
        $view = $view->render();

        return response()->json(['success' => true, 'data' => $view]);
    }
}
