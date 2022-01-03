<?php

namespace Sefirosweb\LaravelCronjobs\Commands;

use Illuminate\Console\Command;
use ReflectionClass;
use ReflectionMethod;
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

        $cronjobs = Cronjob::select([
            'name',
            'description',
            'function',
            'controller',
            'last_run_at',
            'next_run_at',
            'cron_expression',
            'is_active'
        ])->get();

        $this->table(
            ['Name {job}', 'Description', 'Function', 'Controller', 'Last', 'Next', 'Cron', 'Active'],
            $cronjobs
        );
    }

    private function objectToArray($obj)
    {
        if (is_object($obj)) {
            $obj = (array)$obj;
        }

        if (is_array($obj)) {
            $new = array();
            foreach ($obj as $key => $val) {
                $new[$key] = $this->objectToArray($val);
            }
        } else {
            $new = $obj;
        }

        return $new;
    }
}
