<?php

namespace App\Http\Controllers;

use App\Publications;
use App\UserExpressions;
use Illuminate\Http\Request;

class PrivacyPolicyController extends Controller
{
    protected function getView()   {
        if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
            $ip = $_SERVER['HTTP_CLIENT_IP'];
        } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
        } else {
            $ip = $_SERVER['REMOTE_ADDR'];
        }
        var_dump($ip);
        var_dump($_SERVER['SERVER_ADDR']);
        var_dump($_SERVER['SERVER_PORT']);
        die();
        return view('pages/privacy-policy');
    }
}
