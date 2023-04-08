<?php

namespace Sefirosweb\LaravelCronjobs;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;
use Sefirosweb\LaravelCronjobs\Commands\ExecuteCronjob;
use Sefirosweb\LaravelCronjobs\Commands\ListCronjobs;
use Sefirosweb\LaravelCronjobs\Commands\RunPendinCronjobs;

class LaravelCronjobsServiceProvider extends ServiceProvider
{
    public function boot()
    {
        $this->loadViewsFrom(__DIR__ . '/views', 'cronjobs');
        $this->loadMigrationsFrom(__DIR__ . '/database/migrations');
        $this->mergeConfigFrom(__DIR__ . '/config/config.php', 'laravel-cronjobs');
        $this->registerRoutes();

        $this->publishes([
            __DIR__ . '/../public/vendor/laravel-cronjobs' => public_path('vendor/laravel-cronjobs'),
        ], ['cronjobs-assets', 'laravel-assets']);

        $this->publishes([
            __DIR__ . '/config/config.php' => config_path('laravel-cronjobs.php'),
        ], 'config');

        if ($this->app->runningInConsole()) {
            $this->commands([
                RunPendinCronjobs::class,
                ListCronjobs::class,
                ExecuteCronjob::class
            ]);
        }

        $this->app->booted(function () {
            $schedule = $this->app->make(Schedule::class);
            $schedule->command('cronjobs:pending')->everyMinute();
        });
    }


    protected function registerRoutes()
    {
        Route::group($this->routeConfiguration(), function () {
            $this->loadRoutesFrom(__DIR__ . '/routes/web.php');
        });
    }
    protected function routeConfiguration()
    {
        return [
            'prefix' => config('laravel-cronjobs.prefix'),
            'middleware' => config('laravel-cronjobs.middleware'),
        ];
    }


    public function register()
    {
    }
}
