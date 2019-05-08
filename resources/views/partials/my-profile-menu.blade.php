<div class="my-profile-menu inline-block-top">
    <div class="wrapper">
        <div class="avatar-and-name padding-bottom-15 fs-0">
            <figure itemscope="" itemtype="http://schema.org/ImageObject" class="inline-block">
                @php($avatar_url = (new \App\Http\Controllers\APIRequestsController())->getUserData(session('logged_user')['id'])->avatar_url)
                @if(!empty($avatar_url))
                    <img alt="" itemprop="contentUrl" src="{{$avatar_url}}"/>
                @else
                    <img alt="" itemprop="contentUrl" src="/assets/images/avatar-icon.svg"/>
                @endif
            </figure>
            <div class="welcome-name inline-block fs-16 lato-bold">Welcome, {{(new \App\Http\Controllers\APIRequestsController())->getUserData(session('logged_user')['id'])->name}}</div>
        </div>
        <nav class="profile-menu module">
            <ul itemscope="" itemtype="http://schema.org/SiteNavigationElement">
                <li>
                    <a @if((new \App\Http\Controllers\UserController())->checkSession()) href="{{ route('foundation') }}" @else href="{{ route('home') }}" @endif itemprop="url">
                        <figure itemscope="" itemtype="http://schema.org/ImageObject" class="inline-block">
                            <img alt="Home icon" src="/assets/uploads/home.svg"/>
                        </figure>
                        <span itemprop="name">Home</span>
                    </a>
                </li>
                <li>
                    <a href="{{ route('my-profile') }}" @if(!empty(Route::current()) && Route::current()->getName() == 'my-profile') class="active" @endif itemprop="url">
                        <figure itemscope="" itemtype="http://schema.org/ImageObject" class="inline-block">
                            <img alt="Wallet icon" src="/assets/uploads/wallet-icon.svg"/>
                        </figure>
                        <span itemprop="name">My Wallet</span>
                    </a>
                </li>
                <li>
                    <a href="{{ route('edit-account') }}" @if(!empty(Route::current()) && Route::current()->getName() == 'edit-account') class="active" @endif itemprop="url">
                        <figure itemscope="" itemtype="http://schema.org/ImageObject" class="inline-block">
                            <img alt="Edit account icon" src="/assets/uploads/edit-account-icon.svg"/>
                        </figure>
                        <span itemprop="name">Edit Account</span>
                    </a>
                </li>
                <li>
                    <a href="{{ route('manage-privacy') }}" @if(!empty(Route::current()) && Route::current()->getName() == 'manage-privacy') class="active" @endif itemprop="url">
                        <figure itemscope="" itemtype="http://schema.org/ImageObject" class="inline-block">
                            <img alt="Privacy icon" src="/assets/uploads/privacy-icon.svg"/>
                        </figure>
                        <span itemprop="name">Manage Privacy</span>
                    </a>
                </li>
                <li>
                    <a href="//dentavox.dentacoin.com" target="_blank" itemprop="url">
                        <figure itemscope="" itemtype="http://schema.org/ImageObject" class="inline-block">
                            <img alt="Dentavox logo" src="/assets/uploads/dentavox--surveys.svg"/>
                        </figure>
                        <span itemprop="name">DentaVox Surveys</span>
                    </a>
                </li>
                <li>
                    <a href="//reviews.dentacoin.com" target="_blank" itemprop="url">
                        <figure itemscope="" itemtype="http://schema.org/ImageObject" class="inline-block">
                            <img alt="Trusted reviews logo" src="/assets/uploads/trusted-reviews-icon.svg"/>
                        </figure>
                        <span itemprop="name">Trusted Reviews</span>
                    </a>
                </li>
                <li>
                    <a href="//assurance.dentacoin.com" target="_blank" itemprop="url">
                        <figure itemscope="" itemtype="http://schema.org/ImageObject" class="inline-block">
                            <img alt="Assurance logo" src="/assets/uploads/assurance.svg"/>
                        </figure>
                        <span itemprop="name">Dentacoin Assurance</span>
                    </a>
                </li>
                <li>
                    <a href="{{ route('user-logout') }}" itemprop="url">
                        <figure itemscope="" itemtype="http://schema.org/ImageObject" class="inline-block">
                            <img alt="Logout icon" src="/assets/uploads/logout-icon.svg"/>
                        </figure>
                        <span itemprop="name">Log out</span>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</div>