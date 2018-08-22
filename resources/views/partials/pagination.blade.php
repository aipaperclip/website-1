<div class="pagination-container">
    @if($pages > 1)
        <ul>
            {{--First < logic--}}
            @if($page > 1)
                <li class="inline-block arrow"><a href="{{ route('testimonials', ['page' => $page-1]) }}"><i class="fa fa-chevron-left" aria-hidden="true"></i></a></li>
            @endif

            @for ($i = 1; $i <= $pages; $i+=1)
                @if($i == $page)
                    <li class="current inline-block"><a href="javascript:void(0);">{{$i}}</a></li>
                @else
                    <li class="inline-block"><a href="{{ route('testimonials', ['page' => $i]) }}">{{$i}}</a></li>
                @endif
            @endfor

            {{--Last < logic--}}
            @if($page < $pages)
                <li class="inline-block arrow"><a href="{{ route('testimonials', ['page' => $page+1]) }}"><i class="fa fa-chevron-right" aria-hidden="true"></i></a></li>
            @endif
        </ul>
    @endif
</div>