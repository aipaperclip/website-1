<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the 'web' middleware group. Now create something great!
|
*/

Route::group(['prefix' => '/', 'middleware' => 'frontEndMiddleware'], function () {
    Route::get('/', 'HomeController@getView')->name('home');

//Route::get('publications', 'HomeController@getPublications')->name('publications');

    Route::get('privacy-policy', 'PrivacyPolicyController@getView')->name('privacy-policy');

    Route::get('press-center/page/{page}', 'PressCenterController@getView')->name('press-center');

    Route::post('press-center-popup', 'PressCenterController@getPopupView')->name('press-center-popup');

    Route::post('submit-media-inquiries', 'PressCenterController@submitMediaInquiries')->name('submit-media-inquiries');

    Route::get('testimonials/page/{page}', 'UserExpressionsController@getView')->name('testimonials');

    Route::get('changelly', 'ChangellyController@getView')->name('changelly');

    Route::get('partner-network', 'PartnerNetworkController@getView')->name('partner-network');

    Route::get('team', 'TeamMembersController@getView')->name('team');

    Route::get('sitemap.xml', 'Controller@getSitemap')->name('sitemap');

    Route::get('google-map-iframe', 'Controller@getGoogleMapIframe')->name('google-map-iframe');
});