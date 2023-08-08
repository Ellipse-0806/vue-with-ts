<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;

class ResSomeWordsController extends Controller
{
    public function Get(): JsonResponse
    {
        $word = request()->word;
        $response = [
            "word" => $word,
            "comment" => "Get some words!!"
        ];
        $json = response()->json(compact("response"));
        return $json;
    }
}
