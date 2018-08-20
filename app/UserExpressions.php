<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserExpressions extends Model
{
    public function media() {
        return $this->belongsTo('App\Media');
    }
}
