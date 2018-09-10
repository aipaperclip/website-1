<?php

namespace App\Http\Middleware;

use Closure;
use App;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Route;

class AdditionalMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next) {
        $params = $request->route()->parameters();
        if(Route::getCurrentRoute()->getName() != 'sitemap')    {
            return (new App\Http\Controllers\Controller())->minifyHtml($next($request));
        }else {
            return $next($request);

        }
    }
}
