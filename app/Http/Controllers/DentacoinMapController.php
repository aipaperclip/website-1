<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DentacoinMapController extends Controller
{
    protected function getLabsSuppliersAndIndustryPartners(Request $request) {
        $this->validate($request, [
            'country-code' => 'required'
        ], [
            'country-code.required' => 'Country code is required.'
        ]);

        $labs = $this->getDentacoinLocations(2, $request->input('country-code'));
        $suppliers = $this->getDentacoinLocations(3, $request->input('country-code'));
        $industryPartners = $this->getDentacoinLocations(4, $request->input('country-code'));

        if (!empty($labs) || !empty($suppliers) || !empty($industryPartners)) {
            return response()->json(['success' => true, 'data' => array(
                'labs' => $labs,
                'suppliers' => $suppliers,
                'industryPartners' => $industryPartners
            )]);
        } else {
            return response()->json(['error' => true]);
        }
    }

    public function getDentacoinLocations($id, $countryCode = null) {
        if (!empty($countryCode)) {
            $whereArr = array('map_locations.type_id' => $id, 'map_countries.code' => mb_strtoupper($countryCode));
        } else {
            $whereArr = array('map_locations.type_id' => $id);
        }

        return DB::table('map_locations')
            ->leftJoin('map_countries', 'map_locations.country_id', '=', 'map_countries.id')
            ->leftJoin('clinics', 'map_locations.clinic_id', '=', 'clinics.id')
            ->leftJoin('location_types', 'map_locations.type_id', '=', 'location_types.id')
            ->leftJoin('media as clinic_media', 'clinics.media_id', '=', 'clinic_media.id')
            ->select('map_locations.*', 'clinics.name as clinic_name', 'clinics.link as clinic_link', 'location_types.id as location_type_id', 'clinic_media.name as clinic_media', 'clinic_media.alt as clinic_media_alt', 'map_countries.code as country_code')
            ->select('map_locations.*', 'clinics.name as clinic_name', 'clinics.link as clinic_link', 'location_types.id as location_type_id', 'clinic_media.name as clinic_media', 'clinic_media.alt as clinic_media_alt', 'map_countries.code as country_code')
            ->where($whereArr)
            ->get()->toArray();
    }

    protected function getMapData(Request $request) {
        $this->validate($request, [
            'action' => 'required'
        ], [
            'action.required' => 'Action is required.'
        ]);

        $action = $request->input('action');

        switch($action) {
            case 'get-continent-locations-count':
                $codesArr = $request->input('data');
                $continentsCount = array();
                foreach ($codesArr as $key => $code) {
                    $continentCountByCountries = (new APIRequestsController())->getMapData(array('action' => 'all-partners-and-non-partners-count-by-countries', 'country' => json_decode($code)));

                    if (!empty($continentCountByCountries) && is_object($continentCountByCountries) && property_exists($continentCountByCountries, 'success') && $continentCountByCountries->success) {
                        $continentsCount[$key] = $continentCountByCountries->data;
                    }
                }

                return response()->json(['success' => true, 'data' => $continentsCount]);
                break;
            case 'get-continent-stats':
                $codes = $request->input('data');
                $continentCountByCountries = (new APIRequestsController())->getMapData(array('action' => 'all-partners-and-non-partners-count-by-countries', 'country' => json_decode($codes)));

                if (!empty($continentCountByCountries) && is_object($continentCountByCountries) && property_exists($continentCountByCountries, 'success') && $continentCountByCountries->success) {
                    return response()->json(['success' => true, 'data' => $continentCountByCountries->data]);
                } else {
                    return response()->json(['error' => true]);
                }
                break;
            case 'combined-count-by-multiple-country':
                $codes = $request->input('data');
                $partnersCountByContinent = (new APIRequestsController())->getMapData(array('action' => 'combined-count-by-multiple-country', 'country' => json_decode($codes)));

                if (!empty($partnersCountByContinent) && is_object($partnersCountByContinent) && property_exists($partnersCountByContinent, 'success') && $partnersCountByContinent->success) {
                    return response()->json(['success' => true, 'data' => $partnersCountByContinent->data]);
                } else {
                    return response()->json(['error' => true]);
                }
                break;
            case 'get-partners-stats-by-continent':
                $codes = $request->input('data');
                $partnersCountByContinent = (new APIRequestsController())->getMapData(array('action' => 'all-partners-by-multiple-country', 'country' => json_decode($codes)));

                if (!empty($partnersCountByContinent) && is_object($partnersCountByContinent) && property_exists($partnersCountByContinent, 'success') && $partnersCountByContinent->success) {
                    return response()->json(['success' => true, 'data' => $partnersCountByContinent->data]);
                } else {
                    return response()->json(['error' => true]);
                }
                break;
            case 'get-non-partners-stats-by-continent':
                $codes = $request->input('data');
                $nonPartnersCountByContinent = (new APIRequestsController())->getMapData(array('action' => 'all-non-partners-by-multiple-country', 'country' => json_decode($codes)));

                if (!empty($nonPartnersCountByContinent) && is_object($nonPartnersCountByContinent) && property_exists($nonPartnersCountByContinent, 'success') && $nonPartnersCountByContinent->success) {
                    return response()->json(['success' => true, 'data' => $nonPartnersCountByContinent->data]);
                } else {
                    return response()->json(['error' => true]);
                }
                break;
            case 'get-users-stats-by-continent':
                $codes = $request->input('data');
                $usersCountByContinent = (new APIRequestsController())->getMapData(array('action' => 'all-users-by-multiple-country', 'country' => json_decode($codes)));

                if (!empty($usersCountByContinent) && is_object($usersCountByContinent) && property_exists($usersCountByContinent, 'success') && $usersCountByContinent->success) {
                    return response()->json(['success' => true, 'data' => $usersCountByContinent->data]);
                } else {
                    return response()->json(['error' => true]);
                }
                break;
            case 'get-partners-stats-by-country':
                $code = $request->input('data');
                $partnersCountByCountry = (new APIRequestsController())->getMapData(array('action' => 'all-partners-count-by-country', 'country' => $code));

                if (!empty($partnersCountByCountry) && is_object($partnersCountByCountry) && property_exists($partnersCountByCountry, 'success') && $partnersCountByCountry->success) {
                    return response()->json(['success' => true, 'data' => $partnersCountByCountry->data]);
                } else {
                    return response()->json(['error' => true]);
                }
                break;
            case 'get-non-partners-stats-by-country':
                $code = $request->input('data');
                $nonPartnersCountByCountry = (new APIRequestsController())->getMapData(array('action' => 'all-non-partners-count-by-country', 'country' => $code));

                if (!empty($nonPartnersCountByCountry) && is_object($nonPartnersCountByCountry) && property_exists($nonPartnersCountByCountry, 'success') && $nonPartnersCountByCountry->success) {
                    return response()->json(['success' => true, 'data' => $nonPartnersCountByCountry->data]);
                } else {
                    return response()->json(['error' => true]);
                }
                break;
            case 'get-users-stats-by-country':
                $code = $request->input('data');
                $userCountByCountry = (new APIRequestsController())->getMapData(array('action' => 'all-patients-count-by-country', 'country' => $code));

                if (!empty($userCountByCountry) && is_object($userCountByCountry) && property_exists($userCountByCountry, 'success') && $userCountByCountry->success) {
                    return response()->json(['success' => true, 'data' => $userCountByCountry->data]);
                } else {
                    return response()->json(['error' => true]);
                }
                break;
            case 'all-partners-and-non-partners-data-by-country':
                $code = $request->input('data');
                $locationsByCountry = (new APIRequestsController())->getMapData(array('action' => 'all-partners-and-non-partners-data-by-country', 'country' => $code));

                if (!empty($locationsByCountry) && is_object($locationsByCountry) && property_exists($locationsByCountry, 'success') && $locationsByCountry->success) {
                    return response()->json(['success' => true, 'data' => $locationsByCountry->data]);
                } else {
                    return response()->json(['error' => true]);
                }
                break;
            case 'all-partners-data-by-country':
                $code = $request->input('data');
                $response = (new APIRequestsController())->getMapData(array('action' => 'all-partners-data-by-country', 'country' => $code));

                if (!empty($response) && is_object($response) && property_exists($response, 'success') && $response->success) {
                    return response()->json(['success' => true, 'data' => $response->data]);
                } else {
                    return response()->json(['error' => true]);
                }
                break;
            case 'all-non-partners-data-by-country':
                $code = $request->input('data');
                $response = (new APIRequestsController())->getMapData(array('action' => 'all-non-partners-data-by-country', 'country' => $code));

                if (!empty($response) && is_object($response) && property_exists($response, 'success') && $response->success) {
                    return response()->json(['success' => true, 'data' => $response->data]);
                } else {
                    return response()->json(['error' => true]);
                }
                break;
            case 'combined-count-by-country':
                $code = $request->input('data');
                $response = (new APIRequestsController())->getMapData(array('action' => 'combined-count-by-country', 'country' => $code));

                if (!empty($response) && is_object($response) && property_exists($response, 'success') && $response->success) {
                    return response()->json(['success' => true, 'data' => $response->data]);
                } else {
                    return response()->json(['error' => true]);
                }
                break;
        }
    }
}
