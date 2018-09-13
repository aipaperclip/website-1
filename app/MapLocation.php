<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MapLocation extends Model
{
    protected function clinic() {
        return $this->belongsTo('App\Clinic');
    }

    protected function type() {
        return $this->belongsTo('App\LocationType');
    }
}
