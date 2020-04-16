<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Input;

class UserController extends Controller {
    public static function instance() {
        return new UserController();
    }

    protected function getForgottenPasswordView() {;
        if($this->checkSession()) {
            return redirect()->route('home');
        } else {
            return view('pages/forgotten-password');
        }
    }

    protected function getRecoverPassword() {
        if($this->checkSession()) {
            return redirect()->route('home');
        } else {
            if (!empty(Input::get('token'))) {
                return view('pages/recover-password');
            } else {
                return abort(404);
            }
        }
    }

    protected function forgottenPasswordSubmit(Request $request) {
        $this->validate($request, [
            'email' => 'required|max:100'
        ], [
            'email.required' => 'Email is required.',
        ]);

        $data = $this->clearPostData($request->input());

        //check email validation
        if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            return redirect()->route('forgotten-password')->with(['error' => 'Your form was not sent. Please try again with valid email.']);
        }

        $api_response = (new APIRequestsController())->generatePasswordRecoveryToken($data['email']);
        if (property_exists($api_response, 'success') && $api_response->success) {
            //$body = '<!DOCTYPE html><html><head></head><body><div style="font-size: 16px;">Seems like you forgot your password for Dentacoin. If this is true, click below to reset your password.<br><br><br><form target="_blank" method="POST" action="'.BASE_URL.'password-recover"><input type="hidden" name="slug" value="'.$api_response->data.'"/><input type="submit" value="PASSWORD RESET" style="font-size: 20px;color: #126585;background-color: white;padding: 10px 20px;text-decoration: none;font-weight: bold;border-radius: 4px;border: 2px solid #126585;cursor: pointer;"/><input type="hidden" name="_token" value="'.csrf_token().'"></form></div></body></html>';
            $body = '<!DOCTYPE html><html><head></head><body><div style="font-size: 16px;">Seems like you forgot your password for Dentacoin. If this is true, click below to reset your password.<br><br><br><a href="'.BASE_URL.'password-recover?token='.urlencode($api_response->data).'" style="font-size: 20px;color: #126585;background-color: white;padding: 10px 20px;text-decoration: none;font-weight: bold;border-radius: 4px;border: 2px solid #126585;cursor: pointer;">PASSWORD RESET</a></div></body></html>';

            Mail::send(array(), array(), function($message) use ($body, $data) {
                $message->to($data['email'])->subject('Dentacoin - Request for password change');
                $message->from(EMAIL_SENDER, 'Dentacoin')->replyTo(EMAIL_SENDER, 'Dentacoin');
                $message->setBody($body, 'text/html');
            });

            if (count(Mail::failures()) > 0) {
                return redirect()->route('forgotten-password')->with(['error' => 'Your form was not sent. Please try again later.']);
            } else {
                return redirect()->route('forgotten-password')->with(['success' => 'You have received an email with a password reset link.']);
            }
        } else {
            return redirect()->route('forgotten-password')->with(['error' => 'Your form was not sent. Please try again later.']);
        }
    }

    protected function changePasswordSubmit(Request $request) {
        $this->validate($request, [
            'token' => 'required',
            'password' => 'required|max:100',
        ], [
            'token.required' => 'Token is required.',
            'password.required' => 'Password is required.',
        ]);

        $data = $this->clearPostData($request->input());

        $post_fields_arr = [
            'token' => $data['token'],
            'password' => $data['password']
        ];

        $recover_method_response = (new APIRequestsController())->recoverPassword($post_fields_arr);
        if (property_exists($recover_method_response, 'success') && $recover_method_response->success) {
            return redirect()->route('home')->with(['success' => 'Your password has been changed successfully.']);
        } else {
            return redirect()->route('home')->with(['error' => 'Your password change failed, please try again later or request for new password recover.']);
        }
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
        $customMessages = [
            'email.required' => 'Email address is required.',
            'password.required' => 'Password is required.',
        ];
        $this->validate($request, [
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

    /*protected function dentistLogin(Request $request) {
        $customMessages = [
            'email.required' => 'Email address is required.',
            'password.required' => 'Password is required.',
        ];
        $this->validate($request, [
            'email' => 'required|max:100',
            'password' => 'required|max:50'
        ], $customMessages);

        $data = $request->input();

        //check email validation
        if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            return redirect()->route('home')->with(['error' => 'Your form was not sent. Please try again with valid email.']);
        }

        //handle the API response
        $api_response = (new APIRequestsController())->dentistLogin($data);

        if ($api_response['success']) {
            $approved_statuses = array('approved', 'pending', 'test');
            if ($api_response['data']['self_deleted'] != NULL) {
                return redirect()->route('home')->with(['error' => 'This account has been deleted by its owner and cannot be restored.']);
            } else if (!in_array($api_response['data']['status'], $approved_statuses)) {
                return redirect()->route('home')->with(['error' => 'This account is not approved by Dentacoin team yet, please try again later.']);
            } else {
                $session_arr = [
                    'token' => $api_response['token'],
                    'id' => $api_response['data']['id'],
                    'type' => 'dentist'
                ];

                session(['logged_user' => $session_arr]);

                if (!empty($request->input('route'))) {
                    return redirect()->route($request->input('route'));
                } else {
                    return redirect()->route('home');
                }
            }
        } else {
            return redirect()->route('home')->with(['errors_response' => $api_response['errors']]);
        }
    }

    protected function dentistRegister(Request $request) {
        $customMessages = [
            'latin-name.required' => 'Dentist or Practice Name is required.',
            'dentist-title.required' => 'Dentist title is required.',
            'email.required' => 'Email address is required.',
            'password.required' => 'Password is required.',
            'repeat-password.required' => 'Repeat password is required.',
            'user-type.required' => 'User type is required.',
            'country-code.required' => 'Country is required.',
            'address.required' => 'City, Street is required.',
            'phone.required' => 'Phone number is required.',
            'website.required' => 'Website is required.',
            'specializations.required' => 'Specialization is required.',
            'captcha.required' => 'Captcha is required.',
            'hidden-image.required' => 'Image is required.',
            'captcha.captcha' => 'Please enter correct captcha.',
        ];
        $this->validate($request, [
            'latin-name' => 'required|max:250',
            'dentist-title' => 'required|max:250',
            'email' => 'required|max:100',
            'password' => 'required|max:50',
            'repeat-password' => 'required|max:50',
            'user-type' => 'required',
            'country-code' => 'required',
            'address' => 'required|max:300',
            'phone' => 'required|max:50',
            'website' => 'required|max:250',
            'specializations' => 'required',
            'hidden-image' => 'required',
            'captcha' => 'required|captcha|max:5'
        ], $customMessages);

        // if user didn't enter http/ https append it to his website
        if ($request->input('website') && mb_strpos(mb_strtolower($request->input('website')), 'http') !== 0) {
            request()->merge([
                'website' => 'http://' . $request->input('website')
            ]);
        }

        $data = $request->input();
        $files = $request->file();

        //check email validation
        if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL))   {
            return redirect()->route('home')->with(['error' => 'Your form was not sent. Please try again with valid email.']);
        }

        if (!empty($files)) {
            $fileCounter = 0;
            $allowed = array('png', 'jpg', 'jpeg', 'svg', 'bmp', 'PNG', 'JPG', 'JPEG', 'SVG', 'BMP');
            foreach($files as $file)  {
                // doing this check to prevent people submitting move than one file
                $fileCounter+=1;
                if($fileCounter > 2) {
                    return abort(404);
                }

                //checking the file size
                if ($file->getSize() > MAX_UPL_SIZE) {
                    return redirect()->route('home', ['slug' => $request->input('post-slug')])->with(['error' => 'Your form was not sent. Files can be only with with maximum size of '.number_format(MAX_UPL_SIZE / 1048576).'MB. Please try again.']);
                }
                //checking file format
                if (!in_array(pathinfo($file->getClientOriginalName(), PATHINFO_EXTENSION), $allowed)) {
                    return redirect()->route('home')->with(['error' => 'Your form was not sent. Files can be only with .png, .jpg, .jpeg, .svg, .bmp formats. Please try again.']);
                }
                //checking if error in file
                if ($file->getError()) {
                    return redirect()->route('home')->with(['error' => 'Your form was not sent. There is error with one or more of the files, please try with other files. Please try again.']);
                }
            }
        } else {
            return redirect()->route('home')->with(['error' => 'Please select avatar and try again.']);
        }

        //creating dummy image with full path to pass it to CORE DB
        $data['image-name'] = 'dentist-'.time().'.png';
        $data['image-path'] = UPLOADS . $data['image-name'];
        $img_data = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $data['hidden-image']));
        file_put_contents($data['image-path'], $img_data);

        //handle the API response
        $api_response = (new APIRequestsController())->dentistRegister($data);
        //deleting the dummy image
        unlink($data['image-path']);

        if ($api_response['success']) {
            if ($data['user-type'] == 'dentist') {
                $popup_view = view('partials/popup-dentist-profile-verification', ['user' => $api_response['data']['id']]);
                return redirect()->route('home')->with(['success' => true, 'popup-html' => $popup_view->render()]);
            }else if ($data['user-type'] == 'clinic') {
                $popup_view = view('partials/popup-clinic-profile-verification', ['user' => $api_response['data']['id']]);
                return redirect()->route('home')->with(['success' => true, 'popup-html' => $popup_view->render()]);
            }
        } else {
            return redirect()->route('home')->with(['errors_response' => $api_response['errors']]);
        }
    }

    protected function patientLogin(Request $request) {
        $this->validate($request, [
            'token' => 'required',
            'id' => 'required'
        ], [
            'token.required' => 'Token is required.',
            'id.required' => 'ID is required.'
        ]);

        $session_arr = [
            'token' => $request->input('token'),
            'id' => $request->input('id'),
            'type' => 'patient'
        ];

        $current_logging_patient = (new APIRequestsController())->getUserData($request->input('id'), true);
        if (!$current_logging_patient->success) {
            if (property_exists($current_logging_patient, 'self_deleted') && $current_logging_patient->self_deleted == true) {
                // self deleted
                return redirect()->route('home')->with(['error' => 'This account has been deleted by its owner and cannot be restored.']);
            } else if ((property_exists($current_logging_patient, 'deleted') && $current_logging_patient->deleted == true)) {
                // deleted by admin
                return redirect()->route('home')->with(['error' => 'ACCESS BLOCKED: We have detected suspicious activity from your profile. If you have had one genuine profile only, please contact us at <a href="mailto:admin@dentacoin.com">admin@dentacoin.com</a>. Otherwise, blocking is irreversible.']);
            } else {
                return redirect()->route('home')->with(['error' => 'Account not found. <a href="//dentacoin.com?show-patient-register">Sign up here</a>.']);
            }
        } else {
            session(['logged_user' => $session_arr]);

            if (!empty($request->input('route'))) {
                return redirect()->route($request->input('route'));
            } else {
                return redirect()->route('home');
            }
        }
    }*/

    //dentist can add profile description while waiting for approval from Dentacoin admin
    protected function enrichProfile(Request $request) {
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
            'short_description' => $this->encrypt($data['description'], getenv('API_ENCRYPTION_METHOD'), getenv('API_ENCRYPTION_KEY'))
        );
        $update_method_response = (new APIRequestsController())->updateAnonymousUserData($post_api_data);
        if ($update_method_response->success) {
            return redirect()->route('home')->with(['success' => 'Your short description was saved successfully.']);
        } else {
            return redirect()->route('home')->with(['error' => 'Something went wrong, please try again later.']);
        }
    }

    protected function inviteYourClinic(Request $request) {
        $data = $request->input();

        var_dump($data);
        die();
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
        return response()->json(['success' => (new APIRequestsController())->getCountry($this->getClientIp())]);
    }

    protected function handleDentistLogin(Request $request) {
        $customMessages = [
            'email.required' => 'Email address is required.',
            'password.required' => 'Password is required.',
        ];
        $this->validate($request, [
            'email' => 'required|max:100',
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
            $api_response = (new APIRequestsController())->dentistLogin($data, true, 'https://dev-api.dentacoin.com/api/login');
        } else {
            $api_response = (new APIRequestsController())->dentistLogin($data, true);
        }

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

        //deleting the dummy image
        unlink($data['image-path']);

        if ($api_response['success']) {
            return response()->json(['success' => true, 'data' => $api_response]);
        } else {
            return response()->json(['error' => true, 'message' => $api_response['errors']]);
        }
    }

    protected function getAfterDentistRegistrationPopup(Request $request) {
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

        return response()->json(['error' => true]);
    }

    protected function handleEnrichProfile(Request $request) {
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

        if ($update_method_response->success) {
            return response()->json(['success' => true, 'data' => '<div class="text-center padding-top-30"><svg class="popup-icon" version="1.1" id="Layer_1" xmlns:x="&ns_extend;" xmlns:i="&ns_ai;" xmlns:graph="&ns_graphs;"xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 64 82"style="enable-background:new 0 0 64 82;" xml:space="preserve"><style type="text/css">.st0{fill:#126585;}  .st1{fill-rule:evenodd;clip-rule:evenodd;fill:#126585;}</style><metadata><sfw  xmlns="&ns_sfw;"><slices></slices><sliceSourceBounds  bottomLeftOrigin="true" height="82" width="64" x="18" y="34"></sliceSourceBounds></sfw></metadata><g transform="translate(0,-952.36218)"><g><path class="st0" d="M31.7,952.4c-0.1,0-0.3,0.1-0.4,0.1l-30,11c-0.8,0.3-1.3,1-1.3,1.9v33c0,7.8,4.4,14.3,10.3,20c5.9,5.7,13.5,10.7,20.5,15.7c0.7,0.5,1.6,0.5,2.3,0c7-5,14.6-10,20.5-15.7c5.9-5.7,10.3-12.2,10.3-20v-33c0-0.8-0.5-1.6-1.3-1.9l-30-11C32.4,952.4,32,952.3,31.7,952.4z M32,956.5l28,10.3v31.6c0,6.3-3.5,11.8-9.1,17.1c-5.2,5-12.2,9.7-18.9,14.4c-6.7-4.7-13.7-9.4-18.9-14.4c-5.5-5.3-9.1-10.8-9.1-17.1v-31.6L32,956.5z"/></g></g><g><g><path class="st1" d="M50.3,25.9c0.6,0.6,1.2,1.2,1.8,1.8c0.9,0.9,0.9,2.5,0,3.4C45.6,37.5,39.1,44,32.6,50.5c-3.3,3.3-3.5,3.3-6.8,0c-3.3-3.3-6.7-6.7-10-10c-0.9-0.9-0.9-2.5,0-3.4c0.6-0.6,1.2-1.2,1.8-1.8c0.9-0.9,2.5-0.9,3.4,0c2.7,2.7,5.4,5.4,8.2,8.2c5.9-5.9,11.7-11.7,17.6-17.6C47.8,25,49.3,25,50.3,25.9z"/></g></g></svg><div class="padding-top-30 padding-bottom-25 dentacoin-login-gateway-fs-20">Your short description was saved successfully.</div></div>']);
        } else {
            return response()->json(['error' => true]);
        }
    }

    protected function patientLogin(Request $request) {
        $this->validate($request, [
            'token' => 'required',
            'id' => 'required'
        ], [
            'token.required' => 'Token is required.',
            'id.required' => 'ID is required.'
        ]);

        $session_arr = [
            'token' => $request->input('token'),
            'id' => $request->input('id'),
            'type' => 'patient'
        ];


        session(['logged_user' => $session_arr]);

        return response()->json(['success' => true]);
    }

    protected function dentistLogin(Request $request) {
        $this->validate($request, [
            'token' => 'required',
            'id' => 'required'
        ], [
            'token.required' => 'Token is required.',
            'id.required' => 'ID is required.'
        ]);

        $session_arr = [
            'token' => $request->input('token'),
            'id' => $request->input('id'),
            'type' => 'dentist'
        ];

        session(['logged_user' => $session_arr]);

        return response()->json(['success' => true]);
    }
}