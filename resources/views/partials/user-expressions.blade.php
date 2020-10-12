@if (sizeof($user_expressions) > 0)
    <div class="container-fluid padding-top-10 padding-bottom-50 padding-bottom-xs-10 padding-bottom-sm-10">
        <div class="row">
            <div class="col-xs-12 overflow-hidden user-expressions-slider-parent module padding-top-50 padding-top-xs-20 padding-bottom-10">
                <div class="user-expressions-slider" data-type="{{$type}}">
                    @foreach ($user_expressions as $user_expression)
                        @if (isset($mobile))
                            @if(($mobile && !filter_var($user_expression->mobile_visible, FILTER_VALIDATE_BOOLEAN)) || (!$mobile && !filter_var($user_expression->desktop_visible, FILTER_VALIDATE_BOOLEAN)))
                                @continue
                            @endif
                        @endif
                        <div class="single-slide">
                            <div class="slide-wrapper">
                                <article>
                                    <div class="fs-20 fs-sm-18 fs-xs-16 line-height-24 line-height-xs-20 padding-bottom-15 user-expression-text">{!! $user_expression->text !!}</div>
                                    @if(!empty($user_expression->name_job))
                                        <div class="lato-black fs-20 fs-xs-16 color-black text-right">{!! $user_expression->name_job !!}</div>
                                    @endif
                                    @if(!empty($user_expression->location))
                                        <div class="fs-20 fs-xs-16 color-black text-right">{!! $user_expression->location !!}</div>
                                    @endif
                                </article>
                                <div class="person-avatar">
                                    <figure itemscope="" itemtype="http://schema.org/ImageObject">
                                        @if(empty($user_expression->media))
                                            <img src="/assets/images/avatar-icon.svg" alt="Avatar icon" itemprop="contentUrl"/>
                                        @else
                                            <img src="//dentacoin.com/assets/uploads/{{$user_expression->media->name}}" alt="{{$user_expression->media->alt}}" itemprop="contentUrl"/>
                                        @endif
                                    </figure>
                                </div>
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>
        </div>
    </div>
@endif