<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <link rel="shortcut icon" href="{{URL::asset('assets/images/favicon.png') }}" type="image/x-icon" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
    <meta name="csrf-token" content="{{ csrf_token() }}"/>
    @if(!empty(Route::current()) && Route::current()->getName() == 'careers' && empty(!request()->route()->parameters))
        <title>{{$job_offer->meta_title}}</title>
        <meta name="description" content="{{$job_offer->meta_description}}" />
        <meta name="keywords" content="{{$job_offer->keywords}}" />
        <meta property="og:url" content="{{Request::url()}}"/>
        <meta property="og:title" content="{{$job_offer->social_title}}"/>
        <meta property="og:description" content="{{$job_offer->social_description}}"/>
        @if(!empty($job_offer->social_media))
            <meta property="og:image" content="{{URL::asset('assets/uploads/'.$job_offer->social_media->name)}}"/>
            <meta property="og:image:width" content="1200"/>
            <meta property="og:image:height" content="630"/>
        @endif
    @elseif(!empty($meta_data))
        <title>{{$meta_data->title}}</title>
        <meta name="description" content="{{$meta_data->description}}" />
        <meta name="keywords" content="{{$meta_data->keywords}}" />
        <meta property="og:url" content="{{Request::url()}}"/>
        <meta property="og:title" content="{{$meta_data->social_title}}"/>
        <meta property="og:description" content="{{$meta_data->social_description}}"/>
        @if(!empty($meta_data->media))
            <meta property="og:image" content="{{URL::asset('assets/uploads/'.$meta_data->media->name)}}"/>
            <meta property="og:image:width" content="1200"/>
            <meta property="og:image:height" content="630"/>
        @endif
    @endif
    <meta name="p:domain_verify" content="dce2e29c27694ac250a2f58e6a8fa551"/>
    @if(!empty(Route::current()) && Route::current()->getName() == 'home')
        <link rel="canonical" href="{{route('home')}}" />
    @endif
    <style>

    </style>
    <link rel="stylesheet" type="text/css" href="/dist/css/front-libs-style.css">
    <link rel="stylesheet" type="text/css" href="/assets/css/style.css">
    <script>
        var HOME_URL = '{{ route("home") }}';
    </script>
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-97167262-1"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'UA-97167262-1');
    </script>
