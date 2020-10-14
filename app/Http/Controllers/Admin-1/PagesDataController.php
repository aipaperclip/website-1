<?php

namespace App\Http\Controllers\Admin;

use App\PageMetaData;
use App\PagesHtmlSection;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PagesDataController extends Controller
{
    protected function getView()   {
        return view('admin/pages/all-page-data', ['posts' => $this->getAllPageData()]);
    }

    protected function getAllPageData() {
        return PageMetaData::all();
    }

    protected function getPageData($id) {
        return PageMetaData::where(array('id' => $id))->get()->first();
    }

    protected function getHtmlTitles($id) {
        return PagesHtmlSection::where(array('page_id' => $id, 'type' => 'title'))->get()->sortBy('order_id')->toArray();
    }

    protected function getHtmlSections($id) {
        return PagesHtmlSection::where(array('page_id' => $id, 'type' => 'section'))->get()->sortBy('order_id')->toArray();
    }

    protected function getHtmlById($id) {
        return PagesHtmlSection::where(array('id' => $id))->get()->first();
    }

    protected function editPage($id, Request $request) {
        if($request->isMethod('post')) {
            $page = $this->getPageData($id);
            $page->page_title = $request->input('page_title');
            $page->title = $request->input('title');
            $page->description = $request->input('description');
            $page->keywords = $request->input('keywords');
            $page->social_title = $request->input('social_title');
            $page->social_description = $request->input('social_description');
            $page->media_id = $request->input('image');

            //saving html sections for this page
            if(!empty($request->input('html-titles')))  {
                foreach($request->input('html-titles') as $key=>$value)   {
                    $html_post = $this->getHtmlById($key);
                    $html_post->html = $value;
                    //saving to DB
                    $html_post->save();
                }
            }

            //saving html sections for this page
            if(!empty($request->input('html-sections')))    {
                foreach($request->input('html-sections') as $key=>$value)   {
                    $html_post = $this->getHtmlById($key);
                    $html_post->html = $value;
                    //saving to DB
                    $html_post->save();
                }
            }

            $page->save();
            return view('admin/pages/edit-page', ['success' => ['Page was edited successfully.'], 'post' => $page, 'html_titles' => $this->getHtmlTitles($id), 'html_sections' => $this->getHtmlSections($id)]);
        }else {
            return view('admin/pages/edit-page', ['post' => $this->getPageData($id), 'html_titles' => $this->getHtmlTitles($id), 'html_sections' => $this->getHtmlSections($id)]);
        }
    }
}
