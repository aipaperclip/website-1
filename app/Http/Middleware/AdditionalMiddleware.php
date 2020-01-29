<?php

namespace App\Http\Middleware;

use Closure;
use App;
use App\Http\Controllers\Controller;

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
        /*if(!isset($_COOKIE['testing-dev'])) {
            return response(view('pages/maintenance'));
        }*/
        //$params = $request->route()->parameters();

        $response = $next($request);
        /*$response->headers->set('X-Frame-Options', 'DENY');
        $response->headers->set('Referrer-Policy', 'no-referrer');
        $response->headers->set('Feature-Policy', "vibrate 'self'; geolocation 'self'; midi 'self'; notifications 'self'; push 'self'; sync-xhr 'self'; microphone 'self'; camera 'self'; magnetometer 'self'; gyroscope 'self'; speaker 'self'; vibrate 'self'; fullscreen 'self'; payment 'self';");
        $response->headers->set('X-XSS-Protection', '1; mode=block');*/

        return (new App\Http\Controllers\Controller())->minifyHtml($response);
    }
}
