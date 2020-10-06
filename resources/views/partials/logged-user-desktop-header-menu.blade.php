<div class="col-xs-9 logged-user-right-nav inline-block text-right @if(!empty($class)) {{$class}} @endif @if(Route::current()->getName() != 'home') with-hub @endif">
    <div class="hidden-box-parent">
        @php($user_data = (new \App\Http\Controllers\APIRequestsController())->getUserData(session('logged_user')['id']))
        <div class="inline-block fs-14 padding-right-10 color-white-on-page-switch">
            <span class="user-name">{{$user_data->name}}</span>
            @php($dcn_balance = (new \App\Http\Controllers\APIRequestsController())->getDCNBalance()->data)
            @php($dentacoin_data = (new \App\Http\Controllers\APIRequestsController())->getDentacoinDataByExternalProvider())
            @if(!empty($dentacoin_data))
                @php($usd_balance = $dentacoin_data['USD'] * $dcn_balance)
                <div>{{$dcn_balance}} DCN | ${{number_format((float)$usd_balance, 2, '.', '')}}</div>
            @else
                <div>{{$dcn_balance}} DCN</div>
            @endif
        </div>
        <figure itemscope="" itemtype="http://schema.org/ImageObject" class="inline-block header-avatar" id="header-avatar">
            @if(!empty($user_data->thumbnail_url))
                <img alt="User avatar" itemprop="contentUrl" src="{{$user_data->thumbnail_url}}"/>
            @else
                <img alt="User avatar" itemprop="contentUrl" src="/assets/images/avatar-icon.svg"/>
            @endif
        </figure>
    </div>
</div>