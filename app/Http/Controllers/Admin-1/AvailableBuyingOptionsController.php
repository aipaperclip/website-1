<?php

namespace App\Http\Controllers\Admin;

use App\AvailableBuyingOption;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Route;

class AvailableBuyingOptionsController extends Controller
{
    protected function getExchangePlatformsView()   {
        return view('admin/pages/all-exchange-platforms', ['posts' => $this->getExchangePlatforms()]);
    }

    protected function getWalletsView()   {
        return view('admin/pages/all-wallets', ['posts' => $this->getWallets()]);
    }

    public function getExchangePlatforms()  {
        return AvailableBuyingOption::where(array('type' => 'exchange-platforms'))->get()->sortBy('order_id');
    }

    public function getWallets()  {
        return AvailableBuyingOption::where(array('type' => 'wallets'))->get()->sortBy('order_id');
    }

    protected function getAvailableBuyingOption($id)  {
        return AvailableBuyingOption::where(array('id' => $id))->get()->first();
    }

    protected function addEditAvailableBuyingOption($id = null, Request $request) {
        if($request->isMethod('post')) {
            $this->validate($request, [
                'title' => 'required',
                'link' => 'required',
                'type' => 'required'
            ], [
                'title.required' => 'Title is required.',
                'link.required' => 'Link is required.',
                'type.required' => 'Type is required.'
            ]);

            if(!empty($id)) {
                $available_buying_option = $this->getAvailableBuyingOption($id);
                $params = ['success' => ['Available buying option was edited successfully.']];
            }else {
                $available_buying_option = new AvailableBuyingOption();
                if($request->input('type') == 'exchange-platforms') {
                    $available_buying_option->order_id = sizeof($this->getExchangePlatforms());
                }else if($request->input('type') == 'wallets') {
                    $available_buying_option->order_id = sizeof($this->getWallets());
                }
                $params = ['success' => ['New available buying option was added successfully.']];
            }
            $available_buying_option->title = $request->input('title');
            $available_buying_option->link = $request->input('link');
            $available_buying_option->type = $request->input('type');
            //saving to DB
            $available_buying_option->save();

            if(!empty($id)) {
                $params['post'] = $this->getAvailableBuyingOption($id);
            }
            return view('admin/pages/add-edit-available-buying-option', $params);
        }else {
            if(!empty($id)) {
                return view('admin/pages/add-edit-available-buying-option', ['post' => $this->getAvailableBuyingOption($id)]);
            }else {
                return view('admin/pages/add-edit-available-buying-option');
            }
        }
    }

    protected function deleteAvailableBuyingOption($id)  {
        $available_buying_option = AvailableBuyingOption::where('id', $id)->first();
        if($available_buying_option->type == 'exchange-platforms') {
            $redirect_to_route = 'exchange-platforms';
        }else if($available_buying_option->type == 'wallets') {
            $redirect_to_route = 'wallets';
        }
        if(!empty($available_buying_option))  {
            //deleting media from DB
            $available_buying_option->delete();
            return redirect()->route($redirect_to_route)->with(['success' => 'Available buying option is deleted successfully.']);
        }else {
            return redirect()->route($redirect_to_route)->with(['error' => 'Error with deleting.']);
        }
    }
}
