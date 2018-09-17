<?php

namespace App\Http\Controllers;

use App\Clinic;
use App\LocationSubtype;
use App\LocationType;
use App\MapLocation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PartnerNetworkController extends Controller
{
    protected function getView()   {
        //array with types which contains subtypes which contains locations for listing below the google map
        $list_locations_with_subtypes_types = array();
        foreach($this->getLocationTypes() as $type) {
            //types - Laboratories, Suppliers ..
            if(!array_key_exists($type->name, $list_locations_with_subtypes_types))   {
                $list_locations_with_subtypes_types[$type->name] = array();
            }
            //subtypes - Continents ..
            foreach($this->getLocationSubtypesForType($type->id) as $subtype)   {
                if(!array_key_exists($subtype->name, $list_locations_with_subtypes_types[$type->name]))   {
                    $list_locations_with_subtypes_types[$type->name][$subtype->name] = array();
                }
                //clinics
                foreach($this->getClinicsBySubtype($subtype->id) as $clinic)    {
                    $list_locations_with_subtypes_types[$type->name][$subtype->name][$clinic->name] = array(
                        'locations' => $this->getLocationsByClinic($clinic->id),
                        'name' => $clinic->name,
                        'link' => $clinic->link
                    );
                }
            }
        }
        return view('pages/partner-network', ['locations' => $this->getLocations(), 'location_types' => $this->getLocationTypes(), 'locations_select' => $this->getAllLocations(), 'list_locations_with_subtypes_types' => $list_locations_with_subtypes_types]);
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

    protected function getLocationTypes()   {
        return LocationType::all();
    }

    protected function getAllLocations()   {
        return MapLocation::all();
    }

    protected function getLocationSubtypesForType($id)   {
        return LocationSubtype::where(array('type_id' => $id))->get()->sortBy('order_id');
    }

    protected function getClinicsBySubtype($id)   {
        return Clinic::where(array('subtype_id' => $id))->get();
    }

    protected function getLocationsByClinic($id)   {
        return MapLocation::where(array('clinic_id' => $id))->get();
    }
}
