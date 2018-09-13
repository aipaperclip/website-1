<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LocationSubtype extends Model
{
    protected function type() {
        return $this->belongsTo('App\LocationType');
    }
}
