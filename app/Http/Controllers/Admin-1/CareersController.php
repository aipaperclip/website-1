<?php

namespace App\Http\Controllers\Admin;

use App\CareerBenefit;
use App\JobOffer;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CareersController extends Controller
{
    protected function getView()   {
        return view('admin/pages/all-job-offers', ['posts' => $this->getAllJobOffers()]);
    }

    public function getAllJobOffers() {
        return JobOffer::all()->sortBy('order_id');
    }

    protected function getJobOffer($id)  {
        return JobOffer::where(array('id' => $id))->get()->first();
    }

    protected function addEditJobOffer($id = null, Request $request) {
        if($request->isMethod('post')) {
            $this->validate($request, [
                'title' => 'required',
                'slug' => 'required',
                'text' => 'required',
                'image' => 'required',
            ], [
                'title.required' => 'Title is required.',
                'slug.required' => 'Slug is required.',
                'text.required' => 'Text is required.',
                'image.required' => 'Image is required.',
            ]);

            if(!empty($id)) {
                $job_offer = $this->getJobOffer($id);
                $params = ['success' => ['Job offer was edited successfully.']];
            }else {
                $job_offer = new JobOffer();
                $job_offer->order_id = sizeof($this->getAllJobOffers());
                $params = ['success' => ['New job offer was added successfully.']];
            }

            $job_offer->title = $request->input('title');
            $job_offer->slug = $request->input('slug');
            $job_offer->location = $request->input('location');
            $job_offer->remote_work = $request->input('remote-work');
            $job_offer->text = $request->input('text');
            $job_offer->skills = serialize($request->input('skills'));
            $job_offer->meta_title = $request->input('meta_title');
            $job_offer->meta_description = $request->input('meta_description');
            $job_offer->keywords = $request->input('keywords');
            $job_offer->social_title = $request->input('social_title');
            $job_offer->social_description = $request->input('social_description');
            $job_offer->media_id = $request->input('image');
            $social_media = $request->input('social-image');

            if(!empty($social_media))   {
                $job_offer->social_media_id = $social_media;
            }else {
                $job_offer->social_media_id = null;
            }

            //saving to DB
            $job_offer->save();

            if(!empty($id)) {
                $params['post'] = $job_offer;
            }
            return view('admin/pages/add-edit-job-offer', $params);
        }else {
            if(!empty($id)) {
                return view('admin/pages/add-edit-job-offer', ['post' => $this->getJobOffer($id)]);
            }else {
                return view('admin/pages/add-edit-job-offer');
            }
        }
    }

    protected function deleteJobOffer($id)  {
        $job_offer = JobOffer::where('id', $id)->first();
        if(!empty($job_offer))  {
            //deleting media from DB
            $job_offer->delete();
            return redirect()->route('all-job-offers')->with(['success' => 'Job offer is deleted successfully.']);
        }else {
            return redirect()->route('all-job-offers')->with(['error' => 'Error with deleting.']);
        }
    }


    protected function getBenefitView()   {
        return view('admin/pages/all-benefits', ['posts' => $this->getAllBenefits()]);
    }

    public function getAllBenefits() {
        return CareerBenefit::all()->sortBy('order_id');
    }

    protected function getBenefit($id)  {
        return CareerBenefit::where(array('id' => $id))->get()->first();
    }

    protected function addEditBenefit($id = null, Request $request) {
        if($request->isMethod('post')) {
            $this->validate($request, [
                'text' => 'required',
                'image' => 'required',
            ], [
                'text.required' => 'Text is required.',
                'image.required' => 'Image is required.',
            ]);

            if(!empty($id)) {
                $benefit = $this->getBenefit($id);
                $params = ['success' => ['Benefit was edited successfully.']];
            }else {
                $benefit = new CareerBenefit();
                $benefit->order_id = sizeof($this->getAllBenefits());
                $params = ['success' => ['New benefit was added successfully.']];
            }

            $benefit->text = $request->input('text');
            $benefit->media_id = $request->input('image');
            //saving to DB
            $benefit->save();

            if(!empty($id)) {
                $params['post'] = $benefit;
            }
            return view('admin/pages/add-edit-benefit', $params);
        }else {
            if(!empty($id)) {
                return view('admin/pages/add-edit-benefit', ['post' => $this->getBenefit($id)]);
            }else {
                return view('admin/pages/add-edit-benefit');
            }
        }
    }

    protected function deleteBenefit($id)  {
        $benefit = CareerBenefit::where('id', $id)->first();
        if(!empty($benefit))  {
            //deleting media from DB
            $benefit->delete();
            return redirect()->route('all-benefits')->with(['success' => 'Benefit is deleted successfully.']);
        }else {
            return redirect()->route('all-benefits')->with(['error' => 'Error with deleting.']);
        }
    }
}
