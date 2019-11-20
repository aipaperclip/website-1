<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <link rel="shortcut icon" href="{{URL::asset('assets/images/favicon.png') }}" type="image/x-icon" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
    <meta name="csrf-token" content="{{ csrf_token() }}"/>
    @if(!empty($meta_data))
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
<body class="@if(!empty(Route::current())) {{Route::current()->getName()}} @endif">
    <header class="container padding-top-15 padding-bottom-15">
        <div class="row fs-0">
            <figure class="col-xs-4 inline-block" itemscope="" itemtype="http://schema.org/ImageObject">
                <img src="/assets/images/logo.svg" alt="Dentacoin logo" class="max-width-50" itemprop="contentUrl"/>
            </figure>
            <div class="col-xs-8 inline-block text-right">
                <a href="javascript:void(0)" class="white-light-blue-btn reserve-your-spot fs-xs-16">RESERVE YOUR SPOT</a>
            </div>
        </div>
    </header>
    <main>
        <section class="intro-section">
            <div class="container">
                <div class="row">
                    <h1 class="col-xs-12 text-center fs-46 fs-xs-26 lato-bold padding-bottom-20">CONNECTING THE BLOCKS:<br>“Blockchain in Healthcare” Roundtable</h1>
                </div>
            </div>
            <picture itemscope="" itemtype="http://schema.org/ImageObject">
                <source media="(max-width: 768px)" srcset="/assets/images/header-img-mobile.png" />
                <img alt="Section intro image" itemprop="contentUrl" class="width-100" src="/assets/images/header-img-desktop.png"/>
            </picture>
        </section>
        <section class="section-venue-date-fee container padding-top-50">
            <div class="row fs-0">
                <div class="col-xs-12 col-sm-4 padding-bottom-20 padding-bottom-xs-30 text-center inline-block-top">
                    <figure class="inline-block" itemscope="" itemtype="http://schema.org/ImageObject">
                        <img src="/assets/images/location.svg" alt="Venue" class="width-100 max-width-40 max-width-xs-20" itemprop="contentUrl"/>
                    </figure>
                    <span class="lato-bold fs-36 fs-xs-22 inline-block padding-left-10">VENUE:</span>
                    <div class="padding-top-10 fs-24 fs-xs-16 lato-regular">Berlin, Germany<br>Exact location by August 31</div>
                </div>
                <div class="col-xs-12 col-sm-4 padding-bottom-20 padding-bottom-xs-30 text-center inline-block-top">
                    <figure class="inline-block" itemscope="" itemtype="http://schema.org/ImageObject">
                        <img src="/assets/images/date.svg" alt="Date" class="width-100 max-width-50 max-width-xs-30" itemprop="contentUrl"/>
                    </figure>
                    <span class="lato-bold fs-36 fs-xs-22 inline-block padding-left-10">DATE:</span>
                    <div class="padding-top-10 fs-24 fs-xs-16 lato-regular">October 26-27, 2019</div>
                </div>
                <div class="col-xs-12 col-sm-4 padding-bottom-20 padding-bottom-xs-30 text-center inline-block-top">
                    <figure class="inline-block" itemscope="" itemtype="http://schema.org/ImageObject">
                        <img src="/assets/images/fee.svg" alt="Fee" class="width-100 max-width-50 max-width-xs-30" itemprop="contentUrl"/>
                    </figure>
                    <span class="lato-bold fs-36 fs-xs-22 inline-block padding-left-10">FEE:</span>
                    <div class="padding-top-10 fs-24 fs-xs-16 lato-regular">EUR 100 via wire transfer or<br>EUR 200 in any cryptocurrency </div>
                </div>
            </div>
        </section>
        <section class="section-register-form container padding-top-40">
            <div class="row fs-0">
                <figure class="inline-block-bottom hide-xs col-sm-3 col-lg-4 no-gutter" itemscope="" itemtype="http://schema.org/ImageObject">
                    <img src="/assets/images/dentist.svg" alt="Dentist" class="width-100" itemprop="contentUrl"/>
                </figure>
                <div class="inline-block-bottom col-xs-12 col-sm-6 col-lg-4 no-gutter margin-bottom-100 box-shadow">
                    <div class="blue-line"></div>
                    <form method="POST" enctype="multipart/form-data" action="" class="padding-top-30 padding-bottom-30 padding-left-40 padding-right-40 padding-left-xs-20 padding-right-xs-20 reserve-your-spot-form">
                        <h2 class="text-center lato-bold fs-36 fs-xs-26 padding-bottom-10">RESERVE YOUR SPOT</h2>
                        <h3 class="text-center fs-26 fs-xs-18 padding-bottom-40">until September 25, 2019: </h3>
                        <div class="padding-bottom-20 field-parent">
                            <div class="custom-google-label-style module" data-input-colorful-border="true">
                                <label for="fname">First Name:</label>
                                <input type="text" id="fname" name="fname" maxlength="100" class="full-rounded required form-field"/>
                            </div>
                        </div>
                        <div class="padding-bottom-20 field-parent">
                            <div class="custom-google-label-style module" data-input-colorful-border="true">
                                <label for="lname">Last Name:</label>
                                <input type="text" id="lname" name="lname" maxlength="100" class="full-rounded required form-field"/>
                            </div>
                        </div>
                        <div class="padding-bottom-20 field-parent">
                            <div class="custom-google-label-style module" data-input-colorful-border="true">
                                <label for="email">Business Email:</label>
                                <input type="email" id="email" name="email" maxlength="100" class="full-rounded required form-field"/>
                            </div>
                        </div>
                        <div class="padding-bottom-20 field-parent">
                            <div class="custom-google-label-style module" data-input-colorful-border="true">
                                <label for="job-title">Job Title:</label>
                                <input type="text" id="job-title" name="job-title" maxlength="100" class="full-rounded required form-field"/>
                            </div>
                        </div>
                        <div class="padding-bottom-20 field-parent">
                            <div class="custom-google-label-style module" data-input-colorful-border="true">
                                <label for="company">Company:</label>
                                <input type="text" id="company" name="company" maxlength="100" class="full-rounded required form-field"/>
                            </div>
                        </div>
                        <div class="padding-bottom-20 field-parent">
                            <div class="custom-google-label-style module" data-input-colorful-border="true">
                                <label for="website">Company website:</label>
                                <input type="text" id="website" name="website" maxlength="250" class="full-rounded required form-field"/>
                            </div>
                        </div>
                        <div class="padding-bottom-20 field-parent">
                            <div class="custom-google-select-style module">
                                <label>Company profile:</label>
                                <select class="form-field required" name="company-profile">
                                    <option value="disabled">Choose from list</option>
                                    <option>Blockchain company</option>
                                    <option>Investor</option>
                                    <option>Dental supplier</option>
                                    <option>Medical supplier</option>
                                    <option>Dental manufacturer</option>
                                    <option>Medical manufacturer</option>
                                    <option>Software provider</option>
                                    <option>Media</option>
                                    <option>Other:</option>
                                </select>
                            </div>
                        </div>
                        <div class="camping-select-result"></div>
                        <div class="padding-bottom-20 field-parent">
                            <div class="custom-google-select-style module">
                                <label>Number of participants:</label>
                                <select class="form-field required" name="participants">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>
                                    <option>7</option>
                                    <option>8</option>
                                    <option>9</option>
                                    <option>10</option>
                                </select>
                            </div>
                        </div>
                        <div class="padding-bottom-20 field-parent">
                            <textarea id="why-do-you-want-to-join" name="why-do-you-want-to-join" placeholder="Why do you want to join the roundtable?" rows="3" maxlength="3000" class="required form-field"></textarea>
                        </div>
                        <div class="fs-0 captcha-parent padding-bottom-20 field-parent">
                            <div class="inline-block width-50 width-xs-100 padding-bottom-xs-15">
                                <div class="captcha-container flex text-center">
                                    <span>{!! captcha_img() !!}</span>
                                    <button type="button" class="refresh-captcha">
                                        <i class="fa fa-refresh" aria-hidden="true"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="inline-block fs-14 width-50 width-xs-100 padding-left-10">
                                <div class="custom-google-label-style module" data-input-colorful-border="true">
                                    <label for="register-captcha">Enter captcha:</label>
                                    <input type="text" name="captcha" id="register-captcha" maxlength="5" class="full-rounded form-field required"/>
                                </div>
                            </div>
                        </div>
                        <div class="text-center">
                            <input type="submit" value="SEND REQUEST" class="white-light-blue-btn"/>
                            <input type="hidden" name="_token" value="{{csrf_token()}}">
                        </div>
                    </form>
                </div>
                <figure class="inline-block-bottom hide-xs col-sm-3 col-lg-4 no-gutter" itemscope="" itemtype="http://schema.org/ImageObject">
                    <img src="/assets/images/businessman.svg" alt="Businessman" class="width-100" itemprop="contentUrl"/>
                </figure>
            </div>
        </section>
        <section class="section-days text-center">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12 col-sm-6 padding-top-50 padding-bottom-50 padding-top-xs-70 padding-bottom-xs-70 color-white">
                        <div class="fs-36 fs-xs-26 lato-bold">DAY 1</div>
                        <div class="padding-top-5 padding-bottom-5 fs-26 fs-xs-18 lato-bold">Blockchain Project Introductions</div>
                        <div class="fs-16">Open to investors, suppliers, manufacturers, media</div>
                    </div>
                    <div class="col-xs-12 col-sm-6 padding-top-50 padding-bottom-50 padding-top-xs-70 padding-bottom-xs-70">
                        <div class="fs-36 fs-xs-26 lato-bold">DAY 2</div>
                        <div class="padding-top-5 padding-bottom-5 fs-26 fs-xs-18 lato-bold">Roundtable Discussions</div>
                        <div class="fs-16">Closed for blockchain solution providers only</div>
                    </div>
                </div>
            </div>
        </section>
        <section class="section-confirmed-attendees text-center container padding-top-70 padding-bottom-70">
            <div class="row">
                <div class="col-xs-12 no-gutter-xs col-sm-10 col-sm-offset-1 col-lg-8 col-lg-offset-2 text-center">
                    <h2 class="fs-36 fs-xs-26 lato-bold padding-bottom-30">CONFIRMED ATTENDEES</h2>
                    @if($mobile)
                        <div class="attendees-slider padding-left-50 padding-right-50">
                            <div class="cell-wrapper fs-16">
                                <figure class="inline-block-bottom padding-bottom-10 logo" itemscope="" itemtype="http://schema.org/ImageObject">
                                    <img src="/assets/images/dentacoin-logo.png"  alt="Dentacoin logo" itemprop="contentUrl"/>
                                </figure>
                                <div>The first blockchain solution for the global dental industry</div>
                                <a href="//dentacoin.com/" target="_blank" class="color-light-blue-2">www.dentacoin.com</a>
                                <hr/>
                                <div>Represented by:</div>
                                <figure class="inline-block-bottom padding-top-5 padding-bottom-5" itemscope="" itemtype="http://schema.org/ImageObject">
                                    <img src="/assets/images/jeremias.png" class="max-width-70" alt="Jeremias Grenzebach" itemprop="contentUrl"/>
                                </figure>
                                <div class="lato-bold">Jeremias Grenzebach</div>
                                <div class="lato-light">Co-founder & Core Developer</div>
                            </div>
                            <div class="cell-wrapper fs-16">
                                <figure class="inline-block-bottom padding-bottom-10 logo" itemscope="" itemtype="http://schema.org/ImageObject">
                                    <img src="/assets/images/cover-us-logo.png"  alt="Cover us logo" itemprop="contentUrl"/>
                                </figure>
                                <div>Smart app allowing patients to control and profit from their health data</div>
                                <a href="//coverus.health/" target="_blank" class="color-light-blue-2">www.coverus.health</a>
                                <hr/>
                                <div>Represented by:</div>
                                <figure class="inline-block-bottom padding-top-5 padding-bottom-5" itemscope="" itemtype="http://schema.org/ImageObject">
                                    <img src="/assets/images/chris.png" class="max-width-70" alt="Chris" itemprop="contentUrl"/>
                                </figure>
                                <div class="lato-bold">Christopher Sealey</div>
                                <div class="lato-light">Co-founder & President</div>
                            </div>
                            <div class="cell-wrapper fs-16">
                                <figure class="inline-block-bottom padding-bottom-10 logo" itemscope="" itemtype="http://schema.org/ImageObject">
                                    <img src="/assets/images/well-logo.png"  alt="Well logo" itemprop="contentUrl"/>
                                </figure>
                                <div>Helping consumers get recognized and paid for data and healthy behaviour</div>
                                <a href="//joinwell.io/" target="_blank" class="color-light-blue-2">www.joinwell.io</a>
                                <hr/>
                                <div>Represented by:</div>
                                <figure class="inline-block-bottom padding-top-5 padding-bottom-5" itemscope="" itemtype="http://schema.org/ImageObject">
                                    <img src="/assets/images/alex.png" class="max-width-70" alt="Alex" itemprop="contentUrl"/>
                                </figure>
                                <div class="lato-bold">Alex Prokhorov</div>
                                <div class="lato-light">Co-founder & Investor</div>
                            </div>
                            <div class="cell-wrapper fs-16">
                                <figure class="inline-block-bottom padding-bottom-10 logo" itemscope="" itemtype="http://schema.org/ImageObject">
                                    <img src="/assets/images/dnatix.png"  alt="Dnatix logo" itemprop="contentUrl"/>
                                </figure>
                                <div>The anonymous genetic platform for secure storage and trasfer of data</div>
                                <a href="//dnatix.com/" target="_blank" class="color-light-blue-2">www.dnatix.com</a>
                                <hr/>
                                <div>Represented by:</div>
                                <figure class="inline-block-bottom padding-top-5 padding-bottom-5" itemscope="" itemtype="http://schema.org/ImageObject">
                                    <img src="/assets/images/tal.png" class="max-width-70" alt="Tal" itemprop="contentUrl"/>
                                </figure>
                                <div class="lato-bold">Dr. Tal Sines</div>
                                <div class="lato-light">Co-founder & CSO</div>
                            </div>
                            <div class="cell-wrapper fs-16">
                                <figure class="inline-block-bottom padding-bottom-10 logo" itemscope="" itemtype="http://schema.org/ImageObject">
                                    <img src="/assets/images/aimedis.png"  alt="Aimedis logo" itemprop="contentUrl"/>
                                </figure>
                                <div>A blockchain backed medical ecosystem offering more than eHealth</div>
                                <a href="//aimedis.com/" target="_blank" class="color-light-blue-2">www.aimedis.com</a>
                                <hr/>
                                <div>Represented by:</div>
                                <figure class="inline-block-bottom padding-top-5 padding-bottom-5" itemscope="" itemtype="http://schema.org/ImageObject">
                                    <img src="/assets/images/roxana.png" class="max-width-70" alt="Roxana" itemprop="contentUrl"/>
                                </figure>
                                <div class="lato-bold">Roxana Nasoi</div>
                                <div class="lato-light">CCO</div>
                            </div>
                            <div class="cell-wrapper fs-16">
                                <figure class="inline-block-bottom padding-bottom-10 logo" itemscope="" itemtype="http://schema.org/ImageObject">
                                    <img src="/assets/images/yossi-logo.png"  alt="Yossi logo" itemprop="contentUrl"/>
                                </figure>
                                <div>A boutique consulting firm helping technology meet funding</div>
                                <a href="//investable.solutions/" target="_blank" class="color-light-blue-2">www.investable.solutions</a>
                                <hr/>
                                <div>Represented by:</div>
                                <figure class="inline-block-bottom padding-top-5 padding-bottom-5" itemscope="" itemtype="http://schema.org/ImageObject">
                                    <img src="/assets/images/yossi.png" class="max-width-70" alt="Aaron" itemprop="contentUrl"/>
                                </figure>
                                <div class="lato-bold">Yossi Konijn</div>
                                <div class="lato-light">Co-Managing Partner</div>
                            </div>
                        </div>
                    @else
                        <div class="row display-flex">
                            <div class="col-xs-12 col-sm-4 padding-bottom-20">
                                <div class="cell-wrapper fs-16">
                                    <figure class="inline-block-bottom padding-bottom-10 logo" itemscope="" itemtype="http://schema.org/ImageObject">
                                        <img src="/assets/images/dentacoin-logo.png"  alt="Dentacoin logo" itemprop="contentUrl"/>
                                    </figure>
                                    <div>The first blockchain solution for the global dental industry</div>
                                    <a href="//dentacoin.com/" target="_blank" class="color-light-blue-2">www.dentacoin.com</a>
                                    <hr/>
                                    <div>Represented by:</div>
                                    <figure class="inline-block-bottom padding-top-5 padding-bottom-5" itemscope="" itemtype="http://schema.org/ImageObject">
                                        <img src="/assets/images/jeremias.png" class="max-width-70" alt="Jeremias Grenzebach" itemprop="contentUrl"/>
                                    </figure>
                                    <div class="lato-bold">Jeremias Grenzebach</div>
                                    <div class="lato-light">Co-founder & Core Developer</div>
                                </div>
                            </div>
                            <div class="col-xs-12 col-sm-4 padding-bottom-20">
                                <div class="cell-wrapper fs-16">
                                    <figure class="inline-block-bottom padding-bottom-10 logo" itemscope="" itemtype="http://schema.org/ImageObject">
                                        <img src="/assets/images/cover-us-logo.png"  alt="Cover us logo" itemprop="contentUrl"/>
                                    </figure>
                                    <div>Smart app allowing patients to control and profit from their health data</div>
                                    <a href="//coverus.health/" target="_blank" class="color-light-blue-2">www.coverus.health</a>
                                    <hr/>
                                    <div>Represented by:</div>
                                    <figure class="inline-block-bottom padding-top-5 padding-bottom-5" itemscope="" itemtype="http://schema.org/ImageObject">
                                        <img src="/assets/images/chris.png" class="max-width-70" alt="Chris" itemprop="contentUrl"/>
                                    </figure>
                                    <div class="lato-bold">Christopher Sealey</div>
                                    <div class="lato-light">Co-founder & President</div>
                                </div>
                            </div>
                            <div class="col-xs-12 col-sm-4 padding-bottom-20">
                                <div class="cell-wrapper fs-16">
                                    <figure class="inline-block-bottom padding-bottom-10 logo" itemscope="" itemtype="http://schema.org/ImageObject">
                                        <img src="/assets/images/well-logo.png"  alt="Well logo" itemprop="contentUrl"/>
                                    </figure>
                                    <div>Helping consumers get recognized and paid for data and healthy behaviour</div>
                                    <a href="//joinwell.io/" target="_blank" class="color-light-blue-2">www.joinwell.io</a>
                                    <hr/>
                                    <div>Represented by:</div>
                                    <figure class="inline-block-bottom padding-top-5 padding-bottom-5" itemscope="" itemtype="http://schema.org/ImageObject">
                                        <img src="/assets/images/alex.png" class="max-width-70" alt="Alex" itemprop="contentUrl"/>
                                    </figure>
                                    <div class="lato-bold">Alex Prokhorov</div>
                                    <div class="lato-light">Co-founder & Investor</div>
                                </div>
                            </div>
                        </div>
                        <div class="row display-flex">
                            <div class="col-xs-12 col-sm-4 padding-bottom-20">
                                <div class="cell-wrapper fs-16">
                                    <figure class="inline-block-bottom padding-bottom-10 logo" itemscope="" itemtype="http://schema.org/ImageObject">
                                        <img src="/assets/images/dnatix.png"  alt="Dnatix logo" itemprop="contentUrl"/>
                                    </figure>
                                    <div>The anonymous genetic platform for secure storage and trasfer of data</div>
                                    <a href="//dnatix.com/" target="_blank" class="color-light-blue-2">www.dnatix.com</a>
                                    <hr/>
                                    <div>Represented by:</div>
                                    <figure class="inline-block-bottom padding-top-5 padding-bottom-5" itemscope="" itemtype="http://schema.org/ImageObject">
                                        <img src="/assets/images/tal.png" class="max-width-70" alt="Tal" itemprop="contentUrl"/>
                                    </figure>
                                    <div class="lato-bold">Dr. Tal Sines</div>
                                    <div class="lato-light">Co-founder & CSO</div>
                                </div>
                            </div>
                            <div class="col-xs-12 col-sm-4 padding-bottom-20">
                                <div class="cell-wrapper fs-16">
                                    <figure class="inline-block-bottom padding-bottom-10 logo" itemscope="" itemtype="http://schema.org/ImageObject">
                                        <img src="/assets/images/aimedis.png"  alt="Aimedis logo" itemprop="contentUrl"/>
                                    </figure>
                                    <div>A blockchain backed medical ecosystem offering more than eHealth</div>
                                    <a href="//aimedis.com/" target="_blank" class="color-light-blue-2">www.aimedis.com</a>
                                    <hr/>
                                    <div>Represented by:</div>
                                    <figure class="inline-block-bottom padding-top-5 padding-bottom-5" itemscope="" itemtype="http://schema.org/ImageObject">
                                        <img src="/assets/images/roxana.png" class="max-width-70" alt="Roxana" itemprop="contentUrl"/>
                                    </figure>
                                    <div class="lato-bold">Roxana Nasoi</div>
                                    <div class="lato-light">CCO</div>
                                </div>
                            </div>
                            <div class="col-xs-12 col-sm-4 padding-bottom-20">
                                <div class="cell-wrapper fs-16">
                                    <figure class="inline-block-bottom padding-bottom-10 logo" itemscope="" itemtype="http://schema.org/ImageObject">
                                        <img src="/assets/images/yossi-logo.png"  alt="Yossi logo" itemprop="contentUrl"/>
                                    </figure>
                                    <div>A boutique consulting firm helping technology meet funding</div>
                                    <a href="//investable.solutions/" target="_blank" class="color-light-blue-2">www.investable.solutions</a>
                                    <hr/>
                                    <div>Represented by:</div>
                                    <figure class="inline-block-bottom padding-top-5 padding-bottom-5" itemscope="" itemtype="http://schema.org/ImageObject">
                                        <img src="/assets/images/yossi.png" class="max-width-70" alt="Aaron" itemprop="contentUrl"/>
                                    </figure>
                                    <div class="lato-bold">Yossi Konijn</div>
                                    <div class="lato-light">Co-Managing Partner</div>
                                </div>
                            </div>
                        </div>
                    @endif
                </div>
            </div>
        </section>
        <section class="section-reserve-your-spot padding-top-70 padding-bottom-70">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12 text-center">
                        <h2 class="fs-36 fs-xs-30 padding-bottom-50">Join the first of its kind roundtable discussion<br>“Blockchain in Healthcare”!</h2>
                        <div>
                            <a href="javascript:void(0)" class="white-light-blue-btn reserve-your-spot">RESERVE YOUR SPOT</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="section-download-brochures container text-center padding-top-100 padding-bottom-100 padding-top-xs-50 padding-bottom-xs-50">
            <div class="row">
                <h2 class="col-xs-12 fs-36 fs-xs-26 lato-bold padding-bottom-70 padding-bottom-xs-30">DOWNLOAD BROCHURES TO LEARN MORE</h2>
            </div>
            <div class="row">
                <a href="/assets/uploads/blockchain-in-healthcare-berlin-providers-1.pdf" download="" class="col-xs-12 col-sm-3 padding-bottom-xs-50 single-brochure">
                    <figure itemscope="" itemtype="http://schema.org/ImageObject">
                        <img src="/assets/images/blockchain-brochure.svg" class="max-width-150" alt="Blockchain companies" itemprop="contentUrl"/>
                        <figcaption class="color-light-blue-2 fs-18 fs-xs-16 lato-bold padding-top-25">Blockchain companies</figcaption>
                    </figure>
                </a>
                <a href="/assets/uploads/blockchain-in-healthcare-berlin-suppliers-1.pdf" download="" class="col-xs-12 col-sm-3 padding-bottom-xs-50 single-brochure">
                    <figure itemscope="" itemtype="http://schema.org/ImageObject">
                        <img src="/assets/images/suppliers-brochure.svg" class="max-width-150" alt="Supplier/ Manufacturers" itemprop="contentUrl"/>
                        <figcaption class="color-light-blue-2 fs-18 fs-xs-16 lato-bold padding-top-25">Supplier/ Manufacturers</figcaption>
                    </figure>
                </a>
                <a href="/assets/uploads/blockchain-in-healthcare-berlin-media-1.pdf" download="" class="col-xs-12 col-sm-3 padding-bottom-xs-50 single-brochure">
                    <figure itemscope="" itemtype="http://schema.org/ImageObject">
                        <img src="/assets/images/media-brochure.svg" class="max-width-100" alt="Media" itemprop="contentUrl"/>
                        <figcaption class="color-light-blue-2 fs-18 fs-xs-16 lato-bold padding-top-25">Media</figcaption>
                    </figure>
                </a>
                <a href="/assets/uploads/blockchain-in-healthcare-berlin-investors-1.pdf" download="" class="col-xs-12 col-sm-3 padding-bottom-xs-50 single-brochure">
                    <figure itemscope="" itemtype="http://schema.org/ImageObject">
                        <img src="/assets/images/investors-brochure.svg" class="max-width-150" alt="Investors" itemprop="contentUrl"/>
                        <figcaption class="color-light-blue-2 fs-18 fs-xs-16 lato-bold padding-top-25">Investors</figcaption>
                    </figure>
                </a>
            </div>
        </section>
    </main>
    <footer>
        <div class="blue-line"></div>
        <div class="container text-center padding-top-50">
            <div class="row">
                <div class="col-xs-12 col-sm-3 col-sm-offset-3 lato-regular padding-top-xs-15 padding-bottom-15">
                    <div class="fs-20 lato-bold padding-bottom-10">Participation inquiries:</div>
                    <div class="fs-18">Ali Hashem</div>
                    <div class="fs-18">Key Account Manager</div>
                    <div><a href="mailto:ali.hashem@dentacoin.com" class="color-light-blue-2 lato-bold fs-18">ali.hashem@dentacoin.com</a></div>
                </div>
                <div class="col-xs-12 col-sm-3 lato-regular left-border padding-top-xs-15 padding-bottom-15">
                    <div class="fs-20 lato-bold padding-bottom-10">Press & Marketing inquiries:</div>
                    <div class="fs-18">Donika Kraeva</div>
                    <div class="fs-18">Marketing Manager</div>
                    <div><a href="mailto:donika.kraeva@dentacoin.com" class="color-light-blue-2 lato-bold fs-18">donika.kraeva@dentacoin.com</a></div>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12 fs-16 fs-xs-14 padding-top-50 padding-bottom-30">
                    <div>Organized by Dentacoin Foundation</div>
                    <div>© 2019 Dentacoin Foundation. All rights reserved.</div>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12">
                    <a href="//dentacoin.com" target="_blank">
                        <figure itemscope="" itemtype="http://schema.org/ImageObject">
                            <img src="/assets/images/dentacoin-footer.png" class="width-100 max-width-300 max-width-xs-250" alt="Dentacoin bottom logo" itemprop="contentUrl"/>
                        </figure>
                    </a>
                </div>
            </div>
        </div>
    </footer>
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
    <div class="response-layer">
        <div class="wrapper">
            <figure itemscope="" itemtype="http://schema.org/ImageObject">
                <img src="/assets/images/loader.gif" class="max-width-160" alt="Loader">
            </figure>
        </div>
    </div>
    {{--<script src="/assets/js/basic.js"></script>--}}
    <script src="/dist/js/front-libs-script.js?v=1.0.2"></script>
    @yield("script_block")
    <script src="/dist/js/front-script.js?v=1.0.2"></script>
    {{--<script src="/assets/js/index.js"></script>--}}

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
        <script>
            basic.showAlert("{!! session('success') !!}", '', true);
        </script>
    @endif
</body>
</html>