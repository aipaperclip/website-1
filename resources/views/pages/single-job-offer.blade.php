@extends("layout")

@section("content")
    <section class="single-job-offer-container" itemscope="" itemtype="http://schema.org/JobPosting">
        @if(!empty($job_offer->remote_work))
            <meta itemprop="employmentType" content="Remote work: {{$job_offer->remote_work}}">
        @endif
        <meta itemprop="hiringOrganization" content="Dentacoin Foundation">
        <meta itemprop="datePosted" content="{{date('Y-m-d', strtotime($job_offer->created_at))}}">
        @if(!empty($job_offer->location))
            <div itemprop="jobLocation" itemscope itemtype="http://schema.org/Place">
                <div itemprop="address" itemscope itemtype="http://schema.org/PostalAddress">
                    <meta itemprop="addressLocality" content="{{$job_offer->location}}">
                </div>
            </div>
        @endif
        <div class="arrows-container">
            <div class="container">
                @if(!empty($prev))
                    <figure class="prev custom-arrow" itemscope="" itemtype="http://schema.org/ImageObject"><a href="{{route('careers', ['slug' => $prev->slug])}}"><img src="{{URL::asset('assets/images/arrow-left.svg') }}" alt="arrow icon" itemprop="contentUrl"/></a></figure>
                @endif
                @if(!empty($next))
                    <figure class="next custom-arrow" itemscope="" itemtype="http://schema.org/ImageObject"><a href="{{route('careers', ['slug' => $next->slug])}}"><img src="{{URL::asset('assets/images/arrow-right.svg') }}" alt="arrow icon" itemprop="contentUrl"/></a></figure>
                @endif
                <div class="row">
                    <div class="errors col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
                        @include('admin.partials.error')
                        @include('admin.partials.success')
                    </div>
                </div>
                <div class="row fs-0 back-btn-socials">
                    <div class="col-xs-6 back-btn inline-block"><a href="{{route('careers')}}">< back</a></div>
                    <div class="col-xs-6 socials inline-block">
                        <a target="_blank" href="https://www.linkedin.com/shareArticle?mini=true&url={{route('careers', ['slug' => $job_offer->slug])}}&title={{$job_offer->title}}"><i class="fa fa-linkedin-square" aria-hidden="true"></i></a>
                        <a target="_blank" href="http://www.facebook.com/sharer/sharer.php?u={{route('careers', ['slug' => $job_offer->slug])}}"><i class="fa fa-facebook" aria-hidden="true"></i></a>
                        <a target="_blank" href="https://twitter.com/intent/tweet?url={{route('careers', ['slug' => $job_offer->slug])}}"><i class="fa fa-twitter" aria-hidden="true"></i></a>
                    </div>
                </div>
                <div class="row job-offer-info">
                    <figure class="col-xs-12 col-sm-4 col-md-6 col-lg-5 inline-block" itemscope="" itemtype="http://schema.org/ImageObject">
                        <img src="{{URL::asset('assets/uploads/'.$job_offer->media->name) }}" alt="{{$job_offer->media->alt}}" itemprop="contentUrl"/>
                    </figure>
                    <div class="col-xs-12 col-sm-8 col-md-6 col-lg-5 inline-block job-description">
                        <div class="title section-subtitle" itemprop="title">{{$job_offer->title}}</div>
                        @if(!empty($job_offer->location))
                            <div class="location"><figure itemscope="" itemtype="http://schema.org/ImageObject"><img src="{{URL::asset('assets/images/location-icon.svg') }}" alt="Location icon" itemprop="contentUrl"/></figure> Office Location: <span>{{$job_offer->location}}</span></div>
                        @endif
                        @if(!empty($job_offer->remote_work))
                            <div class="remote-work"><figure itemscope="" itemtype="http://schema.org/ImageObject"><img src="{{URL::asset('assets/images/remote-work-icon.svg') }}" alt="Remote work icon" itemprop="contentUrl"/></figure> Remote work: <span>{{$job_offer->remote_work}}</span></div>
                        @endif
                        <div class="description" itemprop="description">{!! $job_offer->text !!}</div>
                    </div>
                </div>
            </div>
        </div>
        @if(!empty(unserialize($job_offer->skills)))
            <div class="container skills-list">
                <div class="row">
                    <div class="col-xs-12 col-md-10 col-md-offset-1 col-lg-8 col-lg-offset-2">
                        <div class="logo-over-line">
                            <figure itemscope="" itemtype="http://schema.org/ImageObject">
                                <img src="{{URL::asset('assets/images/logo.svg') }}" alt="Dentacoin section logo" itemprop="contentUrl"/>
                            </figure>
                            <div class="border-behind-logo"></div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <h2 class="col-xs-12 section-title">THE IDEAL CANDIDATE</h2>
                </div>
                <div class="row list">
                    <div class="col-sm-10 col-sm-offset-1 col-md-8 col-sm-offset-2 col-lg-6 col-lg-offset-3 col-xs-12">
                        <ul>
                        @foreach(unserialize($job_offer->skills) as $skill)
                            <li itemprop="skills">
                                <img src="{{URL::asset('assets/images/check-mark.svg') }}" alt="Check mark"/>
                                {{$skill}}
                            </li>
                        @endforeach
                        </ul>
                    </div>
                </div>
            </div>
        @endif
        <div class="container-fluid">
            <div class="row">
                <div class="col-xs-12">
                    <div class="logo-over-line">
                        <figure itemscope="" itemtype="http://schema.org/ImageObject">
                            <img src="{{URL::asset('assets/images/logo.svg') }}" alt="Dentacoin section logo" itemprop="contentUrl" class="inline-block"/>
                        </figure>
                        <div class="border-behind-logo"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container benefits-container">
            @include('partials.benefits', ['title' => true])
        </div>
        <div class="apply-for-position container">
            <div class="row">
                <div class="col-xs-12 col-md-10 col-md-offset-1 col-lg-8 col-lg-offset-2">
                    <div class="logo-over-line below-apply-for-position">
                        <figure itemscope="" itemtype="http://schema.org/ImageObject">
                            <img src="{{URL::asset('assets/images/logo.svg') }}" alt="Dentacoin section logo" itemprop="contentUrl"/>
                        </figure>
                        <div class="border-behind-logo"></div>
                    </div>
                </div>
            </div>
            <div class="row title">
                <h2 class="col-xs-12 section-title">APPLY NOW</h2>
            </div>
            <div class="row form">
                <div class="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
                    <form method="POST" enctype="multipart/form-data" action="{{ route('submit-apply-position') }}">
                        <div class="form-row errors"></div>
                        <div class="padding-bottom-15 field-parent">
                            <div class="custom-google-label-style module" data-input-colorful-border="true">
                                <label for="user-name">Name:</label>
                                <input type="text" id="user-name" name="user-name" maxlength="100" class="full-rounded required form-field"/>
                            </div>
                        </div>
                        <div class="padding-bottom-15 field-parent">
                            <div class="custom-google-label-style module" data-input-colorful-border="true">
                                <label for="email">Email:</label>
                                <input type="text" id="email" name="email" maxlength="100" class="full-rounded required form-field"/>
                            </div>
                        </div>
                        <div class="padding-bottom-15 field-parent">
                            <div class="custom-google-label-style module" data-input-colorful-border="true">
                                <label for="phone">Phone:</label>
                                <input type="text" id="phone" name="phone" maxlength="20" class="full-rounded required form-field"/>
                            </div>
                        </div>
                        <div class="form-row">
                            <textarea rows="3" name="message" maxlength="3000" placeholder="Your Message"></textarea>
                        </div>
                        <div class="form-row button-row upload-btn-parent fs-0">
                            <div class="upload-file module inline-block" data-label="Upload CV">
                                <input type="file" name="upload-cv" id="upload-cv" class="upload-input" accept=".pdf,.doc,.docx,.ppt,.pptx,.odt,.rtf"/>
                            </div>
                            <div class="file-text inline-block">
                                <div class="types">File types allowed: .pdf,.doc,.docx,.ppt,.pptx,.odt,.rtf up to 2MB</div>
                                <div class="file-name lato-bold"></div>
                            </div>
                        </div>
                        <div class="form-row button-row upload-btn-parent fs-0">
                            <div class="upload-file module inline-block" data-label="Upload Portfolio">
                                <input type="file" name="upload-portfolio" id="upload-portfolio" class="upload-input" accept=".pdf,.doc,.docx,.ppt,.pptx,.odt,.rtf"/>
                            </div>
                            <div class="file-text inline-block">
                                <div class="types">File types allowed: .pdf,.doc,.docx,.ppt,.pptx,.odt,.rtf up to 2MB</div>
                                <div class="file-name lato-bold"></div>
                            </div>
                        </div>
                        <div class="padding-bottom-15">
                            <div class="custom-google-label-style module" data-input-colorful-border="true">
                                <label for="portfolio">Portfolio link:</label>
                                <input type="text" id="portfolio" name="portfolio" maxlength="500" class="full-rounded form-field"/>
                            </div>
                        </div>
                        <div class="form-row fs-0 captcha-parent field-parent">
                            <div class="inline-block fs-14 width-50">
                                <div class="custom-google-label-style module" data-input-colorful-border="true">
                                    <label for="captcha">Enter captcha:</label>
                                    <input type="text" id="captcha" name="captcha" maxlength="5" class="full-rounded required form-field"/>
                                </div>
                            </div>
                            <div class="inline-block width-50">
                                <div class="captcha-container flex">
                                    <span>{!! captcha_img() !!}</span>
                                    <button type="button" class="refresh-captcha">
                                        <i class="fa fa-refresh" aria-hidden="true"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="form-row padding-top-10" data-valid-message="Please agree with our Privacy Policy.">
                            <div class="custom-checkbox-style module">
                                <input type="checkbox" class="custom-checkbox-input" id="privacy-policy"/>
                                <label class="custom-checkbox-label" for="privacy-policy">I have read and agree with <a href="/privacy-policy" target="_blank">Privacy Policy</a></label>
                            </div>
                        </div>
                        <div class="form-row text-center padding-top-20">
                            <input type="hidden" name="_token" value="{{csrf_token()}}">
                            <input type="hidden" name="post-slug" value="{{$job_offer->slug}}">
                            <input type="hidden" name="post-title" value="{{$job_offer->title}}">
                            <input type="submit" value="SEND" class="white-bright-blue-btn padding-top-10 padding-bottom-10 padding-left-50 padding-right-50 lato-black fs-20"/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
@endsection