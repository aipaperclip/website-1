<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DentacoinHubController extends Controller
{
    protected function getBigHubHtml($hubType) {
        $hubElements = DB::table('dcn_hubs')
            ->leftJoin('dcn_hub_dcn_hub_element', 'dcn_hubs.id', '=', 'dcn_hub_dcn_hub_element.dcn_hub_id')
            ->leftJoin('dentacoin_hub_elements', 'dcn_hub_dcn_hub_element.dcn_hub_element_id', '=', 'dentacoin_hub_elements.id')
            ->leftJoin('media', 'dentacoin_hub_elements.media_id', '=', 'media.id')
            ->select('dcn_hub_dcn_hub_element.order_id as order_in_hub', 'dentacoin_hub_elements.*', 'media.name as media_name', 'media.alt')
            ->where(array('dcn_hubs.slug' => $hubType))
            ->orderByRaw('order_in_hub ASC')
            ->get()->toArray();

        foreach ($hubElements as $hubElement) {
            if ($hubElement->type == 'folder') {
                $hubElement->children = DB::table('dcn_hub_element_folder')
                    ->leftJoin('dentacoin_hub_elements', 'dcn_hub_element_folder.dcn_hub_element_id', '=', 'dentacoin_hub_elements.id')
                    ->leftJoin('media', 'dentacoin_hub_elements.media_id', '=', 'media.id')
                    ->select('dcn_hub_element_folder.order_id', 'dentacoin_hub_elements.slug', 'dentacoin_hub_elements.title', 'dentacoin_hub_elements.link', 'dentacoin_hub_elements.type', 'media.name as media_name', 'media.alt')
                    ->where(array('dcn_hub_element_folder.dcn_hub_folder_id' => $hubElement->id))
                    ->orderByRaw('dcn_hub_element_folder.order_id ASC')
                    ->get()->toArray();
            }
        }

        $params = ['hubElements' => $hubElements];

        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_RETURNTRANSFER => 1,
            CURLOPT_URL => 'https://blog.dentacoin.com/dumb-latest-posts/',
            CURLOPT_SSL_VERIFYPEER => 0
        ));
        curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
        $resp = json_decode(curl_exec($curl));
        curl_close($curl);

        if(!empty($resp))   {
            $params['latest_blog_articles'] = $resp;
        }

        $view = view('partials/dcn-big-hub', $params);
        $view = $view->render();

        return response()->json(['success' => true, 'data' => $view]);
    }

    protected function getHubData($hubType) {
        $hubElements = DB::table('dcn_hubs')
            ->leftJoin('dcn_hub_dcn_hub_element', 'dcn_hubs.id', '=', 'dcn_hub_dcn_hub_element.dcn_hub_id')
            ->leftJoin('dentacoin_hub_elements', 'dcn_hub_dcn_hub_element.dcn_hub_element_id', '=', 'dentacoin_hub_elements.id')
            ->leftJoin('media', 'dentacoin_hub_elements.media_id', '=', 'media.id')
            ->select('dcn_hub_dcn_hub_element.order_id as order_in_hub', 'dentacoin_hub_elements.*', 'media.name as media_name', 'media.alt')
            ->where(array('dcn_hubs.slug' => $hubType))
            ->orderByRaw('order_in_hub ASC')
            ->get()->toArray();

        foreach ($hubElements as $hubElement) {
            if ($hubElement->type == 'folder') {
                $hubElement->children = DB::table('dcn_hub_element_folder')
                    ->leftJoin('dentacoin_hub_elements', 'dcn_hub_element_folder.dcn_hub_element_id', '=', 'dentacoin_hub_elements.id')
                    ->leftJoin('media', 'dentacoin_hub_elements.media_id', '=', 'media.id')
                    ->select('dcn_hub_element_folder.order_id', 'dentacoin_hub_elements.slug', 'dentacoin_hub_elements.title', 'dentacoin_hub_elements.link', 'dentacoin_hub_elements.type', 'media.name as media_name', 'media.alt')
                    ->where(array('dcn_hub_element_folder.dcn_hub_folder_id' => $hubElement->id))
                    ->orderByRaw('dcn_hub_element_folder.order_id ASC')
                    ->get()->toArray();
            }
        }

        return response()->json(['success' => true, 'data' => $hubElements]);
    }

    protected function getHubChildren($parentSlug) {
        $children = DB::table('dcn_hub_element_folder')
            ->leftJoin('dentacoin_hub_elements', 'dcn_hub_element_folder.dcn_hub_folder_id', '=', 'dentacoin_hub_elements.id')
            ->leftJoin('dentacoin_hub_elements as element', 'dcn_hub_element_folder.dcn_hub_element_id', '=', 'element.id')
            ->leftJoin('media', 'element.media_id', '=', 'media.id')
            ->select('dcn_hub_element_folder.order_id', 'element.slug', 'element.title', 'element.link', 'element.type', 'media.name as media_name', 'media.alt')
            ->where(array('dentacoin_hub_elements.slug' => $parentSlug))
            ->orderByRaw('dcn_hub_element_folder.order_id ASC')
            ->get()->toArray();

        if (!empty($children)) {
            return json_encode(array('success' => true, 'data' => $children));
        } else {
            return json_encode(array('error' => true));
        }
    }

    protected function getPlatformMenu($menu) {
        switch ($menu) {
            case 'dentists':
                $menu = DB::connection('mysql4')->table('menus')
                    ->leftJoin('menu_elements', 'menus.id', '=', 'menu_elements.menu_id')
                    ->select('menu_elements.*')
                    ->where(array('menus.slug' => 'header'))->get()->toArray();

                if (!empty($menu)) {
                    $html = '<div class="hub-page-menu"><ul itemscope="" itemtype="http://schema.org/SiteNavigationElement">';
                    foreach ($menu as $menu_element) {
                        $id_attribute = '';
                        $directTo = '';
                        if (!empty($menu_element->id_attribute)) {
                            $id_attribute = ' id="'.$menu_element->id_attribute.'" ';
                        }

                        if (strpos($menu_element->class_attribute, 'scrolling-to-section') !== false) {
                            $directTo = ' href="//dentists.dentacoin.com/home#'.$menu_element->id_attribute.'" ';
                        } else {
                            $directTo = ' href="//dentists.dentacoin.com'.$menu_element->url.'" ';
                        }

                        if ($menu_element->new_window) {
                            $directTo .= ' target="_blank" ';
                        }

                        $html .= '<li><a itemprop="url" class="'.$menu_element->class_attribute.'" '.$id_attribute.' '.$directTo.'><span itemprop="name">'.$menu_element->name.'</span></a></li>';
                    }
                    $html .= '</ul></div>';

                    return json_encode(array('success' => true, 'data' => $html));
                    break;
                } else {
                    return json_encode(array('error' => true));
                }
            default:
                return json_encode(array('error' => true));
        }
    }
}
