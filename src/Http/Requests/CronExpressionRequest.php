<?php

namespace Sefirosweb\LaravelCronjobs\Http\Requests;

use Cron\CronExpression;
use Exception;
use Illuminate\Foundation\Http\FormRequest;

class CronExpressionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'inputCroExpresion' => [
                'required',
                'max:255',
                function ($attribute, $value, $fail) {
                    if (!$this->calculate_next_run($value)) {
                        $fail('The ' . $attribute . ' is invalid format.');
                    }
                },
            ]
        ];
    }

    private function calculate_next_run($cronExpresion, $manyRuns = 1)
    {
        try {
            $cron = new CronExpression($cronExpresion);

            $nextRun = $cron->getNextRunDate()->format('Y-m-d H:i:s');
            $runs = $nextRun;

            for ($i = 1; $i < $manyRuns; $i++) {
                $nextRun = $cron->getNextRunDate($nextRun)->format('Y-m-d H:i:s');
                $runs .= PHP_EOL . $nextRun;
            }

            return $runs;
        } catch (Exception $e) {
            return false;
        }
    }
}
