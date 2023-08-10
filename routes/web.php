<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/mpa/{any?}', function ($any = null) {
    switch($any) {
        case 'home':
            return view('home');
        case 'mypage':
            return view('mypage');
        default:
            return view('welcome');
    }
});

Route::get('/spa/{any?}', function () {
    return view('spa');
});
