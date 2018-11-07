<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CorporateDesignController extends Controller
{
    public function getView($slug)   {
        if(!in_array($slug, ['round-logo', 'one-line-logo', 'two-line-logo'])) {
            abort(404);
        }
        return view('pages/corporate-design', ['slug' => $slug]);
    }
}
