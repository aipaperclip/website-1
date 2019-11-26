@extends("layout")
@section("content")
    <div class="christmas-calendar-logged">
        <section class="container text-center">
            <div class="row">
                <div class="col-xs-12">
                    <h1 class="lato-black fs-38 fs-xs-24 padding-bottom-15 padding-top-15 max-width-600 margin-0-auto">Join Dentacoin Holiday CALENDAR CHALLENGE 2019</h1>
                    <p class="fs-22 fs-xs-16 lato-regular padding-bottom-40">Unlock a new surprise every day from December 1 to 31!</p>
                </div>
            </div>
        </section>
        <section class="container text-center padding-bottom-40 christmas-calendar-campaign-stats">
            <div class="row fs-0">
                <div class="col-xs-12 col-md-4 single-stat inline-block-bottom">
                    <figure class="inline-block" itemscope="" itemtype="http://schema.org/ImageObject">
                        <img src="/assets/images/christmas-calendar-campaign/ticket.svg" alt="Ticket" itemprop="contentUrl" class="width-100"/>
                    </figure>
                    <div class="inline-block lato-bold fs-16 fs-xs-14 stats-text"><span class="user-bonus-ticket-amount">{{$bonusTickets}}</span>/31 daily raffle tickets</div>
                </div>
                <div class="col-xs-12 col-md-4 single-stat inline-block-bottom">
                    <figure class="inline-block" itemscope="" itemtype="http://schema.org/ImageObject">
                        <img src="/assets/images/christmas-calendar-campaign/bonus-ticket.svg" alt="Bonus ticket" itemprop="contentUrl" class="width-100"/>
                    </figure>
                    <div class="inline-block lato-bold fs-16 fs-xs-14 stats-text"><span class="user-ticket-amount">{{$ticketAmount}}</span>/81 bonus tickets for tasks</div>
                </div>
                <div class="col-xs-12 col-md-4 single-stat inline-block-bottom">
                    <figure class="inline-block" itemscope="" itemtype="http://schema.org/ImageObject">
                        <img src="/assets/images/christmas-calendar-campaign/dentacoins.svg" alt="Dentacoins" itemprop="contentUrl" class="width-100"/>
                    </figure>
                    <div class="inline-block lato-bold fs-16 fs-xs-14 stats-text"><span class="user-dcn-amount">{{$dcnAmount}}</span>/105,000 Dentacoin (DCN)</div>
                </div>
            </div>
        </section>
        <section class="container tasks-section">
            <div class="row camping-custom-popups rules"></div>
            @if(!empty($social_engagement_cookie))
                <div class="row camping-custom-popups socials"><div class="popup-wrapper"><h2 class="lato-black fs-25 text-center padding-bottom-20 padding-top-15">BEFORE YOU START:</h2><div class="fs-18 text-center lato-regular">01. Follow us on Twitter</div><div class="text-center padding-top-15 padding-bottom-35"><a class="twitter-follow-button" href="https://twitter.com/dentacoin" data-size="large" data-show-screen-name="true" data-show-count="true">Follow</a></div><div class="fs-18 text-center lato-regular">02. Like our Facebook pages: </div><div class="facebook-buttons text-center padding-top-15 padding-bottom-35"><div class="single-facebook-btn inline-block text-center"><div class="fb-like" data-href="https://www.facebook.com/dentacoin/" data-width="" data-layout="box_count" data-action="like" data-size="small" data-show-faces="true" data-share="false"></div><div class="fs-14 padding-top-5">Dentacoin</div></div><div class="single-facebook-btn inline-block text-center"><div class="fb-like" data-href="https://www.facebook.com/dentacare.dentacoin/" data-width="" data-layout="box_count" data-action="like" data-size="small" data-show-faces="true" data-share="false"></div><div class="fs-14 padding-top-5">Dentacare</div></div><div class="single-facebook-btn inline-block text-center"><div class="fb-like" data-href="https://www.facebook.com/DentaVox-1578351428897849/" data-width="" data-layout="box_count" data-action="like" data-size="small" data-show-faces="true" data-share="false"></div><div class="fs-14 padding-top-5">Dentavox</div></div><div class="single-facebook-btn inline-block text-center"><div class="fb-like" data-href="https://www.facebook.com/dentacoin.trusted.reviews/" data-width="" data-layout="box_count" data-action="like" data-size="small" data-show-faces="true" data-share="false"></div><div class="fs-14 padding-top-5">Trusted Reviews</div></div></div><div class="padding-bottom-20 text-center"><a href="javascript:void(0);" class="christmas-calendar-get-started white-red-btn padding-left-30 padding-right-30">GET STARTED</a></div></div></div>
            @endif
            <div class="row blurred-section active">
                <div class="col-xs-12 col-lg-10 col-lg-offset-1">
                    <div class="row fs-0">
                        @foreach($tasks as $task)
                            <a href="javascript:void(0);" class="single-task col-xs-4 col-sm-2 padding-left-xs-15 padding-right-xs-15 padding-left-10 padding-right-10 padding-bottom-30 padding-bottom-xs-25 inline-block" data-task="{{$task['id']}}">
                                <div class="wrapper @if((new \App\Http\Controllers\ChristmasCalendarController())->checkIfTaskIsAlreadyFinished($task['id'], $participant->id)) opened @endif">
                                    <div class="present__pane">
                                        <h2 class="present__date">{{$task['id']}}</h2>
                                    </div>
                                    <div class="present__content">
                                        <figure itemscope="" itemtype="http://schema.org/ImageObject">
                                            @if($task['type'] == 'dcn-reward')
                                                <img src="/assets/images/christmas-calendar-campaign/dentacoins.svg" class="width-100" alt="Dentacoins" itemprop="contentUrl"/>
                                                <figcaption class="color-white lato-bold padding-top-5">{{$task['value']}} DCN</figcaption>
                                            @elseif($task['type'] == 'ticket-reward')
                                                <img src="/assets/images/christmas-calendar-campaign/ticket.svg" class="width-100" alt="Dentacoins" itemprop="contentUrl"/>
                                                <figcaption class="color-white lato-bold padding-top-5">+{{$task['value']}} raffle ticket</figcaption>
                                            @elseif($task['type'] == 'face-sticker')
                                                <img src="/assets/images/christmas-calendar-campaign/christmas-sticker.png" class="width-100" alt="Dentacoins" itemprop="contentUrl"/>
                                                <figcaption class="color-white lato-bold padding-top-5">Face sticker</figcaption>
                                            @elseif($task['type'] == 'facebook-holiday-frame')
                                                <img src="/assets/images/christmas-calendar-campaign/christmas-fb-frame.png" class="width-100" alt="Dentacoins" itemprop="contentUrl"/>
                                                <figcaption class="color-white lato-bold padding-top-5">Facebook frame</figcaption>
                                            @elseif($task['type'] == 'free-oracle-health-guide')
                                                <img src="/assets/images/christmas-calendar-campaign/christmas-pdf.png" class="width-100" alt="Dentacoins" itemprop="contentUrl"/>
                                                <figcaption class="color-white lato-bold padding-top-5">Oracle health guide</figcaption>
                                            @elseif($task['type'] == 'custom-holiday-card')
                                                <img src="/assets/images/christmas-calendar-campaign/christmas-card-gift.png" class="width-100" alt="Dentacoins" itemprop="contentUrl"/>
                                                <figcaption class="color-white lato-bold padding-top-5">Holiday card</figcaption>
                                            @endif
                                        </figure>
                                        @if((new \App\Http\Controllers\ChristmasCalendarController())->checkIfTaskIsAlreadyFinished($task['id'], $participant->id)) <i class="fa fa-check check-icon" aria-hidden="true"></i> @endif
                                    </div>
                                </div>
                            </a>
                        @endforeach
                    </div>
                </div>
            </div>
        </section>
        <section class="container-fluid text-center presents-list blurred-section active">
            <div class="row">
                <div class="col-xs-12 padding-left-xs-0 padding-right-xs-0 padding-bottom-50 padding-bottom-xs-0">
                    <picture itemscope="" itemtype="http://schema.org/ImageObject">
                        <source media="(max-width: 768px)" srcset="/assets/images/christmas-calendar-campaign/presents-mobile.png" />
                        <img src="/assets/images/christmas-calendar-campaign/presents.png" alt="Presents list" itemprop="contentUrl"/>
                    </picture>
                </div>
            </div>
        </section>
        <section class="santa-section blurred-section active">
            <figure itemscope="" itemtype="http://schema.org/ImageObject">
                <img src="/assets/images/christmas-calendar-campaign/forest.svg" class="width-100" alt="Forest" itemprop="contentUrl"/>
            </figure>
        </section>
    </div>
    <div id="fb-root"></div>
    <script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v5.0&appId=1906201509652855&autoLogAppEvents=1"></script>
    <script type="text/javascript" async src="https://platform.twitter.com/widgets.js"></script>
@endsection