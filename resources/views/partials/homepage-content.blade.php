<section class="section-homepage-intro container padding-top-130 padding-top-xs-90 padding-top-lgll-230 padding-bottom-60 padding-bottom-xs-40 padding-bottom-lgll-120 hide-on-users-category-selected @if (!empty($class)) {{$class}} @endif">
    <div class="row">
        <div class="col-xs-12 col-lg-8 col-lg-offset-2 text-center">
            <figure itemscope="" itemtype="http://schema.org/ImageObject">
                <img src="/assets/uploads/text-logo.svg" alt="Dentacoin" class="margin-0-auto max-width-600 max-width-xs-280 width-100" itemprop="contentUrl"/>
            </figure>
            <h1 class="fs-25 fs-xs-24 lato-bold padding-top-10 padding-top-lgll-20 padding-bottom-25 padding-bottom-xs-15 max-width-xs-300 margin-0-auto">The Blockchain Solution for the Global Dental Industry</h1>
            <h2 class="fs-20 fs-xs-18 line-height-26 lato-italic color-dark-gray padding-bottom-25 padding-bottom-xs-15">“Sick Care is the crisis of the 21st century. <br class="hide-xs"> We are shifting the paradigm towards a Health system that Cares.”</h2>
            <h3 class="fs-20 fs-xs-18 line-height-26 lato-bold color-dark-gray">Secure Blockchain infrastructure, patient-centered care and intelligent prevention used jointly to improve long-term health, reduce costs and pain, and ensure benefits for all market participants.</h3>
        </div>
    </div>
</section>
@if (isset($mobile) && $mobile)
    <section class="homepage-sticky-nav">
        <a href="javascript:void(0);" class="inline-block call-users-page">
            <span class="element-icon inline-block"></span>
            <span class="inline-block padding-left-10 fs-18 padding-left-xs-0 lato-bold label-content padding-top-5 padding-bottom-10">USERS</span>
        </a>
        <a href="javascript:void(0);" class="inline-block call-dentists-page">
            <span class="element-icon inline-block"></span>
            <span class="inline-block padding-left-10 fs-18 padding-left-xs-0 lato-bold label-content padding-top-5 padding-bottom-10">DENTISTS</span>
        </a>
        <a href="javascript:void(0);" class="inline-block call-traders-page">
            <span class="element-icon inline-block"></span>
            <span class="inline-block padding-left-10 fs-18 padding-left-xs-0 lato-bold label-content padding-top-5 padding-bottom-10">TRADERS</span>
        </a>
    </section>
@else
    <section class="section-homepage-nav container-fluid hide-on-users-category-selected @if (!empty($class)) {{$class}} @endif">
        <div class="row text-center fs-0">
            <div class="col-xs-4 inline-block-bottom single-element no-gutter">
                <a href="javascript:void(0);" class="display-block padding-bottom-25 padding-top-5 color-black call-users-page users">
                    <div class="icon-wrapper">
                        <figure itemscope="" itemtype="http://schema.org/ImageObject">
                            <img src="/assets/uploads/users-sticky-nav-icon.svg" alt="Users" class="margin-0-auto max-width-100 max-width-xs-50 width-100" itemprop="contentUrl"/>
                            <figcaption class="lato-bold fs-26 fs-xs-18 padding-top-15">USERS</figcaption>
                        </figure>
                    </div>
                    <div class="hidden-nav-box">
                        <h3 class="lato-bold fs-26 padding-bottom-5">USERS</h3>
                        <ul>
                            <li class="fs-16 lato-bold">Dentacoin mission</li>
                            <li class="fs-16 lato-bold">Free applications</li>
                            <li class="fs-16 lato-bold">Global adoption</li>
                        </ul>
                        <figure itemscope="" itemtype="http://schema.org/ImageObject" class="padding-top-5">
                            <img src="/assets/images/black-circle-arrow.svg" alt="White left arrow rounded" class="margin-0-auto max-width-20 width-100" itemprop="contentUrl"/>
                        </figure>
                    </div>
                </a>
            </div>
            <div class="col-xs-4 inline-block-bottom single-element no-gutter">
                <a href="javascript:void(0);" class="display-block padding-bottom-25 padding-top-5 color-black call-dentists-page dentists">
                    <div class="icon-wrapper">
                        <figure itemscope="" itemtype="http://schema.org/ImageObject">
                            <img src="/assets/uploads/dentists-sticky-nav-icon.svg" alt="Dentists" class="margin-0-auto max-width-140 max-width-xs-70 width-100" itemprop="contentUrl"/>
                            <figcaption class="lato-bold fs-26 fs-xs-18 padding-top-15">DENTISTS</figcaption>
                        </figure>
                    </div>
                    <div class="hidden-nav-box">
                        <h3 class="lato-bold fs-26 padding-bottom-5">DENTISTS</h3>
                        <ul>
                            <li class="fs-16 lato-bold">Your benefits</li>
                            <li class="fs-16 lato-bold">Success stories</li>
                            <li class="fs-16 lato-bold">Partner dentists</li>
                        </ul>
                        <figure itemscope="" itemtype="http://schema.org/ImageObject" class="padding-top-5">
                            <img src="/assets/images/black-circle-arrow.svg" alt="White left arrow rounded" class="margin-0-auto max-width-20 width-100" itemprop="contentUrl"/>
                        </figure>
                    </div>
                </a>
            </div>
            <div class="col-xs-4 inline-block-bottom single-element no-gutter">
                <a href="javascript:void(0);" class="display-block padding-bottom-25 padding-top-5 color-black call-traders-page traders">
                    <div class="icon-wrapper">
                        <figure itemscope="" itemtype="http://schema.org/ImageObject">
                            <img src="/assets/uploads/traders-sticky-nav-icon.svg" alt="Trades" class="margin-0-auto max-width-150 max-width-xs-70 width-100" itemprop="contentUrl"/>
                            <figcaption class="lato-bold fs-26 fs-xs-18 padding-top-15">TRADERS</figcaption>
                        </figure>
                    </div>
                    <div class="hidden-nav-box">
                        <h3 class="lato-bold fs-26 padding-bottom-5">TRADERS</h3>
                        <ul>
                            <li class="fs-16 lato-bold">Exchange platforms</li>
                            <li class="fs-16 lato-bold">Dentacoin Whitepaper</li>
                            <li class="fs-16 lato-bold">Exchange platforms</li>
                        </ul>
                        <figure itemscope="" itemtype="http://schema.org/ImageObject" class="padding-top-5">
                            <img src="/assets/images/black-circle-arrow.svg" alt="White left arrow rounded" class="margin-0-auto max-width-20 width-100" itemprop="contentUrl"/>
                        </figure>
                    </div>
                </a>
            </div>
        </div>
    </section>
@endif