<?php

namespace App\Http\Controllers;

use App\Publications;
use App\UserExpressions;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function getView()   {
        return view("pages/homepage", ['testimonials' => $this->getTestimonials(), 'publications' => $this->getPublications()]);
    }

    public function getPublications()  {
        return Publications::all()->sortBy('order_id');
    }

    public function getTestimonials()  {
        return UserExpressions::where(array('featured' => 1))->get()->sortBy('order_id');
    }
}
