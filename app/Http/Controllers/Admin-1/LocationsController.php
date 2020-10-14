<?php

namespace App\Http\Controllers\Admin;

use App\Clinic;
use App\LocationSubtype;
use App\LocationType;
use App\MapLocation;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Session;

class LocationsController extends Controller
{
    protected function getView()   {
        return view('admin/pages/all-locations', ['posts' => $this->getAllLocations()]);
    }

    protected function getClinicsView()   {
        return view('admin/pages/all-clinics', ['posts' => $this->getAllClinics()]);
    }

    protected function getFeaturedClinicsView()   {
        return view('admin/pages/all-featured-clinics', ['posts' => $this->getAllFeaturedClinics()]);
    }

    protected function getSubtypesView()   {
        return view('admin/pages/all-subtypes', ['posts' => $this->getAllLocationSubtypes()]);
    }

    protected function getTypesView()   {
        return view('admin/pages/all-types', ['posts' => $this->getAllLocationTypes()]);
    }
    
    protected function addEditLocation($id = null, Request $request) {
        $params = ['clinics' => $this->getAllClinics(), 'types' => $this->getAllLocationTypes(), 'subtypes' => $this->getAllLocationSubtypes()];
        if($request->isMethod('post')) {
            $this->validate($request, [
                'address' => 'required',
                'lat' => 'required',
                'lng' => 'required'
            ], [
                'address.required' => 'Address is required.',
                'lat.required' => 'Latitude is required.',
                'lng.required' => 'Longitude is required.'
            ]);

            if(!empty($id)) {
                $location = $this->getLocation($id);
                $params['success'] = ['Location was edited successfully.'];
            }else {
                $location = new MapLocation();
                $params['success'] = ['New location was added successfully.'];
            }
            $location->address = $request->input('address');
            $location->lat = $request->input('lat');
            $location->lng = $request->input('lng');
            $location->clinic_id = $request->input('clinic');

            $clinic = $this->getClinic($location->clinic_id);
            if(!empty($clinic->type_id)) {
                $location->type_id = $clinic->type_id;
            } else if(!empty($clinic->subtype_id)) {
                $subtype = $this->getSubtype($clinic->subtype_id);
                $location->type_id = $subtype->type_id;
            }
            
            //saving to DB
            $location->save();

            if(!empty($id)) {
                $params['post'] = $location;
            }
            return view('admin/pages/add-edit-location', $params);
        }else {
            if(!empty($id)) {
                $params['post'] = $this->getLocation($id);
                return view('admin/pages/add-edit-location', $params);
            }else {
                return view('admin/pages/add-edit-location', $params);
            }
        }
    }

    protected function addEditClinic($id = null, Request $request) {
        $params = ['subtypes' => $this->getAllLocationSubtypes()];
        $params['types'] = $this->getAllLocationTypes();
        if($request->isMethod('post')) {
            $this->validate($request, [
                'title' => 'required',
                'image' => 'required',
            ], [
                'title.required' => 'Name is required.',
                'image.required' => 'Image is required.',
            ]);

            if(!empty($id)) {
                $clinic = $this->getClinic($id);
                $params['success'] = ['Clinic was edited successfully.'];
            }else {
                $clinic = new Clinic();
                $params['success'] = ['New clinic was added successfully.'];
            }

            $featured = $request->input('featured');
            if(isset($featured)) {
                $clinic->featured = true;
                $clinic->order_id = sizeof($this->getAllFeaturedClinics()) + 1;
            } else {
                $clinic->featured = false;
            }

            $clinic->name = $request->input('title');
            $clinic->link = $request->input('link');
            $clinic->text = $request->input('text');
            $clinic->featured_link = $request->input('featured_link');
            $clinic->media_id = $request->input('image');
            $clinic->type_id = $request->input('type');
            $clinic->subtype_id = $request->input('subtype');

            //update type_id for all the locations related to this clinic
            $locations = $this->getLocationsForClinic($clinic->id);
            foreach($locations as $location) {
                $location->type_id = $request->input('type');
                $location->save();
            }

            //saving to DB
            $clinic->save();

            if(!empty($request->input('subtype'))) {
                $clinic->subtype_id = $request->input('subtype');
            }

            if(!empty($id)) {
                $params['post'] = $clinic;
            }
            return view('admin/pages/add-edit-clinic', $params);
        } else {
            if(!empty($id)) {
                $params['post'] = $this->getClinic($id);
                return view('admin/pages/add-edit-clinic', $params);
            }else {
                return view('admin/pages/add-edit-clinic', $params);
            }
        }
    }

    protected function addEditSubtype($id = null, Request $request) {
        $params = ['types' => $this->getAllLocationTypes()];
        if($request->isMethod('post')) {
            $this->validate($request, [
                'title' => 'required',
                'type' => 'required',
            ], [
                'title.required' => 'Name is required.',
                'type.required' => 'Type is required.',
            ]);

            if(!empty($id)) {
                $subtype = $this->getSubtype($id);
                $params['success'] = ['Subtype was edited successfully.'];
            }else {
                $subtype = new LocationSubtype();
                $subtype->order_id = sizeof($this->getAllLocationSubtypes());
                $params['success'] = ['New subtype was added successfully.'];
            }

            $subtype->name = $request->input('title');
            $subtype->type_id = $request->input('type');
            //saving to DB
            $subtype->save();

            if(!empty($id)) {
                $params['post'] = $subtype;
            }
            return view('admin/pages/add-edit-subtype', $params);
        }else {
            if(!empty($id)) {
                $params['post'] = $this->getSubtype($id);
                return view('admin/pages/add-edit-subtype', $params);
            }else {
                return view('admin/pages/add-edit-subtype', $params);
            }
        }
    }

