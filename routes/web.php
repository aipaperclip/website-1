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

Route::get('/refresh-captcha', 'Controller@refreshCaptcha')->name('refresh-captcha');

Route::group(['prefix' => '/', 'middleware' => 'frontEndMiddleware'], function () {

    //======================================= PAGES ========================================

    Route::get('/', 'HomeController@getView')->name('home');

    Route::get('/test-bidali', function() {
        return view('pages/test-bidali-gift-cards', []);
    })->name('test');

    Route::get('privacy-policy', 'PrivacyPolicyController@getView')->name('privacy-policy');

    Route::get('press-center/page/{page}', 'PressCenterController@getView')->name('press-center');

    Route::get('testimonials/page/{page}', 'UserExpressionsController@getView')->name('testimonials');

    Route::get('info/{slug}', 'Controller@handleApiEndpoints')->name('api-endpoints');

    Route::get('partner-network', 'PartnerNetworkController@getView')->name('partner-network');

    Route::get('team', 'TeamMembersController@getView')->name('team');

    Route::get('sitemap', 'Controller@getSitemap')->name('sitemap');

    Route::get('google-map-iframe', 'Controller@getGoogleMapIframe')->name('google-map-iframe');

    //Route::get('changelly', 'ChangellyController@getView')->name('changelly');

    Route::get('careers/{slug?}', function($slug = null)    {
        if(empty($slug))   {
            return (new \App\Http\Controllers\CareersController())->getView();
        }else {
            return (new \App\Http\Controllers\CareersController())->getSingleView($slug);
        }
    })->name('careers');

    Route::get('corporate-design/{slug}', 'CorporateDesignController@getView')->name('corporate-design');

    Route::get('corporate-identity', 'CorporateIdentityController@getView')->name('corporate-identity');

    //======================================= AJAX ========================================

    Route::post('press-center-popup', 'PressCenterController@getPopupView')->name('press-center-popup');

    Route::post('submit-media-inquiries', 'PressCenterController@submitMediaInquiries')->name('submit-media-inquiries');

    Route::post('submit-apply-position', 'CareersController@submitApplyPosition')->name('submit-apply-position');

    //======================================= REDIRECTS ========================================

    Route::get('privacy', function() {
        return Redirect::to('//dentacoin.com/privacy-policy');
    });

    Route::get('privacypolicy', function() {
        return Redirect::to('//dentacoin.com/privacy-policy');
    });

    Route::get('changelly', function() {
        return Redirect::to('//wallet.dentacoin.com/buy');
    });

    Route::get('wallet', function() {
        return Redirect::to('//wallet.dentacoin.com/');
    });

    //redirecting old urls to homepage with popups opening
    Route::get('dentacare-mobile-app-intro', function() {
        return Redirect::to('/?application=dentacare-mobile-app-intro');
    });

    Route::get('trusted-reviews-intro', function() {
        return Redirect::to('/?application=trusted-reviews-intro');
    });

    Route::get('trusted-review-platform', function() {
        return Redirect::to('/?application=trusted-reviews-intro');
    });

    Route::get('dentavox-market-research-intro', function() {
        return Redirect::to('/?application=dentavox-market-research-intro');
    });

    Route::get('assurance-intro', function() {
        return Redirect::to('/?application=assurance-intro');
    });

    Route::get('health-database-intro', function() {
        return Redirect::to('/?application=health-database-intro');
    });

    Route::get('wallet-dapp-intro', function() {
        return Redirect::to('/?application=wallet-dapp-intro');
    });

    Route::get('blog-intro', function() {
        return Redirect::to('/?application=blog-intro');
    });

    Route::get('partner-network-intro', function() {
        return Redirect::to('/?application=partner-network-intro');
    });

    Route::get('corporate-design', function() {
        return Redirect::to('/corporate-design/one-line-logo');
    });
});