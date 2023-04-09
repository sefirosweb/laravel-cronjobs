<?php

namespace Sefirosweb\LaravelCronjobs\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use Cron\CronExpression;
use DateTime;
use Exception;
use Sefirosweb\LaravelCronjobs\Http\Models\Cronjob;
use Sefirosweb\LaravelCronjobs\Http\Requests\CronExpressionRequest;
use Sefirosweb\LaravelCronjobs\Http\Requests\CronjobRequest;
use Sefirosweb\LaravelCronjobs\Jobs\DispatchCronjob;

class CronjobsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function get(Request $request)
    {
        $query = Cronjob::query();

        if ($request->status === 'all') {
            $query->withTrashed();
        } else  if ($request->status === 'deleted') {
            $query->onlyTrashed();
        }

        $data = $query->get();

        return response()->json(['success' => true, 'data' => $data]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  Sefirosweb\LaravelCronjobs\Http\Requests\CronjobRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(CronjobRequest $request)
    {
        Cronjob::create($request->all());
        return response()->json(['success' => true]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Sefirosweb\LaravelCronjobs\Http\Requests\CronjobRequest $request
     * @return \Illuminate\Http\Response
     */
    public function update(CronjobRequest $request)
    {
        $accessList = Cronjob::findOrFail($request->cronjob_id);
        $accessList->update($request->all());
        return response()->json(['success' => true]);
    }

    /**
     * Enable & Disable Cronjob
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $cronjob = Cronjob::withTrashed()->findOrFail($request->cronjob_id);
        if (!$cronjob->deleted_at) {
            $cronjob->next_run_at = null;
            $cronjob->save();
            $cronjob->delete();
        } else {
            try {
                $nextRunAt = $this->calculate_next_run($cronjob->cron_expression);
            } catch (Exception $e) {
                $nextRunAt = null;
            }
            $cronjob->next_run_at = $nextRunAt;
            $cronjob->save();
            $cronjob->restore();
        }
        return response()->json(['success' => true]);
    }

    /**
     * Enable & Disable Cronjob
     *
     * @param  Sefirosweb\LaravelCronjobs\Http\Requests\CronExpressionRequest $request
     * @return \Illuminate\Http\Response
     */
    public function preview_job(CronExpressionRequest $request)
    {
        $nextRun = $this->calculate_next_run($request->inputCroExpresion, 40);
        return response()->json(['success' => true, 'data' => $nextRun]);
    }

    /**
     * Calculate the time date to next run based on $cronExpresion
     *
     * @param String $cronExpresion
     * @param Int $manyRuns
     * @return String
     */
    private function calculate_next_run($cronExpresion, $manyRuns = 1)
    {
        $cron = new CronExpression($cronExpresion);

        $nextRun = $cron->getNextRunDate()->format('Y-m-d H:i:s');
        $runs = $nextRun;

        for ($i = 1; $i < $manyRuns; $i++) {
            $nextRun = $cron->getNextRunDate($nextRun)->format('Y-m-d H:i:s');
            $runs .= PHP_EOL . $nextRun;
        }

        return $runs;
    }

    /**
     * Edit cronjob rule
     *
     * @param  Sefirosweb\LaravelCronjobs\Http\Requests\CronExpressionRequest $request
     * @return \Illuminate\Http\Response
     */
    public function edit_cron_timer(CronExpressionRequest $request)
    {
        $nextRun = $this->calculate_next_run($request->inputCroExpresion);
        $cronjob = Cronjob::findOrFail($request->id);

        $cronjob->update(array(
            'cron_expression' => $request->inputCroExpresion,
            'next_run_at' => $nextRun
        ));

        return response()->json(['success' => true, 'data' => $nextRun]);
    }

    public function execute_job(Request $request)
    {
        $job = Cronjob::findOrFail($request->id);
        $name = $job->name;
        logger("Adding job: $name");
        DispatchCronjob::dispatch($job->id);
        return response()->json(['success' => true]);
    }

    public function execute_pending_jobs()
    {
        $dateNow = new DateTime();

        $jobs = Cronjob::whereNot()->where('next_run_at', '<=', $dateNow)->get();
        logger("Executing kernel cronjob, current pending jobs: " . $jobs->count());

        $jobs->each(function ($job) {
            $nextRun = $this->calculate_next_run($job->cron_expression);
            $job->update(array('next_run_at' => $nextRun));
            $name = $job->name;
            logger("Adding job: $name");
            DispatchCronjob::dispatch($job->id);
        });
    }
}
