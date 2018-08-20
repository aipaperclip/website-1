<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Publications extends Model
{
    public function media() {
        return $this->belongsTo('App\Media');
    }
}
