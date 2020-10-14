<?php

namespace App\Http\Controllers\Admin;

use App\Application;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ApplicationsController extends Controller
{
    protected function getView()   {
        return view('admin/pages/all-applications', ['posts' => $this->getAllApplications()]);
    }

    protected function getAllApplications() {
        return Application::all()->sortByDesc('order_id');
    }

    function getApplication($id)  {
        return Application::where(array('id' => $id))->get()->first();
    }

    protected function addEditApplication($id = null, Request $request) {
        if($request->isMethod('post')) {
            $this->validate($request, [
                'title' => 'required',
                'slug' => 'required',
                'text' => 'required',
                'homepage-logo' => 'required',
                'popup-logo' => 'required'/*,
                'popup-media' => 'required'*/
            ], [
                'title.required' => 'Title is required.',
                'slug.required' => 'Slug is required.',
                'text.required' => 'Text is required.',
                'homepage-logo.required' => 'Homepage logo is required.',
                'popup-logo.required' => 'Popup logo is required.'/*,
                'popup-media.required' => 'Popup media is required.'*/
            ]);

            if(!empty($id)) {
                $application = $this->getApplication($id);
                $params = ['success' => ['Application was edited successfully.']];
            }else {
                $application = new Application();
                $application->order_id = sizeof($this->getAllApplications());
                $params = ['success' => ['New application was added successfully.']];
            }
            $application->title = $request->input('title');
            $application->slug = $request->input('slug');
            $application->link = $request->input('link');
            $application->text = $request->input('text');
            $application->dentists_text = $request->input('dentists-text');

            $logo_id = $request->input('homepage-logo');
            if(!empty($logo_id))   {
                $application->logo_id = $logo_id;
            }else {
                $application->logo_id = null;
            }

            $popup_logo_id = $request->input('popup-logo');
            if(!empty($popup_logo_id))   {
                $application->popup_logo_id = $popup_logo_id;
            }else {
                $application->popup_logo_id = null;
            }

            $media_id = $request->input('popup-media');
            if(!empty($media_id))   {
                $application->media_id = $media_id;
            }else {
                $application->media_id = null;
            }

            //saving to DB
            $application->save();

            if(!empty($id)) {
                $params['post'] = $this->getApplication($id);
            }
            return view('admin/pages/add-edit-application', $params);
        }else {
            if(!empty($id)) {
                return view('admin/pages/add-edit-application', ['post' => $this->getApplication($id)]);
            }else {
                return view('admin/pages/add-edit-application');
            }
        }
    }

    protected function deleteApplication($id)  {
        $application = Application::where('id', $id)->first();
        if(!empty($application))  {
            //deleting media from DB
            $application->delete();
            return redirect()->route('applications')->with(['success' => 'Application is deleted successfully.']);
        }else {
            return redirect()->route('applications')->with(['error' => 'Error with deleting.']);
        }
    }
}

