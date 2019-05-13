<?php

namespace App\Http\Controllers;

use App\Application;
use App\Http\Controllers\Admin\AvailableBuyingOptionsController;
use App\Publications;
use App\UserExpressions;
use Illuminate\Support\Facades\DB;

class HomeController extends Controller
{
    protected function getLoggedView()   {
        //LOGGED show hub
        $params = ['applications' => $this->getApplications()];
        return view('pages/logged-user/homepage', $params);
    }

    protected function getNotLoggedView()   {
        $latest_blog_articles = DB::connection('mysql2')->select(DB::raw("SELECT `post_title`, `post_name` from dIf_posts WHERE post_status = 'publish' AND post_type = 'post' ORDER BY `post_date` DESC LIMIT 0, 5"));
        /*$dump = file_get_contents('https://blog.dentacoin.com/dumb-latest-posts/');
        var_dump($dump);
        var_dump(json_decode($dump));
        die();*/

        $params = ['applications' => $this->getApplications(), 'testimonials' => $this->getFeaturedTestimonials(), 'publications' => $this->getPublications(), 'latest_blog_articles' => $latest_blog_articles, 'exchange_platforms' => (new AvailableBuyingOptionsController())->getExchangePlatforms(), 'wallets' => (new AvailableBuyingOptionsController())->getWallets()];
        return view('pages/homepage', $params);
    }

    public function getView() {
        if((new UserController())->checkSession()) {
            return $this->getLoggedView();
        } else {
            return $this->getNotLoggedView();
        }
    }

    protected function getPublications()  {
        return Publications::where(array('featured' => 1))->get()->sortBy('order_id');
    }

    public function getApplications()  {
        return Application::all()->sortBy('order_id');
    }

    protected function getFeaturedTestimonials()  {
        if($this->isMobile())  {
            return UserExpressions::where(array('visible_mobile' => 1))->get()->sortBy('order_id');
        }else {
            return UserExpressions::where(array('featured' => 1))->get()->sortBy('order_id');
        }
    }

    public function redirectToHome() {
        return redirect()->route('home');
    }
}

