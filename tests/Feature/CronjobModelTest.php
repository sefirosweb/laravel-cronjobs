<?php

declare(strict_types=1);

namespace Sefirosweb\LaravelCronjobs\Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Carbon;
use Sefirosweb\LaravelCronjobs\Http\Models\Cronjob;
use Sefirosweb\LaravelCronjobs\Tests\TestCase;

class CronjobModelTest extends TestCase
{
    use RefreshDatabase;

    private function make(array $overrides = []): Cronjob
    {
        return Cronjob::create(array_merge([
            'name' => 'test',
            'description' => 'test',
            'function' => 'run',
            'controller' => 'App\\X',
            'cron_expression' => '* * * * *',
            'backoff' => 60,
            'max_tries' => 1,
            'timeout' => 60,
        ], $overrides));
    }

    public function test_mass_assignable_fields_cover_the_fillable_surface(): void
    {
        $job = $this->make(['name' => 'payments', 'timeout' => 300]);

        $this->assertSame('payments', $job->name);
        $this->assertSame(300, $job->timeout);
    }

    public function test_soft_delete_sets_deleted_at_and_does_not_remove_row(): void
    {
        $job = $this->make();
        $id = $job->id;

        $job->delete();

        $this->assertNull(Cronjob::find($id), 'Soft-deleted row is hidden from default queries');
        $this->assertNotNull(Cronjob::withTrashed()->find($id)->deleted_at);
    }

    public function test_casts_format_timestamps_to_declared_pattern(): void
    {
        $job = $this->make();
        $job->created_at = Carbon::parse('2026-04-23 12:34:56.789');
        $job->save();

        $raw = $job->toArray()['created_at'];

        // $casts declares 'datetime:Y-m-d H:i:s' — no fractional seconds in output.
        $this->assertSame('2026-04-23 12:34:56', $raw);
    }

    public function test_restore_brings_soft_deleted_row_back(): void
    {
        $job = $this->make();
        $job->delete();

        Cronjob::withTrashed()->find($job->id)->restore();

        $this->assertNotNull(Cronjob::find($job->id));
        $this->assertNull($job->fresh()->deleted_at);
    }
}
