<?php

namespace App\Http\Controllers\Admin;

use App\Platform;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PlatformsController extends Controller
{
    protected function getView()   {
        return view('admin/pages/all-platforms', ['posts' => $this->getAllPlatforms()]);
    }

    protected function getAllPlatforms() {
        return Platform::all()->sortByDesc('order_id');
    }

    function getPlatform($id)  {
        return Platform::where(array('id' => $id))->get()->first();
    }

    protected function addEditPlatform($id = null, Request $request) {
        if($request->isMethod('post')) {
            $this->validate($request, [
                'slug' => 'required',
            ], [
                'slug.required' => 'Slug is required.',
            ]);

            if(!empty($id)) {
                $platform = $this->getPlatform($id);
                $params = ['success' => ['Platform was edited successfully.']];
            }else {
                $platform = new Platform();
                $params = ['success' => ['New platform was added successfully.']];
            }
            $platform->slug = $request->input('slug');
            $platform->link = $request->input('link');
            $platform->color = $request->input('color');
            $platform->extra_html = $request->input('extra_html');
            $platform->extra_html_patients = $request->input('extra_html_patients');
            $platform->invitation_text_whatsapp = $request->input('invitation_text_whatsapp');
            $platform->invitation_text_twitter = $request->input('invitation_text_twitter');

            $platform_logo_id = $request->input('platform-logo');
            if(!empty($platform_logo_id))   {
                $platform->platform_logo_id = $platform_logo_id;
            }else {
                $platform->platform_logo_id = null;
            }

            //saving to DB
            $platform->save();

            if(!empty($id)) {
                $params['post'] = $this->getPlatform($id);
            }
            return view('admin/pages/add-edit-platform', $params);
        }else {
            if(!empty($id)) {
                return view('admin/pages/add-edit-platform', ['post' => $this->getPlatform($id)]);
            }else {
                return view('admin/pages/add-edit-platform');
            }
        }
    }

    protected function deletePlatform($id)  {
        $platform = Platform::where('id', $id)->first();
        if(!empty($platform))  {
            //deleting media from DB
            $platform->delete();
            return redirect()->route('platforms')->with(['success' => 'Platform is deleted successfully.']);
        }else {
            return redirect()->route('platforms')->with(['error' => 'Error with deleting.']);
        }
    }
}

