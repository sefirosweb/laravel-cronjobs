<?php

namespace Sefirosweb\LaravelCronjobs\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use Cron\CronExpression;
use DateTime;
use Sefirosweb\LaravelCronjobs\Http\Models\Cronjob;
use Sefirosweb\LaravelCronjobs\Http\Requests\CronExpressionRequest;
use Sefirosweb\LaravelCronjobs\Http\Requests\CronjobRequest;
use Sefirosweb\LaravelCronjobs\Jobs\DispatchCronjob;

class CronjobsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function get()
    {
        return response()->json(['success' => true, 'data' => Cronjob::all()]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\CronjobRequest $request
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
     * @param  \Illuminate\Http\CronjobRequest $request
     * @param  Sefirosweb\LaravelCronjobs\Http\Models\AccessList $accessList
     * @return \Illuminate\Http\Response
     */
    public function update(CronjobRequest $request, Cronjob $cronjob)
    {
        $accessList = Cronjob::findOrFail($request->id);
        $accessList->update($request->all());
        return response()->json(['success' => true]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \Sefirosweb\LaravelCronjobs\Http\Models\AccessList $accessList
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $cronjob = Cronjob::findOrFail($request->id);
        $cronjob->delete();
        return response()->json(['success' => true]);
    }

    public function preview_job(CronExpressionRequest $request)
    {
        $nextRun = $this->calculate_next_run($request->inputCroExpresion, 40);
        return response()->json(['success' => true, 'data' => $nextRun]);
    }

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

        $jobs = Cronjob::where('next_run_at', '<=', $dateNow)->get();
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
