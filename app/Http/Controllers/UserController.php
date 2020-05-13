<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Input;
use Log;

class UserController extends Controller {

    public function __construct() {
        parent::__construct();

        Log::useDailyFiles(storage_path().'/logs/dcn-login-gateway.log');
    }


    public static function instance() {
        return new UserController();
    }

    function checkEmail(Request $request) {
        $data = $this->clearPostData($request->input());
        $api_response = (new APIRequestsController())->checkIfFreeEmail($data['email']);
        if ($api_response->success) {
            return response()->json(['success' => true]);
        } else if (!$api_response->success) {
            return response()->json(['error' => true]);
        }
    }

    function checkCaptcha(Request $request) {
        $temp_save_captcha_session = session('captcha');
        //saving the session again, because theres bug in the captcha library

        if (captcha_check($request->input('captcha'))) {
            session(['captcha' => $temp_save_captcha_session]);;
            return response()->json(['success' => true]);
        } else {
            session(['captcha' => $temp_save_captcha_session]);
            return response()->json(['error' => true]);
        }
    }

    public function checkSession()   {
        if (!empty(session('logged_user')) && (session('logged_user')['type'] == 'dentist' || session('logged_user')['type'] == 'patient'))    {
            //LOGGED
            return true;
        }else {
            //NOT LOGGED
            return false;
        }
    }

    public function checkDentistSession()   {
        if (!empty(session('logged_user')) && session('logged_user')['type'] == 'dentist')    {
            //LOGGED
            return true;
        }else {
            //NOT LOGGED
            return false;
        }
    }

    public function checkPatientSession()   {
        if (!empty(session('logged_user')) && session('logged_user')['type'] == 'patient')    {
            //LOGGED
            return true;
        }else {
            //NOT LOGGED
            return false;
        }
    }

    protected function userLogout(Request $request) {
        $token = $this->encrypt(session('logged_user')['token'], getenv('API_ENCRYPTION_METHOD'), getenv('API_ENCRYPTION_KEY'));

        $request->session()->forget('logged_user');
        return redirect()->route('home')->with(['logout_token' => $token]);
    }

    protected function getCurrentUserData() {
        return response()->json(['success' => (new APIRequestsController())->getUserData(session('logged_user')['id'])]);
    }

    public function getCountryNameById($id) {
        $countries = (new APIRequestsController())->getAllCountries();
        return $countries[$id - 1]->name;
    }

    protected function checkDentistAccount(Request $request) {
        $logData = $request->input();
        // removing password from logs
        unset($logData['password']);
        Log::info('checkDentistAccount request.', ['data' => json_encode($logData)]);

        $customMessages = [
            'platform.required' => 'Platform is required.',
            'email.required' => 'Email address is required.',
            'password.required' => 'Password is required.',
        ];
        $this->validate($request, [
            'platform' => 'required',
            'email' => 'required|max:100',
            'password' => 'required|max:50'
        ], $customMessages);

        $data = $request->input();

        $staging = $request->input('staging');
        if (!empty($staging)) {
            $api_response = (new APIRequestsController())->dentistLogin($data, true, 'https://dev-api.dentacoin.com/api/login');
        } else {
            $api_response = (new APIRequestsController())->dentistLogin($data, true);
        }

        Log::info('dentistLogin response.', ['data' => json_encode($api_response)]);

        if ($api_response['success']) {
            $approved_statuses = array('approved', 'pending', 'test');
            if ($api_response['data']['self_deleted'] != NULL) {
                return response()->json(['error' => true, 'message' => 'This account is deleted, you cannot log in with this account anymore.']);
            } else if (!in_array($api_response['data']['status'], $approved_statuses)) {
                return response()->json(['error' => true, 'message' => 'This account is not approved by Dentacoin team yet, please try again later.']);
            } else {
                return response()->json(['success' => true]);
            }
        } else {
            return response()->json(['error' => true, 'message' => 'Wrong email or password.']);
        }
    }

    protected function manageCustomCookie(Request $request) {
        if (!empty(Input::get('slug')) && !empty(Input::get('type')) && !empty(Input::get('token'))) {
            //logging
            $slug = $this->decrypt(Input::get('slug'));
            $type = $this->decrypt(Input::get('type'));
            $token = $this->decrypt(Input::get('token'));

            $user = (new APIRequestsController())->getUserData($slug);
            if ($user) {
                $approved_statuses = array('approved', 'pending', 'test');
                if ($user->self_deleted != NULL) {
                    return abort(404);
                } else if (!in_array($user->status, $approved_statuses)) {
                    return abort(404);
                } else {
                    $session_arr = [
                        'token' => $token,
                        'id' => $slug,
                        'type' => $type
                    ];

                    session(['logged_user' => $session_arr]);
                    return redirect()->route('home');
                }
            } else {
                return abort(404);
            }
        } else if (!empty(Input::get('logout-token'))) {
            //logging out
            $token = $this->decrypt(Input::get('logout-token'));

            if (session('logged_user')['token'] == $token) {
                $request->session()->forget('logged_user');
            }
        } else {
            return abort(404);
        }
    }

