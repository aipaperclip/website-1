<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App;
use Illuminate\Support\Facades\Lang;

class DentacoinLoginGateway extends Controller
{
    public function getView(Request $request)   {
        $params = array(
            'type' => $request->input('type')
        );

        if ($params['type'] == 'incompleted-dentist-register') {
            $staging = $request->input('staging');
            if (!empty($staging)) {
                $incompletedRegistrationData = (new APIRequestsController())->getIncompletedRegistrationData($request->input('data')['key'], $request->input('data')['id'], 'https://dev-api.dentacoin.com/api/get-incomplete-registration/');
            } else {
                $incompletedRegistrationData = (new APIRequestsController())->getIncompletedRegistrationData($request->input('data')['key'], $request->input('data')['id']);
            }
        }

        if (!empty($incompletedRegistrationData) && is_object($incompletedRegistrationData) && property_exists($incompletedRegistrationData, 'success') && $incompletedRegistrationData->success) {
            if ($incompletedRegistrationData->data->completed) {
                return response()->json(['error' => true]);
            } else {
                $params['incompletedRegistrationData'] = $incompletedRegistrationData->data;
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