<?php

namespace Sefirosweb\LaravelCronjobs\Jobs;

use DateTime;
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

    protected string $id;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(Int $id)
    {
        $this->id = $id;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $cronjob = Cronjob::withTrashed()->findOrFail($this->id);
        try {
            logger("Executing job: " . $cronjob->name);
            $app = app();
            $controller = $app->make($cronjob->controller);
            $controller->callAction($cronjob->function, $parameters = array());
            logger("Finished job: " . $cronjob->name);
            $cronjob->last_run_at = new DateTime();
            $cronjob->message = '';
            $cronjob->save();

            try {
                event(new DispatchCronjobSuccessfully($cronjob));
            } catch (Throwable $e) {
                logger($e->getMessage());
            }
        } catch (Throwable $e) {
            $cronjob->last_run_at = new DateTime();
            $cronjob->message = $e->getMessage();
            $cronjob->save();

            try {
                event(new DispatchCronjobError($cronjob, $e->getMessage()));
            } catch (Throwable $e) {
                logger($e->getMessage());
            }
        }
    }
}