    protected function getCountryCode() {
        $getCountryResponse = (new APIRequestsController())->getCountry($this->getClientIp());

        Log::info('getCountryCode request.', ['data' => json_encode($getCountryResponse)]);
        return response()->json(['success' => $getCountryResponse]);
    }

    protected function handleDentistLogin(Request $request) {
        $logData = $request->input();
        // removing password from logs
        unset($logData['password']);
        Log::info('handleDentistLogin request.', ['data' => json_encode($logData)]);

        $customMessages = [
            'platform.required' => 'Platform is required.',
            'email.required' => 'Email address is required.',
            'password.required' => 'Password is required.',
        ];
        $this->validate($request, [
            'platform' => 'required',
            'email' => 'required',
            'password' => 'required|max:50'
        ], $customMessages);

        $data = $request->input();

        //check email validation
        if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            return response()->json(['error' => true, 'message' => 'Your form was not sent. Please try again with valid email.']);
        }

        //handle the API response
        $staging = $request->input('staging');
        if (!empty($staging)) {
            $api_response = (new APIRequestsController())->dentistLogin($data, false, 'https://dev-api.dentacoin.com/api/login');
        } else {
            $api_response = (new APIRequestsController())->dentistLogin($data, false);
        }

        Log::info('dentistLogin response.', ['data' => json_encode($api_response)]);

