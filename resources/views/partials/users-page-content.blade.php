<section class="section-wait-until-user-page hide-on-map-open hide-on-hub-open">
    <div class="absolute-content padding-bottom-50 padding-bottom-xs-15 text-center-xs">
        <h2 class="fs-46 fs-md-40 fs-sm-30 lato-black color-white users-title padding-bottom-lgll-20 hide-xs">USERS</h2>
        <h3 class="fs-46 fs-md-40 fs-sm-30 fs-xs-22 color-white lato-black padding-top-10 padding-bottom-25">“Wait until it aches” is an expensive and painful approach.</h3>
        <div class="fs-24 fs-md-22 fs-sm-18 fs-xs-18 color-white lato-bold">Join 201,326 people who care about sustainable oral health and equal access to dental care!</div>
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
                <div itemprop="video" itemscope="" itemtype="http://schema.org/VideoObject" class="patient-dentist-triangle-video">
                    <meta itemprop="name" content="Dentacoin Currency Video">
                    <meta itemprop="description" content="Relation between patients and dentists via Dentacoin Currency.">
                    <meta itemprop="uploadDate" content="2020-08-30T08:00:00+08:00">
                    <meta itemprop="thumbnailUrl" content="https://dentacoin.com/assets/uploads/video-poster.png">
                    <link itemprop="contentURL" href="https://dentacoin.com/assets/uploads/patient-dentist-triangle-animation.webm">
                </div>
            </div>
        </div>
    </div>
</section>
<section class="section-users-expressions padding-left-40 padding-right-40 padding-left-xs-0 padding-right-xs-0 hide-on-map-open hide-on-hub-open">
    @include('partials.video-expressions', array('video_expressions' => $video_expressions, 'type' => 'users', 'title' => 'COMMUNITY SPEAKING:', 'mobile' => $mobile_device))
</section>
<section class="section-users-text-expressions hide-on-map-open hide-on-hub-open">
    @include('partials.user-expressions', array('user_expressions' => $user_expressions, 'type' => 'users', 'mobile' => $mobile_device))
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
        @php ($webmVideoUrl = 'desktop-map-loader.webm')
        @php ($mp4VideoUrl = 'desktop-map-loader.mp4')
        @if (isset($mobile_device) && $mobile_device)
            @php ($webmVideoUrl = 'mobile-map-loader.webm')
            @php ($mp4VideoUrl = 'mobile-map-loader.mp4')
        @endif
        <div itemprop="video" itemscope="" itemtype="http://schema.org/VideoObject" class="changeable-video" data-mp4="/assets/uploads/{{$mp4VideoUrl}}" data-webm="/assets/uploads/{{$webmVideoUrl}}" data-video-attributes="autoplay muted loop" data-video-class="width-100">
            <meta itemprop="name" content="Dentacoin Loading Video">
            <meta itemprop="description" content="Dentacoin Loading Video which is shown whenever website content is still loading">
            <meta itemprop="uploadDate" content="2020-09-19T08:00:00+08:00">
            <meta itemprop="thumbnailUrl" content="https://dentacoin.com/assets/uploads/video-poster.png">
            <link itemprop="contentURL" href="https://dentacoin.com/assets/uploads/{{$mp4VideoUrl}}">
        </div>
        <figure itemscope="" itemtype="http://schema.org/ImageObject" class="loader-over-map">
            <img data-defer-src="/assets/uploads/dcn-flipping-coin-logo-loader-v3-mobile.gif" alt="Loader">
        </figure>
    </div>
</section>
<section class="module section-dentacoin-stats padding-top-90 padding-bottom-80 hide-on-map-open hide-on-hub-open">
    @include('partials.dentacoin-stats')
</section>