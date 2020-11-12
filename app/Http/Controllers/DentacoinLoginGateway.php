<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App;
use Illuminate\Support\Facades\Lang;

class DentacoinLoginGateway extends Controller
{
    public function getView(Request $request)   {
        $params = array(
            'type' => $request->input('type'),
            'recaptcha_public' => getenv('GOOGLE_reCAPTCHA_PUBLIC'),
            'recaptcha_public_only_mobile_apps' => getenv('GOOGLE_reCAPTCHA_PUBLIC_ONLY_MOBILE_APPS')
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

        $inviteid = $request->input('inviteid');
        if (!empty($inviteid)) {
            $params['inviteid'] = urldecode($inviteid);
        }

        $mobile_app = $request->input('mobile_app');
        if (!empty($mobile_app)) {
            $params['mobile_app'] = true;
        }

        $view = view('partials/dentacoin-login-gateway', $params);
        $view = $view->render();

        return response()->json(['success' => true, 'data' => $view]);
    }

    public function saveCivicEmailTryingToLoginFromMobileApp(Request $request)    {
        $this->validate($request, [
            'email' => 'required|email',
            'type' => 'required'
        ], [
            'email.required' => 'Email is required.',
            'email.email' => 'Invalid email.',
            'type.required' => 'Type is required.',
        ]);

        $response = (new APIRequestsController())->saveCivicEmailTryingToLoginFromMobileApp(array(
            'email' => $request->input('email'),
            'type' => $request->input('type')
        ));

        if (!empty($response) && is_object($response) && property_exists($response, 'success') && $response->success) {
            return response()->json(['success' => true]);
        } else {
            return response()->json(['error' => true]);
        }
    }

    public function checkIfCivicEmailTryingToLoginFromMobileApp(Request $request)    {
        $this->validate($request, [
            'email' => 'required|email',
        ], [
            'email.required' => 'Email is required.',
            'email.email' => 'Invalid email.'
        ]);
        var_dump($request->input());

        $response = (new APIRequestsController())->checkIfCivicEmailTryingToLoginFromMobileApp($request->input('email'));
        var_dump($response);
        die();

        if (!empty($response) && is_object($response) && property_exists($response, 'success') && $response->success) {
            return response()->json(['success' => true]);
        } else {
            return response()->json(['error' => true]);
        }
    }
}