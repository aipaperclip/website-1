<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Platform extends Model
{
    protected function platform_logo() {
        return $this->belongsTo('App\Media');
    }
}
