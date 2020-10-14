<?php

namespace App\Http\Controllers\Admin;

use App\UserExpressions;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class UserExpressionsController extends Controller
{
    protected function getView()   {
        return view('admin/pages/all-testimonials', ['posts' => $this->getAllTestimonials()]);
    }

    protected function getAllTestimonials() {
        return UserExpressions::all()->sortByDesc('order_id');
    }

    function getTestimonial($id)  {
        return UserExpressions::where(array('id' => $id))->get()->first();
    }

    protected function addEditTestimonial($id = null, Request $request) {
        if($request->isMethod('post')) {
            $this->validate($request, [
                'text' => 'required'
            ], [
                'text.required' => 'Text is required.'
            ]);

            if(!empty($id)) {
                $testimonial = $this->getTestimonial($id);
                $params = ['success' => ['Testimonial was edited successfully.']];
            }else {
                $testimonial = new UserExpressions();
                $testimonial->order_id = sizeof($this->getAllTestimonials());
                $params = ['success' => ['New testimonial was added successfully.']];
            }
            $testimonial->name_job = $request->input('name-job');
            $testimonial->location = $request->input('location');
            $testimonial->text = $request->input('text');
            $media_id = $request->input('image');
            if(!empty($media_id))   {
                $testimonial->media_id = $request->input('image');
            }else {
                $testimonial->media_id = null;
            }
            $featured = $request->input('featured');
            if(isset($featured)) {
                $testimonial->featured = true;
            }else {
                $testimonial->featured = false;
            }
            $visible_mobile = $request->input('visible-mobile');
            if(isset($visible_mobile)) {
                $testimonial->visible_mobile = true;
            }else {
                $testimonial->visible_mobile = false;
            }
            $visible_assurance = $request->input('visible-assurance');
            if(isset($visible_assurance)) {
                $testimonial->visible_assurance = true;
            }else {
                $testimonial->visible_assurance = false;
            }
            //saving to DB
            $testimonial->save();

            if(!empty($id)) {
                $params['post'] = $this->getTestimonial($id);
            }
            return view('admin/pages/add-edit-testimonial', $params);
        }else {
            if(!empty($id)) {
                return view('admin/pages/add-edit-testimonial', ['post' => $this->getTestimonial($id)]);
            }else {
                return view('admin/pages/add-edit-testimonial');
            }
        }
    }

    protected function deleteTestimonial($id)  {
        $testimonial = UserExpressions::where('id', $id)->first();
        if(!empty($testimonial))  {
            //deleting media from DB
            $testimonial->delete();
            return redirect()->route('all-testimonials')->with(['success' => 'Testimonial is deleted successfully.']);
        }else {
            return redirect()->route('all-testimonials')->with(['error' => 'Error with deleting.']);
        }
    }
}
