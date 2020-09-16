<?php

namespace App\Http\Controllers;

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
            return Redirect::to('https://hub.dentacoin.com/custom-cookie?platform=dentacoin&slug='.urlencode($slug).'&type='.urlencode($type).'&token='.urlencode($token));
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

    protected function getMapDataForTheView() {
        $arrOnlyWithCodes = array();
        $innerParams = array();
        $codes = DB::table('map_countries')->select('map_countries.code')->get();
        if (!empty($codes)) {
            foreach ($codes as $code) {
                array_push($arrOnlyWithCodes, mb_strtolower($code->code));
            }
        }

        $continentCountByCountries = (new APIRequestsController())->getMapData(array('action' => 'all-partners-and-non-partners-count-splited-by-countries', 'country' => $arrOnlyWithCodes));
        if (!empty($continentCountByCountries) && is_object($continentCountByCountries) && property_exists($continentCountByCountries, 'success') && $continentCountByCountries->success) {
            $continentCountByCountries = $continentCountByCountries->data;

            // adding to core db locations the count of dentacoin db location splitted by countries
            $dentacoinDbLocations = DB::select("SELECT `map_countries`.`code`, COUNT(*) as `locations_count` FROM `map_locations` LEFT JOIN `map_countries` ON `map_locations`.`country_id` = `map_countries`.`id` WHERE `map_locations`.`type_id` = 2 OR `map_locations`.`type_id` = 3 OR `map_locations`.`type_id` = 4 GROUP BY `map_locations`.`country_id`");
            foreach ($continentCountByCountries as $code => $count) {
                foreach ($dentacoinDbLocations as $dentacoinDbLocation) {
                    if (mb_strtolower($dentacoinDbLocation->code) == $code) {
                        $continentCountByCountries->$code += $dentacoinDbLocation->locations_count;
                    }
                }
            }

            array_push($innerParams, $continentCountByCountries);
        }

        $arrayWithAllLocations = array();
        $arrayWithAllLocationsSplittedByCategory = array();
        /*$partnerLocationType = LocationType::where(array('id' => 1))->get()->first();
        $labsLocationType = LocationType::where(array('id' => 2))->get()->first();
        $suppliersLocationType = LocationType::where(array('id' => 3))->get()->first();
        $industryPartnersLocationType = LocationType::where(array('id' => 4))->get()->first();
        $nonPartnerLocationType = LocationType::where(array('id' => 5))->get()->first();*/

        $locationTypes = LocationType::all();

        // insert partners and non partners
        $partnersAndNonPartners = (new APIRequestsController())->getMapData(array('action' => 'all-partners-and-non-partners-data-by-countries', 'country' => $arrOnlyWithCodes));
        if (!empty($partnersAndNonPartners) && is_object($partnersAndNonPartners) && property_exists($partnersAndNonPartners, 'success') && $partnersAndNonPartners->success) {
            $partnersData = array();
            $nonPartnersData = array();
            foreach ($partnersAndNonPartners->data as $singleDataRecord) {
                $singleDataRecordArr = array(
                    'id' => $singleDataRecord->id,
                    'name' => $singleDataRecord->name,
                    'lat' => $singleDataRecord->lat,
                    'lng' => $singleDataRecord->lon,
                    'source' => 'core-db',
                    'country_code' => $singleDataRecord->country_code
                );

                if ($singleDataRecord->is_partner) {
                    $singleDataRecordArr['marker'] = $locationTypes[0]->media->name;
                    $singleDataRecordArr['category'] = 'category-'.$locationTypes[0]->id;
                    array_push($partnersData, $singleDataRecordArr);
                } else {
                    $singleDataRecordArr['marker'] = $locationTypes[4]->media->name;
                    $singleDataRecordArr['category'] = 'category-'.$locationTypes[4]->id;
                    array_push($nonPartnersData, $singleDataRecordArr);
                }

                array_push($arrayWithAllLocations, $singleDataRecordArr);
            }
            array_push($arrayWithAllLocationsSplittedByCategory, array(
                'id' => 1,
                'name' => $locationTypes[0]->name,
                'color' => $locationTypes[0]->color,
                'data' => $partnersData
            ));
            array_push($arrayWithAllLocationsSplittedByCategory, array(
                'id' => 5,
                'name' => $locationTypes[4]->name,
                'color' => $locationTypes[4]->color,
                'data' => $nonPartnersData
            ));
        }

        $labs = (new DentacoinMapController())->getDentacoinLocations(2);
        $labsData = array();
        foreach ($labs as $lab) {
            $singleDataRecordArr = array(
                'id' => $lab->id,
                'name' => $lab->clinic_name,
                'lat' => $lab->lat,
                'lng' => $lab->lng,
                'marker' => $locationTypes[1]->media->name,
                'source' => 'dentacoin-db',
                'country_code' => mb_strtolower($lab->country_code),
                'category' => 'category-'.$locationTypes[1]->id
            );

            array_push($arrayWithAllLocations, $singleDataRecordArr);
            array_push($labsData, $singleDataRecordArr);
        }
        array_push($arrayWithAllLocationsSplittedByCategory, array(
            'id' => 2,
            'name' => $locationTypes[1]->name,
            'color' => $locationTypes[1]->color,
            'data' => $labsData
        ));

        $suppliers = (new DentacoinMapController())->getDentacoinLocations(3);
        $suppliersData = array();
        foreach ($suppliers as $supplier) {
            $singleDataRecordArr = array(
                'id' => $supplier->id,
                'name' => $supplier->clinic_name,
                'lat' => $supplier->lat,
                'lng' => $supplier->lng,
                'marker' => $locationTypes[2]->media->name,
                'source' => 'dentacoin-db',
                'country_code' => mb_strtolower($supplier->country_code),
                'category' => 'category-'.$locationTypes[2]->id
            );

            array_push($arrayWithAllLocations, $singleDataRecordArr);
            array_push($suppliersData, $singleDataRecordArr);
        }
        array_push($arrayWithAllLocationsSplittedByCategory, array(
            'id' => 3,
            'name' => $locationTypes[2]->name,
            'color' => $locationTypes[2]->color,
            'data' => $suppliersData
        ));

        $industryPartners = (new DentacoinMapController())->getDentacoinLocations(4);
        $industryPartnersData = array();
        foreach ($industryPartners as $industryPartner) {
            $singleDataRecordArr = array(
                'id' => $industryPartner->id,
                'name' => $industryPartner->clinic_name,
                'lat' => $industryPartner->lat,
                'lng' => $industryPartner->lng,
                'marker' => $locationTypes[3]->media->name,
                'source' => 'dentacoin-db',
                'country_code' => mb_strtolower($industryPartner->country_code),
                'category' => 'category-'.$locationTypes[3]->id
            );

            array_push($arrayWithAllLocations, $singleDataRecordArr);
            array_push($industryPartnersData, $singleDataRecordArr);
        }
        array_push($arrayWithAllLocationsSplittedByCategory, array(
            'id' => 4,
            'name' => $locationTypes[3]->name,
            'color' => $locationTypes[3]->color,
            'data' => $industryPartnersData
        ));

        usort($arrayWithAllLocationsSplittedByCategory, function ($item1, $item2) {
            return $item1['id'] <=> $item2['id'];
        });

        array_push($innerParams, $arrayWithAllLocationsSplittedByCategory);
        array_push($innerParams, $arrayWithAllLocations);

        return $innerParams;
    }

    protected function getContinents() {
        $continents = MapContinent::all()->sortBy('order_id');
        foreach ($continents as $continent) {
            $countries = MapCountry::where(array('continent_id' => $continent->id))->get()->sortBy('order_id');
            $continent['countries'] = $countries;
        }

        return $continents;
    }

    protected function getUsersPageView() {
        $params = array('video_expressions' => (new VideoExpressionsController())->getUserVideoExpression(), 'user_expressions' => (new \App\Http\Controllers\Admin\UserExpressionsController())->getUserTestimonial(), 'mobile_device' => $this->isMobile());

        list($continentCountByCountries, $arrayWithAllLocationsSplittedByCategory, $arrayWithAllLocations) = $this->getMapDataForTheView();
        $params['continentCountByCountries'] = $continentCountByCountries;
        $params['continents'] = $this->getContinents();
        $params['arrayWithAllLocations'] = json_encode($arrayWithAllLocations);
        $params['location_types'] = LocationType::all()->sortBy('order_id');
        $params['arrayWithAllLocationsSplittedByCategory'] = $arrayWithAllLocationsSplittedByCategory;

        return view('pages/users', $params);
    }

    protected function getDentistsPageView() {
        $params = array('video_expressions' => (new VideoExpressionsController())->getDentistVideoExpression(), 'user_expressions' => (new \App\Http\Controllers\Admin\UserExpressionsController())->getDentistTestimonial(), 'mobile_device' => $this->isMobile());

        list($continentCountByCountries, $arrayWithAllLocationsSplittedByCategory, $arrayWithAllLocations) = $this->getMapDataForTheView();
        $params['continentCountByCountries'] = $continentCountByCountries;
        $params['continents'] = $this->getContinents();
        $params['arrayWithAllLocations'] = json_encode($arrayWithAllLocations);
        $params['location_types'] = LocationType::all()->sortBy('order_id');
        $params['arrayWithAllLocationsSplittedByCategory'] = $arrayWithAllLocationsSplittedByCategory;

        return view('pages/dentists', $params);
    }

    protected function getTradersPageView() {
        return view('pages/traders', array('exchange_platforms' => (new AvailableBuyingOptionsController())->getExchangePlatforms(), 'roadmap_years' => (new RoadmapController())->getRoadmapYears(), 'mobile_device' => $this->isMobile()));
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

    protected function takeHomepageData(Request $request)  {
        $type = $request->input('type');
        if (!empty($type)) {
            switch ($type) {
                case 'users':
                    list($continentCountByCountries, $arrayWithAllLocationsSplittedByCategory, $arrayWithAllLocations) = $this->getMapDataForTheView();

                    $usersPageContent = view('partials/users-page-content', array('video_expressions' => (new VideoExpressionsController())->getUserVideoExpression(), 'user_expressions' => (new \App\Http\Controllers\Admin\UserExpressionsController())->getUserTestimonial(), 'mobile_device' => $this->isMobile(), 'continentCountByCountries' => $continentCountByCountries, 'continents' => $this->getContinents(), 'arrayWithAllLocations' => json_encode($arrayWithAllLocations), 'location_types' => LocationType::all()->sortBy('order_id'), 'arrayWithAllLocationsSplittedByCategory' => $arrayWithAllLocationsSplittedByCategory));

                    return response()->json(['success' => true, 'data' => array('usersPageData' => $usersPageContent->render())]);
                    break;
                case 'dentists':
                    list($continentCountByCountries, $arrayWithAllLocationsSplittedByCategory, $arrayWithAllLocations) = $this->getMapDataForTheView();

                    $dentistsPageContent = view('partials/dentists-page-content', array('video_expressions' => (new VideoExpressionsController())->getDentistVideoExpression(), 'user_expressions' => (new \App\Http\Controllers\Admin\UserExpressionsController())->getDentistTestimonial(), 'mobile_device' => $this->isMobile(), 'continentCountByCountries' => $continentCountByCountries, 'continents' => $this->getContinents(), 'arrayWithAllLocations' => json_encode($arrayWithAllLocations), 'location_types' => LocationType::all()->sortBy('order_id'), 'arrayWithAllLocationsSplittedByCategory' => $arrayWithAllLocationsSplittedByCategory));

                    return response()->json(['success' => true, 'data' => array('dentistsPageData' => $dentistsPageContent->render())]);
                    break;
                case 'traders':
                    $tradersPageContent = view('partials/traders-page-content', array('exchange_platforms' => (new AvailableBuyingOptionsController())->getExchangePlatforms(), 'roadmap_years' => (new RoadmapController())->getRoadmapYears(), 'mobile_device' => $this->isMobile()));

                    return response()->json(['success' => true, 'data' => array('tradersPageData' => $tradersPageContent->render())]);
                    break;
            }
        } else {
            list($continentCountByCountries, $arrayWithAllLocationsSplittedByCategory, $arrayWithAllLocations) = $this->getMapDataForTheView();

            $usersPageContent = view('partials/users-page-content', array('video_expressions' => (new VideoExpressionsController())->getUserVideoExpression(), 'user_expressions' => (new \App\Http\Controllers\Admin\UserExpressionsController())->getUserTestimonial(), 'mobile_device' => $this->isMobile(), 'continentCountByCountries' => $continentCountByCountries, 'continents' => $this->getContinents(), 'arrayWithAllLocations' => json_encode($arrayWithAllLocations), 'location_types' => LocationType::all()->sortBy('order_id'), 'arrayWithAllLocationsSplittedByCategory' => $arrayWithAllLocationsSplittedByCategory));
            $dentistsPageContent = view('partials/dentists-page-content', array('video_expressions' => (new VideoExpressionsController())->getDentistVideoExpression(), 'user_expressions' => (new \App\Http\Controllers\Admin\UserExpressionsController())->getDentistTestimonial(), 'mobile_device' => $this->isMobile(), 'continentCountByCountries' => $continentCountByCountries, 'continents' => $this->getContinents(), 'arrayWithAllLocations' => json_encode($arrayWithAllLocations), 'location_types' => LocationType::all()->sortBy('order_id'), 'arrayWithAllLocationsSplittedByCategory' => $arrayWithAllLocationsSplittedByCategory));
            $tradersPageContent = view('partials/traders-page-content', array('exchange_platforms' => (new AvailableBuyingOptionsController())->getExchangePlatforms(), 'roadmap_years' => (new RoadmapController())->getRoadmapYears(), 'mobile_device' => $this->isMobile()));

            return response()->json(['success' => true, 'data' => array('usersPageData' => $usersPageContent->render(), 'dentistsPageData' => $dentistsPageContent->render(), 'tradersPageData' => $tradersPageContent->render())]);
        }
    }
}

