<?php

namespace App\Http\Middleware;

use App\Http\Controllers\HomeController;
use App\Http\Controllers\UserController;
use Closure;

class HandleUserSession
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next) {
        $user_controller = new UserController();

        if(!$user_controller->checkSession() && !array_key_exists('token', $request->input()) && !array_key_exists('email', $request->input())) {
            var_dump($user_controller->checkSession());
            var_dump(!array_key_exists('token', $request->input()));
            var_dump(!array_key_exists('email', $request->input()));
            die('no SESSION');
            //NOT LOGGED AND NOT TRYING TO LOG IN
            return (new HomeController())->redirectToHome();
        }
        return $next($request);
    }
}
