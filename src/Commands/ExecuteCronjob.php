<?php

namespace Sefirosweb\LaravelCronjobs\Commands;

use Illuminate\Console\Command;
use Sefirosweb\LaravelCronjobs\Http\Models\Cronjob;
use Sefirosweb\LaravelCronjobs\Jobs\DispatchCronjob;

class ExecuteCronjob extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'cronjobs:execute {job}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Execute manually cronjobs';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $job = $this->argument('job');
        $job = Cronjob::firstWhere('name', $job);

        if (!$job) {
            echo 'Job not found!' . PHP_EOL;
            return 1;
        }

        $name = $job->name;
        echo "Adding job: $name" . PHP_EOL;
        logger("Adding job: $name");
        DispatchCronjob::dispatch($job->id);
        return 0;
    }
}
