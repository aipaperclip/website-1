<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DentacoinLoginGateway extends Controller
{
    public function getView(Request $request)   {
        $params = array(
            'type' => $request->input('type')
        );
        $inviter = $request->input('inviter');
        if (!empty($inviter)) {
            $params['inviter'] = urldecode($inviter);
        }

        $view = view('partials/dentacoin-login-gateway', $params);
        $view = $view->render();

        return response()->json(['success' => true, 'data' => $view]);
    }
}