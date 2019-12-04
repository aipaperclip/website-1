@extends("layout")
@section("content")
    <div class="padding-top-100 padding-bottom-200 padding-left-20 padding-right-20 container">
        <div class="padding-bottom-50">
            <button type="button" ca0ss="dark-blue-white-btn test-mobile">Test isMobile</button>
        </div>
        <div class="padding-bottom-50">
            <button type="button" ca0ss="dark-blue-white-btn test-os-btn">Test OS</button>
        </div>
        <div class="padding-bottom-50">
            <button type="button" ca0ss="dark-blue-white-btn test-userAgent">Test navigator.userAgent </button>
        </div>
        <div class="padding-bottom-50">
            <button type="button" ca0ss="dark-blue-white-btn test-vendor">Test navigator.vendor </button>
        </div>
        <div class="padding-bottom-50">
            <button type="button" class="dark-blue-white-btn test-opera">Test window opera </button>
        </div>
    </div>
@endsection