<div class="pagination-container">
    @if($pages > 1)
        <ul>
            @if($page > 1)
                <li class="inline-block arrow"><a href="{{ route(Route::current()->getName(), ['page' => $page-1]) }}" rel="prev"><i class="fa fa-chevron-left" aria-hidden="true"></i></a></li>
            @endif
            @php($range = 2)
            @if($page > 3)
                <li class="inline-block"><a href="{{ route(Route::current()->getName(), ['page' => 1]) }}" rel="next">1</a></li>
                @if($page != 4)
                    <li class="inline-block dots">...</li>
                @endif
            @endif
            @for($i = $page - $range; $i <= ($page + $range) + 1; $i+=1)
                @if($i > 0 && $i <= $pages)
                    <li class="@if($page == $i) current @endif inline-block"><a href="@if($page == $i) javascript:void(0); @else {{ route(Route::current()->getName(), ['page' => $i]) }} @endif" @if($page == $i) rel="canonical" @endif>{{$i}}</a></li>
                @endif
            @endfor
            @if($page < $pages - 3)
                @if(($pages - 3) - $page > 1)
                    <li class="inline-block dots">...</li>
                @endif
                <li class="inline-block"><a href="{{ route(Route::current()->getName(), ['page' => $pages]) }}" rel="next">{{$pages}}</a></li>
            @endif
            {{--Last < logic--}}
            @if($page < $pages)
                <li class="inline-block arrow"><a href="{{ route(Route::current()->getName(), ['page' => $page+1]) }}" rel="next"><i class="fa fa-chevron-right" aria-hidden="true"></i></a></li>
            @endif
        </ul>
    @endif
</div>