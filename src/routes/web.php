<?php

use Illuminate\Support\Facades\Route;
use Sefirosweb\LaravelCronjobs\Http\Controllers\CronjobsController;

// CRUD
Route::get('crud', [CronjobsController::class, 'get']);
Route::post('crud', [CronjobsController::class, 'store']);
Route::put('crud', [CronjobsController::class, 'update']);
Route::delete('crud', [CronjobsController::class, 'destroy']);

Route::post('preview_job', [CronjobsController::class, 'preview_job']);
Route::post('edit_cron_timer', [CronjobsController::class, 'edit_cron_timer']);
Route::post('execute_job', [CronjobsController::class, 'execute_job']);

Route::get('/', function () {
    return view('cronjobs::index');
});

Route::get('{any}', function () {
    return view('cronjobs::index');
})->where('any', '.*');
