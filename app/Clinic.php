<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Clinic extends Model
{
    protected function subtype() {
        return $this->belongsTo('App\LocationSubtype');
    }

    protected function media() {
        return $this->belongsTo('App\Media');
    }
}
