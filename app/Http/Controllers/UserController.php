<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Input;

class UserController extends Controller {
    public static function instance() {
        return new UserController();
    }

    protected function getEditAccountView()   {
        return view('pages/logged-user/edit-account', ['countries' => (new APIRequestsController())->getAllCountries(), 'user_data' => (new APIRequestsController())->getUserData(session('logged_user')['id'])]);
    }

    protected function getManagePrivacyView()   {
        return view('pages/logged-user/manage-privacy');
    }

    protected function getRecoverPassword(Request $request) {
        $this->validate($request, [
            'slug' => 'required'
        ], [
            'slug.required' => 'Slug is required.'
        ]);
        return view('pages/recover-password', ['slug' => $request->input('slug')]);
    }

    protected function getMyProfileView()   {
        $currency_arr = array();
        foreach(Controller::currencies as $currency) {
            $curl = curl_init();
            curl_setopt_array($curl, array(
                CURLOPT_RETURNTRANSFER => 1,
                CURLOPT_URL => 'https://api.coinmarketcap.com/v1/ticker/dentacoin/?convert=' . $currency,
                CURLOPT_SSL_VERIFYPEER => 0
            ));
            curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
            $resp = json_decode(curl_exec($curl));
            curl_close($curl);
            $currency_arr[strtolower($currency)] = (array)$resp[0];
        }

        $view_params = array('currency_arr' => $currency_arr);

        $dcn_balance_api_method_response = (new APIRequestsController())->getDCNBalance();
        if($dcn_balance_api_method_response && $dcn_balance_api_method_response->success) {
            $view_params['dcn_amount'] = $dcn_balance_api_method_response->data;
        }

        $dcn_transactions_history_response = (new \App\Http\Controllers\APIRequestsController())->getDCNTransactions();
        if($dcn_transactions_history_response && $dcn_transactions_history_response->success) {
            $view_params['transaction_history'] = $dcn_transactions_history_response->success;
        }

        return view('pages/logged-user/my-profile', $view_params);
    }

