<?php

namespace App\Http\Controllers;

use App\Application;
use App\AvailableBuyingOption;
use App\Http\Controllers\Admin\AvailableBuyingOptionsController;
use App\Publications;
use App\UserExpressions;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class HomeController extends Controller
{
    protected function getView()   {
        $latest_blog_articles = DB::connection('mysql2')->select(DB::raw("SELECT `post_title`, `post_name` from dIf_posts WHERE post_status = 'publish' AND post_type = 'post' ORDER BY `post_date` DESC LIMIT 0, 5"));
        $params = ['applications' => $this->getApplications(), 'testimonials' => $this->getFeaturedTestimonials(), 'publications' => $this->getPublications(), 'latest_blog_articles' => $latest_blog_articles, 'exchange_platforms' => (new AvailableBuyingOptionsController())->getExchangePlatforms(), 'wallets' => (new AvailableBuyingOptionsController())->getWallets()];
        $url = 'https://reviews.dentacoin.com/';
        $html = file_get_contents($url);
        preg_match_all('/[^>]class=["\']second[\'"]*>(.*?)<\//', $html, $matches,PREG_PATTERN_ORDER);
        $params['dental_practices'] = $matches[1][0];

        return view("pages/homepage", $params);
    }

    protected function getPublications()  {
        return Publications::where(array('featured' => 1))->get()->sortBy('order_id');
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

