<?php

namespace App\Http\Controllers\Admin;

use App\AdminUser;
use App\ApiEndpoint;
use Illuminate\Contracts\Session\Session;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class MainController extends Controller
{
    protected function getView()   {
        return view('admin/pages/dashboard');
    }

    public function getAdminAccess()    {
        if($this->checkLogin()) {
            return $this->getView();
        }else {
            return view('admin/pages/login');
        }
    }

    public function checkLogin()   {
        if(!empty(session('logged_admin')) && session('logged_admin') == true)    {
            //LOGGED
            return true;
        }else {
            //NOT LOGGED
            return false;
        }
    }

    protected function logout(Request $request)    {
        if($request->session()->has('logged_admin'))    {
            $request->session()->forget('logged_admin');
        }
        return redirect()->route('admin-access');
    }

    protected function authenticateAdmin(Request $request) {
        $this->validate($request, [
            'username' => 'required|max:30',
            'password' => 'required|max:30',
            'captcha' => 'required|captcha|max:5'
        ], [
            'username.required' => 'Username is required.',
            'password.required' => 'Password is required.',
            'captcha.required' => 'Captcha is required.',
            'captcha.captcha' => 'Please type the code from the captcha image.',
        ]);

        if(!empty(AdminUser::where(array('username' => $request->input('username'), 'password' => hash_pbkdf2('sha256', $request->input('password'), '', 10000, 32)))->get()->first()))   {
            session(['logged_admin' => true]);
            return redirect()->route('admin-access');
        }else {
            return redirect()->route('admin-access')->with(['error' => 'Wrong account!']);
        }
    }

    public function updatePostsOrder($table, $request)  {
        if(!empty($request->input('order_object'))) {
            $looping_query = '';
            foreach ($request->input('order_object') as $key => $value) {
                $looping_query .= " WHEN '" . $key . "' THEN " . $value;
            }
            DB::statement("UPDATE `" . $table . "` SET `order_id` = CASE `id` " . $looping_query . " ELSE `order_id` END");
            echo json_encode(array('success' => 'New order have been saved successfully.'));
            die();
        }
    }

    protected function getGuideView()   {
        return view('admin/pages/guide');
    }

    protected function getAdditionalsView(Request $request)   {
        if($request->isMethod('post')) {
            //clearing all records before inserting
            ApiEndpoint::truncate();
            if(sizeof($request->input('api-endpoints')) > 0)    {
                foreach($request->input('api-endpoints') as $key => $value) {
                    $api_end_point = new ApiEndpoint();
                    $api_end_point->slug = $key;
                    $api_end_point->data = $value['data'];
                    $api_end_point->name = $value['name'];

                    $api_end_point->save();
                }
            }

            return redirect()->route('additionals')->with(['success' => 'Edited successfully.']);
        }
        return view('admin/pages/additionals', ['api_endpoints' => $this->getApiEndpoints()]);
    }

    protected function getApiEndpoints()  {
        return ApiEndpoint::all();
    }

    public function getApiEndpoint($slug)  {
        return ApiEndpoint::where(array('slug' => $slug))->get()->first();
    }
}
