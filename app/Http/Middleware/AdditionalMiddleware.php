<?php

namespace App\Http\Middleware;

use Closure;
use App;
use App\Http\Controllers\Admin\MainController;

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
        //if($request->route()->parameters()['lang'] != "admin-access")  {
        //    return $next($request);
        //}else {
        //    $admin_controller = new MainController();
        //    if($admin_controller->checkLogin()) {
        //        //LOGGED
        //        return response($admin_controller->getView());
        //    }else {
        //        //NOT LOGGED
        //        return response($admin_controller->getAdminAccess());
        //    }
        //}
    }
}
