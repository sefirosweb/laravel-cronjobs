<?php

declare(strict_types=1);

namespace Sefirosweb\LaravelCronjobs\Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Sefirosweb\LaravelCronjobs\Http\Models\Cronjob;
use Sefirosweb\LaravelCronjobs\Jobs\DispatchCronjob;
use Sefirosweb\LaravelCronjobs\Tests\TestCase;

class DispatchCronjobTest extends TestCase
{
    use RefreshDatabase;

    public function test_constructor_hydrates_typed_int_properties_from_cronjob(): void
    {
        $cronjob = Cronjob::create([
            'name' => 'payments',
            'description' => 'daily',
            'function' => 'run',
            'controller' => 'App\\Jobs\\SomeController',
            'cron_expression' => '0 3 * * *',
            'backoff' => 90,
            'max_tries' => 5,
            'timeout' => 300,
        ]);

        $job = new DispatchCronjob($cronjob->id);

        // The bug fixed in A5: previously $id was declared as `string` but the
        // constructor signature used `Int` (capital I, treated as class name).
        // Now properties are proper `int`s.
        $reflection = new \ReflectionClass($job);
        $this->assertSame('int', (string) $reflection->getProperty('id')->getType());

        $this->assertSame(5, $job->tries);
        $this->assertSame(90, $job->backoff);
        $this->assertSame(300, $job->timeout);
    }

    public function test_constructor_rejects_non_existent_cronjob(): void
    {
        $this->expectException(\Illuminate\Database\Eloquent\ModelNotFoundException::class);

        new DispatchCronjob(999999);
    }
}
