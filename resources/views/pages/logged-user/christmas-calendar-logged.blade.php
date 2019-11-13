@extends("layout")
@section("content")
    <div class="christmas-calendar-logged">
        <section class="container text-center">
            <div class="row">
                <div class="col-xs-12">
                    <h1 class="lato-black fs-38 padding-bottom-15 padding-top-15 max-width-600 margin-0-auto">Join Dentacoin Holiday CALENDAR CHALLENGE 2019</h1>
                    <p class="fs-22 lato-regular padding-bottom-40">Unlock a new surprise every day from December 1 to 31!</p>
                </div>
            </div>
        </section>
        <section class="container text-center padding-bottom-40 christmas-calendar-campaign-stats">
            <div class="row fs-0">
                <div class="col-xs-12 col-sm-4 single-stat">
                    <figure class="inline-block" itemscope="" itemtype="http://schema.org/ImageObject">
                        <img src="/assets/images/christmas-calendar-campaign/ticket.svg" alt="Ticket" itemprop="contentUrl" class="width-100"/>
                    </figure>
                    <div class="inline-block lato-bold fs-16 stats-text">31/31 daily raffle tickets</div>
                </div>
                <div class="col-xs-12 col-sm-4 single-stat">
                    <figure class="inline-block" itemscope="" itemtype="http://schema.org/ImageObject">
                        <img src="/assets/images/christmas-calendar-campaign/bonus-ticket.svg" alt="Bonus ticket" itemprop="contentUrl" class="width-100"/>
                    </figure>
                    <div class="inline-block lato-bold fs-16 stats-text">80/80 bonus tickets for tasks</div>
                </div>
                <div class="col-xs-12 col-sm-4 single-stat">
                    <figure class="inline-block" itemscope="" itemtype="http://schema.org/ImageObject">
                        <img src="/assets/images/christmas-calendar-campaign/dentacoins.svg" alt="Dentacoins" itemprop="contentUrl" class="width-100"/>
                    </figure>
                    <div class="inline-block lato-bold fs-16 stats-text">210,000/210,000 Dentacoin (DCN)</div>
                </div>
            </div>
        </section>
        <section class="container tasks-section">
            <div class="row camping-custom-popups">
                <div class="popup-wrapper">
                    <h2 class="lato-black fs-25 text-center padding-bottom-20 padding-top-15">SIMPLE RULES:</h2><ul class="lato-regular fs-18 line-height-30"><li><span class="lato-black">31 days = 31 gifts:</span> Unlock a new task every day, complete it and earn various rewards!</li><li><span class="lato-black">Complete tasks every day and your DCN rewards will be doubled at the end of the challenge.</span></li><li><span class="lato-black">31 days = 31 tickets:</span> Don’t miss a day and increase your chances to win!</li><li><span class="lato-black">Missed a day?</span> You can catch up with the daily tasks and gifts, but you’ll have one ticket less and your DCN rewards will not be doubled at the end.</li><li>All DCN daily rewards are withdrawable from <span class="lato-black">Jan 1, 2020 on.</span></li><li>Other gifts are sent via email <span class="lato-black">within 5 days after</span> the task is completed.</li><li>Only users who have <span class="lato-black">submitted proofs</span> for their tasks earn rewards and participate in the raffle.</li><li>All posts, likes and follows <span class="lato-black">must remain</span> at least until the raffle is finished.</li><li><span class="lato-black">Check the raffle winners on January 10, 2020 - first in our Telegram group!</span></li></ul><div class="padding-top-20 padding-bottom-20 max-width-350 margin-0-auto"><div><input id="christmas-calendar-terms" type="checkbox"/><label class="fs-14 padding-left-5" for="christmas-calendar-terms">I read and agree to the Terms & Conditions</label></div><div><input id="christmas-calendar-privacy-policy" type="checkbox"/><label class="fs-14 padding-left-5" for="christmas-calendar-privacy-policy">I read and agree to the Privacy Policy</label></div><div><input id="christmas-calendar-years" type="checkbox"/><label class="fs-14 padding-left-5" for="christmas-calendar-years">I confirm that I am eighteen (18) years of age or older.</label></div></div><div class="padding-bottom-20 text-center"><a href="javascript:void(0);" class="accept-christmas-calendar-rules"><figure itemscope="" itemtype="http://schema.org/ImageObject"><img src="/assets/images/christmas-calendar-campaign/ready-btn-present.svg" class="width-100 max-width-220" alt="Popup button" itemprop="contentUrl"/></figure></a></div>
                </div>
            </div>
            <div class="row blurred-section active">
                <div class="col-xs-12 col-sm-10 col-sm-offset-1">
                    <div class="row fs-0">
                        <a href="javascript:void(0);" class="col-xs-12 col-sm-2 padding-left-10 padding-right-10 padding-bottom-30 inline-block">
                            <div class="wrapper">
                                <div class="present__pane">
                                    <h2 class="present__date">1</h2>
                                </div>
                                <div class="present__content">
                                    @if(!empty($tasks[0]))
                                        @if($tasks[0]['type'] == 'dcn-reward')
                                            <figure itemscope="" itemtype="http://schema.org/ImageObject">
                                                <img src="/assets/images/christmas-calendar-campaign/dentacoins.svg" class="width-100" alt="Dentacoins" itemprop="contentUrl"/>
                                                <figcaption class="color-white lato-bold padding-top-5">{{$tasks[0]['value']}} DCN</figcaption>
                                            </figure>
                                        @elseif($tasks[0]['type'] == 'ticket-reward')
                                            <figure itemscope="" itemtype="http://schema.org/ImageObject">
                                                <img src="/assets/images/christmas-calendar-campaign/ticket.svg" class="width-100" alt="Dentacoins" itemprop="contentUrl"/>
                                                <figcaption class="color-white lato-bold padding-top-5">+{{$tasks[0]['value']}} raffle ticket</figcaption>
                                            </figure>
                                        @endif
                                    @endif
                                </div>
                            </div>
                        </a>
                        <a href="javascript:void(0);" class="col-xs-12 col-sm-2 padding-left-10 padding-right-10 padding-bottom-30 inline-block">
                            <div class="wrapper">
                                <div class="present__pane">
                                    <h2 class="present__date">2</h2>
                                </div>
                                <div class="present__content">
                                    @if(!empty($tasks[1]))
                                        @if($tasks[1]['type'] == 'dcn-reward')
                                            <figure itemscope="" itemtype="http://schema.org/ImageObject">
                                                <img src="/assets/images/christmas-calendar-campaign/dentacoins.svg" class="width-100" alt="Dentacoins" itemprop="contentUrl"/>
                                                <figcaption class="color-white lato-bold padding-top-5">{{$tasks[1]['value']}} DCN</figcaption>
                                            </figure>
                                        @elseif($tasks[1]['type'] == 'ticket-reward')
                                            <figure itemscope="" itemtype="http://schema.org/ImageObject">
                                                <img src="/assets/images/christmas-calendar-campaign/ticket.svg" class="width-100" alt="Dentacoins" itemprop="contentUrl"/>
                                                <figcaption class="color-white lato-bold padding-top-5">+{{$tasks[1]['value']}} raffle ticket</figcaption>
                                            </figure>
                                        @endif
                                    @endif
                                </div>
                            </div>
                        </a>
                        <a href="javascript:void(0);" class="col-xs-12 col-sm-2 padding-left-10 padding-right-10 padding-bottom-30 inline-block">
                            <div class="wrapper">
                                <div class="present__pane">
                                    <h2 class="present__date">3</h2>
                                </div>
                                <div class="present__content">
                                    @if(!empty($tasks[2]))
                                        @if($tasks[2]['type'] == 'dcn-reward')
                                            <figure itemscope="" itemtype="http://schema.org/ImageObject">
                                                <img src="/assets/images/christmas-calendar-campaign/dentacoins.svg" class="width-100" alt="Dentacoins" itemprop="contentUrl"/>
                                                <figcaption class="color-white lato-bold padding-top-5">{{$tasks[2]['value']}} DCN</figcaption>
                                            </figure>
                                        @elseif($tasks[2]['type'] == 'ticket-reward')
                                            <figure itemscope="" itemtype="http://schema.org/ImageObject">
                                                <img src="/assets/images/christmas-calendar-campaign/ticket.svg" class="width-100" alt="Dentacoins" itemprop="contentUrl"/>
                                                <figcaption class="color-white lato-bold padding-top-5">+{{$tasks[2]['value']}} raffle ticket</figcaption>
                                            </figure>
                                        @endif
                                    @endif
                                </div>
                            </div>
                        </a>
                        <a href="javascript:void(0);" class="col-xs-12 col-sm-2 padding-left-10 padding-right-10 padding-bottom-30 inline-block">
                            <div class="wrapper">
                                <div class="present__pane">
                                    <h2 class="present__date">4</h2>
                                </div>
                                <div class="present__content">
                                    @if(!empty($tasks[3]))
                                        @if($tasks[3]['type'] == 'dcn-reward')
                                            <figure itemscope="" itemtype="http://schema.org/ImageObject">
                                                <img src="/assets/images/christmas-calendar-campaign/dentacoins.svg" class="width-100" alt="Dentacoins" itemprop="contentUrl"/>
                                                <figcaption class="color-white lato-bold padding-top-5">{{$tasks[3]['value']}} DCN</figcaption>
                                            </figure>
                                        @elseif($tasks[3]['type'] == 'ticket-reward')
                                            <figure itemscope="" itemtype="http://schema.org/ImageObject">
                                                <img src="/assets/images/christmas-calendar-campaign/ticket.svg" class="width-100" alt="Dentacoins" itemprop="contentUrl"/>
                                                <figcaption class="color-white lato-bold padding-top-5">+{{$tasks[3]['value']}} raffle ticket</figcaption>
                                            </figure>
                                        @endif
                                    @endif
                                </div>
                            </div>
                        </a>
                        <a href="javascript:void(0);" class="col-xs-12 col-sm-2 padding-left-10 padding-right-10 padding-bottom-30 inline-block">
                            <div class="wrapper">
                                <div class="present__pane">
                                    <h2 class="present__date">4</h2>
                                </div>
                                <div class="present__content">
                                    @if(!empty($tasks[3]))
                                        @if($tasks[3]['type'] == 'dcn-reward')
                                            <figure itemscope="" itemtype="http://schema.org/ImageObject">
                                                <img src="/assets/images/christmas-calendar-campaign/dentacoins.svg" class="width-100" alt="Dentacoins" itemprop="contentUrl"/>
                                                <figcaption class="color-white lato-bold padding-top-5">{{$tasks[3]['value']}} DCN</figcaption>
                                            </figure>
                                        @elseif($tasks[3]['type'] == 'ticket-reward')
                                            <figure itemscope="" itemtype="http://schema.org/ImageObject">
                                                <img src="/assets/images/christmas-calendar-campaign/ticket.svg" class="width-100" alt="Dentacoins" itemprop="contentUrl"/>
                                                <figcaption class="color-white lato-bold padding-top-5">+{{$tasks[3]['value']}} raffle ticket</figcaption>
                                            </figure>
                                        @endif
                                    @endif
                                </div>
                            </div>
                        </a>
                        <a href="javascript:void(0);" class="col-xs-12 col-sm-2 padding-left-10 padding-right-10 padding-bottom-30 inline-block">
                            <div class="wrapper">
                                <div class="present__pane">
                                    <h2 class="present__date">4</h2>
                                </div>
                                <div class="present__content">
                                    @if(!empty($tasks[3]))
                                        @if($tasks[3]['type'] == 'dcn-reward')
                                            <figure itemscope="" itemtype="http://schema.org/ImageObject">
                                                <img src="/assets/images/christmas-calendar-campaign/dentacoins.svg" class="width-100" alt="Dentacoins" itemprop="contentUrl"/>
                                                <figcaption class="color-white lato-bold padding-top-5">{{$tasks[3]['value']}} DCN</figcaption>
                                            </figure>
                                        @elseif($tasks[3]['type'] == 'ticket-reward')
                                            <figure itemscope="" itemtype="http://schema.org/ImageObject">
                                                <img src="/assets/images/christmas-calendar-campaign/ticket.svg" class="width-100" alt="Dentacoins" itemprop="contentUrl"/>
                                                <figcaption class="color-white lato-bold padding-top-5">+{{$tasks[3]['value']}} raffle ticket</figcaption>
                                            </figure>
                                        @endif
                                    @endif
                                </div>
                            </div>
                        </a>
                        <a href="javascript:void(0);" class="col-xs-12 col-sm-2 padding-left-10 padding-right-10 padding-bottom-30 inline-block">
                            <div class="wrapper">
                                <div class="present__pane">
                                    <h2 class="present__date">4</h2>
                                </div>
                                <div class="present__content">
                                    @if(!empty($tasks[3]))
                                        @if($tasks[3]['type'] == 'dcn-reward')
                                            <figure itemscope="" itemtype="http://schema.org/ImageObject">
                                                <img src="/assets/images/christmas-calendar-campaign/dentacoins.svg" class="width-100" alt="Dentacoins" itemprop="contentUrl"/>
                                                <figcaption class="color-white lato-bold padding-top-5">{{$tasks[3]['value']}} DCN</figcaption>
                                            </figure>
                                        @elseif($tasks[3]['type'] == 'ticket-reward')
                                            <figure itemscope="" itemtype="http://schema.org/ImageObject">
                                                <img src="/assets/images/christmas-calendar-campaign/ticket.svg" class="width-100" alt="Dentacoins" itemprop="contentUrl"/>
                                                <figcaption class="color-white lato-bold padding-top-5">+{{$tasks[3]['value']}} raffle ticket</figcaption>
                                            </figure>
                                        @endif
                                    @endif
                                </div>
                            </div>
                        </a>
                        <a href="javascript:void(0);" class="col-xs-12 col-sm-2 padding-left-10 padding-right-10 padding-bottom-30 inline-block">
                            <div class="wrapper">
                                <div class="present__pane">
                                    <h2 class="present__date">4</h2>
                                </div>
                                <div class="present__content">
                                    @if(!empty($tasks[3]))
                                        @if($tasks[3]['type'] == 'dcn-reward')
                                            <figure itemscope="" itemtype="http://schema.org/ImageObject">
                                                <img src="/assets/images/christmas-calendar-campaign/dentacoins.svg" class="width-100" alt="Dentacoins" itemprop="contentUrl"/>
                                                <figcaption class="color-white lato-bold padding-top-5">{{$tasks[3]['value']}} DCN</figcaption>
                                            </figure>
                                        @elseif($tasks[3]['type'] == 'ticket-reward')
                                            <figure itemscope="" itemtype="http://schema.org/ImageObject">
                                                <img src="/assets/images/christmas-calendar-campaign/ticket.svg" class="width-100" alt="Dentacoins" itemprop="contentUrl"/>
                                                <figcaption class="color-white lato-bold padding-top-5">+{{$tasks[3]['value']}} raffle ticket</figcaption>
                                            </figure>
                                        @endif
                                    @endif
                                </div>
                            </div>
                        </a>
                        <a href="javascript:void(0);" class="col-xs-12 col-sm-2 padding-left-10 padding-right-10 padding-bottom-30 inline-block">
                            <div class="wrapper">
                                <div class="present__pane">
                                    <h2 class="present__date">4</h2>
                                </div>
                                <div class="present__content">
                                    @if(!empty($tasks[3]))
                                        @if($tasks[3]['type'] == 'dcn-reward')
                                            <figure itemscope="" itemtype="http://schema.org/ImageObject">
                                                <img src="/assets/images/christmas-calendar-campaign/dentacoins.svg" class="width-100" alt="Dentacoins" itemprop="contentUrl"/>
                                                <figcaption class="color-white lato-bold padding-top-5">{{$tasks[3]['value']}} DCN</figcaption>
                                            </figure>
                                        @elseif($tasks[3]['type'] == 'ticket-reward')
                                            <figure itemscope="" itemtype="http://schema.org/ImageObject">
                                                <img src="/assets/images/christmas-calendar-campaign/ticket.svg" class="width-100" alt="Dentacoins" itemprop="contentUrl"/>
                                                <figcaption class="color-white lato-bold padding-top-5">+{{$tasks[3]['value']}} raffle ticket</figcaption>
                                            </figure>
                                        @endif
                                    @endif
                                </div>
                            </div>
                        </a>
                        <a href="javascript:void(0);" class="col-xs-12 col-sm-2 padding-left-10 padding-right-10 padding-bottom-30 inline-block">
                            <div class="wrapper">
                                <div class="present__pane">
                                    <h2 class="present__date">4</h2>
                                </div>
                                <div class="present__content">
                                    @if(!empty($tasks[3]))
                                        @if($tasks[3]['type'] == 'dcn-reward')
                                            <figure itemscope="" itemtype="http://schema.org/ImageObject">
                                                <img src="/assets/images/christmas-calendar-campaign/dentacoins.svg" class="width-100" alt="Dentacoins" itemprop="contentUrl"/>
                                                <figcaption class="color-white lato-bold padding-top-5">{{$tasks[3]['value']}} DCN</figcaption>
                                            </figure>
                                        @elseif($tasks[3]['type'] == 'ticket-reward')
                                            <figure itemscope="" itemtype="http://schema.org/ImageObject">
                                                <img src="/assets/images/christmas-calendar-campaign/ticket.svg" class="width-100" alt="Dentacoins" itemprop="contentUrl"/>
                                                <figcaption class="color-white lato-bold padding-top-5">+{{$tasks[3]['value']}} raffle ticket</figcaption>
                                            </figure>
                                        @endif
                                    @endif
                                </div>
                            </div>
                        </a>
                        <a href="javascript:void(0);" class="col-xs-12 col-sm-2 padding-left-10 padding-right-10 padding-bottom-30 inline-block">
                            <div class="wrapper">
                                <div class="present__pane">
                                    <h2 class="present__date">4</h2>
                                </div>
                                <div class="present__content">
                                    @if(!empty($tasks[3]))
                                        @if($tasks[3]['type'] == 'dcn-reward')
                                            <figure itemscope="" itemtype="http://schema.org/ImageObject">
                                                <img src="/assets/images/christmas-calendar-campaign/dentacoins.svg" class="width-100" alt="Dentacoins" itemprop="contentUrl"/>
                                                <figcaption class="color-white lato-bold padding-top-5">{{$tasks[3]['value']}} DCN</figcaption>
                                            </figure>
                                        @elseif($tasks[3]['type'] == 'ticket-reward')
                                            <figure itemscope="" itemtype="http://schema.org/ImageObject">
                                                <img src="/assets/images/christmas-calendar-campaign/ticket.svg" class="width-100" alt="Dentacoins" itemprop="contentUrl"/>
                                                <figcaption class="color-white lato-bold padding-top-5">+{{$tasks[3]['value']}} raffle ticket</figcaption>
                                            </figure>
                                        @endif
                                    @endif
                                </div>
                            </div>
                        </a>
                        <a href="javascript:void(0);" class="col-xs-12 col-sm-2 padding-left-10 padding-right-10 padding-bottom-30 inline-block">
                            <div class="wrapper">
                                <div class="present__pane">
                                    <h2 class="present__date">4</h2>
                                </div>
                                <div class="present__content">
                                    @if(!empty($tasks[3]))
                                        @if($tasks[3]['type'] == 'dcn-reward')
                                            <figure itemscope="" itemtype="http://schema.org/ImageObject">
                                                <img src="/assets/images/christmas-calendar-campaign/dentacoins.svg" class="width-100" alt="Dentacoins" itemprop="contentUrl"/>
                                                <figcaption class="color-white lato-bold padding-top-5">{{$tasks[3]['value']}} DCN</figcaption>
                                            </figure>
                                        @elseif($tasks[3]['type'] == 'ticket-reward')
                                            <figure itemscope="" itemtype="http://schema.org/ImageObject">
                                                <img src="/assets/images/christmas-calendar-campaign/ticket.svg" class="width-100" alt="Dentacoins" itemprop="contentUrl"/>
                                                <figcaption class="color-white lato-bold padding-top-5">+{{$tasks[3]['value']}} raffle ticket</figcaption>
                                            </figure>
                                        @endif
                                    @endif
                                </div>
                            </div>
                        </a>
                        <a href="javascript:void(0);" class="col-xs-12 col-sm-2 padding-left-10 padding-right-10 padding-bottom-30 inline-block">
                            <div class="wrapper">
                                <div class="present__pane">
                                    <h2 class="present__date">4</h2>
                                </div>
                                <div class="present__content">
                                    @if(!empty($tasks[3]))
                                        @if($tasks[3]['type'] == 'dcn-reward')
                                            <figure itemscope="" itemtype="http://schema.org/ImageObject">
                                                <img src="/assets/images/christmas-calendar-campaign/dentacoins.svg" class="width-100" alt="Dentacoins" itemprop="contentUrl"/>
                                                <figcaption class="color-white lato-bold padding-top-5">{{$tasks[3]['value']}} DCN</figcaption>
                                            </figure>
                                        @elseif($tasks[3]['type'] == 'ticket-reward')
                                            <figure itemscope="" itemtype="http://schema.org/ImageObject">
                                                <img src="/assets/images/christmas-calendar-campaign/ticket.svg" class="width-100" alt="Dentacoins" itemprop="contentUrl"/>
                                                <figcaption class="color-white lato-bold padding-top-5">+{{$tasks[3]['value']}} raffle ticket</figcaption>
                                            </figure>
                                        @endif
                                    @endif
                                </div>
                            </div>
                        </a>
                        <a href="javascript:void(0);" class="col-xs-12 col-sm-2 padding-left-10 padding-right-10 padding-bottom-30 inline-block">
                            <div class="wrapper">
                                <div class="present__pane">
                                    <h2 class="present__date">4</h2>
                                </div>
                                <div class="present__content">
                                    @if(!empty($tasks[3]))
                                        @if($tasks[3]['type'] == 'dcn-reward')
                                            <figure itemscope="" itemtype="http://schema.org/ImageObject">
                                                <img src="/assets/images/christmas-calendar-campaign/dentacoins.svg" class="width-100" alt="Dentacoins" itemprop="contentUrl"/>
                                                <figcaption class="color-white lato-bold padding-top-5">{{$tasks[3]['value']}} DCN</figcaption>
                                            </figure>
                                        @elseif($tasks[3]['type'] == 'ticket-reward')
                                            <figure itemscope="" itemtype="http://schema.org/ImageObject">
                                                <img src="/assets/images/christmas-calendar-campaign/ticket.svg" class="width-100" alt="Dentacoins" itemprop="contentUrl"/>
                                                <figcaption class="color-white lato-bold padding-top-5">+{{$tasks[3]['value']}} raffle ticket</figcaption>
                                            </figure>
                                        @endif
                                    @endif
                                </div>
                            </div>
                        </a>
                        <a href="javascript:void(0);" class="col-xs-12 col-sm-2 padding-left-10 padding-right-10 padding-bottom-30 inline-block">
                            <div class="wrapper">
                                <div class="present__pane">
                                    <h2 class="present__date">4</h2>
                                </div>
                                <div class="present__content">
                                    @if(!empty($tasks[3]))
                                        @if($tasks[3]['type'] == 'dcn-reward')
                                            <figure itemscope="" itemtype="http://schema.org/ImageObject">
                                                <img src="/assets/images/christmas-calendar-campaign/dentacoins.svg" class="width-100" alt="Dentacoins" itemprop="contentUrl"/>
                                                <figcaption class="color-white lato-bold padding-top-5">{{$tasks[3]['value']}} DCN</figcaption>
                                            </figure>
                                        @elseif($tasks[3]['type'] == 'ticket-reward')
                                            <figure itemscope="" itemtype="http://schema.org/ImageObject">
                                                <img src="/assets/images/christmas-calendar-campaign/ticket.svg" class="width-100" alt="Dentacoins" itemprop="contentUrl"/>
                                                <figcaption class="color-white lato-bold padding-top-5">+{{$tasks[3]['value']}} raffle ticket</figcaption>
                                            </figure>
                                        @endif
                                    @endif
                                </div>
                            </div>
                        </a>
                        <a href="javascript:void(0);" class="col-xs-12 col-sm-2 padding-left-10 padding-right-10 padding-bottom-30 inline-block">
                            <div class="wrapper">
                                <div class="present__pane">
                                    <h2 class="present__date">4</h2>
                                </div>
                                <div class="present__content">
                                    @if(!empty($tasks[3]))
                                        @if($tasks[3]['type'] == 'dcn-reward')
                                            <figure itemscope="" itemtype="http://schema.org/ImageObject">
                                                <img src="/assets/images/christmas-calendar-campaign/dentacoins.svg" class="width-100" alt="Dentacoins" itemprop="contentUrl"/>
                                                <figcaption class="color-white lato-bold padding-top-5">{{$tasks[3]['value']}} DCN</figcaption>
                                            </figure>
                                        @elseif($tasks[3]['type'] == 'ticket-reward')
                                            <figure itemscope="" itemtype="http://schema.org/ImageObject">
                                                <img src="/assets/images/christmas-calendar-campaign/ticket.svg" class="width-100" alt="Dentacoins" itemprop="contentUrl"/>
                                                <figcaption class="color-white lato-bold padding-top-5">+{{$tasks[3]['value']}} raffle ticket</figcaption>
                                            </figure>
                                        @endif
                                    @endif
                                </div>
                            </div>
                        </a>
                        <a href="javascript:void(0);" class="col-xs-12 col-sm-2 padding-left-10 padding-right-10 padding-bottom-30 inline-block">
                            <div class="wrapper">
                                <div class="present__pane">
                                    <h2 class="present__date">4</h2>
                                </div>
                                <div class="present__content">
                                    @if(!empty($tasks[3]))
                                        @if($tasks[3]['type'] == 'dcn-reward')
                                            <figure itemscope="" itemtype="http://schema.org/ImageObject">
                                                <img src="/assets/images/christmas-calendar-campaign/dentacoins.svg" class="width-100" alt="Dentacoins" itemprop="contentUrl"/>
                                                <figcaption class="color-white lato-bold padding-top-5">{{$tasks[3]['value']}} DCN</figcaption>
                                            </figure>
                                        @elseif($tasks[3]['type'] == 'ticket-reward')
                                            <figure itemscope="" itemtype="http://schema.org/ImageObject">
                                                <img src="/assets/images/christmas-calendar-campaign/ticket.svg" class="width-100" alt="Dentacoins" itemprop="contentUrl"/>
                                                <figcaption class="color-white lato-bold padding-top-5">+{{$tasks[3]['value']}} raffle ticket</figcaption>
                                            </figure>
                                        @endif
                                    @endif
                                </div>
                            </div>
                        </a>
                        <a href="javascript:void(0);" class="col-xs-12 col-sm-2 padding-left-10 padding-right-10 padding-bottom-30 inline-block">
                            <div class="wrapper">
                                <div class="present__pane">
                                    <h2 class="present__date">4</h2>
                                </div>
                                <div class="present__content">
                                    @if(!empty($tasks[3]))
                                        @if($tasks[3]['type'] == 'dcn-reward')
                                            <figure itemscope="" itemtype="http://schema.org/ImageObject">
                                                <img src="/assets/images/christmas-calendar-campaign/dentacoins.svg" class="width-100" alt="Dentacoins" itemprop="contentUrl"/>
                                                <figcaption class="color-white lato-bold padding-top-5">{{$tasks[3]['value']}} DCN</figcaption>
                                            </figure>
                                        @elseif($tasks[3]['type'] == 'ticket-reward')
                                            <figure itemscope="" itemtype="http://schema.org/ImageObject">
                                                <img src="/assets/images/christmas-calendar-campaign/ticket.svg" class="width-100" alt="Dentacoins" itemprop="contentUrl"/>
                                                <figcaption class="color-white lato-bold padding-top-5">+{{$tasks[3]['value']}} raffle ticket</figcaption>
                                            </figure>
                                        @endif
                                    @endif
                                </div>
                            </div>
                        </a>
                        <a href="javascript:void(0);" class="col-xs-12 col-sm-2 padding-left-10 padding-right-10 padding-bottom-30 inline-block">
                            <div class="wrapper">
                                <div class="present__pane">
                                    <h2 class="present__date">4</h2>
                                </div>
                                <div class="present__content">
                                    @if(!empty($tasks[3]))
                                        @if($tasks[3]['type'] == 'dcn-reward')
                                            <figure itemscope="" itemtype="http://schema.org/ImageObject">
                                                <img src="/assets/images/christmas-calendar-campaign/dentacoins.svg" class="width-100" alt="Dentacoins" itemprop="contentUrl"/>
                                                <figcaption class="color-white lato-bold padding-top-5">{{$tasks[3]['value']}} DCN</figcaption>
                                            </figure>
                                        @elseif($tasks[3]['type'] == 'ticket-reward')
                                            <figure itemscope="" itemtype="http://schema.org/ImageObject">
                                                <img src="/assets/images/christmas-calendar-campaign/ticket.svg" class="width-100" alt="Dentacoins" itemprop="contentUrl"/>
                                                <figcaption class="color-white lato-bold padding-top-5">+{{$tasks[3]['value']}} raffle ticket</figcaption>
                                            </figure>
                                        @endif
                                    @endif
                                </div>
                            </div>
                        </a>
                        <a href="javascript:void(0);" class="col-xs-12 col-sm-2 padding-left-10 padding-right-10 padding-bottom-30 inline-block">
                            <div class="wrapper">
                                <div class="present__pane">
                                    <h2 class="present__date">4</h2>
                                </div>
                                <div class="present__content">
                                    @if(!empty($tasks[3]))
                                        @if($tasks[3]['type'] == 'dcn-reward')
                                            <figure itemscope="" itemtype="http://schema.org/ImageObject">
                                                <img src="/assets/images/christmas-calendar-campaign/dentacoins.svg" class="width-100" alt="Dentacoins" itemprop="contentUrl"/>
                                                <figcaption class="color-white lato-bold padding-top-5">{{$tasks[3]['value']}} DCN</figcaption>
                                            </figure>
                                        @elseif($tasks[3]['type'] == 'ticket-reward')
                                            <figure itemscope="" itemtype="http://schema.org/ImageObject">
                                                <img src="/assets/images/christmas-calendar-campaign/ticket.svg" class="width-100" alt="Dentacoins" itemprop="contentUrl"/>
                                                <figcaption class="color-white lato-bold padding-top-5">+{{$tasks[3]['value']}} raffle ticket</figcaption>
                                            </figure>
                                        @endif
                                    @endif
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </section>
        <section class="container-fluid text-center presents-list">
            <div class="row">
                <div class="col-xs-12">
                    <figure class="padding-bottom-50" itemscope="" itemtype="http://schema.org/ImageObject">
                        <img src="/assets/images/christmas-calendar-campaign/presents.png" alt="Presents list" itemprop="contentUrl"/>
                    </figure>
                </div>
            </div>
        </section>
        <section class="santa-section">
            <figure itemscope="" itemtype="http://schema.org/ImageObject">
                <img src="/assets/images/christmas-calendar-campaign/forest.svg" class="width-100" alt="Forest" itemprop="contentUrl"/>
            </figure>
        </section>
    </div>
    <div id="fb-root"></div>
    <script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v5.0&appId=1906201509652855&autoLogAppEvents=1"></script>
    <script type="text/javascript" async src="https://platform.twitter.com/widgets.js"></script>
@endsection