        if ($api_response['success']) {
            $approved_statuses = array('approved', 'pending', 'test');
            if ($api_response['data']['self_deleted'] != NULL) {
                return response()->json(['error' => true, 'message' => 'This account has been deleted by its owner and cannot be restored.']);
            } else if (!in_array($api_response['data']['status'], $approved_statuses)) {
                return response()->json(['error' => true, 'message' => 'This account is not approved by Dentacoin team yet, please try again later.']);
            } else {
                return response()->json(['success' => true, 'data' => $api_response]);
            }
        } else {
            return response()->json(['error' => true, 'message' => $api_response['errors']]);
        }
    }

    protected function handleDentistRegister(Request $request) {
        $logData = $request->input();
        // removing password from logs
        unset($logData['password']);
        unset($logData['repeat-password']);
        Log::info('handleDentistRegister request.', ['data' => json_encode($logData)]);

        $customMessages = [
            'platform.required' => 'Platform is required.',
            'grecaptcha.required' => 'Captcha is required.',
            'latin-name.required' => 'Dentist or Practice Name is required.',
            'email.required' => 'Email address is required.',
            'password.required' => 'Password is required.',
            'repeat-password.required' => 'Repeat password is required.',
            'user-type.required' => 'User type is required.',
            'country-code.required' => 'Country is required.',
            'address.required' => 'City, Street is required.',
            'phone.required' => 'Phone number is required.',
            'website.required' => 'Website is required.',
            'specializations.required' => 'Specialization is required.',
            'hidden-image.required' => 'Image is required.'
        ];
        $this->validate($request, [
            'platform' => 'required',
            'grecaptcha' => 'required',
            'latin-name' => 'required|max:250',
            'email' => 'required|max:100',
            'password' => 'required|max:50',
            'repeat-password' => 'required|max:50',
            'user-type' => 'required',
            'country-code' => 'required',
            'address' => 'required|max:300',
            'phone' => 'required|max:50',
            'website' => 'required|max:250',
            'specializations' => 'required',
            'hidden-image' => 'required'
        ], $customMessages);

        // if user didn't enter http/ https append it to his website
        if ($request->input('website') && mb_strpos(mb_strtolower($request->input('website')), 'http') !== 0) {
            request()->merge([
                'website' => 'http://' . $request->input('website')
            ]);
        }

        $data = $request->input();

        $captcha = false;
        $ch = curl_init('https://www.google.com/recaptcha/api/siteverify');
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt ($ch, CURLOPT_POST, 1);
        curl_setopt ($ch, CURLOPT_POSTFIELDS, http_build_query(array(
            'secret' => env('GOOGLE_reCAPTCHA_SECRET'),
            'response' => $data['grecaptcha'],
            'remoteip' => $this->getClientIp()
        )));
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
        curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1);
        $response = curl_exec($ch);
        curl_close($ch);
        if ($response) {
            $api_response = json_decode($response, true);
            if (!empty($api_response['success'])) {
                $captcha = true;
            }
        }

        if (!$captcha) {
            return response()->json(['error' => true, 'message' => 'Wrong captcha, please try again.']);
        }

        if ($data['user-type'] == 'dentist') {
            if(empty($data['dentist-title'])) {
                return response()->json(['error' => true, 'message' => 'Missing dentist title.']);
            }

            if(empty($data['dentist_practice'])) {
                return response()->json(['error' => true, 'message' => 'Missing dentist_practice.']);
            } else {
                if ($data['dentist_practice'] == 'work_at_practice') {
                    if(empty($data['clinic_name'])) {
                        return response()->json(['error' => true, 'message' => 'Missing clinic_name.']);
                    }

                    if(empty($data['clinic_email'])) {
                        return response()->json(['error' => true, 'message' => 'Missing clinic_email.']);
                    }
                }
            }
        } else if ($data['user-type'] == 'clinic') {
            if(empty($data['worker_name'])) {
                return response()->json(['error' => true, 'message' => 'Missing worker_name.']);
            }

            if(empty($data['working_position'])) {
                return response()->json(['error' => true, 'message' => 'Missing working_position.']);
            } else {
                if ($data['working_position'] == 'other') {
                    if(empty($data['working_position_label'])) {
                        return response()->json(['error' => true, 'message' => 'Missing working_position_label.']);
                    }
                }
            }
        }

        //check email validation
        if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL))   {
            return response()->json(['error' => true, 'message' => 'Your form was not sent. Please try again with valid email.']);
        }

        //creating dummy image with full path to pass it to CORE DB
        $data['image-name'] = 'dentist-'.time().'.png';
        $data['image-path'] = UPLOADS . $data['image-name'];
        $img_data = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $data['hidden-image']));
        file_put_contents($data['image-path'], $img_data);

        //handle the API response
        $staging = $request->input('staging');
        if (!empty($staging)) {
            $api_response = (new APIRequestsController())->dentistRegister($data, 'https://dev-api.dentacoin.com/api/register');
        } else {
            $api_response = (new APIRequestsController())->dentistRegister($data);
        }

        Log::info('dentistRegister response.', ['data' => json_encode($api_response)]);

        //deleting the dummy image
        unlink($data['image-path']);

        if ($api_response['success']) {
            return response()->json(['success' => true, 'data' => $api_response]);
        } else {
            return response()->json(['error' => true, 'message' => $api_response['errors']]);
        }
    }

    protected function getAfterDentistRegistrationPopup(Request $request) {
        Log::info('getAfterDentistRegistrationPopup request.', ['data' => json_encode($request->input())]);

        $customMessages = [
            'user-type.required' => 'User type is required.'
        ];
        $this->validate($request, [
            'user-type' => 'required'
        ], $customMessages);

        if ($request->input('user-type') == 'dentist') {
            $popup_view = view('partials/popup-dentist-profile-verification-combined-login');
            return response()->json(['success' => true, 'data' => $popup_view->render()]);
        }else if ($request->input('user-type') == 'clinic') {
            $popup_view = view('partials/popup-clinic-profile-verification-combined-login');
            return response()->json(['success' => true, 'data' => $popup_view->render()]);
        }

        Log::error('Failed getAfterDentistRegistrationPopup request.');
        return response()->json(['error' => true]);
    }

    protected function handleEnrichProfile(Request $request) {
        Log::info('handleEnrichProfile request.', ['data' => json_encode($request->input())]);

        $this->validate($request, [
            'user' => 'required',
            'description' => 'required'
        ], [
            'user.required' => 'User is required.',
            'description.required' => 'Description is required.'
        ]);

        $data = $request->input();

        $post_api_data = array(
            'id' => $this->encrypt($data['user'], getenv('API_ENCRYPTION_METHOD'), getenv('API_ENCRYPTION_KEY')),
            'description' => $this->encrypt($data['description'], getenv('API_ENCRYPTION_METHOD'), getenv('API_ENCRYPTION_KEY'))
        );

        $staging = $request->input('staging');
        if (!empty($staging)) {
            $update_method_response = (new APIRequestsController())->updateAnonymousUserData($post_api_data, 'https://dev-api.dentacoin.com/api/user-anonymous/');
        } else {
            $update_method_response = (new APIRequestsController())->updateAnonymousUserData($post_api_data);
        }

        Log::info('updateAnonymousUserData response.', ['data' => json_encode($update_method_response)]);

        if ($update_method_response->success) {
            return response()->json(['success' => true, 'data' => 'Your short description was saved successfully.']);
        } else {
            return response()->json(['error' => true]);
        }
    }

    protected function authenticateUser(Request $request) {
        $logData = $request->input();
        // removing token from logs
        unset($logData['token']);
        Log::info('authenticateUser request.', ['data' => json_encode($logData)]);

        $this->validate($request, [
            'token' => 'required',
            'type' => 'required|in:patient,dentist',
            'id' => 'required'
        ], [
            'token.required' => 'Token is required.',
            'type.required' => 'Type is required.',
            'id.required' => 'ID is required.'
        ]);

        $checkToken = (new APIRequestsController())->checkUserIdAndToken($request->input('id'), $request->input('token'));
        Log::info('checkUserIdAndToken response.', ['data' => json_encode($checkToken)]);
        if(is_object($checkToken) && property_exists($checkToken, 'success') && $checkToken->success) {
            $session_arr = [
                'token' => $request->input('token'),
                'id' => $request->input('id'),
                'type' => $request->input('type')
            ];

            session(['logged_user' => $session_arr]);

            return response()->json(['success' => true]);
        } else {
            return response()->json(['error' => true]);
        }
    }
}