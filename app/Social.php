<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Social extends Model
{
    protected function media() {
        return $this->belongsTo('App\Media');
    }

    protected function reversed_media() {
        return $this->belongsTo('App\Media');
    }
}
