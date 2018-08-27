<?php

namespace App\Http\Controllers;

use App\Application;
use App\Publications;
use App\UserExpressions;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    protected function getView()   {
        return view("pages/homepage", ['applications' => $this->getApplications(), 'testimonials' => $this->getFeaturedTestimonials(), 'publications' => $this->getPublications()]);
    }

    protected function getPublications()  {
        return Publications::all()->sortBy('order_id');
    }

    protected function getApplications()  {
        return Application::all()->sortBy('order_id');
    }

    protected function getFeaturedTestimonials()  {
        if($this->isMobile())  {
            return UserExpressions::where(array('visible_mobile' => 1))->get()->sortBy('order_id');
        }else {
            return UserExpressions::where(array('featured' => 1))->get()->sortBy('order_id');
        }
    }
}
