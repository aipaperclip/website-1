@extends("layout")

@section("content")
    <section class="single-job-offer-container">
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
                <div class="row back-btn">
                    <div class="col-xs-12"><a href="{{route('careers')}}">< back</a></div>
                </div>
                <div class="row job-offer-info">
                    <figure class="col-xs-12 col-sm-4 col-md-6 col-lg-5 inline-block" itemscope="" itemtype="http://schema.org/ImageObject">
                        <img src="{{URL::asset('assets/uploads/'.$job_offer->media->name) }}" alt="{{$job_offer->media->alt}}" itemprop="contentUrl"/>
                    </figure>
                    <div class="col-xs-12 col-sm-8 col-md-6 col-lg-5 inline-block job-description">
                        <div class="title section-subtitle">{{$job_offer->title}}</div>
                        @if(!empty($job_offer->location))
                            <div class="location"><figure itemscope="" itemtype="http://schema.org/ImageObject"><img src="{{URL::asset('assets/images/location-icon.svg') }}" alt="Location icon" itemprop="contentUrl"/></figure> Office Location: <span>{{$job_offer->location}}</span></div>
                        @endif
                        @if(!empty($job_offer->remote_work))
                            <div class="remote-work"><figure itemscope="" itemtype="http://schema.org/ImageObject"><img src="{{URL::asset('assets/images/remote-work-icon.svg') }}" alt="Remote work icon" itemprop="contentUrl"/></figure> Remote work: <span>{{$job_offer->remote_work}}</span></div>
                        @endif
                        <div class="description">{!! $job_offer->text !!}</div>
                    </div>
                </div>
            </div>
        </div>
        @if(!empty(unserialize($job_offer->skills)))
            <div class="logo-over-line">
                <figure itemscope="" itemtype="http://schema.org/ImageObject">
                    <img src="{{URL::asset('assets/images/logo.svg') }}" alt="Dentacoin section logo" itemprop="contentUrl"/>
                </figure>
                <div class="border-behind-logo"></div>
            </div>
            <div class="container skills-list">
                <div class="row">
                    <h2 class="col-xs-12 section-title">SKILLS NEEDED</h2>
                </div>
                <div class="row list">
                    <div class="col-sm-10 col-sm-offset-1 col-md-8 col-sm-offset-2 col-lg-6 col-lg-offset-3 col-xs-12">
                        <ul>
                        @foreach(unserialize($job_offer->skills) as $skill)
                            <li>
                                <figure itemscope="" itemtype="http://schema.org/ImageObject">
                                    <img src="{{URL::asset('assets/images/check-mark.svg') }}" alt="" itemprop="contentUrl"/>
                                </figure>
                                {{$skill}}
                            </li>
                        @endforeach
                        </ul>
                    </div>
                </div>
            </div>
        @endif
        <div class="logo-over-line">
            <figure itemscope="" itemtype="http://schema.org/ImageObject">
                <img src="{{URL::asset('assets/images/logo.svg') }}" alt="Dentacoin section logo" itemprop="contentUrl"/>
            </figure>
            <div class="border-behind-logo"></div>
        </div>
        <div class="container benefits-container">
            @include('partials.benefits', ['title' => true])
        </div>
        <div class="logo-over-line">
            <figure itemscope="" itemtype="http://schema.org/ImageObject">
                <img src="{{URL::asset('assets/images/logo.svg') }}" alt="Dentacoin section logo" itemprop="contentUrl"/>
            </figure>
            <div class="border-behind-logo"></div>
        </div>
        <div class="apply-for-position container">
            <div class="row title">
                <h2 class="col-xs-12 section-title">APPLY FOR THIS POSITION</h2>
            </div>
            <div class="row form">
                <div class="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
                    <form method="POST" enctype="multipart/form-data" action="{{ route('submit-apply-position') }}">
                        <div class="form-row errors"></div>
                        <div class="form-row">
                            <input type="text" name="user-name" placeholder="Name *" maxlength="100" class="required"/>
                        </div>
                        <div class="form-row">
                            <input type="text" name="email" placeholder="Email *" maxlength="100" class="required"/>
                        </div>
                        <div class="form-row">
                            <input type="text" name="phone" placeholder="Phone *" maxlength="50" class="required"/>
                        </div>
                        <div class="form-row">
                            <textarea rows="3" name="message" maxlength="3000" placeholder="Your Message"></textarea>
                        </div>
                        <div class="form-row button-row fs-0">
                            <div class="upload-file inline-block" id="upload-cv" data-label="Upload CV">
                                <input type="file" name="upload-cv" class="inputfile inputfile-1 hide-input" accept=".pdf,.doc,.docx,.ppt,.pptx,.odt,.rtf"/>
                                <button type="button"></button>
                            </div>
                            <div class="file-text inline-block">
                                <div class="types">File types allowed: .pdf,.doc,.docx,.ppt,.pptx,.odt,.rtf up to 2MB</div>
                                <div class="file-name"></div>
                            </div>
                        </div>
                        <div class="form-row button-row fs-0">
                            <div class="upload-file inline-block" id="upload-portfolio" data-label="Upload Portfolio">
                                <input type="file" name="upload-portfolio" class="inputfile inputfile-1 hide-input" accept=".pdf,.doc,.docx,.ppt,.pptx,.odt,.rtf"/>
                                <button type="button"></button>
                            </div>
                            <div class="file-text inline-block">
                                <div class="types">File types allowed: .pdf,.doc,.docx,.ppt,.pptx,.odt,.rtf up to 2MB</div>
                                <div class="file-name"></div>
                            </div>
                        </div>
                        <div class="form-row">
                            <input type="text" name="portfolio" placeholder="Portfolio link" maxlength="500"/>
                        </div>
                        <div class="form-row privacy-policy" data-valid-message="Please agree with our Privacy Policy.">
                            <input type="checkbox" id="privacy-policy"/><label for="privacy-policy">I have read and agree with <a href="{{route('privacy-policy')}}" target="_blank">Privacy Policy</a></label>
                        </div>
                        <div class="form-row text-center submit">
                            <input type="hidden" name="_token" value="{{csrf_token()}}">
                            <input type="hidden" name="post-slug" value="{{$job_offer->slug}}">
                            <input type="hidden" name="post-title" value="{{$job_offer->title}}">
                            <input type="submit" value="SEND" class="white-blue-rounded-btn"/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
@endsection