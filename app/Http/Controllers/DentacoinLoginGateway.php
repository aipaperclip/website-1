<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DentacoinLoginGateway extends Controller
{
    public function getView(Request $request)   {
        $params = array(
            'type' => $request->input('type')
        );

        var_dump($request->input());
        die('asd');

        if ($params['type'] == 'incompleted-patient-register') {
            $staging = $request->input('staging');
            if (!empty($staging)) {
                $incompletedRegistrationData = (new APIRequestsController())->getIncompletedRegistrationData('https://dev-api.dentacoin.com/api/get-incomplete-registration/');
            } else {
                $incompletedRegistrationData = (new APIRequestsController())->getIncompletedRegistrationData();
            }
        }

        $inviter = $request->input('inviter');
        if (!empty($inviter)) {
            $params['inviter'] = urldecode($inviter);
        }

        $view = view('partials/dentacoin-login-gateway', $params);
        $view = $view->render();

        return response()->json(['success' => true, 'data' => $view]);
    }
}