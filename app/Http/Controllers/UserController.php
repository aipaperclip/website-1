<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Input;

class UserController extends Controller {
    public static function instance() {
        return new UserController();
    }

    protected function getForgottenPasswordView() {
        return view('pages/forgotten-password');
    }

    protected function getRecoverPassword() {
        if (!empty(Input::get('token'))) {
            return view('pages/recover-password');
        } else {
            return abort(404);
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

        $api_response = (new APIRequestsController())->dentistLogin($data, true);
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
            return response()->json(['error' => true, 'message' => 'Wrong username or password.']);
        }
    }

    protected function dentistLogin(Request $request) {
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
            //404 if they're trying to send more than 2 files
            if (sizeof($files) > 2) {
                return abort(404);
            } else {
                $allowed = array('png', 'jpg', 'jpeg', 'svg', 'bmp', 'PNG', 'JPG', 'JPEG', 'SVG', 'BMP');
                foreach($files as $file)  {
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
        $api_response = (new APIRequestsController())->dentistRegister($data, $files);
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
    }

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
}