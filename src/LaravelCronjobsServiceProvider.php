<?php

namespace Sefirosweb\LaravelCronjobs;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Support\ServiceProvider;
use Sefirosweb\LaravelCronjobs\Commands\ExecuteCronjob;
use Sefirosweb\LaravelCronjobs\Commands\ListCronjobs;
use Sefirosweb\LaravelCronjobs\Commands\RunPendinCronjobs;

class LaravelCronjobsServiceProvider extends ServiceProvider
{
    public function boot()
    {
        $this->loadViewsFrom(__DIR__ . '/views', 'cronjobs');
        $this->loadRoutesFrom(__DIR__ . '/routes/web.php');
        $this->loadMigrationsFrom(__DIR__ . '/database/migrations');
        $this->publishes([
            __DIR__ . '/../public/vendor/laravel-cronjobs' => public_path('vendor/laravel-cronjobs'),
        ], 'laravel-cronjobs-view');

        $this->commands([
            RunPendinCronjobs::class,
            ListCronjobs::class,
            ExecuteCronjob::class
        ]);

        $this->app->booted(function () {
            $schedule = $this->app->make(Schedule::class);
            $schedule->command('cronjobs:pending')->everyMinute();
        });
    }

    public function register()
    {
    }
}
