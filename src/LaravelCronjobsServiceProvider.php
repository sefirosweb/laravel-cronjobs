<?php

namespace Sefirosweb\LaravelCronjobs;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Support\ServiceProvider;
use Sefirosweb\LaravelCronjobs\Commands\RunPendinJobs;

class LaravelCronjobsServiceProvider extends ServiceProvider
{
    public function boot()
    {
        $this->loadViewsFrom(__DIR__ . '/views', 'cronjobs');
        $this->loadRoutesFrom(__DIR__ . '/routes/web.php');
        $this->loadMigrationsFrom(__DIR__ . '/database/migrations');
        $this->publishes([
            __DIR__ . '/../public' => public_path('vendor/laravel-cronjobs'),
        ], 'laravel-cronjobs-view');

        $this->commands([
            RunPendinJobs::class,
        ]);

        $this->app->booted(function () {
            $schedule = $this->app->make(Schedule::class);
            $schedule->command('runpendingjobs')->everyMinute();
        });
    }

    public function register()
    {
    }
}
