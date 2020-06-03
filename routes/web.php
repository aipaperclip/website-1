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

    /*Route::get('/test', function() {
        $curl = curl_init();

        $json = json_encode(array('parameters' => array(array('order_id' => 69, 'sender' => '0x00e550573f4c2b75577f777cdc1e8fca6f379aad', 'dcn' => '3186977')), 'receiver' => '0xa47943e1c8f05e4b12c8a78702743ffd49d070fc'));

        curl_setopt_array($curl, array(
            CURLOPT_RETURNTRANSFER => 1,
            CURLOPT_POST => 1,
            CURLOPT_URL => 'https://methods.dentacoin.com/check-for-dcn-transfer',
            CURLOPT_SSL_VERIFYPEER => 0,
            CURLOPT_POSTFIELDS => $json
        ));
        curl_setopt($curl, CURLOPT_HTTPHEADER, array(    //<--- Added this code block
                'Content-Type: application/json',
                'Content-Length: ' . mb_strlen($json))
        );

        $resp = json_decode(curl_exec($curl));
        curl_close($curl);

        var_dump($resp);
        die('asd');
    })->name('test');*/

    Route::get('/foundation', 'HomeController@getNotLoggedView')->middleware('HandleUserSession')->name('foundation');

    Route::get('/privacy-policy', 'PrivacyPolicyController@getView')->name('privacy-policy');

    Route::get('/press-center/page/{page}', 'PressCenterController@getView')->name('press-center');

    Route::get('/testimonials/page/{page}', 'UserExpressionsController@getView')->name('testimonials');

    Route::get('/info/{slug}', 'Controller@handleApiEndpoints')->name('api-endpoints');

    Route::get('/partner-network', 'PartnerNetworkController@getView')->name('partner-network');

    Route::get('/team', 'TeamMembersController@getView')->name('team');

    Route::get('/sitemap', 'Controller@getSitemap')->name('sitemap');

    Route::get('/google-map-iframe', 'Controller@getGoogleMapIframe')->name('google-map-iframe');

    Route::get('/how-to-create-wallet', 'HowToCreateWalletController@getView')->name('how-to-create-wallet');

    Route::get('/berlin-roundtable', /*'BerlinRoundtableController@getView'*/ function() {
        return abort(410);
    })->name('berlin-roundtable');

    Route::get('/holiday-calendar-terms', 'ChristmasCalendarController@getChristmasCalendarTermsView')->name('holiday-calendar-terms');

    Route::group(['prefix' => 'holiday-calendar-2019'], function () {
        Route::get('/', 'ChristmasCalendarController@getView')->name('christmas-calendar');

        Route::post('/get-task-popup/{id}', 'ChristmasCalendarController@getTaskPopup')->name('get-task-popup');

        Route::post('/complete-task/{id}', 'ChristmasCalendarController@completeTask')->name('complete-task');
    });

    Route::post('/get-holiday-calendar-participants', 'ChristmasCalendarController@getHolidayCalendarParticipants')->name('get-holiday-calendar-participants');

    Route::post('/get-country-code', 'UserController@getCountryCode')->name('get-country-code');

    //Route::post('/submit-berlin-roundtable-form', 'BerlinRoundtableController@submitForm')->name('submit-berlin-roundtable-form');

    Route::get('careers/{slug?}', function($slug = null)    {
        if(empty($slug))   {
            return (new \App\Http\Controllers\CareersController())->getView();
        }else {
            return (new \App\Http\Controllers\CareersController())->getSingleView($slug);
        }
    })->name('careers');

    Route::group(['prefix' => 'claim-dentacoin'], function () {
        Route::get('/', 'ClaimDentacoin@getView')->name('claim-dentacoin');
    });

    Route::get('/corporate-design/{slug}', 'CorporateDesignController@getView')->name('corporate-design');

    Route::get('/corporate-identity', 'CorporateIdentityController@getView')->name('corporate-identity');

    //======================================= LOGGED IN LOGIC ========================================

    Route::get('/user-logout', 'UserController@userLogout')->name('user-logout');

    Route::get('/get-current-user-data', 'UserController@getCurrentUserData')->middleware('HandleUserSession')->name('get-current-user-data');

    Route::post('/authenticate-user', 'UserController@authenticateUser')->name('authenticate-user');

    Route::post('/check-dentist-account', 'UserController@checkDentistAccount')->name('check-dentist-account');

    Route::group(['prefix' => 'dentacoin-login-gateway'], function () {
        Route::post('/', 'DentacoinLoginGateway@getView')->name('dentacoin-login-gateway');

        Route::post('/handle-dentist-register', 'UserController@handleDentistRegister')->name('handle-dentist-register');

        Route::post('/handle-dentist-login', 'UserController@handleDentistLogin')->name('handle-dentist-login');

        Route::post('/get-after-dentist-registration-popup', 'UserController@getAfterDentistRegistrationPopup')->name('get-after-dentist-registration-popup');

        Route::post('/handle-enrich-profile', 'UserController@handleEnrichProfile')->name('handle-enrich-profile');
    });

    Route::post('/get-holiday-calendar-participants', 'ChristmasCalendarController@getHolidayCalendarParticipants')->name('get-holiday-calendar-participants');


    //======================================= AJAX ========================================

    Route::group(['prefix' => 'combined-hub'], function () {
        Route::post('/get-hub-data/{userType}/{hubType}', 'Controller@getHubData')->name('get-hub-data');

        Route::post('/get-hub-children/{userType}/{parentSlug}', 'Controller@getHubChildren')->name('get-hub-children');
    });

    Route::post('/press-center-popup', 'PressCenterController@getPopupView')->name('press-center-popup');

    Route::post('/submit-media-inquiries', 'PressCenterController@submitMediaInquiries')->name('submit-media-inquiries');

    Route::post('/submit-apply-position', 'CareersController@submitApplyPosition')->name('submit-apply-position');

    Route::post('/check-email', 'UserController@checkEmail')->name('check-email');

    Route::post('/check-captcha', 'UserController@checkCaptcha')->name('check-captcha');

    Route::post('/get-ip', 'Controller@getClientIpAsResponse')->name('get-ip');

    Route::get('/custom-cookie', 'UserController@manageCustomCookie')->name('custom-cookie');
    //======================================= REDIRECTS ========================================

    Route::get('partners', function() {
        return Redirect::to('//dentacoin.com/partner-network');
    });

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

    Route::get('bidali-gift-cards', function() {
        return Redirect::to('/?payment=bidali-gift-cards');
    });

    Route::get('buy-dentacoin', function() {
        return Redirect::to('/?section=buy-dentacoin');
    });

    Route::get('corporate-design', function() {
        return Redirect::to('/corporate-design/one-line-logo');
    });
});