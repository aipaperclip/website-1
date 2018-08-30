<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get("/", "HomeController@getView")->name('home');

//Route::get('/publications', 'HomeController@getPublications')->name('publications');

Route::get('/privacy-policy', 'PrivacyPolicyController@getView')->name('privacy-policy');

//Route::get('/press-center', 'PressCenterController@getView')->name('press-center');

Route::get('/testimonials/page/{page}', 'UserExpressionsController@getView')->name('testimonials');

Route::get('/changelly', 'ChangellyController@getView')->name('changelly');

Route::get('/partner-network', 'PartnerNetworkController@getView')->name('partner-network');

Route::get('/sitemap.xml', 'Controller@getSitemap')->name('sitemap');