</head>
<body data-current="one" class="@if((new \App\Http\Controllers\UserController())->checkSession()) logged-in @endif @if(!empty(Route::current())) {{Route::current()->getName()}} @else class-404 @endif @if(!empty(Route::current()) && ((Route::current()->getName() == 'careers' && empty(request()->route()->parameters) || Route::current()->getName() == 'corporate-design'))) allow-draw-lines @endif">
    @if(\App\Http\Controllers\UserController::instance()->checkSession())
        <div class="logged-mobile-profile-menu">
            <nav class="profile-menu module">
                <a href="javascript:void(0)" class="close-logged-mobile-profile-menu"><i class="fa fa-times" aria-hidden="true"></i></a>
                <ul itemscope="" itemtype="http://schema.org/SiteNavigationElement">
                    <li>
                        <a href="{{ route('home') }}" itemprop="url">
                            <figure itemscope="" itemtype="http://schema.org/ImageObject" class="inline-block">
                                <img alt="Home icon" src="/assets/uploads/home.svg"/>
                            </figure>
                            <span itemprop="name">Home</span>
                        </a>
                    </li>
                    <li>
                        <a href="{{ route('my-profile') }}" @if(!empty(Route::current()) && Route::current()->getName() == 'my-profile') class="active" @endif itemprop="url">
                            <figure itemscope="" itemtype="http://schema.org/ImageObject" class="inline-block">
                                <img alt="Wallet icon" src="/assets/uploads/wallet-icon.svg"/>
                            </figure>
                            <span itemprop="name">My Wallet</span>
                        </a>
                    </li>
                    <li>
                        <a href="{{ route('edit-account') }}" @if(!empty(Route::current()) && Route::current()->getName() == 'edit-account') class="active" @endif itemprop="url">
                            <figure itemscope="" itemtype="http://schema.org/ImageObject" class="inline-block">
                                <img alt="Edit account icon" src="/assets/uploads/edit-account-icon.svg"/>
                            </figure>
                            <span itemprop="name">Edit Account</span>
                        </a>
                    </li>
                    <li>
                        <a href="{{ route('manage-privacy') }}" @if(!empty(Route::current()) && Route::current()->getName() == 'manage-privacy') class="active" @endif itemprop="url">
                            <figure itemscope="" itemtype="http://schema.org/ImageObject" class="inline-block">
                                <img alt="Privacy icon" src="/assets/uploads/privacy-icon.svg"/>
                            </figure>
                            <span itemprop="name">Manage Privacy</span>
                        </a>
                    </li>
                    <li>
                        <a href="{{ route('user-logout') }}" itemprop="url">
                            <figure itemscope="" itemtype="http://schema.org/ImageObject" class="inline-block">
                                <img alt="Logout icon" src="/assets/uploads/logout-icon.svg"/>
                            </figure>
                            <span itemprop="name">Log out</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    @endif
    <svg class="svg-with-lines">
        <line class="first" x1="0" y1="0" x2="0" y2="0"/>
        <line class="second" x1="0" y1="0" x2="0" y2="0"/>
        <line class="third" x1="0" y1="0" x2="0" y2="0"/>
        <line class="fourth" x1="0" y1="0" x2="0" y2="0"/>
        <line class="fifth" x1="0" y1="0" x2="0" y2="0"/>
        <line class="sixth" x1="0" y1="0" x2="0" y2="0"/>
        <line class="seventh" x1="0" y1="0" x2="0" y2="0"/>
        <line class="eighth" x1="0" y1="0" x2="0" y2="0"/>
        <line class="ninth" x1="0" y1="0" x2="0" y2="0"/>
        <line class="tenth" x1="0" y1="0" x2="0" y2="0"/>
        <line class="eleventh" x1="0" y1="0" x2="0" y2="0"/>
        <line class="twelfth" x1="0" y1="0" x2="0" y2="0"/>
        <line class="thirteenth" x1="0" y1="0" x2="0" y2="0"/>
        <line class="fourteenth" x1="0" y1="0" x2="0" y2="0"/>
        <line class="fifteenth" x1="0" y1="0" x2="0" y2="0"/>
        <line class="sixteenth" x1="0" y1="0" x2="0" y2="0"/>
        <line class="seventeenth" x1="0" y1="0" x2="0" y2="0"/>
        <line class="eighteenth" x1="0" y1="0" x2="0" y2="0"/>
        <line class="nineteenth" x1="0" y1="0" x2="0" y2="0"/>
        <line class="twentieth" x1="0" y1="0" x2="0" y2="0"/>
    </svg>
    <header class="container">
        <div class="row fs-0">
            <figure itemscope="" itemtype="http://schema.org/Organization" class="col-xs-4 logo-container inline-block">
                <a itemprop="url"{{-- @if((new \App\Http\Controllers\UserController())->checkSession()) href="{{ route('foundation') }}"--}} @else  href="{{ route('home') }}"{{-- @endif--}} @if(!empty(Route::current())) @if(Route::current()->getName() == "home") tabindex="=-1" @endif @endif>
                    <img src="@if((new \App\Http\Controllers\UserController())->checkSession() && Route::current()->getName() == 'home') {{URL::asset('assets/images/round-logo-white.svg') }} @else {{URL::asset('assets/images/logo.svg') }} @endif" itemprop="logo" alt="Dentacoin logo"/>
                    @if(!empty(Route::current()))
                        @if(Route::current()->getName() == 'careers' || Route::current()->getName() == 'corporate-design')
                            <div class="first-dot logo-dot fs-16 inline-block">&nbsp;</div>
                        @endif
                    @endif
                </a>
            </figure>
            @if(!(new \App\Http\Controllers\UserController())->checkSession())
                <div class="col-xs-8 btn-container inline-block">
                    <a href="//dentists.dentacoin.com" class="inline-block fs-20 margin-right-20 main-color" target="_blank">For dentists</a>
                    <div class="inline-block btn-and-line">
                        <a href="javascript:void(0)" class="white-black-btn show-login-signin" tabindex="-1">SIGN IN</a>
                        <span class="first-dot custom-dot">&nbsp;</span>
                    </div>
                </div>
            @else
                @if(!empty(Route::current()) && in_array(Route::current()->getName(), array('my-profile', 'edit-account', 'manage-privacy', 'my-contracts')))
                    <div class="col-xs-8 inline-block text-right show-on-mobile">
                        <a href="javascript:void(0)" class="logged-user-hamburger"><i class="fa fa-bars fs-32 dark-color" aria-hidden="true"></i></a>
                    </div>
                    @include('partials.logged-user-desktop-header-menu', ['class' => 'hide-on-mobile'])
                @else
                    @include('partials.logged-user-desktop-header-menu')
                @endif
            @endif
        </div>
    </header>
    <main>@yield("content")</main>
    <footer>
        <div class="container">
            @if(!empty(Route::current()) && Route::current()->getName() != 'careers' && Route::current()->getName() != 'corporate-identity' && Route::current()->getName() != 'corporate-design')
                @if(isset($footer_data))
                    <div class="row">
                        <h2 class="col-xs-12 section-title">{!! $footer_data[0]['html'] !!}</h2>
                    </div>
                    @include('partials.newsletter-registration')
                @endif
            @endif
            @if(!empty($socials))
                <div class="row socials">
                    <div class="col-xs-12" itemscope="" itemtype="http://schema.org/Organization">
                        <link itemprop="url" href="{{ route('home') }}">
                        <ul>
                            @foreach($socials as $social)
                                <li class="inline-block">
                                    <a itemprop="sameAs" target="_blank" href="{{$social->link}}">
                                        <figure itemscope="" itemtype="http://schema.org/ImageObject">
                                            <img src="{{URL::asset('assets/uploads/'.$social->media->name) }}"  @if(!empty($social->media->alt)) alt="{{$social->media->alt}}" @endif  itemprop="contentUrl"/>
                                        </figure>
                                    </a>
                                </li>
                            @endforeach
                        </ul>
                    </div>
                </div>
            @endif
            @if(!empty($footer_menu))
            <div class="row menu">
                <nav class="col-xs-12">
                    <ul itemscope="" itemtype="http://schema.org/SiteNavigationElement">
                        @php($first_el = false)
                        @foreach($footer_menu as $el)
                            @if($first_el)
                                <li class="inline-block separator">|</li>
                            @endif
                            <li class="inline-block @if($el->url == '/assets/uploads/dentacoin-fact-sheet.pdf') has-submenu padding-right-xs-20 @endif">
                                <a @if($el->new_window) target="_blank" @endif itemprop="url" href="{{$el->url}}"><span itemprop="name">{{$el->name}}</span></a>
                                @if($el->url == '/assets/uploads/dentacoin-fact-sheet.pdf')
                                    <ul itemscope="" itemtype="http://schema.org/SiteNavigationElement" class="submenu">
                                        <li>
                                            <a href="/assets/uploads/was-ist-dentacoin.pdf" itemprop="url" target="_blank"><span itemprop="name">Fact Sheet DE</span></a>
                                        </li>
                                    </ul>
                                @endif
                            </li>
                            @if(!$first_el)
                                @php($first_el = true)
                            @endif
                        @endforeach
                    </ul>
                </nav>
            </div>
            @endif
            @if(isset($footer_data))
                <div class="row media-inquiries">
                    <div class="col-xs-12">
                        {!! $footer_data[4]['html'] !!}
                    </div>
                </div>
                <div class="row all-rights">
                    <div class="col-xs-12">
                        {!! $footer_data[5]['html'] !!}
                    </div>
                </div>
            @endif
        </div>
    </footer>

    @if(!\App\Http\Controllers\UserController::instance()->checkSession())
        <div class="hidden-login-form hide">
            <div class="fs-0 popup-header-action">
                <a href="javascript:void(0)" class="inline-block" data-type="patient">I'm a Patient</a>
                <a href="javascript:void(0)" class="inline-block" data-type="dentist">I'm a Dentist</a>
            </div>
            <div class="fs-0 popup-body">
                <div class="patient inline-block @if(!empty(Route::current())) @if(Route::current()->getName() == 'home') custom-hide @endif @endif">
                    <div class="form-login">
                        <h2>LOG IN</h2>
                        <div class="padding-bottom-10">
                            <a href="javascript:void(0)" class="facebook-custom-btn social-login-btn calibri-regular fs-20" data-url="//api.dentacoin.com/api/register" data-platform="assurance" data-type="patient">with Facebook</a>
                        </div>
                        <div>
                            <a href="javascript:void(0)"  class="civic-custom-btn social-login-btn calibri-regular fs-20" data-url="//api.dentacoin.com/api/register" data-platform="assurance" data-type="patient">with Civic</a>
                        </div>
                        <div class="popup-half-footer">
                            Don't have an account? <a href="javascript:void(0)" class="call-sign-up">Sign up</a>
                        </div>
                    </div>
                    <div class="form-register">
                        <h2>SIGN UP</h2>
                        <div class="padding-bottom-10">
                            <a href="javascript:void(0)" class="facebook-custom-btn social-login-btn calibri-regular fs-20" data-url="//api.dentacoin.com/api/register" data-platform="assurance" data-type="patient" custom-stopper="true">with Facebook</a>
                        </div>
                        <div>
                            <a href="javascript:void(0)"  class="civic-custom-btn social-login-btn calibri-regular fs-20" data-url="//api.dentacoin.com/api/register" data-platform="assurance" data-type="patient" custom-stopper="true">with Civic</a>
                        </div>
                        <div class="privacy-policy-row padding-top-20">
                            <div class="pretty p-svg p-curve black-style agree-with">
                                <input type="checkbox" id="privacy-policy-registration-patient"/>
                                <div class="state p-success">
                                    <!-- svg path -->
                                    <svg class="svg svg-icon" viewBox="0 0 20 20">
                                        <path d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z" style="stroke: white;fill:white;"></path>
                                    </svg>
                                    <label class="fs-14">I agree with <a href="//dentacoin.com/privacy-policy" target="_blank">Privacy Policy</a></label>
                                </div>
                            </div>
                        </div>
                        <div class="step-errors-holder"></div>
                        <div class="popup-half-footer">
                            Already have an account? <a href="javascript:void(0)" class="call-log-in">Log in</a>
                        </div>
                    </div>
                </div>
                <div class="dentist inline-block @if(!empty(Route::current())) @if(Route::current()->getName() != 'home') custom-hide @endif @endif">
                    <div class="form-login">
                        <h2>LOG IN</h2>
                        <form method="POST" action="{{ route('dentist-login') }}" id="dentist-login">
                            <div class="padding-bottom-10">
                                <input class="custom-input" name="email" maxlength="100" type="email" placeholder="Email address"/>
                            </div>
                            <div class="padding-bottom-20">
                                <input class="custom-input" name="password" maxlength="50" type="password" placeholder="Password"/>
                            </div>
                            <div class="btn-container text-center">
                                <input type="submit" value="Log in" class="black-white-btn fs-20"/>
                                <input type="hidden" name="_token" value="{{csrf_token()}}">
                            </div>
                            <div class="text-center padding-top-40 color-white fs-16">Don't have an account? <a href="javascript:void(0)" class="call-sign-up fs-20">Sign up</a></div>
                        </form>
                        <div class="popup-half-footer">
                            <a href="{{route('forgotten-password')}}">Forgotten password?</a>
                        </div>
                    </div>
                    <div class="form-register">
                        <h2>SIGN UP</h2>
                        <form method="POST" enctype="multipart/form-data" id="dentist-register" action="{{ route('dentist-register') }}">
                            <div class="step first visible" data-step="first">
                                <div class="padding-bottom-10">
                                    <input class="custom-input" name="dentist-or-practice-name" type="text" maxlength="100" placeholder="Dentist or Practice Name"/>
                                </div>
                                <div class="padding-bottom-10">
                                    <input class="custom-input" name="email" type="email" maxlength="100" placeholder="Email address"/>
                                </div>
                                <div class="padding-bottom-10">
                                    <input class="custom-input password" name="password" minlength="6" maxlength="50" type="password" placeholder="Password"/>
                                </div>
                                <div class="padding-bottom-20">
                                    <input class="custom-input repeat-password" name="repeat-password" minlength="6" maxlength="50" type="password" placeholder="Repeat password"/>
                                </div>
                            </div>
                            <div class="step second address-suggester-wrapper" data-step="second">
                                <div class="padding-bottom-20 fs-16 radio-buttons-holder">
                                    <div class="pretty p-icon p-round">
                                        <input type="radio" name="work-type" value="independent-dental-practitioner"/>
                                        <div class="state p-primary">
                                            <i class="fa fa-check icon" aria-hidden="true"></i>
                                            <label>I work as an independent dental practitioner</label>
                                        </div>
                                    </div>
                                    <div class="pretty p-icon p-round">
                                        <input type="radio" name="work-type" value="represent-dental-practice"/>
                                        <div class="state p-primary">
                                            <i class="fa fa-check icon" aria-hidden="true"></i>
                                            <label>I represent a dental practice/clinic with more than one dentist</label>
                                        </div>
                                    </div>
                                    <div class="pretty p-icon p-round">
                                        <input type="radio" name="work-type" value="an-associate-dentist"/>
                                        <div class="state p-primary">
                                            <i class="fa fa-check icon" aria-hidden="true"></i>
                                            <label>I work as an associate dentist at a dental clinic</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="padding-bottom-10">
                                    <select name="country-code" id="dentist-country" class="custom-input country-select">
                                        @php($current_phone_code = '+')
                                        @if(isset($client_ip) && $client_ip != '127.0.0.1')
                                            @php($current_user_country_code = mb_strtolower(trim(file_get_contents('http://ipinfo.io/' . $client_ip . '/country'))))
                                        @endif
                                        @php($countries = (new \App\Http\Controllers\APIRequestsController())->getAllCountries())
                                        @if(!empty($countries))
                                            @foreach($countries as $country)
                                                @php($selected = '')
                                                @if(!empty($current_user_country_code))
                                                    @if($current_user_country_code == $country->code)
                                                        @php($current_phone_code = $current_phone_code.$country->phone_code)
                                                        @php($selected = 'selected')
                                                    @endif
                                                @endif
                                                <option value="{{$country->code}}" data-code="{{$country->phone_code}}" {{$selected}}>{{$country->name}}</option>
                                            @endforeach
                                        @endif
                                    </select>
                                </div>
                                <div class="padding-bottom-10 suggester-parent module">
                                    <input type="text" name="address" class="custom-input address-suggester" autocomplete="off" placeholder="Street, Number, City">
                                    <div class="suggester-map-div margin-top-10 margin-bottom-10"></div>
                                    <div class="alert alert-notice geoip-confirmation margin-top-10 margin-bottom-10 hide-this">Please check the map to make sure we got your correct address. If you're not happy - please drag the map to adjust it.</div>
                                    <div class="alert alert-warning geoip-hint margin-top-10 margin-bottom-10">Please enter a valid address for your practice (including street name and number)</div>
                                </div>
                                <div class="padding-bottom-10 phone">
                                    <div class="country-code" name="phone-code">{{$current_phone_code}}</div>
                                    <div class="input-phone">
                                        <input class="custom-input" name="phone" maxlength="50" type="number" placeholder="Phone number"/>
                                    </div>
                                </div>
                                <div class="padding-bottom-20">
                                    <input class="custom-input" name="website" maxlength="250" type="url" placeholder="Website"/>
                                </div>
                            </div>
                            <div class="step third" data-step="third">
                                <div class="padding-bottom-20 fs-0">
                                    <div class="inline-block-top avatar register-popup module upload-file">
                                        <input type="file" class="visualise-image inputfile" id="custom-upload-avatar" name="image" accept=".jpg,.png,.jpeg,.svg,.bmp"/>
                                        <div class="btn-wrapper"></div>
                                        <div class="fs-14 padding-top-5 italic color-white">Max size: 2MB</div>
                                    </div>
                                    <div class="inline-block-top specializations">
                                        <h4>Please select your specializations:</h4>
                                        @foreach((new \App\Http\Controllers\APIRequestsController())->getAllEnums()->specialisations as $key => $specialisation)
                                            <div class="pretty p-svg p-curve black-style">
                                                <input type="checkbox" name="specializations[]" value="{{$key}}"/>
                                                <div class="state p-success">
                                                    <!-- svg path -->
                                                    <svg class="svg svg-icon" viewBox="0 0 20 20">
                                                        <path d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z" style="stroke: white;fill:white;"></path>
                                                    </svg>
                                                    <label class="fs-14">{{$specialisation}}</label>
                                                </div>
                                            </div>
                                        @endforeach
                                    </div>
                                    <div class="search-for-clinic padding-top-15 padding-bottom-15"></div>
                                    <div class="fs-0 captcha-parent padding-bottom-15">
                                        <div class="inline-block width-50 width-xs-100 padding-bottom-xs-15">
                                            <div class="captcha-container flex text-center">
                                                <span>{!! captcha_img() !!}</span>
                                                <button type="button" class="refresh-captcha">
                                                    <i class="fa fa-refresh" aria-hidden="true"></i>
                                                </button>
                                            </div>
                                        </div>
                                        <div class="inline-block fs-14 width-50 width-xs-100 padding-left-10">
                                            <input type="text" name="captcha" id="register-captcha" placeholder="Enter captcha" maxlength="5" class="custom-input"/>
                                        </div>
                                    </div>
                                    <div class="privacy-policy-row color-white">
                                        <div class="pretty p-svg p-curve black-style agree-with">
                                            <input type="checkbox" id="privacy-policy-registration"/>
                                            <div class="state p-success">
                                                <!-- svg path -->
                                                <svg class="svg svg-icon" viewBox="0 0 20 20">
                                                    <path d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z" style="stroke: white;fill:white;"></path>
                                                </svg>
                                                <label class="fs-14">I agree with <a href="//dentacoin.com/privacy-policy" target="_blank">Privacy Policy</a></label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="step-errors-holder padding-top-10"></div>
                                </div>
                            </div>
                            <div class="btns-container">
                                <div class="inline-block">
                                    <input type="button" value="< back" class="prev-step"/>
                                </div>
                                <div class="inline-block text-right">
                                    <input type="button" value="Next" class="black-white-btn fs-20 next-step" data-current-step="first"/>
                                    <input type="hidden" name="_token" value="{{csrf_token()}}">
                                </div>
                            </div>
                        </form>
                        <div class="popup-half-footer">
                            Already have an account? <a href="javascript:void(0)" class="call-log-in">Log in</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    @endif

    <div class="bottom-fixed-container">
        @if(!empty($privacy_policy_cookie))
            <div class="privacy-policy-cookie">
                <div class="container">
                    <div class="row">
                        <div class="col-xs-12">
                            <div class="text inline-block">This site uses cookies. Read more about the use of personal data in our <a href="{{route('privacy-policy')}}" class="link" target="_blank">Privacy Policy</a>.</div>
                            <div class="button inline-block"><a href="javascript:void(0);" class="white-blue-rounded-btn accept">Accept</a></div>
                        </div>
                    </div>
                </div>
            </div>
        @endif
    </div>
    <!--Start of Tawk.to Script-->
    <script type="text/javascript">
        var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
        (function(){
            var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
            s1.async=true;
            s1.src='https://embed.tawk.to/5c5810737cf662208c93f22e/default';
            s1.charset='UTF-8';
            s1.setAttribute('crossorigin','*');
            s0.parentNode.insertBefore(s1,s0);
        })();
    </script>
    <script type='application/ld+json'>
{
  "@context": "http://www.schema.org",
  "@type": "Corporation",
  "name": "Dentacoin Foundation",
  "description": "Dentacoin develops the dental industry as well as creates market intelligence through a crypto currency reward system that inspires participation throughout the community. Dentacoin is the first crypto currency that uses a decentralized review platform and transparently rewards patients and dentists who make contributions that benefit the community. The Dentacoin Foundation team strongly believes in building a future healthcare industry that will fall into the hands of the people, resulting in the disruption of the existing industries and the creation of new industries in the short and long term.",
  "logo": "https://dentacoin.com/assets/uploads/rounded-logo.svg",
  "image": "https://dentacoin.com/assets/uploads/two-line-logo.svg",
  "url": "https://dentacoin.com",
  "sameAs": [
        "https://www.facebook.com/dentacoin/",
        "https://www.instagram.com/dentacoin_official/",
        "https://twitter.com/dentacoin",
        "https://www.linkedin.com/company/dentacoin/",
        "https://www.youtube.com/dentacoin",
        "https://medium.com/@dentacoin/",
        "https://github.com/Dentacoin",
        "https://steemit.com/@dentacoin",
        "https://www.reddit.com/r/Dentacoin/"
    ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Wim Duisenbergplantsoen 31, ",
    "addressLocality": "Maastricht",
    "postalCode": "6221 SE ",
    "addressCountry": "Netherlands"
    },
    "foundingDate": "03/22/2017",
    "founders": [
    {
        "@type": "Person",
        "jobTitle": "Founder",
        "familyName": "Dimitrakiev",
        "givenName": "Dimitar ",
        "honorificPrefix": "Prof. Dr. ",
        "sameAs": "https://www.linkedin.com/in/dimitar-dimitrakiev/"
        },
    {
        "@type": "Person",
        "familyName": "Grenzebach",
        "givenName": "Philipp",
        "jobTitle": "Co-Founder & Business Developer",
        "sameAs": "https://www.linkedin.com/in/philipp-g-986861146/"
    },
    {
        "@type": "Person",
        "familyName": "Grenzebach",
        "givenName": "Jeremias",
        "jobTitle": "Co-Founder & Core Developer",
        "sameAs": "https://twitter.com/neptox"
    }
    ],
  "owns": {
   "@type": "Product",
  "name": "DentaVox",
  "image": "https://dentavox.dentacoin.com/new-vox-img/logo-vox.png",
  "description": "Take genuine paid surveys online and get rewarded! DentaVox is a market research platfom designed to provide valuable patient insights to the dental industry. Our large database with reliable dental statistics is available for free for anyone who's interested. Feel free to become a respondent yourself and help improve global dental care while also earning your first Dentacoin tokens with DentaVox.",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5",
    "ratingCount": "31"
  },
  "owns": {
   "@type": "Product",
  "name": "Dentacoin Trusted Reviews",
  "image": "https://dentacoin.com/assets/uploads/trusted-reviews.svg",
  "description": "Dentacoin Trusted Reviews is the first platform for detailed, verified and incentivized dental treatment reviews. Patients are invited by their dentists, verified through Blockchain-based identity system and rewarded for providing valuable feedback. Dentists have the chance to improve upon the feedback received and are incentivized for willing to do so.",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5",
    "ratingCount": "23"
  },
  "owns": {
   "@type": "Product",
  "name": "Dentacoin Assurance",
  "image": "https://assurance.dentacoin.com/assets/uploads/assurance-logo.svg",
  "description": "Dentacoin Assurance is a revolutionary dental insurance-like program that shifts the focus from treatment to prevention and brings the financial interests of patients and dentists into complete alignment without any intermediaries. Patients are entitled to a lifelong, prevention-focused dental care by paying a low monthly premium in DCN to their dentists.Dentists receive a stable basic income while simultaneously establish strong, lasting bonds with their patients.",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5",
    "ratingCount": "13"
  },
  "owns": {
   "@type": "Product",
  "name": "Dentacare App",
  "image": "https://dentacoin.com/assets/uploads/pop-up-dentacare-app-icon.svg",
  "description": "Dentacare is a mobile app which teaches kids and adults to maintain good oral hygiene through a 3-month, incentivized challenge. Users are guided through reminders, notifications, voice navigation and tutorials towards establishing and maintaining dental care habits. Dentists recommend the app to their patients to ensure proper in-home care.",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5",
    "ratingCount": "19"
  },
  "owns": {
   "@type": "Product",
  "name": "Wallet dApp",
  "image": "https://dentacoin.com/assets/uploads/pop-up-wallet-app-icon.svg",
  "description": "Dentacoin Wallet allows users to easily and securely store, send, receive DCN tokens, as well as buy DCN against fiat and crypto currencies. Users are entitled to the combination between account security and a very friendly user interface. Dentists, patients, suppliers can easily handle payments between each other without any significant tech knowledge required.",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5",
    "ratingCount": "48"
  },
  "owns": {
   "@type": "Product",
  "name": "Dentacoin Blog",
  "image": "https://dentacoin.com/assets/uploads/pop-up-blog-app-icon.svg",
  "description": "Dentacoin Blog provides the most recent news around the project, as well as regular weekly updates.",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5",
    "ratingCount": "27"
  }
}
}
}
}
}
}
}
</script>
    <!--End of Tawk.to Script-->
    {{--<script src="/assets/js/basic.js"></script>--}}
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCaVeHq_LOhQndssbmw-aDnlMwUG73yCdk&libraries=places&language=en"></script>
    {{--<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBd5xOHXvqHKf8ulbL8hEhFA4kb7H6u6D4" type="text/javascript"></script>
    --}}<script src="/dist/js/front-libs-script.js?v=1.0.32"></script>
    @yield("script_block")
    <script src="/dist/js/front-script.js?v=1.0.32"></script>
    <script src="/assets/js/index-bundled.js?v=1.0.32"></script>
    {{--<script src="/assets/js/markerclusterer-v2.js"></script>
    <script src="/assets/js/google-map.js"></script>
    <script src="/assets/js/index.js"></script>--}}

    {{--Multiple errors from laravel validation--}}
    @if(!empty($errors) && count($errors) > 0)
        <script>
            var errors = '';
            @foreach($errors->all() as $error)
                errors+="{{ $error }}" + '<br>';
            @endforeach
            basic.showAlert(errors, '', true);
        </script>
    @endif

    {{--Single error from controller response--}}
    @if (session('error'))
        <script>
            basic.showAlert("{!! session('error') !!}", '', true);
        </script>
    @endif

    {{--Multiple errors from controller response--}}
    @if(session('errors_response') && count(session('errors_response')) > 0)
        <script>
            var errors = '';
            @foreach(session('errors_response') as $error)
                errors+="{{ $error }}" + '<br>';
            @endforeach
            basic.showAlert(errors, '', true);
        </script>
    @endif

    {{--Success from controller response--}}
    @if(session('success'))
        @if(session('popup-html'))
            <script>
                basic.showDialog('{!! session('popup-html') !!}', 'popup-html', null, true);
                $('.close-popup').click(function() {
                    basic.closeDialog();
                });
            </script>
        @else
            <script>
                basic.showAlert("{!! session('success') !!}", '', true);
            </script>
        @endif
    @endif
</body>
</html>