<?php

namespace App\Http\Controllers;

use App\ApiEndpoint;
use App\Application;
use App\Http\Controllers\Admin\AvailableBuyingOptionsController;
use App\Http\Controllers\Admin\RoadmapController;
use App\Http\Controllers\Admin\VideoExpressionsController;
use App\LocationType;
use App\MapContinent;
use App\MapCountry;
use App\Publications;
use App\UserExpressions;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;

class HomeController extends Controller
{
    public function getView() {
        if((new UserController())->checkSession()) {
            //return $this->getLoggedView();
            $slug = (new \App\Http\Controllers\Controller())->encrypt(session('logged_user')['id'], getenv('API_ENCRYPTION_METHOD'), getenv('API_ENCRYPTION_KEY'));
            $type = (new \App\Http\Controllers\Controller())->encrypt(session('logged_user')['type'], getenv('API_ENCRYPTION_METHOD'), getenv('API_ENCRYPTION_KEY'));
            $token = (new \App\Http\Controllers\Controller())->encrypt(session('logged_user')['token'], getenv('API_ENCRYPTION_METHOD'), getenv('API_ENCRYPTION_KEY'));

            if (!empty(getenv('API_DOMAIN'))) {
                if (getenv('API_DOMAIN') == 'https://api.dentacoin.com') {
                    return Redirect::to('https://hub.dentacoin.com/custom-cookie?platform=dentacoin&slug='.urlencode($slug).'&type='.urlencode($type).'&token='.urlencode($token));
                } else if (getenv('API_DOMAIN') == 'https://dev-api.dentacoin.com') {
                    return Redirect::to('https://dev-account.dentacoin.com/custom-cookie?platform=dentacoin&slug='.urlencode($slug).'&type='.urlencode($type).'&token='.urlencode($token));
                }
            } else {
                return Redirect::to('https://hub.dentacoin.com/custom-cookie?platform=dentacoin&slug='.urlencode($slug).'&type='.urlencode($type).'&token='.urlencode($token));
            }
        } else {
            return $this->getNotLoggedView();
        }
    }

    protected function getLoggedView()   {
        //LOGGED show hub
        $params = ['applications' => $this->getApplications()];
        return view('pages/logged-user/homepage', $params);
    }

    protected function getNotLoggedView()   {
        //$latest_blog_articles = DB::connection('mysql2')->select(DB::raw("SELECT `post_title`, `post_name` from dIf_posts WHERE post_status = 'publish' AND post_type = 'post' ORDER BY `post_date` DESC LIMIT 0, 5"));

        // $params = ['applications' => $this->getApplications(), 'testimonials' => $this->getFeaturedTestimonials(), 'publications' => $this->getPublications(), 'exchange_platforms' => (new AvailableBuyingOptionsController())->getExchangePlatforms(), 'wallets' => (new AvailableBuyingOptionsController())->getWallets()];

        return view('pages/homepage');
    }

    protected function getUsersPageView() {
        $params = array('video_expressions' => (new VideoExpressionsController())->getUserVideoExpression(), 'user_expressions' => (new \App\Http\Controllers\Admin\UserExpressionsController())->getUserTestimonial(), 'mobile_device' => $this->isMobile());

        return view('pages/users', $params);
    }

    protected function getDentistsPageView() {
        $params = array('video_expressions' => (new VideoExpressionsController())->getDentistVideoExpression(), 'user_expressions' => (new \App\Http\Controllers\Admin\UserExpressionsController())->getDentistTestimonial(), 'mobile_device' => $this->isMobile());

        return view('pages/dentists', $params);
    }

    protected function getTradersPageView() {
        return view('pages/traders', array('exchange_platforms' => (new AvailableBuyingOptionsController())->getExchangePlatforms(), 'roadmap_years' => (new RoadmapController())->getRoadmapYears(), 'mobile_device' => $this->isMobile(), 'max_supply' => $this->getDCNMaxSupply(), 'total_supply' => $this->getDCNTotalSupply()));
    }

    protected function getPublications()  {
        return Publications::where(array('featured' => 1))->get()->sortBy('order_id');
    }

    public function getApplications()  {
        return Application::all()->sortBy('order_id');
    }

    protected function getFeaturedTestimonials()  {
        if($this->isMobile())  {
            return UserExpressions::where(array('mobile_visible' => 1))->get()->sortBy('order_id');
        }else {
            return UserExpressions::where(array('featured' => 1, 'desktop_visible' => 1))->get()->sortBy('order_id');
        }
    }

    public function redirectToHome() {
        return redirect()->route('home');
    }

    protected function getDCNMaxSupply() {
        return ApiEndpoint::where(array('slug' => 'maxDCN'))->get()->first();
    }

    protected function getDCNTotalSupply() {
        return ApiEndpoint::where(array('slug' => 'totalDCN'))->get()->first();
    }

    protected function takeHomepageData(Request $request)  {
        $type = $request->input('type');
        if (!empty($type)) {
            switch ($type) {
                case 'users':
                    $usersPageContent = view('partials/users-page-content', array('video_expressions' => (new VideoExpressionsController())->getUserVideoExpression(), 'user_expressions' => (new \App\Http\Controllers\Admin\UserExpressionsController())->getUserTestimonial(), 'mobile_device' => $this->isMobile()));

                    return response()->json(['success' => true, 'data' => array('usersPageData' => $usersPageContent->render())]);
                    break;
                case 'dentists':
                    $dentistsPageContent = view('partials/dentists-page-content', array('video_expressions' => (new VideoExpressionsController())->getDentistVideoExpression(), 'user_expressions' => (new \App\Http\Controllers\Admin\UserExpressionsController())->getDentistTestimonial(), 'mobile_device' => $this->isMobile()));

                    return response()->json(['success' => true, 'data' => array('dentistsPageData' => $dentistsPageContent->render())]);
                    break;
                case 'traders':
                    $tradersPageContent = view('partials/traders-page-content', array('exchange_platforms' => (new AvailableBuyingOptionsController())->getExchangePlatforms(), 'roadmap_years' => (new RoadmapController())->getRoadmapYears(), 'mobile_device' => $this->isMobile(), 'max_supply' => $this->getDCNMaxSupply(), 'total_supply' => $this->getDCNTotalSupply()));

                    return response()->json(['success' => true, 'data' => array('tradersPageData' => $tradersPageContent->render())]);
                    break;
            }
        } else {
            $usersPageContent = view('partials/users-page-content', array('video_expressions' => (new VideoExpressionsController())->getUserVideoExpression(), 'user_expressions' => (new \App\Http\Controllers\Admin\UserExpressionsController())->getUserTestimonial(), 'mobile_device' => $this->isMobile()));
            $dentistsPageContent = view('partials/dentists-page-content', array('video_expressions' => (new VideoExpressionsController())->getDentistVideoExpression(), 'user_expressions' => (new \App\Http\Controllers\Admin\UserExpressionsController())->getDentistTestimonial(), 'mobile_device' => $this->isMobile()));
            $tradersPageContent = view('partials/traders-page-content', array('exchange_platforms' => (new AvailableBuyingOptionsController())->getExchangePlatforms(), 'roadmap_years' => (new RoadmapController())->getRoadmapYears(), 'mobile_device' => $this->isMobile(), 'max_supply' => $this->getDCNMaxSupply(), 'total_supply' => $this->getDCNTotalSupply()));

            return response()->json(['success' => true, 'data' => array('usersPageData' => $usersPageContent->render(), 'dentistsPageData' => $dentistsPageContent->render(), 'tradersPageData' => $tradersPageContent->render())]);
        }
    }
}

