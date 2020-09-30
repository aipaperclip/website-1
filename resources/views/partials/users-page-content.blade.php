<section class="section-wait-until-user-page hide-on-map-open hide-on-hub-open">
    <div class="absolute-content padding-bottom-50 padding-bottom-xs-15 text-center-xs">
        <h2 class="fs-46 fs-md-40 fs-sm-30 lato-black color-white users-title padding-bottom-lgll-20 hide-xs">USERS</h2>
        <h3 class="fs-46 fs-md-40 fs-sm-30 fs-xs-22 color-white lato-black padding-top-10 padding-bottom-25">“Wait until it aches” is an expensive and painful approach.</h3>
        <div class="fs-24 fs-md-22 fs-sm-18 fs-xs-18 color-white lato-bold">Join 190,326 people who care about sustainable oral health and equal access to dental care!</div>
    </div>
    @php($arrWithPossibilities = array ('male', 'female'))
    @if ($arrWithPossibilities[rand(0, count($arrWithPossibilities) - 1)] == 'male')
        <picture itemscope="" itemtype="http://schema.org/ImageObject" class="hidden-picture">
            <source media="(max-width: 992px)" srcset="/assets/uploads/man-user-mobile-img.png">
            <source media="(max-width: 1366px)" srcset="/assets/uploads/man-user-1366-img.png">
            <img alt="Male user" itemprop="contentUrl" src="/assets/uploads/man-user-1920-img.png">
        </picture>
    @else
        <picture itemscope="" itemtype="http://schema.org/ImageObject" class="hidden-picture">
            <source media="(max-width: 992px)" srcset="/assets/uploads/woman-user-mobile-img.png">
            <source media="(max-width: 1366px)" srcset="/assets/uploads/woman-user-1366-img.png">
            <img alt="Female user" itemprop="contentUrl" src="/assets/uploads/woman-user-1920-img.png">
        </picture>
    @endif
</section>
<section class="container padding-top-20 padding-bottom-10 text-center hide-on-map-open">
    <div class="row">
        <div class="col-xs-12 color-black">
            <h3 class="fs-30 fs-sm-24 fs-xs-20 padding-bottom-lgll-10 lato-bold">ONE ACCOUNT. FREE REWARDS.</h3>
            <h2 class="fs-50 fs-sm-40 fs-xs-26 fs-lgll-65 lato-black padding-bottom-xs-10">DENTACOIN APPS</h2>
        </div>
    </div>
</section>
<section id="append-big-hub-dentacoin" class="hide-on-map-open"></section>
<section class="section-triangle-video padding-top-25 hide-on-map-open hide-on-hub-open">
    <div class="container">
        <div class="row">
            <div class="col-xs-12 class-video-container">
                <div itemprop="video" itemscope="" itemtype="http://schema.org/VideoObject" class="patient-dentist-triangle-video"></div>
            </div>
        </div>
    </div>
</section>
<section class="section-users-expressions padding-left-40 padding-right-40 padding-left-xs-0 padding-right-xs-0 hide-on-map-open hide-on-hub-open">
    @include('partials.video-expressions', array('video_expressions' => $video_expressions, 'type' => 'users', 'title' => 'COMMUNITY SPEAKING:'))
</section>
<section class="section-users-text-expressions hide-on-map-open hide-on-hub-open">
    @include('partials.user-expressions', array('user_expressions' => $user_expressions, 'type' => 'users'))
</section>
<section class="section-google-map module hide-on-hub-open">
    <div class="container-fluid">
        <div class="row padding-top-20 padding-bottom-30">
            <div class="col-xs-12 text-center color-black">
                <h3 class="fs-30 fs-sm-24 fs-xs-20 padding-bottom-lgll-10 lato-bold">ALL AROUND THE WORLD:</h3>
                <h2 class="fs-50 fs-sm-40 fs-xs-26 fs-lgll-65 lato-black">USERS & PARTNERS</h2>
            </div>
        </div>
    </div>
    <div class="map-container">
        <div itemprop="video" itemscope="" itemtype="http://schema.org/VideoObject">
            @php ($videoUrl = 'desktop-map-loader.webm')
            @if (isset($mobile_device) && $mobile_device)
                @php ($videoUrl = 'desktop-map-loader.webm')
            @endif
            <video autoplay muted loop class="width-100">
                <source src="{{URL::asset('assets/uploads/') }}" type="video/mp4">
                Your browser does not support HTML5 video.
            </video>
            <meta itemprop="name" content="Dentacoin Loading Video">
            <meta itemprop="description" content="Dentacoin Loading Video which is shown whenever website content is still loading">
            <meta itemprop="uploadDate" content="2020-09-19T08:00:00+08:00">
            <meta itemprop="thumbnailUrl" content="https://dentacoin.com/assets/uploads/video-poster.png">
            <link itemprop="contentURL" href="{{URL::asset('assets/uploads/desktop-map-loader.webm') }}">
        </div>
    </div>
</section>
<section class="module section-dentacoin-stats padding-top-90 padding-bottom-80 hide-on-map-open hide-on-hub-open">
    @include('partials.dentacoin-stats')
</section>