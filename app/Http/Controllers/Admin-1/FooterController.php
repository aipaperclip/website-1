<?php

namespace App\Http\Controllers\Admin;

use App\MenuElement;
use App\PagesHtmlSection;
use App\Section;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class FooterController extends Controller
{
    protected function getView()   {
        return view('admin/pages/all-menu-elements', ['posts' => $this->getAllMenuElements()]);
    }

    protected function getAllMenuElements() {
        return MenuElement::all()->sortByDesc('order_id');
    }

    function getMenuElement($id)  {
        return MenuElement::where(array('id' => $id))->get()->first();
    }

    protected function addEditMenuElement($id = null, Request $request) {
        if($request->isMethod('post')) {
            $this->validate($request, [
                'title' => 'required',
                'type' => 'required',
                'url' => 'required'
            ], [
                'title.required' => 'Title is required.',
                'type.required' => 'Type is required.',
                'url.required' => 'URL is required.',
            ]);

            if(!empty($id)) {
                $menu_element = $this->getMenuElement($id);
                $params = ['success' => ['Menu element was edited successfully.']];
            }else {
                $menu_element = new MenuElement();
                $menu_element->order_id = sizeof($this->getAllMenuElements());
                $params = ['success' => ['New menu element was added successfully.']];
            }

            $menu_element->name = $request->input('title');
            $menu_element->type = $request->input('type');
            $menu_element->url = $request->input('url');
            $media_id = $request->input('image');
            if(!empty($media_id))   {
                $menu_element->media_id = $request->input('image');
            }else {
                $menu_element->media_id = null;
            }
            $new_window = $request->input('new-window');
            if(isset($new_window)) {
                $menu_element->new_window = true;
            }else {
                $menu_element->new_window = false;
            }
            //saving to DB
            $menu_element->save();

            if(!empty($id)) {
                $params['post'] = $this->getMenuElement($id);
            }
            return view('admin/pages/add-edit-menu-element', $params);
        }else {
            if(!empty($id)) {
                return view('admin/pages/add-edit-menu-element', ['post' => $this->getMenuElement($id)]);
            }else {
                return view('admin/pages/add-edit-menu-element');
            }
        }
    }

    protected function deleteMenuElement($id)  {
        $menu_element = MenuElement::where('id', $id)->first();
        if(!empty($menu_element))  {
            //deleting media from DB
            $menu_element->delete();
            return redirect()->route('all-menu-elements')->with(['success' => 'Menu element is deleted successfully.']);
        }else {
            return redirect()->route('all-menu-elements')->with(['error' => 'Error with deleting.']);
        }
    }

    protected function changeUrlOption(Request $request)    {
        echo json_encode(array('success' => view('admin/partials/menu-element-'.$request->input('type').'-option')->render()));
        die();
    }

    protected function getHtmlById($id) {
        return PagesHtmlSection::where(array('id' => $id))->get()->first();
    }

    protected function editCommonTexts(Request $request)    {
        if($request->isMethod('post')) {
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

            return view('admin/pages/edit-common-texts', ['success' => ['Footer common texts were edited successfully.'], 'html_titles' => $this->getTitles(), 'html_sections' => $this->getSections()]);
        }else {
            return view('admin/pages/edit-common-texts', ['html_titles' => $this->getTitles(), 'html_sections' => $this->getSections()]);
        }
    }

    protected function getTitles()  {
        $footer_section_id = Section::where(array('slug' => 'footer'))->get()->first()->id;
        return PagesHtmlSection::where(array('section_id' => $footer_section_id, 'type' => 'title'))->get()->sortBy('order_id')->toArray();
    }

    protected function getSections()  {
        $footer_section_id = Section::where(array('slug' => 'footer'))->get()->first()->id;
        return PagesHtmlSection::where(array('section_id' => $footer_section_id, 'type' => 'section'))->get()->sortBy('order_id')->toArray();
    }
}
