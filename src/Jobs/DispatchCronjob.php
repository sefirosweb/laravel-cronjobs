<?php

namespace Sefirosweb\LaravelCronjobs\Jobs;

use DateTime;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
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
        $job = Cronjob::findOrFail($this->id);
        logger("Executing job: " . $job->name);
        $app = app();
        $controller = $app->make($job->controller);
        $controller->callAction($job->function, $parameters = array());
        logger("Finished job: " . $job->name);
        $job->update(array('last_run_at' => new DateTime()));
    }
}
