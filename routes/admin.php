<?php

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
|
| Here is where you can register admin routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "admin" middleware group. Now create something great!
|
*/

Route::group(['prefix' => 'admin-access', 'middleware' => 'handleAdminSession'], function () {
    Route::get("/", "Admin\MainController@getAdminAccess")->name('admin-access');

    Route::get("/logout", "Admin\MainController@logout")->name('logout');

    Route::post("/authenticate-admin", "Admin\MainController@authenticateAdmin");
});