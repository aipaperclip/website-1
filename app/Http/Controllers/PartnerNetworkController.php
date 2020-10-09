<?php

namespace App\Http\Controllers;

use App\Clinic;
use App\Http\Controllers\Admin\LocationsController;
use App\LocationSubtype;
use App\LocationType;
use App\MapLocation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PartnerNetworkController extends Controller
{
    protected function getView()   {
        return abort(404);

        //array with types which contains subtypes which contains locations for listing below the google map
        $list_locations_with_subtypes_types = array();
        foreach($this->getLocationTypes() as $type) {
            $list_locations_with_subtypes_types[$type->name]['subtypes'] = array();
            $list_locations_with_subtypes_types[$type->name]['color'] = $type->color;

            //types - Laboratories, Suppliers ..
            if(!array_key_exists($type->name, $list_locations_with_subtypes_types))   {
                $list_locations_with_subtypes_types[$type->name]['subtypes'] = array();
            }
            if(sizeof($this->getLocationSubtypesForType($type->id))) {
                $list_locations_with_subtypes_types[$type->name]['type'] = 'subcategories';
                //subtypes - Continents ..
                foreach($this->getLocationSubtypesForType($type->id) as $subtype)   {
                    if(!array_key_exists($subtype->name, $list_locations_with_subtypes_types[$type->name]['subtypes']))   {
                        $list_locations_with_subtypes_types[$type->name]['subtypes'][$subtype->name] = array();
                    }
                    //clinics
                    foreach($this->getClinicsBySubtype($subtype->id) as $clinic)    {
                        $list_locations_with_subtypes_types[$type->name]['subtypes'][$subtype->name][$clinic->name] = array(
                            'locations' => $this->getLocationsByClinic($clinic->id),
                            'name' => $clinic->name,
                            'link' => $clinic->link
                        );
                    }
                }
            } else {
                $list_locations_with_subtypes_types[$type->name]['type'] = 'no-subcategories';
                $list_locations_with_subtypes_types[$type->name]['id'] = $type->id;
            }
        }

        return view('pages/partner-network', ['locations' => $this->getLocations(), 'location_types' => $this->getLocationTypes(), 'locations_select' => $this->getAllLocations(), 'list_locations_with_subtypes_types' => $list_locations_with_subtypes_types, 'clinics' => (new LocationsController())->getAllFeaturedClinics()]);
    }

    public function getClinicsForCategoryWithoutSubcategories($type_id) {
        return Clinic::where(array('type_id' => $type_id))->get()->all();
    }

    public function getLocations()   {
        return DB::table('map_locations')
            ->leftJoin('clinics', 'map_locations.clinic_id', '=', 'clinics.id')
            ->leftJoin('location_types', 'map_locations.type_id', '=', 'location_types.id')
            ->leftJoin('media as marker_media', 'location_types.media_id', '=', 'marker_media.id')
            ->leftJoin('media as clinic_media', 'clinics.media_id', '=', 'clinic_media.id')
            ->select('map_locations.*', 'clinics.name as clinic_name', 'clinics.link as clinic_link', 'location_types.id as location_type_id', 'marker_media.name as marker_icon', 'clinic_media.name as clinic_media', 'clinic_media.alt as clinic_media_alt')
            ->get()->toArray();
    }

    public function getLocationTypes()   {
        return LocationType::all();
    }

    public function getAllLocations()   {
        return MapLocation::all();
    }

    protected function getLocationSubtypesForType($id)   {
        return LocationSubtype::where(array('type_id' => $id))->get()->sortBy('order_id');
    }

    protected function getClinicsBySubtype($id)   {
        return Clinic::where(array('subtype_id' => $id))->get();
    }

    public function getLocationsByClinic($id)   {
        return MapLocation::where(array('clinic_id' => $id))->get();
    }
}
