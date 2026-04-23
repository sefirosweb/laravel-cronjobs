<?php

namespace Sefirosweb\LaravelCronjobs\Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Sefirosweb\LaravelCronjobs\Http\Models\Cronjob;
use Sefirosweb\LaravelCronjobs\Tests\TestCase;

class CronjobsControllerTest extends TestCase
{
    use RefreshDatabase;

    private function payload(array $overrides = []): array
    {
        return array_merge([
            'name' => 'payments',
            'description' => 'daily payments run',
            'function' => 'run',
            'controller' => 'App\\Jobs\\PaymentsController',
            'cron_expression' => '0 3 * * *',
            'backoff' => 60,
            'max_tries' => 3,
            'timeout' => 120,
        ], $overrides);
    }

    public function test_get_returns_active_cronjobs(): void
    {
        Cronjob::create($this->payload(['name' => 'a']));
        Cronjob::create($this->payload(['name' => 'b']));

        $this->getJson('/cronjobs/crud')
            ->assertStatus(200)
            ->assertJson(['success' => true])
            ->assertJsonCount(2, 'data');
    }

    public function test_get_with_status_deleted_returns_only_trashed(): void
    {
        $a = Cronjob::create($this->payload(['name' => 'a']));
        Cronjob::create($this->payload(['name' => 'b']));
        $a->delete();

        $this->getJson('/cronjobs/crud?status=deleted')
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.name', 'a');
    }

    public function test_store_creates_cronjob(): void
    {
        $this->postJson('/cronjobs/crud', $this->payload())
            ->assertStatus(200)
            ->assertJson(['success' => true]);

        $this->assertDatabaseHas('cronjobs', ['name' => 'payments']);
    }

    public function test_store_rejects_duplicate_name(): void
    {
        Cronjob::create($this->payload(['name' => 'dup']));

        $this->postJson('/cronjobs/crud', $this->payload(['name' => 'dup']))
            ->assertStatus(422);
    }

    public function test_update_modifies_existing_cronjob(): void
    {
        $job = Cronjob::create($this->payload(['name' => 'old', 'timeout' => 60]));

        $this->putJson('/cronjobs/crud', $this->payload([
            'cronjob_id' => $job->id,
            'name' => 'old',
            'timeout' => 999,
        ]))->assertStatus(200);

        $this->assertSame(999, $job->fresh()->timeout);
    }

    public function test_destroy_soft_deletes_then_restores(): void
    {
        $job = Cronjob::create($this->payload(['name' => 'toggle']));

        $this->deleteJson('/cronjobs/crud', ['cronjob_id' => $job->id])
            ->assertStatus(200);
        $this->assertNotNull($job->fresh()->deleted_at);

        $this->deleteJson('/cronjobs/crud', ['cronjob_id' => $job->id])
            ->assertStatus(200);
        $this->assertNull($job->fresh()->deleted_at);
    }

    public function test_preview_job_returns_40_upcoming_runs_for_valid_expression(): void
    {
        $response = $this->postJson('/cronjobs/preview_job', [
            'inputCroExpression' => '0 * * * *',
        ])->assertStatus(200)->assertJson(['success' => true]);

        $runs = explode(PHP_EOL, $response->json('data'));
        $this->assertCount(40, $runs);
    }

    public function test_preview_job_rejects_invalid_expression(): void
    {
        $this->postJson('/cronjobs/preview_job', [
            'inputCroExpression' => 'not a cron',
        ])->assertStatus(422);
    }

    public function test_edit_cron_timer_updates_expression_and_next_run(): void
    {
        $job = Cronjob::create($this->payload(['name' => 'edit']));

        $this->postJson('/cronjobs/edit_cron_timer', [
            'id' => $job->id,
            'inputCroExpression' => '*/5 * * * *',
        ])->assertStatus(200);

        $this->assertSame('*/5 * * * *', $job->fresh()->cron_expression);
        $this->assertNotNull($job->fresh()->next_run_at);
    }

    public function test_execute_job_dispatches_without_executing_immediately(): void
    {
        \Illuminate\Support\Facades\Queue::fake();

        $job = Cronjob::create($this->payload(['name' => 'dispatch']));

        $this->postJson('/cronjobs/execute_job', ['id' => $job->id])
            ->assertStatus(200);

        \Illuminate\Support\Facades\Queue::assertPushed(\Sefirosweb\LaravelCronjobs\Jobs\DispatchCronjob::class);
    }
}
