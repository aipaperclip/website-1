@section("script_block")
    <script>
        var map_locations = [];
                @foreach($locations as $location)
        var temp_obj = {
                'id' : '{{$location->id}}',
                'address' : '{{$location->address}}',
                'lat' : '{{$location->lat}}',
                'lng' : '{{$location->lng}}',
                'clinic_name' : '{{$location->clinic_name}}',
                'clinic_link' : '{{$location->clinic_link}}',
                'location_type_id' : '{{$location->location_type_id}}',
                'marker_icon' : '{{URL::asset('assets/uploads/'.$location->marker_icon)}}'
            };
        @if(!empty($location->clinic_media))
            temp_obj['clinic_media'] = '{{URL::asset('assets/uploads/'.$location->clinic_media)}}';
        temp_obj['clinic_media_alt'] = '{{$location->clinic_media_alt}}';
        @endif
        map_locations.push(temp_obj);
        @endforeach
    </script>
@endsection