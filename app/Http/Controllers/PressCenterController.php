<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Admin\PublicationsController;
use App\Publications;
use App\UserExpressions;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class PressCenterController extends Controller
{
    protected function getView($page)   {
        $pages_count = $this->getPagesCount();
        //if $page more than the pagescount redirect 404
        if((int)$page > $pages_count || (int)$page < 1)  {
            return abort(404);
        }
        return view('pages/press-center', ['posts' => $this->getPublicationsInRange($page), 'pages' => $pages_count, 'page' => $page]);
    }

    protected function getPublicationsInRange($page = null)  {
        if(!empty($page))  {
            $offset = ($page - 1) * self::POSTS_PER_PAGE;
        }else {
            $offset = 0;
        }
        return Publications::offset($offset)->limit(self::POSTS_PER_PAGE)->get()->sortBy('order_id');
    }

    protected function getPublications()   {
        return (new PublicationsController())->getAllPublications();
    }

    protected function getPagesCount()    {
        return ceil(sizeof($this->getPublications()) / self::POSTS_PER_PAGE);
    }

    protected function getPopupView()   {
        $view = view('partials/media-inquiries-popup');
        $view = $view->render();
        return response()->json(['success' => $view]);
    }

    protected function submitMediaInquiries(Request $request)   {
        $this->validate($request, [
            'sender-name' => 'required|max:100',
            'email' => 'required|max:100',
            'media' => 'required|max:100',
            'country' => 'required|max:300',
            'reason' => 'required|max:500',
            'answer' => 'required|max:3000'
        ], [
            'sender-name.required' => 'Name is required.',
            'sender-name.max' => 'Name must be with maximum length of 100 symbols.',
            'email.required' => 'Email is required.',
            'email.max' => 'Email must be with maximum length of 100 symbols.',
            'media.required' => 'Media is required.',
            'media.max' => 'Media must be with maximum length of 100 symbols.',
            'country.required' => 'Country is required.',
            'country.max' => 'Country must be with maximum length of 300 symbols.',
            'reason.required' => 'Reason for contact is required.',
            'reason.max' => 'Reason for contact must be with maximum length of 500 symbols.',
            'answer.required' => 'Answer is required and maximum length of 3000 symbols.',
            'answer.max' => 'Answer must be with maximum length of 3000 symbols.',
        ]);

        $data = $request->input();
        $files = $request->file();

        //check email validation
        if(!filter_var($data['email'], FILTER_VALIDATE_EMAIL))   {
            return redirect()->route('press-center', ['id' => 1])->with(['error' => 'Your form was not sent. Please try again with valid email.']);
        }
        if(!empty($files))    {
            //404 if they're trying to send more than 2 files
            if(sizeof($files) > 2) {
                return abort(404);
            }else {
                $allowed = array('pdf', 'doc', 'docx', 'ppt', 'pptx', 'odt', 'rtf', 'xls', 'xlsx', 'PDF', 'DOC', 'DOCX', 'PPT', 'PPTX', 'ODT', 'RTF', 'XLS', 'XLSX');
                foreach($files as $file)  {
                    //checking the file size
                    if($file->getSize() > MAX_UPL_SIZE) {
                        return redirect()->route('press-center', ['id' => 1])->with(['error' => 'Your form was not sent. Files can be only with with maximum size of '.number_format(MAX_UPL_SIZE / 1048576).'MB. Please try again.']);
                    }
                    //checking file format
                    if(!in_array(pathinfo($file->getClientOriginalName(), PATHINFO_EXTENSION), $allowed)) {
                        return redirect()->route('press-center', ['id' => 1])->with(['error' => 'Your form was not sent. Files can be only with .pdf, .doc, docx, ppt, pptx, odt, rtf, xls or xlsx formats. Please try again.']);
                    }
                    //checking if error in file
                    if($file->getError()) {
                        return redirect()->route('press-center', ['id' => 1])->with(['error' => 'Your form was not sent. There is error with one or more of the files, please try with other files. Please try again.']);
                    }
                }
            }
        }

        $body = '<strong>Name: </strong>'.$data['sender-name'].'<br><strong>Media: </strong>'.$data['media'].'<br><strong>Country: </strong>'.$data['country'].'<br><strong>Reason: </strong>'.$data['reason'].'<br><strong>Answer: </strong>'.$data['answer'];

        //submit email
        Mail::send(array(), array(), function($message) use ($data, $body, $files) {
            $message->to(EMAIL_RECEIVER)->subject($data['reason'])->from($data['email'])->setBody($body, 'text/html');

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
        return redirect()->route('press-center', ['id' => 1])->with(['success' => 'Your form was sent successfully. We will contact you as soon as possible. Thank you.']);
    }
}
