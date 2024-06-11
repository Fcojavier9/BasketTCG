<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class NoticiasController extends Controller
{
    public function GetNoticias()
    {
        $url = 'https://www.marca.com/rss/googlenews/baloncesto.xml';
        $rss = @simplexml_load_file($url);

        if ($rss === false) {
            return response()->json(['error' => 'Failed to fetch noticias'], 500);
        }

        $noticias = [];
        foreach ($rss->channel->item as $item) {
            $mediaContent = $item->children('http://search.yahoo.com/mrss/')->content;
            $imageUrl = $mediaContent ? (string) $mediaContent->attributes()->url : null;

            $noticias[] = [
                'title' => (string) $item->title,
                'description' => strip_tags((string) $item->description),
                'url' => (string) $item->link,
                'urlToImage' => $imageUrl,
                'publishedAt' => (string) $item->pubDate,
            ];
        }

        return response()->json($noticias);
    }
}