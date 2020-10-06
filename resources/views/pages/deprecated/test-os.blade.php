@extends("layout")
@section("content")
    <div class="padding-top-100 padding-bottom-200 padding-left-20 padding-right-20 container">
        <div class="padding-bottom-35">
            {{var_dump($mobileGrade)}}
        </div>
        <div class="padding-bottom-35">
            {{var_dump($checkHttpHeadersForMobile)}}
        </div>
        <div class="padding-bottom-35">
            {{var_dump($getUserAgent)}}
        </div>
    </div>
@endsection