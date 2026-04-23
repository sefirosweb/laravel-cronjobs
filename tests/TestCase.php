<?php

namespace Sefirosweb\LaravelCronjobs\Tests;

use Orchestra\Testbench\TestCase as OrchestraTestCase;
use Sefirosweb\LaravelCronjobs\LaravelCronjobsServiceProvider;

abstract class TestCase extends OrchestraTestCase
{
    protected function getPackageProviders($app): array
    {
        return [LaravelCronjobsServiceProvider::class];
    }

    protected function defineEnvironment($app): void
    {
        $app['config']->set('database.default', 'testing');
        $app['config']->set('database.connections.testing', [
            'driver' => 'sqlite',
            'database' => ':memory:',
            'prefix' => '',
        ]);
    }
}