    protected function addEditType($id = null, Request $request) {
        $params = [];
        if($request->isMethod('post')) {
            $this->validate($request, [
                'title' => 'required',
                'image' => 'required',
                'color' => 'required',
            ], [
                'title.required' => 'Name is required.',
                'image.required' => 'Image is required.',
                'color.required' => 'Color is required.',
            ]);

            if(!empty($id)) {
                $type = $this->getType($id);
                $params['success'] = ['Type was edited successfully.'];
            }else {
                $type = new LocationType();
                $type->order_id = sizeof($this->getAllLocationTypes());
                $params['success'] = ['New type was added successfully.'];
            }

            $type->name = $request->input('title');
            $type->color = $request->input('color');
            $type->media_id = $request->input('image');
            //saving to DB
            $type->save();

            if(!empty($id)) {
                $params['post'] = $type;
            }
            return view('admin/pages/add-edit-type', $params);
        }else {
            if(!empty($id)) {
                $params['post'] = $this->getType($id);
                return view('admin/pages/add-edit-type', $params);
            }else {
                return view('admin/pages/add-edit-type', $params);
            }
        }
    }

    protected function getLocation($id)  {
        return MapLocation::where(array('id' => $id))->get()->first();
    }

    protected function getLocationsForClinic($id)  {
        return MapLocation::where(array('clinic_id' => $id))->get()->all();
    }

    public function getClinic($id)  {
        return Clinic::where(array('id' => $id))->get()->first();
    }

    protected function getClinicsForSubtype($id)  {
        return Clinic::where(array('subtype_id' => $id))->get()->all();
    }

    protected function getSubtype($id)  {
        return LocationSubtype::where(array('id' => $id))->get()->first();
    }

    public function getSubtypesForType($id)  {
        return LocationSubtype::where(array('type_id' => $id))->get()->all();
    }

    protected function getType($id)  {
        return LocationType::where(array('id' => $id))->get()->first();
    }

    protected function getAllLocations() {
        return MapLocation::all()->sort();
    }

    protected function getAllClinics() {
        return Clinic::all()->sort();
    }

    public function getAllFeaturedClinics() {
        return Clinic::where(array('featured' => true))->get()->sortBy('order_id')->all();
    }

    protected function getAllLocationSubtypes() {
        return LocationSubtype::all()->sort();
    }

    protected function getAllLocationTypes() {
        return LocationType::all()->sort();
    }

    protected function deleteLocation($id)  {
        $location = MapLocation::where('id', $id)->first();
        if(!empty($location))  {
            //deleting media from DB
            $location->delete();
            return redirect()->route('all-locations')->with(['success' => 'Location is deleted successfully.']);
        }else {
            return redirect()->route('all-locations')->with(['error' => 'Error with deleting.']);
        }
    }


    protected function deleteClinic($id)  {
        if(!empty($this->getLocationsForClinic($id)))   {
            return redirect()->route('all-clinics')->with(['error' => 'There are existing locations for this clinic. Please change their clinic first in order to continue with deleting this clinic.']);
        }
        $clinic = Clinic::where('id', $id)->first();
        if(!empty($clinic))  {
            //deleting media from DB
            $clinic->delete();
            return redirect()->route('all-clinics')->with(['success' => 'Clinic is deleted successfully.']);
        }else {
            return redirect()->route('all-clinics')->with(['error' => 'Error with deleting.']);
        }
    }

    protected function deleteSubtype($id)  {
        if(!empty($this->getClinicsForSubtype($id)))    {
            return redirect()->route('all-subtypes')->with(['error' => 'There are existing clinics for this subtype. Please change their subtype first in order to continue with deleting this subtype.']);
        }
        $subtype = LocationSubtype::where('id', $id)->first();
        if(!empty($subtype))  {
            //deleting media from DB
            $subtype->delete();
            return redirect()->route('all-subtypes')->with(['success' => 'Subtype is deleted successfully.']);
        }else {
            return redirect()->route('all-subtypes')->with(['error' => 'Error with deleting.']);
        }
    }

    protected function deleteType($id)  {
        if(!empty($this->getSubtypesForType($id)))    {
            return redirect()->route('all-types')->with(['error' => 'There are existing subtypes for this type. Please change their type first in order to continue with deleting this type.']);
        }
        $type = LocationType::where('id', $id)->first();
        if(!empty($type))  {
            //deleting media from DB
            $type->delete();
            return redirect()->route('all-types')->with(['success' => 'Type is deleted successfully.']);
        }else {
            return redirect()->route('all-types')->with(['error' => 'Error with deleting.']);
        }
    }
}
