@extends("layout")

@section("content")
    <div class="homepage-container">
        <div class="intro fullpage-section one" data-section="one">
            <div class="bg-wrapper">
                <div class="container">
                    <div class="row">
                        <figure class="col-xs-6 logo-container">
                            <a href=""><img src="{{URL::asset('assets/images/logo.svg') }}"/></a>
                        </figure>
                        <div class="col-xs-6 btn-container">
                            <div class="inline-block btn-and-line">
                                <a href="" class="white-black-btn visibility-hidden">JOIN US</a>
                                <span class="first-dot custom-dot">&nbsp;</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container content-wrapper">
                    <div class="row">
                        <div class="col-xs-12 col-sm-8 col-sm-offset-2">
                            <div class="title">DENTACOIN</div>
                            <div class="subtitle">The Blockchain Solution for the Global Dental Industry</div>
                            <div class="description italic">“Sick Care is the plaque of the century. <br> <b>4106 dentists</b> are shifting the paradigm towards a Health system that Cares.”</div>
                            <div class="description">Secure Blockchain infrastructure, patient-centered care and intelligent prevention used jointly to improve long-term health, reduce costs and pain and ensure mutual benefits.</div>
                            <div class="video">
                                <figure class="play-btn"><img src="{{URL::asset('assets/images/video-play-icon.svg') }}"/></figure>
                                <div class="video-wrapper visibility-hidden">
                                    <figure class="close-video"><img src="{{URL::asset('assets/images/close.svg') }}"/></figure>
                                    <video controls>
                                        <source src="{{URL::asset('assets/videos/dentacoin-introduction.mp4') }}" type="video/mp4">
                                        Your browser does not support HTML5 video.
                                    </video>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container second-dot-parent">
                    <div class="wrapper"><span class="second-dot custom-dot">&nbsp;</span></div>
                </div>
            </div>
        </div>
        <div class="dentacoin-ecosystem fullpage-section two" data-section="two">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12 btn-container">
                        <div class="inline-block btn-and-line">
                            <a href="" class="white-blue-btn visibility-hidden">JOIN US</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="rotated-text"><span>DENTACOIN SYSTEM</span></div>
            <div class="container list">
                <div class="row">
                    <div class="col-xs-12 col-sm-8 col-sm-offset-2">
                        <div class="container-fluid">
                            <div class="row">
                                <figure class="col-xs-3">
                                    <img src="{{URL::asset('assets/images/dentacare.png') }}"/>
                                    <figcaption>Dentacare</figcaption>
                                </figure>
                                <figure class="col-xs-3">
                                    <img src="{{URL::asset('assets/images/dentacare.png') }}"/>
                                    <figcaption>Dentacare</figcaption>
                                </figure>
                                <figure class="col-xs-3">
                                    <img src="{{URL::asset('assets/images/dentacare.png') }}"/>
                                    <figcaption>Dentacare</figcaption>
                                </figure>
                                <figure class="col-xs-3">
                                    <img src="{{URL::asset('assets/images/dentacare.png') }}"/>
                                    <figcaption>Dentacare</figcaption>
                                </figure>
                                <figure class="col-xs-3">
                                    <img src="{{URL::asset('assets/images/dentacare.png') }}"/>
                                    <figcaption>Dentacare</figcaption>
                                </figure>
                                <figure class="col-xs-3">
                                    <img src="{{URL::asset('assets/images/dentacare.png') }}"/>
                                    <figcaption>Dentacare</figcaption>
                                </figure>
                                <figure class="col-xs-3">
                                    <img src="{{URL::asset('assets/images/dentacare.png') }}"/>
                                    <figcaption>Dentacare</figcaption>
                                </figure>
                                <figure class="col-xs-3">
                                    <img src="{{URL::asset('assets/images/dentacare.png') }}"/>
                                    <figcaption>Dentacare</figcaption>
                                </figure>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="successful-practices rest-data">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12 dots">
                        <div class="first-dot-wrapper">
                            <div class="first-dot inline-block">&nbsp;</div>
                        </div>
                        <div class="second-dot-wrapper">
                            <div class="second-dot inline-block">&nbsp;</div>
                        </div>
                        <div class="third-dot inline-block">&nbsp;</div>
                        <figure class="logo-over-line">
                            <img src="{{URL::asset('assets/images/logo.svg') }}"/>
                        </figure>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-12 section-title">Building Successful Patient-Driven Dental Practices</div>
                </div>
                <div class="row content">
                    <figure class="col-xs-12 col-sm-5">
                        <div class="fourth-dot inline-block">&nbsp;</div>
                        <div class="fifth-dot inline-block">&nbsp;</div>
                        <img src="{{URL::asset('assets/images/1.animation-chair-left-to-right-smooth2.gif') }}"/>
                    </figure>
                    <div class="col-xs-12 col-sm-5 col-sm-offset-2">
                        <div class="title">Moving From Sick Care to Preventive Care</div>
                        <div class="description">The new gen of DCN dentists brings patients back into focus by implementing smart, Blockchain-based software solutions and an industry-specific cryptocurrency.</div>
                        <div class="btn-container"><a href="" class="white-blue-rounded-btn">I’M A DENTIST</a></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="below-successful-practices">
            <div class="container">
                <div class="row">
                    <div class="col-xs-5 cells">
                        <div class="cell inline-block-top">
                            <div class="title">60K+</div>
                            <div class="description">Users of the Dentacoin tools</div>
                        </div>
                        <div class="cell inline-block-top">
                            <div class="title">4K+</div>
                            <div class="description">Dentists in the Dentacoin Ecosystem</div>
                        </div>
                    </div>
                    <div class="col-xs-7 description-over-line">
                        <div class="wrapper">
                            <div class="first-dot inline-block">&nbsp;</div>
                            <div class="second-dot inline-block">&nbsp;</div>
                            <div class="description inline-block">Dental practices, labs, shops in <span>16 Countries</span> accept payments in Dentacoin</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="testimonials">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12 upper-empty-space">
                        <div class="first-dot inline-block">&nbsp;</div>
                        <div class="second-dot inline-block">&nbsp;</div>
                    </div>
                    <div class="col-xs-12 expressions text-center">
                        <div class="circle-wrapper inline-block active no-image">
                            <div class="circle"><div class="background"></div></div>
                            <div class="text">Building Successful Patient-Driven Dental  Dental  Dental  Dental  Dental  Dental  Dental  Dental PracticesBuilding Successful Patient-Driven Dental Practi</div>
                        </div>
                        <div class="circle-wrapper inline-block not-active no-image">
                            <div class="circle"><div class="background"></div></div>
                            <div class="text">Building Successful Patient-Driven Dental  Dental  Dental  Dental  Dental  Dental  Dental  Dental PracticesBuilding Successful Patient-Driven Dental Practi</div>
                        </div>
                        <div class="circle-wrapper inline-block not-active no-image">
                            <div class="circle"><div class="background"></div></div>
                            <div class="text">Building Successful Patient-Driven Dental  Dental  Dental  Dental  Dental  Dental  Dental  Dental PracticesBuilding Successful Patient-Driven Dental Practi</div>
                        </div>
                        <div class="circle-wrapper inline-block not-active no-image">
                            <div class="circle"><div class="background"></div></div>
                            <div class="text">Building Successful Patient-Driven Dental  Dental  Dental  Dental  Dental  Dental  Dental  Dental PracticesBuilding Successful Patient-Driven Dental Practi</div>
                        </div>
                        <div class="circle-wrapper inline-block not-active no-image">
                            <div class="circle"><div class="background"></div></div>
                            <div class="text">Building Successful Patient-Driven Dental  Dental  Dental  Dental  Dental  Dental  Dental  Dental PracticesBuilding Successful Patient-Driven Dental Practi</div>
                        </div>
                        <div class="circle-wrapper inline-block not-active no-image">
                            <div class="circle"><div class="background"></div></div>
                            <div class="text">Building Successful Patient-Driven Dental  Dental  Dental  Dental  Dental  Dental  Dental  Dental PracticesBuilding Successful Patient-Driven Dental Practi</div>
                        </div>
                        <div class="circle-wrapper inline-block active">
                            <div class="circle"><div class="background" style="background-image: url({{URL::asset('assets/images/testimonials-giver.png') }})"></div> </div>
                            <div class="text">Building Successful Patient-Driven Dental  Dental  Dental  Dental  Dental  Dental  Dental  Dental PracticesBuilding Successful Patient-Driven Dental Practi</div>
                        </div>
                        <div class="circle-wrapper inline-block not-active no-image">
                            <div class="circle"><div class="background"></div></div>
                            <div class="text">Building Successful Patient-Driven Dental  Dental  Dental  Dental  Dental  Dental  Dental  Dental PracticesBuilding Successful Patient-Driven Dental Practi</div>
                        </div>
                        <div class="circle-wrapper inline-block not-active no-image">
                            <div class="circle"><div class="background"></div></div>
                            <div class="text">Building Successful Patient-Driven Dental  Dental  Dental  Dental  Dental  Dental  Dental  Dental PracticesBuilding Successful Patient-Driven Dental Practi</div>
                        </div>
                        <div class="circle-wrapper inline-block not-active no-image">
                            <div class="circle"><div class="background"></div></div>
                            <div class="text">Building Successful Patient-Driven Dental  Dental  Dental  Dental  Dental  Dental  Dental  Dental PracticesBuilding Successful Patient-Driven Dental Practi</div>
                        </div>
                        <div class="circle-wrapper inline-block not-active no-image">
                            <div class="circle"><div class="background"></div></div>
                            <div class="text">Building Successful Patient-Driven Dental  Dental  Dental  Dental  Dental  Dental  Dental  Dental PracticesBuilding Successful Patient-Driven Dental Practi</div>
                        </div>
                        <div class="circle-wrapper inline-block not-active no-image">
                            <div class="circle"><div class="background"></div></div>
                            <div class="text">Building Successful Patient-Driven Dental  Dental  Dental  Dental  Dental  Dental  Dental  Dental PracticesBuilding Successful Patient-Driven Dental Practi</div>
                        </div>
                        <div class="circle-wrapper inline-block active no-image">
                            <div class="circle"><div class="background"></div></div>
                            <div class="text">Building Successful Patient-Driven Dental  Dental  Dental  Dental  Dental  Dental  Dental  Dental PracticesBuilding Successful Patient-Driven Dental Practi</div>
                        </div>
                    </div>
                    <div class="col-xs-12 below-expressions">
                        <div class="third-dot inline-block">&nbsp;</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="test" style="padding-top: 100px;padding-bottom: 100px;">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12">Building Successful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding SuccessfSuccessful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding SuccessfSuccessful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding SuccessfSuccessful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding SuccessfSuccessful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding SuccessfSuccessful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding SuccessfSuccessful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding SuccessfSuccessful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding SuccessfSuccessful PatDental PracticesBuilding SuccessfSuccessful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding SuccessfSuccessful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding SuccessfSuccessful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding SuccessfSuccessful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding SuccessfSuccessful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding SuccessfSuccessful PatDental PracticesBuilding SuccessfSuccessful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding SuccessfSuccessful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding SuccessfSuccessful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding SuccessfSuccessful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding SuccessfSuccessful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding SuccessfSuccessful PatDental PracticesBuilding SuccessfSuccessful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding SuccessfSuccessful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding SuccessfSuccessful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding SuccessfSuccessful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding SuccessfSuccessful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding SuccessfSuccessful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding SuccessfSuccessful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding SuccessfSuccessful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding SuccessfSuccessful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding SuccessfSuccessful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding SuccessfSuccessful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding SuccessfSuccessful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding SuccessfSuccessful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding SuccessfSuccessful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental PracticesBuilding Successful Patient-Driven Dental Practices</div>
                </div>
            </div>
        </div>
    </div>
@endsection