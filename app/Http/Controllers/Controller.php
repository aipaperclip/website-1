<?php

namespace App\Http\Controllers;

use App\PageMetaData;
use App\PagesHtmlSection;
use Illuminate\Http\Request;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Jenssegers\Agent\Agent;
use Illuminate\Support\Facades\View;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Route;


class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function __construct() {
        if(Route::getCurrentRoute()->getPrefix() == '/')    {
            View::share('mobile', $this->isMobile());
            View::share('meta_data', $this->getMetaData());
            View::share('titles', $this->getDbTitles());
            View::share('sections', $this->getDbSections());
        }
    }

    protected function getMetaData()    {
        return PageMetaData::where(array('slug' => Route::getCurrentRoute()->getName()))->get()->first();
    }

    protected function getDbTitles()    {
        return PagesHtmlSection::where(array('page_id' => $this->getMetaData()->id, 'type' => 'title'))->get()->all();
    }

    protected function getDbSections()    {
        return PagesHtmlSection::where(array('page_id' => $this->getMetaData()->id, 'type' => 'section'))->get()->all();
    }

    protected function isMobile()   {
        return (new Agent())->isMobile();
    }

    protected function getSitemap() {
        $sitemap = App::make("sitemap");
        // set cache (key (string), duration in minutes (Carbon|Datetime|int), turn on/off (boolean))
        // by default cache is disabled
        //$sitemap->setCache('laravel.sitemap', 3600);

        // check if there is cached sitemap and build new only if is not
        //if(!$sitemap->isCached())  {
        // add item to the sitemap (url, date, priority, freq)

        $sitemap->add(URL::to('/'), '2012-08-25T20:10:00+02:00', '1.0', 'daily');
        //$sitemap->add(URL::to('publications'), '2012-08-25T20:10:00+02:00', '0.6', 'weekly');
        $sitemap->add(URL::to('privacy-policy'), '2012-08-25T20:10:00+02:00', '0.4', 'monthly');
        $sitemap->add(URL::to('changelly'), '2012-08-25T20:10:00+02:00', '1.0', 'monthly');
        $sitemap->add(URL::to('partner-network'), '2012-08-25T20:10:00+02:00', '0.8', 'daily');

        //getting all pagination pages for testimonials
        for($i = 1, $length = (new UserExpressionsController())->getPagesCount(); $i <= $length; $i+=1) {
            $sitemap->add(URL::to('testimonials/page/'.$i), '2012-08-25T20:10:00+02:00', '0.8', 'daily');
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
        return view('partials/google-map-iframe', ['locations' => (new PartnerNetworkController())->getLocations()]);
    }
}
