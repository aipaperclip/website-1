@extends("layout")
@section("content")
    <div class="corporate-identity-container">
        <section class="container first-section">
            <div class="row">
                <div class="col-xs-12 page-h1-title">{{ $meta_data->page_title }}</div>
            </div>
        </section>
    </div>
    {!! $sections[0]->html !!}
    {{--<div class="corporate-identity-container">
        <section class="container first-section">
            <div class="row fs-0 flex">
                <div class="col-xs-12 col-md-8 description inline-block">
                    <h3 class="section-subtitle">Dental health is suffering on a global level:</h3><br>
                    “Sick care” is the crisis of the 21st century in many so called “developed” countries. More than 80% of people around the world don't have access to any dental care.
                    <br><br>
                    <span style="font-weight: 700;font-family: 'Calibri-Bold';">Dentacoin offers a global solution to this global pain.</span>
                </div>
                <figure class="col-xs-12 col-md-4 inline-block text-right" itemscope="" itemtype="http://schema.org/ImageObject">
                    <img src="/assets/images/dentist-tools.png" alt="Dentist tools" itemprop="contentUrl"/>
                </figure>
            </div>
        </section>
        <section class="single-section">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12 col-sm-10 col-sm-offset-1 single-section-title">What we stand for</div>
                    <p class="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 single-section-description">
                        Dentacoin Foundation is the organization that has developed the first Blockchain solution for the global dental industry. It was founded on February 14, 2017 in Maastricht, Netherlands.
                        <br><br>
                        Through its cryptocurrency (DCN) and a set of incentivized software tools, the Foundation has managed to create a new <a href="javascript:void(0)" target="_blank">dental ecosystem</a> which favours all industry stakeholders: patients, dentists, manufacturers, suppliers, labs, insurance companies.
                        <br><br>
                        The core purpose of the Foundation is to improve long-term health, reduce costs and pain, and continuously support the growth in the value of DCN.
                    </p>
                </div>
            </div>
        </section>
        <section class="single-section">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12 col-sm-10 col-sm-offset-1 single-section-title">Our driving force</div>
                    <p class="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 single-section-description">
                        Dentacoin owes its existence to the joint efforts of a group of like-minded dentistry and digital transformation experts eager to reshape the dental industry by adopting integrated, Blockchain-based technologies.
                        <br><br>
                        The Foundation is backed by a vast community of progressive dentists committed to moving the refocus from acute treatment to sustainable prevention in the interest of all people.
                        <br><br>
                        <strong><i>Key locations:</i></strong> Netherlands, Germany, South Africa, Bulgaria, USA, Canada, UK, China, Russia
                        <br><br>
                        <a href="/team" class="white-dark-blue-btn">MEET THE TEAM</a>
                    </p>
                </div>
            </div>
        </section>
        <section class="single-section">
            <div class="container">
                <div class="row fs-0">
                    <figure class="col-xs-12 col-md-5 col-md-offset-2 col-sm-7 inline-block" itemscope="" itemtype="http://schema.org/ImageObject">
                        <img src="/assets/images/community-map.svg" alt="Dentist tools" itemprop="contentUrl"/>
                    </figure>
                    <div class="col-xs-12 col-md-4 col-md-offset-1 col-sm-5 inline-block">
                        <strong style="font-size:30px;color:#3e3e3e;"><i>Community & Network</i></strong><br><br>
                        <strong style="font-size:30px;">180,000+</strong>
                        <div style="font-size: 18px;color:#3e3e3e;padding-bottom: 15px;">Social followers, Subscribers, Users</div>
                        <strong style="font-size:30px;">4,000+</strong>
                        <div style="font-size: 18px;color:#3e3e3e;padding-bottom: 15px;">Registered Dentists</div>
                        <strong style="font-size:30px;">70+</strong>
                        <div style="font-size: 18px;color:#3e3e3e;">Locations accepting DCN payments</div>
                    </div>
                </div>
            </div>
        </section>
        <section class="single-section">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12 col-sm-10 col-sm-offset-1 single-section-title">DENTACOIN CRYPTOCURRENCY</div>
                    <p class="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 single-section-description">
                        <strong><i>“The Bitcoin of Dentistry”</i></strong>
                        <br><br>
                        Dentacoin (DCN) is an Ethereum-based cryptocurrency (“<a href="javascript:void(0)" target="_blank">utility token</a>”) which can be used as a means of payment within the dental industry and exchanged to other crypto and fiat (USD, EUR, GBP, etc.) currencies.
                        <br><br>
                        Every new participant in the community leads to increase of DCN value (“<a href="javascript:void(0)" target="_blank">network effect</a>”) - i.e. the more people use DCN, the higher its value grows.
                    </p>
                </div>
            </div>
        </section>
        <section class="single-section">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12 col-sm-10 col-sm-offset-1 single-section-title">WHAT MAKES DENTACOIN UNIQUE?</div>
                    <p class="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 single-section-description">
                        <strong>Dentacoin is the one and only cryptocurrency in the world that connects all participants in the global dental industry.</strong> In contrast to the inflation-prone world currencies, it holds the potential to make people richer rather than poorer.
                        <br><br>
                        In its essence, Dеntacoin has a <strong>strong social aspect</strong> - it empowers people to receive affordable and sustainable dental care and to earn additional income for their active usage of Dentacoin Apps.
                    </p>
                </div>
            </div>
        </section>
        <section class="single-section">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12 col-sm-10 col-sm-offset-1 single-section-title">DENTACOIN APPS</div>
                </div>
            </div>
            <div class="container-fluid chain">
                <div class="row">
                    <div class="col-xs-12 no-gutter">
                        <figure itemscope="" itemtype="http://schema.org/ImageObject" class="inline-block">
                            <a href="https://reviews.dentacoin.com/" target="_blank">
                                <img src="/assets/images/trusted-reviews-chain-icon.svg" alt="Trusted reviews logo" itemprop="contentUrl"/>
                                <img src="/assets/images/tools-link-icon.svg" class="hidden-image" alt="" itemprop="contentUrl"/>
                            </a>
                        </figure>
                        <figure itemscope="" itemtype="http://schema.org/ImageObject" class="inline-block">
                            <a href="https://dentavox.dentacoin.com/" target="_blank">
                                <img src="/assets/images/dentavox-chain-icon.svg" alt="Dentavox logo" itemprop="contentUrl"/>
                                <img src="/assets/images/tools-link-icon.svg" class="hidden-image" alt="" itemprop="contentUrl"/>
                            </a>
                        </figure>
                        <figure itemscope="" itemtype="http://schema.org/ImageObject" class="inline-block">
                            <a href="https://dentacare.dentacoin.com/" target="_blank">
                                <img src="/assets/images/dentacare-chain-icon.svg" alt="Dentacare logo" itemprop="contentUrl"/>
                                <img src="/assets/images/tools-link-icon.svg" class="hidden-image" alt="" itemprop="contentUrl"/>
                            </a>
                        </figure>
                        <figure itemscope="" itemtype="http://schema.org/ImageObject" class="inline-block">
                            <a href="javascript:void(0)" target="_blank">
                                <img src="/assets/images/assurance-chain-icon.svg" alt="Assurance logo" itemprop="contentUrl"/>
                                <img src="/assets/images/coming-soon-tools.svg" class="hidden-image" alt="" itemprop="contentUrl"/>
                            </a>
                        </figure>
                        <figure itemscope="" itemtype="http://schema.org/ImageObject" class="inline-block">
                            <a href="javascript:void(0)" target="_blank">
                                <img src="/assets/images/health-database-chain-icon.svg" alt="Health database logo" itemprop="contentUrl"/>
                                <img src="/assets/images/coming-soon-tools.svg" class="hidden-image" alt="" itemprop="contentUrl"/>
                            </a>
                        </figure>
                    </div>
                </div>
            </div>
            <div class="container">
                <div class="row">
                    <p class="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 single-section-description">
                        The Blockchain-based software tools developed by the Dentacoin Foundation are a means of distributing DCN cryptocurrency to the key end users (i.e. patients, dentists, manufacturers). In return for writing reviews about their dentist (<a href="https://reviews.dentacoin.com/" target="_blank">Trusted Reviews Platform</a>), taking dental surveys (<a href="https://dentavox.dentacoin.com/" target="_blank">DentaVox</a>), and maintaining excellent oral hygiene (<a href="https://dentacare.dentacoin.com/" target="_blank">Dentacare Mobile dApp</a>), they receive different amounts of DCN.
                        <br><br>
                        Thus, people within <a href="javascript:void(0)" target="_blank">Dentacoin Ecosystem</a> are encouraged to contribute to the improvement of dental care both on a personal and global level.
                        <br><br>
                        The next milestone on Dentacoin’s roadmap is the development of another two Blockchain-based applications - <strong>a revolutionary insurance-like model called Dentacoin Assurance and a secure, patient-managed Health Database.</strong>
                    </p>
                </div>
            </div>
        </section>
    </div>--}}
@endsection