<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Application extends Model {
    protected function logo() {
        return $this->belongsTo('App\Media');
    }
    protected function media() {
        return $this->belongsTo('App\Media');
    }
}