    function checkEmail(Request $request) {
        $data = $this->clearPostData($request->input());
        $api_response = (new APIRequestsController())->checkIfFreeEmail($data['email']);
        if($api_response->success) {
            return response()->json(['success' => true]);
        } else if(!$api_response->success) {
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
        if(!empty(session('logged_user')) && (session('logged_user')['type'] == 'dentist' || session('logged_user')['type'] == 'patient'))    {
            //LOGGED
            return true;
        }else {
            //NOT LOGGED
            return false;
        }
    }

    public function checkDentistSession()   {
        if(!empty(session('logged_user')) && session('logged_user')['type'] == 'dentist')    {
            //LOGGED
            return true;
        }else {
            //NOT LOGGED
            return false;
        }
    }

    public function checkPatientSession()   {
        if(!empty(session('logged_user')) && session('logged_user')['type'] == 'patient')    {
            //LOGGED
            return true;
        }else {
            //NOT LOGGED
            return false;
        }
    }

    protected function userLogout(Request $request) {
        $request->session()->forget('logged_user');
        return redirect()->route('home');
    }

    protected function updateAccount(Request $request) {
        $arr_with_required_data = array(
            'full-name' => 'required|max:250',
            'email' => 'required|max:100'
        );

        $arr_with_required_data_responces = array(
            'full-name.required' => 'Name is required.',
            'email.required' => 'Email address is required.'
        );

        //if logged user is dentist require the specialisations data
        if($this->checkDentistSession()) {
            $arr_with_required_data['specialisations'] = 'required';
            $arr_with_required_data['country'] = 'required';
            $arr_with_required_data['address'] = 'required';
            $arr_with_required_data_responces['specialisations.required'] = 'Specialisations are required.';
            $arr_with_required_data_responces['country.required'] = 'Country is required.';
            $arr_with_required_data_responces['address.required'] = 'Postal Address is required.';
        }

        $this->validate($request, $arr_with_required_data, $arr_with_required_data_responces);

        $data = $this->clearPostData($request->input());
        $files = $request->file();

        //check email validation
        if(!filter_var($data['email'], FILTER_VALIDATE_EMAIL))   {
            return redirect()->route('edit-account')->with(['error' => 'Your form was not sent. Please try again with valid email.']);
        }

        if(!empty($files)) {
            //404 if they're trying to send more than 2 files
            if(sizeof($files) > 2) {
                return abort(404);
            } else {
                $allowed = array('png', 'jpg', 'jpeg', 'svg', 'bmp', 'PNG', 'JPG', 'JPEG', 'SVG', 'BMP');
                foreach($files as $file)  {
                    //checking the file size
                    if($file->getSize() > MAX_UPL_SIZE) {
                        return redirect()->route('edit-account', ['slug' => $request->input('post-slug')])->with(['error' => 'Your form was not sent. Files can be only with with maximum size of '.number_format(MAX_UPL_SIZE / 1048576).'MB. Please try again.']);
                    }
                    //checking file format
                    if(!in_array(pathinfo($file->getClientOriginalName(), PATHINFO_EXTENSION), $allowed)) {
                        return redirect()->route('edit-account')->with(['error' => 'Your form was not sent. Files can be only with .png, .jpg, .jpeg, .svg, .bmp formats. Please try again.']);
                    }
                    //checking if error in file
                    if($file->getError()) {
                        return redirect()->route('edit-account')->with(['error' => 'Your form was not sent. There is error with one or more of the files, please try with other files. Please try again.']);
                    }
                }
            }
        }

        $post_fields_arr = array(
            'name' => $data['full-name'],
            'email' => $data['email']
        );

        if(isset($data['country_code']) && !empty($data['country_code'])) {
            $post_fields_arr['country_code'] = $data['country_code'];
        }

        if(isset($data['address']) && !empty($data['address'])) {
            $post_fields_arr['address'] = $data['address'];
        }

        if(isset($data['dcn_address']) && !empty($data['dcn_address'])) {
            $post_fields_arr['dcn_address'] = $data['dcn_address'];
        }

        if($this->checkDentistSession()) {
            $post_fields_arr['specialisations'] = $data['specialisations'];
        }

        //if the logged user is dentist he must provide website and phone
        if(isset($data['website']) || isset($data['phone'])) {
            if(isset($data['website'])) {
                if(!empty($data['website'])) {
                    $post_fields_arr['website'] = $data['website'];
                }else {
                    return redirect()->route('edit-account')->with(['error' => 'Website is required']);
                }
            }
            if(isset($data['phone'])) {
                if(!empty($data['phone'])) {
                    $post_fields_arr['phone'] = $data['phone'];
                }else {
                    return redirect()->route('edit-account')->with(['error' => 'Phone is required']);
                }
            }
        }

        //if user selected new avatar submit it to the api
        if(!empty($files['image'])) {
            $post_fields_arr['avatar'] = curl_file_create($files['image']->getPathName(), 'image/'.pathinfo($files['image']->getClientOriginalName(), PATHINFO_EXTENSION), $files['image']->getClientOriginalName());
        }

        //handle the API response
        $api_response = (new APIRequestsController())->updateUserData($post_fields_arr);
        if($api_response) {
            return redirect()->route('edit-account')->with(['success' => 'Your data was updated successfully.']);
        } else {
            return redirect()->route('edit-account')->with(['errors_response' => $api_response['errors']]);
        }
    }

    protected function addDcnAddress(Request $request) {
        $data = $this->clearPostData($request->input());
        $post_fields_arr = array(
            'dcn_address' => $data['address']
        );

        //handle the API response
        $api_response = (new APIRequestsController())->updateUserData($post_fields_arr);
        if($api_response) {
            return redirect()->route('my-profile')->with(['success' => 'Your Wallet Address was saved successfully.']);
        } else {
            return redirect()->route('my-profile')->with(['errors_response' => $api_response['errors']]);
        }
    }

    protected function getForgottenPasswordView() {
        return view('pages/forgotten-password');
    }

    protected function forgottenPasswordSubmit(Request $request) {
        $this->validate($request, [
            'email' => 'required|max:100'
        ], [
            'email.required' => 'Email is required.',
        ]);

        $data = $this->clearPostData($request->input());

        //check email validation
        if(!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            return redirect()->route('forgotten-password')->with(['error' => 'Your form was not sent. Please try again with valid email.']);
        }

        $api_response = (new APIRequestsController())->generatePasswordRecoveryToken($data['email']);
        if($api_response->success) {
            $body = '<!DOCTYPE html><html><head></head><body><div style="font-size: 16px;">Seems like you forgot your password for Dentacoin. If this is true, click below to reset your password.<br><br><br><form target="_blank" method="POST" action="'.BASE_URL.'password-recover"><input type="hidden" name="slug" value="'.$api_response->data.'"/><input type="submit" value="PASSWORD RESET" style="font-size: 20px;color: #126585;background-color: white;padding: 10px 20px;text-decoration: none;font-weight: bold;border-radius: 4px;border: 2px solid #126585;cursor: pointer;"/><input type="hidden" name="_token" value="'.csrf_token().'"></form></div></body></html>';

            Mail::send(array(), array(), function($message) use ($body, $data) {
                $message->to($data['email'])->subject('Dentacoin - Request for password change');
                $message->from(EMAIL_SENDER, 'Dentacoin')->replyTo(EMAIL_SENDER, 'Dentacoin');
                $message->setBody($body, 'text/html');
            });

            if(count(Mail::failures()) > 0) {
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
        if($recover_method_response->success) {
            return redirect()->route('home')->with(['success' => 'Your password has been changed successfully.']);
        } else {
            return redirect()->route('home')->with(['error' => 'Your password change failed, please try again later.']);
        }
    }

    protected function deleteMyProfile(Request $request) {
        $api_response = (new APIRequestsController())->deleteProfile();
        if($api_response->success) {
            $this->userLogout($request);
            return redirect()->route('home')->with(['success' => 'Your profile has been deleted successfullym.']);
        } else {
            return redirect()->route('manage-privacy')->with(['error' => 'Your profile deletion failed. Please try again later.']);
        }
    }

    protected function getCurrentUserData() {
        return response()->json(['success' => (new APIRequestsController())->getUserData(session('logged_user')['id'])]);
    }

    protected function validateCivicKyc(Request $request) {
        $this->validate($request, [
            'token' => 'required'
        ], [
            'token.required' => 'Token is required.'
        ]);

        $civic_validation_response = (new APIRequestsController())->validateCivicToken($request->input('token'));
        return response()->json(['error' => 'Civic authentication failed. Please try again later.']);

        if($civic_validation_response->success) {
            /*$update_user_data_response = (new APIRequestsController())->updateUserData(array('civic_kyc' => 1));
            if(!$update_user_data_response) {
                return response()->json(['error' => 'Civic authentication failed.']);
            }*/
            return response()->json(['success' => true]);
        } else {
            return response()->json(['error' => 'Civic authentication failed.']);
        }
    }

    protected function withdraw(Request $request) {
        $this->validate($request, [
            'amount' => 'required',
            'address' => 'required'
        ], [
            'amount.required' => 'Amount is required.',
            'address.required' => 'Wallet Address is required.'
        ]);

        $data = $this->clearPostData($request->input());

        $dcn_balance_api_method_response = (new APIRequestsController())->getDCNBalance();
        $failed_withdraw_error_msg = 'Withdraw failed, please try again later or contact <a href=\'mailto:admin@dentacoin.com\'>admin@dentacoin.com</a>.';
        if($dcn_balance_api_method_response->success) {
            //checking if the withdrawing amount is more than the balance
            if((int)$data['amount'] > $dcn_balance_api_method_response->data) {
                return redirect()->route('my-profile')->with(['error' => $failed_withdraw_error_msg]);
            } else {
                $current_user_data = (new APIRequestsController())->getUserData(session('logged_user')['id']);
                if($current_user_data->dcn_address != $data['address']) {
                    //updating the user address(CoreDB) only if he did type different address than the already saved in the CoreDB
                    $api_response = (new APIRequestsController())->updateUserData(array('dcn_address' => $data['address']));
                    if(!$api_response) {
                        return redirect()->route('my-profile')->with(['error' => $failed_withdraw_error_msg]);
                    } else {
                        $withdraw_response = (new APIRequestsController())->withdraw($data['amount']);
                        if($withdraw_response && $withdraw_response->success && $withdraw_response->data->transaction->success) {
                            return redirect()->route('my-profile')->with(['success' => "Your transaction was confirmed. Check here  <a href='https://etherscan.io/tx/".$withdraw_response->data->transaction->message."' class='etherscan-link' target='_blank'>Etherscan</a>."]);
                        } else {
                            return redirect()->route('my-profile')->with(['error' => $failed_withdraw_error_msg]);
                        }
                    }
                } else {
                    $withdraw_response = (new APIRequestsController())->withdraw($data['amount']);
                    if($withdraw_response && $withdraw_response->success && $withdraw_response->data->transaction->success) {
                        return redirect()->route('my-profile')->with(['success' => "Your transaction was confirmed. Check here  <a href='https://etherscan.io/tx/".$withdraw_response->data->transaction->message."' class='etherscan-link' target='_blank'>Etherscan</a>."]);
                    } else {
                        return redirect()->route('my-profile')->with(['error' => $failed_withdraw_error_msg]);
                    }
                }
            }
        } else {
            return redirect()->route('my-profile')->with(['error' => $failed_withdraw_error_msg]);
        }
    }

    public function getCountryNameById($id) {
        $countries = (new APIRequestsController())->getAllCountries();
        return $countries[$id - 1]->name;
    }

    protected function downloadGDPRData() {
        $api_response = (new APIRequestsController())->getGDPRDownloadLink();
        if($api_response->success) {
            return response()->json(['success' => $api_response->data]);
        } else {
            return response()->json(['error' => 'Downloading your personal data is not possible at the moment, please try again later.']);
        }
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

        $api_response = (new APIRequestsController())->dentistLogin($data);
        if($api_response['success']) {
            $approved_statuses = array('approved', 'pending', 'test');
            if($api_response['data']['self_deleted'] != NULL) {
                return response()->json(['error' => true, 'message' => 'This account is deleted, you cannot log in with this account anymore.']);
            } else if(!in_array($api_response['data']['status'], $approved_statuses)) {
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
        if(!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            return redirect()->route('home')->with(['error' => 'Your form was not sent. Please try again with valid email.']);
        }

        //handle the API response
        $api_response = (new APIRequestsController())->dentistLogin($data);

        if($api_response['success']) {
            $approved_statuses = array('approved', 'pending', 'test');
            if($api_response['data']['self_deleted'] != NULL) {
                return redirect()->route('home')->with(['error' => 'This account is deleted, you cannot log in with this account anymore.']);
            } else if(!in_array($api_response['data']['status'], $approved_statuses)) {
                return redirect()->route('home')->with(['error' => 'This account is not approved by Dentacoin team yet, please try again later.']);
            } else {
                $session_arr = [
                    'token' => $api_response['token'],
                    'id' => $api_response['data']['id'],
                    'type' => 'dentist'
                ];

                session(['logged_user' => $session_arr]);
                return redirect()->route('home');
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
            'captcha' => 'required|captcha|max:5'
        ], $customMessages);

        $data = $request->input();
        $files = $request->file();

        //check email validation
        if(!filter_var($data['email'], FILTER_VALIDATE_EMAIL))   {
            return redirect()->route('home')->with(['error' => 'Your form was not sent. Please try again with valid email.']);
        }

        if(!empty($files)) {
            //404 if they're trying to send more than 2 files
            if(sizeof($files) > 2) {
                return abort(404);
            } else {
                $allowed = array('png', 'jpg', 'jpeg', 'svg', 'bmp', 'PNG', 'JPG', 'JPEG', 'SVG', 'BMP');
                foreach($files as $file)  {
                    //checking the file size
                    if($file->getSize() > MAX_UPL_SIZE) {
                        return redirect()->route('home', ['slug' => $request->input('post-slug')])->with(['error' => 'Your form was not sent. Files can be only with with maximum size of '.number_format(MAX_UPL_SIZE / 1048576).'MB. Please try again.']);
                    }
                    //checking file format
                    if(!in_array(pathinfo($file->getClientOriginalName(), PATHINFO_EXTENSION), $allowed)) {
                        return redirect()->route('home')->with(['error' => 'Your form was not sent. Files can be only with .png, .jpg, .jpeg, .svg, .bmp formats. Please try again.']);
                    }
                    //checking if error in file
                    if($file->getError()) {
                        return redirect()->route('home')->with(['error' => 'Your form was not sent. There is error with one or more of the files, please try with other files. Please try again.']);
                    }
                }
            }
        } else {
            return redirect()->route('home')->with(['error' => 'Please select avatar and try again.']);
        }

        //handle the API response
        $api_response = (new APIRequestsController())->dentistRegister($data, $files);
        if($api_response['success']) {
            if($data['user-type'] == 'dentist') {
                $popup_view = view('partials/popup-dentist-profile-verification');
                return redirect()->route('home')->with(['success' => true, 'popup-html' => $popup_view->render()]);
            }else if($data['user-type'] == 'clinic') {
                $popup_view = view('partials/popup-clinic-profile-verification');
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
            'id.required' => 'Email is required.'
        ]);

        $session_arr = [
            'token' => $request->input('token'),
            'id' => $request->input('id'),
            'type' => 'patient'
        ];

        $current_logging_patient = (new APIRequestsController())->getUserData($request->input('id'));
        if($current_logging_patient->self_deleted != NULL) {
            return redirect()->route('home')->with(['error' => 'This account is deleted, you cannot log in with this account anymore.']);
        } else {
            session(['logged_user' => $session_arr]);

            return redirect()->route('home');
        }
    }

    //dentist can add profile description while waiting for approval from Dentacoin admin
    protected function enrichProfile(Request $request) {
        $this->validate($request, [
            'description' => 'required'
        ], [
            'description.required' => 'Description is required.'
        ]);

        $data = $request->input();

        var_dump($data);
        die();
    }

    //dentist can add profile description while waiting for approval from Dentacoin admin
    protected function inviteYourClinic(Request $request) {
        $data = $request->input();

        var_dump($data);
        die();
    }

    //dentist can add profile description while waiting for approval from Dentacoin admin
    protected function setCustomCookie(Request $request) {
        if(!empty(Input::get('slug'))) {
            var_dump(Input::get('slug'));
            var_dump($this->decrypt(Input::get('slug')));
            die();
        } else {
            return abort(404);
        }
    }
}