<?php

declare(strict_types=1);

namespace Sefirosweb\LaravelCronjobs\Tests\Feature;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Schema;
use Sefirosweb\LaravelCronjobs\Tests\TestCase;

class ServiceProviderBootTest extends TestCase
{
    use \Illuminate\Foundation\Testing\RefreshDatabase;

    public function test_config_is_merged(): void
    {
        $this->assertSame('cronjobs', config('laravel-cronjobs.prefix'));
        $this->assertSame('web', config('laravel-cronjobs.middleware'));
    }

    public function test_migrations_create_cronjobs_table(): void
    {
        $this->assertTrue(Schema::hasTable('cronjobs'));
    }

    public function test_routes_are_registered(): void
    {
        $routes = collect(Route::getRoutes()->getRoutes())
            ->map(fn ($r) => $r->uri())
            ->all();

        $this->assertNotEmpty(
            array_filter($routes, fn ($uri) => str_starts_with($uri, 'cronjobs')),
            'Expected at least one route prefixed with "cronjobs"'
        );
    }
}
