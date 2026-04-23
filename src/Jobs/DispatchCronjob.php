<?php

declare(strict_types=1);

namespace Sefirosweb\LaravelCronjobs\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Sefirosweb\LaravelCronjobs\Events\DispatchCronjobError;
use Sefirosweb\LaravelCronjobs\Events\DispatchCronjobSuccessfully;
use Sefirosweb\LaravelCronjobs\Http\Models\Cronjob;
use Throwable;

class DispatchCronjob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected int $id;
    public int $tries = 1;
    public int $backoff = 60;
    public int $timeout = 120;

    public function __construct(int $id)
    {
        $this->id = $id;
        $cronjob = Cronjob::withTrashed()->findOrFail($this->id);
        $this->tries = $cronjob->max_tries;
        $this->backoff = $cronjob->backoff;
        $this->timeout = $cronjob->timeout;
    }

    public function handle(): void
    {
        $cronjob = Cronjob::withTrashed()->findOrFail($this->id);
        logger("Executing job, timeout: " . $cronjob->timeout . ", max retries: " . $cronjob->max_tries . ", name: " . $cronjob->name);
        $controller = app()->make($cronjob->controller);
        $controller->callAction($cronjob->function, []);
        logger("Finished job: " . $cronjob->name);
        $cronjob->last_run_at = now();
        $cronjob->message = '';
        $cronjob->save();

        try {
            event(new DispatchCronjobSuccessfully($cronjob));
        } catch (Throwable $e) {
            logger($e->getMessage());
        }
    }

    public function failed(Throwable $exception): void
    {
        try {
            $cronjob = Cronjob::withTrashed()->findOrFail($this->id);
            $cronjob->last_run_at = now();
            $cronjob->message = $exception->getMessage();
            $cronjob->save();
            event(new DispatchCronjobError($cronjob, $exception->getMessage()));
        } catch (Throwable $e) {
            logger($e->getMessage());
        }
    }
}
