<?php

namespace App\Http\Controllers;

use App\Publications;
use App\UserExpressions;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;

class UserExpressionsController extends Controller
{
    const POSTS_PER_PAGE = 8;

    protected function getView($page)   {
        //if $page more than the pagescount redirect 404
        return view('pages/testimonials', ['testimonials' => $this->getTestimonials($page), 'pages' => $this->getPagesCount(), 'page' => $page]);
    }

    protected function getTestimonials($page = null)  {
        if(!empty($page))  {
            $offset = ($page - 1) * self::POSTS_PER_PAGE;
        }else {
            $offset = 0;
        }
        return UserExpressions::offset($offset)->limit(self::POSTS_PER_PAGE)->get()->sortBy('order_id');
    }

    protected function getAllTestimonials()  {
        return UserExpressions::all()->sortBy('order_id');
    }

    protected function getPagesCount()    {
        return ceil(sizeof($this->getAllTestimonials()) / self::POSTS_PER_PAGE);
    }
}
