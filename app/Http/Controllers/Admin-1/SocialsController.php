<?php

namespace App\Http\Controllers\Admin;

use App\Social;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class SocialsController extends Controller
{
    protected function getView()   {
        return view('admin/pages/all-socials', ['posts' => $this->getAllSocials()]);
    }

    public function getAllSocials() {
        return Social::all()->sortBy('order_id');
    }

    protected function getSocial($id)  {
        return Social::where(array('id' => $id))->get()->first();
    }

    protected function addEditSocial($id = null, Request $request) {
        if($request->isMethod('post')) {
            $this->validate($request, [
                'link' => 'required',
                'image' => 'required',
            ], [
                'link.required' => 'Link is required.',
                'image.required' => 'Image is required.',
            ]);

            if(!empty($id)) {
                $social = $this->getSocial($id);
                $params = ['success' => ['Social was edited successfully.']];
            }else {
                $social = new Social();
                $social->order_id = sizeof($this->getAllSocials());
                $params = ['success' => ['New social was added successfully.']];
            }
            $social->link = $request->input('link');
            $social->media_id = $request->input('image');
            //saving to DB
            $social->save();

            if(!empty($id)) {
                $params['post'] = $social;
            }
            return view('admin/pages/add-edit-social', $params);
        }else {
            if(!empty($id)) {
                return view('admin/pages/add-edit-social', ['post' => $this->getSocial($id)]);
            }else {
                return view('admin/pages/add-edit-social');
            }
        }
    }

    protected function deleteSocial($id)  {
        $social = Social::where('id', $id)->first();
        if(!empty($social))  {
            //deleting media from DB
            $social->delete();
            return redirect()->route('all-socials')->with(['success' => 'Social is deleted successfully.']);
        }else {
            return redirect()->route('all-socials')->with(['error' => 'Error with deleting.']);
        }
    }
}
