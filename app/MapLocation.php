<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MapLocation extends Model
{
    protected function clinic() {
        return $this->belongsTo('App\Clinic');
    }

    protected function country() {
        return $this->belongsTo('App\MapCountry');
    }

    protected function type() {
        return $this->belongsTo('App\LocationType');
    }
}
