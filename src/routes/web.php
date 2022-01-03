<?php

use Illuminate\Support\Facades\Route;

Route::group([
    'namespace' => 'Sefirosweb\LaravelCronjobs\Http\Controllers'
], function () {
    // CRUD
    Route::get('crud', 'CronjobsController@get');
    Route::post('crud', 'CronjobsController@store');
    Route::put('crud', 'CronjobsController@update');
    Route::delete('crud', 'CronjobsController@destroy');

    Route::post('preview_job', 'CronjobsController@preview_job');
    Route::post('edit_cron_timer', 'CronjobsController@edit_cron_timer');
    Route::post('execute_job', 'CronjobsController@execute_job');

    Route::get('/', function () {
        return view('cronjobs::index');
    });

    Route::get('{any}', function () {
        return view('cronjobs::index');
    })->where('any', '.*');
});
