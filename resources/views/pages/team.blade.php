@extends("layout")

@section("content")
    <section class="team-container">
        <div class="container team">
            <div class="row">
                <h2 class="col-xs-12 page-h1-title">{{ $titles[0]->html }}</h2>
            </div>
            <div class="row list">
                @php($first = false)
                @foreach($team_members as $team_member)
                    <div class="col-xs-12 col-md-8 col-md-offset-2 single fs-0">
                        <div class="inline-block-top image-and-socials">
                            <figure itemscope="" itemtype="http://schema.org/ImageObject">
                                <img data-defer-src="{{URL::asset('assets/uploads/'.$team_member->media->name) }}" alt="@if(!empty($team_member->media->alt)){{$team_member->media->alt}}@endif" itemprop="contentUrl"/>
                            </figure>
                            <div class="socials">
                                @if(!empty($team_member->mail))
                                    <a href="mailto:{{$team_member->mail}}" target="_blank"><i class="fa fa-envelope-o" aria-hidden="true"></i></a>
                                @endif
                                @if(!empty($team_member->linkedin))
                                    <a href="{{$team_member->linkedin}}" target="_blank"><i class="fa fa-linkedin-square" aria-hidden="true"></i></a>
                                @endif
                                @if(!empty($team_member->facebook))
                                    <a href="{{$team_member->facebook}}" target="_blank"><i class="fa fa-facebook-square" aria-hidden="true"></i></a>
                                @endif
                                @if(!empty($team_member->twitter))
                                    <a href="{{$team_member->twitter}}" target="_blank"><i class="fa fa-twitter-square" aria-hidden="true"></i></a>
                                @endif
                            </div>
                            <div class="desktop mobile-vertical-line-50"></div>
                        </div>
                        <div class="inline-block-top content">
                            <div class="name">{{$team_member->name}}</div>
                            @if(!empty($team_member->position))
                                <div class="position">{{$team_member->position}}</div>
                            @endif
                            <div class="separator"></div>
                            @if(!empty($team_member->text))
                                <div class="description">{!! $team_member->text !!}</div>
                            @endif
                        </div>
                        <div class="mobile mobile-vertical-line-50"></div>
                    </div>
                    @if(!$first)
                        @php($first = true)
                    @endif
                @endforeach
            </div>
        </div>
        @if(sizeof($advisors) > 0)
            <div class="container advisors">
                <div class="row">
                    <h2 class="col-xs-12 section-title">{{ $titles[1]->html }}</h2>
                </div>
                <div class="row">
                    <div class="col-xs-12 advisors-slider slider-with-arrows">
                        @php($more_advisors = [])
                        @foreach($advisors as $advisor)
                            @if(!empty($advisor->text) && !empty($advisor->media))
                                <div class="single">
                                    <figure itemscope="" itemtype="http://schema.org/ImageObject">
                                        <img data-defer-src="{{URL::asset('assets/uploads/'.$advisor->media->name) }}" alt="@if(!empty($advisor->media->alt)){{$advisor->media->alt}}@endif" itemprop="contentUrl"/>
                                    </figure>
                                    <div class="name">{{$advisor->name}}</div>
                                    @if(!empty($advisor->position))
                                        <div class="position">{{$advisor->position}}</div>
                                    @endif
                                    <div class="separator"></div>
                                    @if(!empty($advisor->text))
                                        <div class="description">{!! $advisor->text !!}</div>
                                    @endif
                                    <div class="socials">
                                        @if(!empty($advisor->mail))
                                            <a href="mailto:{{$advisor->mail}}" target="_blank"><i class="fa fa-envelope-o" aria-hidden="true"></i></a>
                                        @endif
                                        @if(!empty($advisor->linkedin))
                                            <a href="{{$advisor->linkedin}}" target="_blank"><i class="fa fa-linkedin-square" aria-hidden="true"></i></a>
                                        @endif
                                        @if(!empty($advisor->facebook))
                                            <a href="{{$advisor->facebook}}" target="_blank"><i class="fa fa-facebook-square" aria-hidden="true"></i></a>
                                        @endif
                                        @if(!empty($advisor->twitter))
                                            <a href="{{$advisor->twitter}}" target="_blank"><i class="fa fa-twitter-square" aria-hidden="true"></i></a>
                                        @endif
                                    </div>
                                </div>
                            @else
                                @php(array_push($more_advisors, $advisor))
                            @endif
                        @endforeach
                    </div>
                </div>
            </div>
        @endif
        @if(!empty($more_advisors))
            <div class="container more-advisors">
                <div class="row read-more">
                    <div class="col-xs-12 col-sm-8 col-sm-offset-2 fs-0">
                        <div class="black-line"><a href="javascript:void(0)" class="text">MORE +</a></div>
                    </div>
                </div>
                <div class="row list">
                    <div class="col-xs-12 col-sm-4 col-sm-offset-4">
                        @foreach($more_advisors as $more_advisor)
                            <div class="single">
                                @if(!empty($more_advisor->media))
                                    <figure itemscope="" itemtype="http://schema.org/ImageObject">
                                        <img data-defer-src="{{URL::asset('assets/uploads/'.$more_advisor->media->name) }}" alt="@if(!empty($more_advisor->media->alt)){{$more_advisor->media->alt}}@endif" itemprop="contentUrl"/>
                                    </figure>
                                @endif
                                <div class="name">{{$more_advisor->name}}</div>
                                @if(!empty($more_advisor->position))
                                    <div class="position">{{$more_advisor->position}}</div>
                                @endif
                                <div class="separator"></div>
                                @if(!empty($more_advisor->text))
                                    <div class="description">{!! $more_advisor->text !!}</div>
                                @endif
                            </div>
                        @endforeach
                    </div>
                </div>
            </div>
        @endif
    </section>
@endsection