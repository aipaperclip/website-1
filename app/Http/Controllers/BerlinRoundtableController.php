<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class BerlinRoundtableController extends Controller
{
    public function getView()   {
        return view('pages/berlin-roundtable');
    }

    protected function submitForm(Request $request)   {
        /*$this->validate($request, [
            'fname' => 'required|max:100',
            'lname' => 'required|max:100',
            'email' => 'required|email|max:255',
            'job-title' => 'required|max:255',
            'company' => 'required|max:255',
            'website' => 'required|max:500',
            'company-profile' => 'required|max:255',
            'captcha' => 'required|captcha|max:5'
        ], [
            'fname.required' => 'First name is required.',
            'fname.max' => 'First name must be with maximum length of 100 symbols.',
            'lname.required' => 'Last name is required.',
            'lname.max' => 'Last name must be with maximum length of 100 symbols.',
            'email.required' => 'Email is required.',
            'email.email' => 'Email must be valid email.',
            'email.max' => 'Email must be with maximum length of 100 symbols.',
            'company.required' => 'Company is required.',
            'company.max' => 'Company must be with maximum length of 255 symbols.',
            'website.required' => 'Website is required.',
            'website.max' => 'Website must be with maximum length of 500 symbols.',
            'company-profile.required' => 'Company profile is required.',
            'company-profile.max' => 'Company profile must be with maximum length of 255 symbols.',
            'captcha.required' => 'Captcha is required.',
            'captcha.captcha' => 'Please type the code from the captcha image.'
        ]);*/

        $body = '<b>First name:</b> '.$request->input('fname').'<br><b>Last name:</b> '.$request->input('lname').'<br><b>Email:</b> '.$request->input('email').'<br><b>Job title:</b> '.$request->input('job-title').'<br><b>Company:</b> '.$request->input('company').'<br><b>Website:</b> '.$request->input('website').'<br><b>Company profile:</b> '.$request->input('company-profile').'<br>';
        $additional_field = $request->input('why-do-you-want-to-join');
        if(!empty($additional_field)) {
            $body .= '<b>Why do you want to join the roundtable?:</b> '.$request->input('why-do-you-want-to-join');
        }

        Mail::send(array(), array(), function($message) use ($body) {
            //$message->to(array('ali.hashem@dentacoin.com', 'donika.kraeva@dentacoin.com'))->subject('New apply from Dentacoin Berling Roundtable form')->from(EMAIL_SENDER, EMAIL_SENDER)->replyTo(EMAIL_SENDER, EMAIL_SENDER)->setBody($body, 'text/html');
            $message->to(array('absoabso@abv.bg'))->subject('New apply from Dentacoin Berling Roundtable form')->from(EMAIL_SENDER, EMAIL_SENDER)->replyTo(EMAIL_SENDER, EMAIL_SENDER)->setBody($body, 'text/html');
        });

        return response()->json(['success' => 'Thank you! Your request has been sent successfully. We will contact you shortly.']);
    }
}
