<?php

namespace Sefirosweb\LaravelCronjobs;

use Illuminate\Support\ServiceProvider;

class LaravelCronjobsServiceProvider extends ServiceProvider
{
    public function boot()
    {
        $this->loadViewsFrom(__DIR__ . '/views', 'cronjobs');
        $this->loadRoutesFrom(__DIR__ . '/routes/web.php');
        // $this->loadMigrationsFrom(__DIR__ . '/database/migrations');
        // $this->publishes([
        //     __DIR__ . '/../public' => public_path('vendor/laravel-cronjobs'),
        // ], 'laravel-cronjobs-view');
    }

    public function register()
    {
    }
}
