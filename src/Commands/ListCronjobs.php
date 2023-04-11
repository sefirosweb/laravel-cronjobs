<?php

namespace Sefirosweb\LaravelCronjobs\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Sefirosweb\LaravelCronjobs\Http\Models\Cronjob;

class ListCronjobs extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'cronjobs:list';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Show all cronjobs';

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
        echo 'Jobs you can execute:' . PHP_EOL;

        $cronjobs = Cronjob::withTrashed()->select([
            'name',
            'description',
            'function',
            'controller',
            'last_run_at',
            'next_run_at',
            'cron_expression',
            DB::raw('IF(ISNULL(deleted_at), 1, 0) as active')
        ])->orderByDesc('active')->orderBy('next_run_at')->get();

        $this->table(
            ['Name {job}', 'Description', 'Function', 'Controller', 'Last', 'Next', 'Cron', 'Active'],
            $cronjobs
        );
    }
}
