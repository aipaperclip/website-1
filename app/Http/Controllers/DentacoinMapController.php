<?php

namespace App\Http\Controllers;

use App\LocationType;
use App\MapContinent;
use App\MapCountry;
use App\MapLocation;
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
            ->select('map_locations.*', 'clinics.name as clinic_name', 'clinics.link as website', 'clinics.link as clinic_link', 'location_types.id as location_type_id', 'clinic_media.name as clinic_media', 'clinic_media.alt as clinic_media_alt', 'map_countries.code as country_code', 'map_countries.name as country_name')
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

                    // adding to the count the locations which are in the dentacoin DB
                    $codes = array_map('strtoupper', json_decode($codes));
                    $dcnDbLocationsCount = DB::table('map_locations')
                        ->leftJoin('map_countries', 'map_locations.country_id', '=', 'map_countries.id')
                        ->whereIn('type_id', array(2, 3, 4))
                        ->whereIn('map_countries.code', $codes)
                        ->selectRaw('COUNT(*) as count')
                        ->get()->first();

                    $locationsCountInsideCountry = $continentCountByCountries->data;
                    if (!empty($dcnDbLocationsCount) && property_exists($dcnDbLocationsCount, 'count') && $dcnDbLocationsCount->count > 0) {
                        $locationsCountInsideCountry += $dcnDbLocationsCount->count;
                    }

                    return response()->json(['success' => true, 'data' => $locationsCountInsideCountry]);
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

    protected function getMapDataForTheView() {
        $arrOnlyWithCodes = array();
        $innerParams = array();
        $arrWithCountriesAndCities = array();
        $arrWithCountryCodesAndCentroids = array();
        $codes = DB::table('map_countries')->select('map_countries.code', 'map_countries.lat', 'map_countries.lng')->get();
        if (!empty($codes)) {
            foreach ($codes as $code) {
                array_push($arrOnlyWithCodes, mb_strtolower($code->code));
                $arrWithCountryCodesAndCentroids[mb_strtolower($code->code)] = array('lat' => $code->lat, 'lng' => $code->lng);
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
                    'avatar_url' => $singleDataRecord->avatar_url,
                    'address' => $singleDataRecord->address,
                    'is_partner' => $singleDataRecord->is_partner,
                    'phone' => $singleDataRecord->phone,
                    'website' => $singleDataRecord->website,
                    'top_dentist_month' => $singleDataRecord->top_dentist_month,
                    'avg_rating' => $singleDataRecord->avg_rating,
                    'ratings' => $singleDataRecord->ratings,
                    'trp_public_profile_link' => $singleDataRecord->trp_public_profile_link,
                    'country_name' => $singleDataRecord->country_name,
                    'lat' => $singleDataRecord->lat,
                    'lng' => $singleDataRecord->lon,
                    'city' => $singleDataRecord->city_name,
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


                if (!empty($singleDataRecord->country_name) && !empty($singleDataRecord->city_name)) {
                    if (!array_key_exists($singleDataRecord->country_name, $arrWithCountriesAndCities)) {
                        $thisCountryData = array(
                            'code' => $singleDataRecord->country_code,
                            'data' => array($singleDataRecord->city_name)
                        );

                        if (array_key_exists($singleDataRecord->country_code, $arrWithCountryCodesAndCentroids)) {
                            $thisCountryData['centroid_lat'] = $arrWithCountryCodesAndCentroids[$singleDataRecord->country_code]['lat'];
                        }

                        if (array_key_exists($singleDataRecord->country_code, $arrWithCountryCodesAndCentroids)) {
                            $thisCountryData['centroid_lng'] = $arrWithCountryCodesAndCentroids[$singleDataRecord->country_code]['lng'];
                        }

                        $arrWithCountriesAndCities[$singleDataRecord->country_name] = $thisCountryData;
                    } else {
                        if (!in_array($singleDataRecord->city_name, $arrWithCountriesAndCities[$singleDataRecord->country_name]['data'])) {
                            array_push($arrWithCountriesAndCities[$singleDataRecord->country_name]['data'], $singleDataRecord->city_name);
                        }
                    }
                }
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

        ksort($arrWithCountriesAndCities);

        $labs = $this->getDentacoinLocations(2);
        $labsData = array();
        foreach ($labs as $lab) {
            $singleDataRecordArr = array(
                'id' => $lab->id,
                'name' => $lab->clinic_name,
                'avatar_url' => UPLOADS_FRONT_END . $lab->clinic_media,
                'address' => $lab->address,
                'is_partner' => NULL,
                'phone' => NULL,
                'website' => $lab->website,
                'top_dentist_month' => NULL,
                'avg_rating' => NULL,
                'ratings' => NULL,
                'trp_public_profile_link' => NULL,
                'country_name' => $lab->country_name,
                'lat' => $lab->lat,
                'lng' => $lab->lng,
                'city' => NULL,
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

        $suppliers = $this->getDentacoinLocations(3);
        $suppliersData = array();
        foreach ($suppliers as $supplier) {
            $singleDataRecordArr = array(
                'id' => $supplier->id,
                'name' => $supplier->clinic_name,
                'avatar_url' => UPLOADS_FRONT_END . $supplier->clinic_media,
                'address' => $supplier->address,
                'is_partner' => NULL,
                'phone' => NULL,
                'website' => $supplier->website,
                'top_dentist_month' => NULL,
                'avg_rating' => NULL,
                'ratings' => NULL,
                'trp_public_profile_link' => NULL,
                'country_name' => $supplier->country_name,
                'lat' => $supplier->lat,
                'lng' => $supplier->lng,
                'city' => NULL,
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

        $industryPartners = $this->getDentacoinLocations(4);
        $industryPartnersData = array();
        foreach ($industryPartners as $industryPartner) {
            $singleDataRecordArr = array(
                'id' => $industryPartner->id,
                'name' => $industryPartner->clinic_name,
                'avatar_url' => UPLOADS_FRONT_END . $industryPartner->clinic_media,
                'address' => $industryPartner->address,
                'is_partner' => NULL,
                'phone' => NULL,
                'website' => $industryPartner->website,
                'top_dentist_month' => NULL,
                'avg_rating' => NULL,
                'ratings' => NULL,
                'trp_public_profile_link' => NULL,
                'country_name' => $industryPartner->country_name,
                'lat' => $industryPartner->lat,
                'lng' => $industryPartner->lng,
                'city' => NULL,
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
        array_push($innerParams, $arrWithCountriesAndCities);

        return $innerParams;
    }

    protected function getContinents() {
        $continents = MapContinent::all()->sortBy('order_id');
        foreach ($continents as $continent) {
            $countries = MapCountry::where(array('continent_id' => $continent->id))->get()->sortBy('name');
            $continent['countries'] = $countries;
        }

        return $continents;
    }

    protected function getMapHtml()  {
        list($continentCountByCountries, $arrayWithAllLocationsSplittedByCategory, $arrayWithAllLocations, $arrWithCountriesAndCities) = $this->getMapDataForTheView();

        $dentacoinMapHtml = view('partials/dentacoin-map', array('continentCountByCountries' => $continentCountByCountries, 'continents' => $this->getContinents(), 'arrayWithAllLocations' => json_encode($arrayWithAllLocations), 'location_types' => LocationType::all()->sortBy('order_id'), 'arrayWithAllLocationsSplittedByCategory' => $arrayWithAllLocationsSplittedByCategory, 'arrWithCountriesAndCities' => $arrWithCountriesAndCities, 'locationsCountInDcnDB' => MapLocation::all()->count()));

        return response()->json(['success' => true, 'data' => $dentacoinMapHtml->render()]);
    }
}
