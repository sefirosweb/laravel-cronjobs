<?php

namespace Sefirosweb\LaravelCronjobs\Jobs;

use DateTime;
use Exception;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Sefirosweb\LaravelCronjobs\Events\DispatchCronjobError;
use Sefirosweb\LaravelCronjobs\Events\DispatchCronjobSuccessfully;
use Sefirosweb\LaravelCronjobs\Http\Models\Cronjob;

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

            event(new DispatchCronjobSuccessfully($cronjob));
        } catch (Exception $e) {
            $cronjob->next_run_at = null;
            $cronjob->message = $e->getMessage();
            $cronjob->save();

            $cronjob->delete();
            event(new DispatchCronjobError($cronjob, $e->getMessage()));
        }
    }
}
