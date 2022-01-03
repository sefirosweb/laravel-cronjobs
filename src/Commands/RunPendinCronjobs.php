<?php

namespace Sefirosweb\LaravelCronjobs\Commands;

use Illuminate\Console\Command;

class RunPendinCronjobs extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'cronjobs:pending';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Run pending jobs';

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
     * @return int
     */
    public function handle()
    {
        app('\Sefirosweb\LaravelCronjobs\Http\Controllers\CronjobsController')->execute_pending_jobs();
        return 0;
    }
}
