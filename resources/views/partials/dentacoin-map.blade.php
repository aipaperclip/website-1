@php($combinedCountData = (new \App\Http\Controllers\APIRequestsController())->getMapData(array('action' => 'combined-count-data')))
<section class="section-google-map module">
    <div class="container-fluid">
        <div class="row padding-top-20 padding-bottom-30">
            <div class="col-xs-12 text-center color-black">
                <h3 class="fs-30 fs-sm-24 fs-xs-20 padding-bottom-lgll-10 lato-bold">ALL AROUND THE WORLD:</h3>
                <h2 class="fs-50 fs-sm-40 fs-xs-26 fs-lgll-65 lato-black">USERS & PARTNERS</h2>
            </div>
        </div>
    </div>
    <div class="map-container">
        <div class="header-filter-line padding-top-15 padding-bottom-15">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12 col-md-6 text-right text-center-sm text-center-xs padding-bottom-sm-20 padding-bottom-xs-15">
                        @if (!empty($location_types))
                                <select class="selectpicker location-types" data-live-search="true" multiple>
                                @foreach ($location_types as $location_type)
                                    <option selected value="category-{{$location_type->id}}">{{$location_type->name}}</option>
                                @endforeach
                            </select>
                        @endif
                    </div>
                    <div class="col-xs-12 col-md-6 text-center-sm text-center-xs locations-splitted-by-category">
                        @if (!empty($arrayWithAllLocationsSplittedByCategory))
                            @php($arrayWithColors = array())
                            @php($arrayWithGroupsHtml = array())
                            <select class="selectpicker locations" data-live-search="true">
                                <option value="">Show All Locations</option>
                                @php($counter = 1)
                                @foreach ($arrayWithAllLocationsSplittedByCategory as $value)
                                    {{--<optgroup label="<span data-type='{{$value['id']}}' style='color: {{$value['color']}}'>{{$value['name']}}</span>">--}}
                                    @php($arrayWithColors['category-'.$value['id']] = $value['color'])
                                    {{--<optgroup label="{{$value['name']}}" class="category-{{$value['id']}}">
                                        @if (!empty($value['data']))
                                            @foreach ($value['data'] as $location)
                                                <option>{{$location['name']}}</option>
                                            @endforeach
                                        @endif
                                    </optgroup>--}}
                                    @php($groupHtml = '<optgroup label="'.$value['name'].'" class="category-'.$value['id'].'">')
                                    @if (!empty($value['data']))
                                        @foreach ($value['data'] as $location)
                                            @php($groupHtml .= '<option data-id="'.$location['id'].'" data-lat="'.$location['lat'].'" data-lng="'.$location['lng'].'" data-country-code="'.$location['country_code'].'" value="'.$location['source'].'">'.$location['name'].'</option>')
                                        @endforeach
                                    @endif
                                    @php($groupHtml .= '</optgroup>')
                                    {!! $groupHtml !!}
                                    @php($arrayWithGroupsHtml['optgroup-'.$counter] = $groupHtml)
                                    @php($counter += 1)
                                @endforeach
                            </select>
                            @if (!empty($arrayWithColors))
                                <style class="locations-style" data-groups-html="{{json_encode($arrayWithGroupsHtml)}}">
                                    @foreach ($arrayWithColors as $class => $color)
                                        .{{$class}} { color: {{$color}}; }
                                    @endforeach
                                </style>
                            @endif
                        @endif
                    </div>
                </div>
            </div>
        </div>
        <div class="picker-and-map fs-0">
            <div class="left-picker inline-block-top">
                <div class="inner-gray-line fs-0 padding-left-15 padding-right-15">
                    <div class="width-50 inline-block picker-label fs-18 fs-xs-16">Worldwide</div>
                    <div class="width-50 inline-block picker-value fs-18 fs-xs-16 text-right" @if (!empty($combinedCountData) && is_object($combinedCountData) && property_exists($combinedCountData, 'success')) data-worldwide="{{$combinedCountData->data->partners + $combinedCountData->data->non_partners}}" @endif>@if (!empty($combinedCountData) && is_object($combinedCountData) && property_exists($combinedCountData, 'success') && $combinedCountData->success) <span class="lato-black">{{$combinedCountData->data->partners + $combinedCountData->data->non_partners}}</span> Results @endif</div>
                </div>
                <div class="results-list">
                    <div class="results-nav fs-0">
                        <div class="continents-nav shown"><span class="fs-18 fs-xs-16 nav-item">Choose Continent</span></div>
                        <div class="countries-nav">
                            <a href="javascript:void(0);" class="nav-item inline-block width-50 fs-18 fs-xs-16">Choose Country</a>
                            <a href="javascript:void(0);" class="go-back-to-continents nav-item inline-block width-50 fs-18 fs-xs-16 text-right">Back to Continents</a>
                        </div>
                        <div class="locations-nav">
                            <a href="javascript:void(0);" class="nav-item inline-block width-50 fs-18 fs-xs-16">Choose Location</a>
                            <a href="javascript:void(0);" class="go-back-to-countries nav-item inline-block width-50 fs-18 fs-xs-16 text-right">Back to Countries</a>
                        </div>
                    </div>
                    <div class="continents-list">
                        @if (!empty($continents))
                            <ul>
                                @foreach ($continents as $continent)
                                    @php($listWithCountryCodes = array())
                                    @if (!empty($continent->countries))
                                        @foreach ($continent->countries as $country)
                                            @php(array_push($listWithCountryCodes, mb_strtolower($country->code)))
                                        @endforeach
                                    @endif
                                    <li class="single-continent">
                                        <a href="javascript:void(0);" data-continent-id="{{$continent->id}}" class="continent-name continent-and-country-style-type" @if (!empty($listWithCountryCodes)) data-country-codes="{{json_encode($listWithCountryCodes)}}" @endif><span class="element-name inline-block">{{$continent->name}}</span></a>
                                        @if (!empty($continent->countries))
                                            <ul class="countries-list">
                                                @foreach ($continent->countries as $country)
                                                    <li class="country-list-parent">
                                                        <a href="javascript:void(0);" class="continent-and-country-style-type fs-0" data-country-code="{{mb_strtolower($country->code)}}" data-country-id="{{$country->id}}" data-country-centroid-lat="{{$country->lat}}" data-country-centroid-lng="{{$country->lng}}">
                                                            <span class="element-name inline-block">{{$country->name}}</span>
                                                            @if(property_exists($continentCountByCountries, mb_strtolower($country->code)))
                                                                <span data-locations-count="{{get_object_vars($continentCountByCountries)[mb_strtolower($country->code)]}}" class="lato-bold inline-block locations-count fs-18 fs-xs-14">({{get_object_vars($continentCountByCountries)[mb_strtolower($country->code)]}} locations)</span>
                                                            @else
                                                                <span class="lato-bold inline-block locations-count fs-18 fs-xs-14">(0 locations)</span>
                                                            @endif
                                                        </a>
                                                        <ul class="locations-category-list">

                                                        </ul>
                                                    </li>
                                                @endforeach
                                            </ul>
                                        @endif
                                    </li>
                                @endforeach
                            </ul>
                        @endif
                    </div>
                    {{--<div class="results-category">
                        <a href="javascript:void(0);" class="show-hide-btn display-block">Partner Dental Practices</a>
                        <ul>
                            <li></li>
                        </ul>
                    </div>--}}
                </div>
            </div>
            <div class="google-map-box inline-block-top" data-locations="{{$arrayWithAllLocations}}"></div>
        </div>
        <div class="invite-and-bottom-filter display-flex">
            <div class="only-mobile-visible-map-button">
                <a href="javascript:void(0);" class="white-purple-btn with-list-icon show-locations-list inline-block fs-xs-16 padding-top-10 padding-bottom-10 padding-right-20 padding-left-50"> SEE RESULTS IN LIST</a>
            </div>
            <div class="invite-text padding-left-15 padding-right-15 padding-top-15 padding-bottom-25">
                <div class="color-white lato-black fs-28 fs-sm-22 fs-xs-20 padding-bottom-15">KNOW A GREAT DENTIST, BUT IT’S NOT ON OUR MAP?</div>
                <div><a href="https://reviews.dentacoin.com/?popup=invite-new-dentist-popup" target="_blank" class="bright-blue-white-btn with-border fs-xs-16">INVITE DENTIST</a></div>
            </div>
            <div class="bottom-filter fs-0">
                <div class="right-side-filters inline-block-top text-right fs-20">
                    <ul>
                        @if (!empty($location_types))
                            <ul>
                                @foreach ($location_types as $location_type)
                                    <li>
                                        <div class="custom-checkbox-style module">
                                            <label class="custom-checkbox-label" for="category-{{$location_type->id}}"><span class="inline-block">{{$location_type->name}}</span> <span class="inline-block color-box" style="background-color: {{$location_type->color}};"></span></label>
                                            <input type="checkbox" class="custom-checkbox-input" checked id="category-{{$location_type->id}}"/>
                                        </div>
                                    </li>
                                @endforeach
                            </ul>
                        @endif
                    </ul>
                </div>
                @if (!empty($combinedCountData) && is_object($combinedCountData) && property_exists($combinedCountData, 'success') && $combinedCountData->success)
                    <div class="left-side-stats inline-block-top">
                        <h3 class="lato-black color-black fs-30 fs-sm-24 fs-xs-22 padding-top-sm-20 padding-top-xs-20 padding-bottom-10 dentacoin-stats-category-label">Dentacoin Users <span>Worldwide</span>:</h3>
                        <div class="changeable-stats">
                            <ul class="fs-20 fs-xs-18">
                                <li class="partners" data-worldwide="{{$combinedCountData->data->partners}}"><span>{{$combinedCountData->data->partners}}</span> Partner Dental Practices Accepting DCN</li>
                                <li class="non-partners" data-worldwide="{{$combinedCountData->data->non_partners}}"><span>{{$combinedCountData->data->non_partners}}</span> Dental Practices Using Dentacoin Apps</li>
                                <li class="users" data-worldwide="{{$combinedCountData->data->patients}}"><span>{{$combinedCountData->data->patients}}</span> Individuals Using Dentacoin Apps</li>
                            </ul>
                        </div>
                    </div>
                @endif
            </div>
        </div>
    </div>
</section>