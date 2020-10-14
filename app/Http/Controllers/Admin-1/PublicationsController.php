<?php

namespace App\Http\Controllers\Admin;

use App\Publications;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Carbon\Carbon;

class PublicationsController extends Controller
{
    protected function getView()   {
        return view('admin/pages/all-publications', ['posts' => $this->getAllPublications()]);
    }

    public function getAllPublications() {
        return Publications::all()->sortByDesc('order_id');
    }

    protected function getPublication($id)  {
        return Publications::where(array('id' => $id))->get()->first();
    }

    protected function addEditPublication($id = null, Request $request) {
        if($request->isMethod('post')) {
            $this->validate($request, [
                'title' => 'required',
                'headline' => 'required',
                'link' => 'required',
                'text' => 'required',
                'image' => 'required',
            ], [
                'title.required' => 'Title is required.',
                'headline.required' => 'Headline is required.',
                'link.required' => 'Link is required.',
                'text.required' => 'Text is required.',
                'image.required' => 'Image is required.'
            ]);

            if(!empty($id)) {
                $publication = $this->getPublication($id);
                $params = ['success' => ['Testimonial was edited successfully.']];
            }else {
                $publication = new Publications();
                $publication->order_id = sizeof($this->getAllPublications());
                $params = ['success' => ['New publication was added successfully.']];
            }
            $publication->title = $request->input('title');
            $publication->headline = $request->input('headline');
            $publication->link = $request->input('link');
            $publication->text = $request->input('text');
            $publication->created_at = date('Y-m-d H:i:s', strtotime($request->input('created-at')));
            $media_id = $request->input('image');
            if(!empty($media_id))   {
                $publication->media_id = $request->input('image');
            }else {
                $publication->media_id = null;
            }
            $featured = $request->input('featured');
            if(isset($featured)) {
                $publication->featured = true;
            }else {
                $publication->featured = false;
            }
            //saving to DB
            $publication->save();

            if(!empty($id)) {
                $params['post'] = $publication;
            }
            return view('admin/pages/add-edit-publication', $params);
        }else {
            if(!empty($id)) {
                return view('admin/pages/add-edit-publication', ['post' => $this->getPublication($id)]);
            }else {
                return view('admin/pages/add-edit-publication');
            }
        }
    }

    protected function deletePublication($id)  {
        $publication = Publications::where('id', $id)->first();
        if(!empty($publication))  {
            //deleting media from DB
            $publication->delete();
            return redirect()->route('publications')->with(['success' => 'Publication is deleted successfully.']);
        }else {
            return redirect()->route('publications')->with(['error' => 'Error with deleting.']);
        }
    }
}
