<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Admin\LocationsController;
use App\Http\Controllers\Admin\SocialsController;
use App\Media;
use App\MenuElement;
use App\PageMetaData;
use App\PagesHtmlSection;
use App\Section;
use Illuminate\Support\Facades\DB;
use Request;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Jenssegers\Agent\Agent;
use Illuminate\Support\Facades\View;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Route;
use App\Social;


class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    const POSTS_PER_PAGE = 8;
    const currencies = ['USD', 'EUR', 'GBP', 'RUB', 'INR', 'CNY', 'JPY'];

    public function __construct() {
        if(!empty(Route::getCurrentRoute()) && !Request::isMethod('post'))    {
            View::share('mobile', $this->isMobile());
            View::share('mobileGrade', $this->mobileGrade());
            View::share('getOperatingSystems', $this->getOperatingSystems());
            View::share('checkHttpHeadersForMobile', $this->checkHttpHeadersForMobile());
            View::share('getUserAgent', $this->getUserAgent());
            View::share('meta_data', $this->getMetaData());
            View::share('parent_titles', $this->getParentDbTitles());
            View::share('parent_sections', $this->getParentDbSections());
            View::share('titles', $this->getDbTitles());
            View::share('sections', $this->getDbSections());
            View::share('socials', $this->getFooterSocials());
            View::share('footer_menu', $this->getFooterMenu());
            View::share('footer_data', $this->getFooterData());
            View::share('privacy_policy_cookie', $this->checkIfPrivacyPolicyCookie());
            View::share('social_engagement_cookie', $this->checkIfSocialEngagementCookie());
            View::share('client_ip', $this->getClientIp());
        }
    }

    protected function getFooterData()  {
        $footer_section_id = Section::where(array('slug' => 'footer'))->get()->first()->id;
        return PagesHtmlSection::where(array('section_id' => $footer_section_id))->get()->sortBy('order_id')->toArray();
    }

    protected function getMetaData()    {
        if(Route::getCurrentRoute()->getName() == 'corporate-design') {
            //getting meta data for children pages
            return PageMetaData::where(array('slug' => Route::getCurrentRoute()->parameters['slug']))->get()->first();
        }

        $slug = Route::getCurrentRoute()->getName();
        if(Route::getCurrentRoute()->getName() == 'foundation') {
            $slug = 'home';
        }
        return PageMetaData::where(array('slug' => $slug))->get()->first();
    }

    /*public function getCurrentDcnUsdRate()  {
        //API connection
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_RETURNTRANSFER => 1,
            CURLOPT_URL => 'https://api.coinmarketcap.com/v1/ticker/dentacoin/?convert=USD',
            CURLOPT_SSL_VERIFYPEER => 0
        ));
        curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
        $resp = json_decode(curl_exec($curl));
        curl_close($curl);

        if(sizeof($resp) > 0)   {
            if(property_exists($resp[0], 'price_usd'))  {
                return (float)$resp[0]->price_usd;
            }else {
                return 0;
            }
        } else {
            return 0;
        }
    }*/

    public function getCurrentDcnRateByCoingecko()  {
        //API connection
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_RETURNTRANSFER => 1,
            CURLOPT_URL => "https://api.coingecko.com/api/v3/coins/dentacoin",
            CURLOPT_SSL_VERIFYPEER => 0
        ));
        curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
        $resp = json_decode(curl_exec($curl));
        curl_close($curl);
        if(!empty($resp))   {
            if(!empty($resp->market_data->current_price))  {
                return array(
                    'USD' => $resp->market_data->current_price->usd,
                    'EUR' => $resp->market_data->current_price->eur,
                    'GBP' => $resp->market_data->current_price->gbp,
                    'RUB' => $resp->market_data->current_price->rub,
                    'INR' => $resp->market_data->current_price->inr,
                    'CNY' => $resp->market_data->current_price->cny,
                    'JPY' => $resp->market_data->current_price->jpy
                );
            }else {
                return 0;
            }
        }
    }

    protected function getParentDbTitles()    {
        if(!empty(Route::getCurrentRoute()->parameters['slug'])) {
            $current_page = PageMetaData::where(array('slug' => Route::getCurrentRoute()->parameters['slug']))->get()->first();
            if(!empty($current_page->parent)) {
                return PagesHtmlSection::where(array('page_id' => $current_page->parent->id, 'type' => 'title'))->get()->all();
            }
        }else {
            return null;
        }
    }

    protected function getParentDbSections()    {
        if(!empty(Route::getCurrentRoute()->parameters['slug'])) {
            $current_page = PageMetaData::where(array('slug' => Route::getCurrentRoute()->parameters['slug']))->get()->first();
            if(!empty($current_page->parent)) {
                return PagesHtmlSection::where(array('page_id' => $current_page->parent->id, 'type' => 'section'))->get()->all();
            }
        }else {
            return null;
        }
    }

    protected function getFooterSocials()    {
        return Social::all()->sortBy('order_id');
    }

    protected function getFooterMenu()    {
        return MenuElement::all()->sortBy('order_id');
    }

    protected function getDbTitles()    {
        $meta_data = $this->getMetaData();
        if(!empty($meta_data)) {
            return PagesHtmlSection::where(array('page_id' => $meta_data->id, 'type' => 'title'))->get()->all();
        }else {
            return null;
        }
    }

    protected function getDbSections()    {
        $meta_data = $this->getMetaData();
        if(!empty($meta_data)) {
            return PagesHtmlSection::where(array('page_id' => $this->getMetaData()->id, 'type' => 'section'))->get()->all();
        }else {
            return null;
        }
    }

    protected function checkIfPrivacyPolicyCookie()    {
        $bool = empty($_COOKIE['privacy_policy']);
        if($bool) {
            return true;
        }else {
            return false;
        }
    }

    protected function checkIfSocialEngagementCookie()    {
        $bool = empty($_COOKIE['christmas_calendar_social_engagement']);
        if($bool) {
            return true;
        }else {
            return false;
        }
    }

    protected function isMobile()   {
        return (new Agent())->isMobile();
    }

    protected function mobileGrade()   {
        return (new Agent())->mobileGrade();
    }

    protected function getOperatingSystems()   {
        return (new Agent())->getOperatingSystems();
    }

    protected function checkHttpHeadersForMobile()   {
        return (new Agent())->checkHttpHeadersForMobile();
    }

    protected function getUserAgent()   {
        return (new Agent())->getUserAgent();
    }

    protected function getSitemap() {
        $sitemap = App::make("sitemap");
        // set cache (key (string), duration in minutes (Carbon|Datetime|int), turn on/off (boolean))
        // by default cache is disabled
        //$sitemap->setCache('laravel.sitemap', 3600);

        // check if there is cached sitemap and build new only if is not
        //if(!$sitemap->isCached())  {
        // add item to the sitemap (url, date, priority, freq)

        $sitemap->add(URL::to('/'), '2018-08-25T20:10:00+02:00', '1.0', 'daily');
        //$sitemap->add(URL::to('publications'), '2012-08-25T20:10:00+02:00', '0.6', 'weekly');
        $sitemap->add(URL::to('privacy-policy'), '2018-02-25T20:10:00+02:00', '0.4', 'monthly');
        //$sitemap->add(URL::to('changelly'), '2018-08-25T20:10:00+02:00', '1.0', 'monthly');
        $sitemap->add(URL::to('partner-network'), '2018-08-25T20:10:00+02:00', '0.8', 'daily');
        $sitemap->add(URL::to('team'), '2018-09-25T20:10:00+02:00', '0.9', 'weekly');
        $sitemap->add(URL::to('careers'), '2018-10-10T20:10:00+02:00', '1', 'daily');
        $sitemap->add(URL::to('corporate-identity'), '2018-12-10T20:10:00+02:00', '0.6', 'monthly');
        $sitemap->add(URL::to('corporate-design/one-line-logo'), '2018-12-10T20:10:00+02:00', '0.6', 'monthly');
        $sitemap->add(URL::to('corporate-design/two-line-logo'), '2018-12-10T20:10:00+02:00', '0.6', 'monthly');
        $sitemap->add(URL::to('corporate-design/round-logo'), '2018-12-10T20:10:00+02:00', '0.6', 'monthly');
        $sitemap->add(URL::to('/how-to-create-wallet'), '2019-07-09:10:00+02:00', '0.8', 'weekly');

        //getting all pagination pages for testimonials
        for($i = 1, $length = (new UserExpressionsController())->getPagesCount(); $i <= $length; $i+=1) {
            $sitemap->add(URL::to('testimonials/page/'.$i), '2018-08-25T20:10:00+02:00', '0.7', 'daily');
        }

        //getting all pagination pages for press-center
        for($i = 1, $length = (new PressCenterController())->getPagesCount(); $i <= $length; $i+=1) {
            $sitemap->add(URL::to('press-center/page/'.$i), '2018-08-25T20:10:00+02:00', '0.7', 'daily');
        }

        //getting all pagination pages for press-center
        foreach((new \App\Http\Controllers\Admin\CareersController())->getAllJobOffers() as $career)    {
            $sitemap->add(URL::to('careers/'.$career->slug), '2018-10-10T20:10:00+02:00', '0.5', 'weekly');
        }

        // get all posts from db
        //$posts = DB::table('posts')->orderBy('created_at', 'desc')->get();
        //
        //// add every post to the sitemap
        //foreach ($posts as $post)
        //{
        //   $sitemap->add($post->slug, $post->modified, $post->priority, $post->freq);
        //}
        //}
        // show your sitemap (options: 'xml' (default), 'html', 'txt', 'ror-rss', 'ror-rdf')
        return $sitemap->render('xml');
    }

    protected function transliterate($str) {
        return str_replace(['а','б','в','г','д','е','ё','ж','з','и','й','к','л','м','н','о','п', 'р','с','т','у','ф','х','ц','ч','ш','щ','ъ','ы','ь','э','ю','я',' ','_'], ['a','b','v','g','d','e','io','zh','z','i','y','k','l','m','n','o','p', 'r','s','t','u','f','h','ts','ch','sh','sht','a','i','y','e','yu','ya','-','-'], mb_strtolower($str));
    }

    public function minifyHtml($response)   {
        $buffer = $response->getContent();
        if(strpos($buffer,'<pre>') !== false) {
            $replace = array(
                '/<!--[^\[](.*?)[^\]]-->/s' => '',
                "/<\?php/"                  => '<?php ',
                "/\r/"                      => '',
                "/>\n</"                    => '><',
                "/>\s+\n</"                 => '><',
                "/>\n\s+</"                 => '><',
            );
        }
        else {
            $replace = array(
                '/<!--[^\[](.*?)[^\]]-->/s' => '',
                "/<\?php/"                  => '<?php ',
                "/\n([\S])/"                => '$1',
                "/\r/"                      => '',
                "/\n/"                      => '',
                "/\t/"                      => '',
                "/ +/"                      => ' ',
            );
        }
        $buffer = preg_replace(array_keys($replace), array_values($replace), $buffer);
        $response->setContent($buffer);
        ini_set('zlib.output_compression', 'On'); // If you like to enable GZip, too!
        return $response;
    }

    protected function getGoogleMapIframe() {
        return view('partials/google-map-iframe', ['locations' => (new PartnerNetworkController())->getLocations(), 'location_types' => (new PartnerNetworkController())->getLocationTypes(), 'locations_select' => (new PartnerNetworkController())->getAllLocations(), 'clinics' => (new LocationsController())->getAllFeaturedClinics()]);
    }

    protected function refreshCaptcha() {
        return response()->json(['captcha' => captcha_img()]);
    }

    protected function handleApiEndpoints($slug) {
        switch ($slug) {
            case 'socials-data':
                $socials = DB::connection('mysql')->table('socials')->leftJoin('media', 'socials.media_id', '=', 'media.id')->select('socials.*', 'media.name as media_name', 'media.alt as media_alt')->orderByRaw('socials.order_id ASC')->get()->toArray();
                foreach($socials as $social) {
                    $social->media_name = route('home') . UPLOADS_FRONT_END . $social->media_name;
                }
                return json_encode($socials);
                break;
            case 'testimonials':
                $testimonials = DB::connection('mysql')->table('user_expressions')->leftJoin('media', 'user_expressions.media_id', '=', 'media.id')->select('user_expressions.*', 'media.name as media_name', 'media.alt as media_alt')->orderByRaw('user_expressions.order_id ASC')->get()->toArray();
                foreach($testimonials as $testimonial) {
                    if(!empty($testimonial->media_name)) {
                        $testimonial->media_name = route('home') . UPLOADS_FRONT_END . $testimonial->media_name;
                    } else {
                        $testimonial->media_name = NULL;
                    }
                }
                return json_encode($testimonials);
                break;
            case 'applications':
                $applications = DB::connection('mysql')->table('applications')->leftJoin('media', 'applications.logo_id', '=', 'media.id')->select('applications.title', 'applications.link', 'media.name as media_name', 'media.alt as media_alt')->orderByRaw('applications.order_id ASC')->get()->toArray();
                foreach($applications as $application) {
                    if(!empty($application->media_name)) {
                        $application->media_name = route('home') . UPLOADS_FRONT_END . $application->media_name;
                    } else {
                        $application->media_name = NULL;
                    }
                }
                return json_encode($applications);
                break;
            case 'exchanges':
                $exchanges = DB::connection('mysql')->table('available_buying_options')->select('available_buying_options.title', 'available_buying_options.link')->where(array('type' => 'exchange-platforms'))->get()->toArray();
                return json_encode($exchanges);
                break;
            case 'platforms':
                $platforms = DB::connection('mysql')->table('platforms')->leftJoin('media', 'platforms.platform_logo_id', '=', 'media.id')->select('platforms.slug', 'platforms.link', 'platforms.color', 'platforms.extra_html', 'platforms.extra_html_patients', 'platforms.invitation_text_whatsapp', 'platforms.invitation_text_twitter', 'media.name as media_name', 'media.alt as media_alt')->get()->toArray();
                foreach($platforms as $platform) {
                    if(!empty($platform->media_name)) {
                        $platform->media_name = route('home') . UPLOADS_FRONT_END . $platform->media_name;
                    } else {
                        $platform->media_name = NULL;
                    }

                    $platform->extra_html = htmlentities($platform->extra_html);
                    $platform->extra_html_patients = htmlentities($platform->extra_html_patients);
                    $platform->invitation_text_whatsapp = htmlentities($platform->invitation_text_whatsapp);
                    $platform->invitation_text_twitter = htmlentities($platform->invitation_text_twitter);
                }
                return json_encode($platforms);
                break;
            default:
                $additional_data = (new Admin\MainController())->getApiEndpoint($slug);
                if(!empty($additional_data))    {
                    return $additional_data->data;
                }else {
                    return abort(404);
                }
        }
    }

    protected function clearPostData($data) {
        foreach($data as &$value) {
            if(is_string($value)) {
                $value = trim(strip_tags($value));
            }
        }
        return $data;
    }

    public function encrypt($raw_text, $algorithm, $key) {
        $length = openssl_cipher_iv_length($algorithm);
        $iv = openssl_random_pseudo_bytes($length);
        $encrypted = openssl_encrypt($raw_text, $algorithm, $key, OPENSSL_RAW_DATA, $iv);
        //here we append the $iv to the encrypted, because we will need it for the decryption
        $encrypted_with_iv = base64_encode($encrypted) . '|' . base64_encode($iv);
        return $encrypted_with_iv;
    }

    public function decrypt($encrypted_text) {
        list($data, $iv) = explode('|', $encrypted_text);
        $iv = base64_decode($iv);
        $raw_text = openssl_decrypt($data, getenv('API_ENCRYPTION_METHOD'), getenv('API_ENCRYPTION_KEY'), 0, $iv);
        return $raw_text;
    }

    public function getClientIp() {
        $ipaddress = '';
        if (getenv('HTTP_CLIENT_IP'))
            $ipaddress = getenv('HTTP_CLIENT_IP');
        else if(getenv('HTTP_X_FORWARDED_FOR'))
            $ipaddress = getenv('HTTP_X_FORWARDED_FOR');
        else if(getenv('HTTP_X_FORWARDED'))
            $ipaddress = getenv('HTTP_X_FORWARDED');
        else if(getenv('HTTP_FORWARDED_FOR'))
            $ipaddress = getenv('HTTP_FORWARDED_FOR');
        else if(getenv('HTTP_FORWARDED'))
            $ipaddress = getenv('HTTP_FORWARDED');
        else if(getenv('REMOTE_ADDR'))
            $ipaddress = getenv('REMOTE_ADDR');
        else
            $ipaddress = 'UNKNOWN';
        return $ipaddress;
    }

    public function getClientIpAsResponse() {
        return response()->json(['success' => true, 'data' => $this->getClientIp()]);
    }

    public function sendPushNotification() {
        $registrationIds = 'e9BYOpYKoxo:APA91bHshehmRqj6PvYnqyefOecp15Hj4rGDB8hsDk245vJSzcB7VtxPQiTcjCegiG1nBETaxJou7MWYL6NXwOwcXDKhqh7j9r7HwuPEXb1CdL88z5EGf26Qm0rcnnP_0_0XOW6vL0Pk';
        $fields = array
        (
            'to' 	=> $registrationIds,
            'notification' => array(
                'body' => 'New message'
            )
        );

        $headers = array
        (
            'Authorization: key='.getenv('PUSH_NOTIFICATION_KEY'),
            'Content-Type: application/json'
        );

        $ch = curl_init();
        curl_setopt( $ch,CURLOPT_URL, 'https://fcm.googleapis.com/fcm/send' );
        curl_setopt( $ch,CURLOPT_POST, true );
        curl_setopt( $ch,CURLOPT_HTTPHEADER, $headers );
        curl_setopt( $ch,CURLOPT_RETURNTRANSFER, true );
        curl_setopt( $ch,CURLOPT_SSL_VERIFYPEER, false );
        curl_setopt( $ch,CURLOPT_POSTFIELDS, json_encode( $fields ) );
        $result = curl_exec($ch );
        curl_close( $ch );
        echo $result;
    }
}
