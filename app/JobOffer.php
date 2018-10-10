<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class JobOffer extends Model
{
    protected function media() {
        return $this->belongsTo('App\Media');
    }
}
