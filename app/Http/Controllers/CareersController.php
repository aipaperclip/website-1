<?php

namespace App\Http\Controllers;

use App\JobOffer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class CareersController extends Controller
{
    public function getView()   {
        return view('pages/careers', ['benefits' => (new \App\Http\Controllers\Admin\CareersController())->getAllBenefits(), 'job_offers' => (new \App\Http\Controllers\Admin\CareersController())->getAllJobOffers()]);
    }

    public function getSingleView($slug) {
        $job_offer = $this->getJobOfferBySlug($slug);
        $prev_job_offer = JobOffer::where(array('order_id' => $job_offer->order_id - 1))->get()->first();
        $next_job_offer = JobOffer::where(array('order_id' => $job_offer->order_id + 1))->get()->first();
        return view('pages/single-job-offer', ['job_offer' => $job_offer, 'benefits' => (new \App\Http\Controllers\Admin\CareersController())->getAllBenefits(), 'prev' => $prev_job_offer, 'next' => $next_job_offer]);
    }

    protected function getJobOfferBySlug($slug)  {
        return JobOffer::where(array('slug' => $slug))->get()->first();
    }

    protected function submitApplyPosition(Request $request)    {
        $this->validate($request, [
            'user-name' => 'required|max:100',
            'email' => 'required|max:100',
            'phone' => 'required|max:50',
            'captcha' => 'required|captcha|max:5'
        ], [
            'user-name.required' => 'Name is required.',
            'user-name.max' => 'Name must be with maximum length of 100 symbols.',
            'email.required' => 'Email is required.',
            'email.max' => 'Email must be with maximum length of 100 symbols.',
            'phone.required' => 'Phone is required.',
            'phone.max' => 'Phone must be with maximum length of 50 symbols.',
            'captcha.required' => 'Captcha is required.',
            'captcha.captcha' => 'Please type the code from the captcha image.'
        ]);

        $data = $request->input();
        $files = $request->file();

        //check email validation
        if(!filter_var($data['email'], FILTER_VALIDATE_EMAIL))   {
            return redirect()->route('careers', ['slug' => $request->input('post-slug')])->with(['error' => 'Your form was not sent. Please try again with valid email.']);
        }

        if(!empty($files))    {
            //404 if they're trying to send more than 2 files
            if(sizeof($files) > 2) {
                return abort(404);
            }else {
                $allowed = array('pdf', 'doc', 'docx', 'ppt', 'pptx', 'odt', 'rtf', 'PDF', 'DOC', 'DOCX', 'PPT', 'PPTX', 'ODT', 'RTF');
                foreach($files as $file)  {
                    //checking the file size
                    if($file->getSize() > MAX_UPL_SIZE) {
                        return redirect()->route('careers', ['slug' => $request->input('post-slug')])->with(['error' => 'Your form was not sent. Files can be only with with maximum size of '.number_format(MAX_UPL_SIZE / 1048576).'MB. Please try again.']);
                    }
                    //checking file format
                    if(!in_array(pathinfo($file->getClientOriginalName(), PATHINFO_EXTENSION), $allowed)) {
                        return redirect()->route('careers', ['slug' => $request->input('post-slug')])->with(['error' => 'Your form was not sent. Files can be only with .pdf, .doc, docx, ppt, pptx, odt, rtf formats. Please try again.']);
                    }
                    //checking if error in file
                    if($file->getError()) {
                        return redirect()->route('careers', ['slug' => $request->input('post-slug')])->with(['error' => 'Your form was not sent. There is error with one or more of the files, please try with other files. Please try again.']);
                    }
                }
            }
        }

        $body = '<strong>Name: </strong>'.trim($data['user-name']).'<br><strong>Phone: </strong>'.trim($data['phone']).'<br><strong>Message: </strong>'.trim($data['message']);

        if(!empty($data['portfolio']))  {
            $body.='<br><strong>Portfolio link: </strong>'.'<a href="'.trim($data['portfolio']).'" target="_blank">'.trim($data['portfolio']).'</a>';
        }

        //submit email
        Mail::send(array(), array(), function($message) use ($data, $body, $files) {
            $message->to(JOB_APPLIES_EMAIL_RECEIVER)->subject('New apply from Dentacoin Careers page - '.$data['post-title'])->from($data['email'])->setBody($body, 'text/html');

            if(sizeof($files > 0)) {
                foreach($files as $file) {
                    $message->attach($file->getRealPath(), array(
                            'as' => $file->getClientOriginalName(), // If you want you can change original name to custom name
                            'mime' => $file->getMimeType()
                        )
                    );
                }
            }
        });
        return redirect()->route('careers', ['slug' => $request->input('post-slug')])->with(['success' => 'Thank you! Your job application has been sent successfully. Only selected candidates will be contacted for interviews.']);
    }
}
