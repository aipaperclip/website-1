<ul>
    <li @if(Route::current()->getName() == "products") class="active" @endif><a href="{{ route('products', ['lang' => config('app.locale')]) }}">{{ __('header.products') }}</a></li>
    <li @if(Route::current()->getName() == "about") class="active" @endif><a href="{{ route('about', ['lang' => config('app.locale')]) }}">{{ __('header.about') }}</a></li>
    <li @if(Route::current()->getName() == "partners") class="active" @endif><a href="{{ route('partners', ['lang' => config('app.locale')]) }}">{{ __('header.partners') }}</a></li>
    <li @if(Route::current()->getName() == "news") class="active" @endif><a href="{{ route('news', ['lang' => config('app.locale')]) }}">{{ __('header.news') }}</a></li>
    <li @if(Route::current()->getName() == "contact") class="active" @endif><a href="{{ route('contact', ['lang' => config('app.locale')]) }}">{{ __('header.contact') }}</a></li>
</ul>