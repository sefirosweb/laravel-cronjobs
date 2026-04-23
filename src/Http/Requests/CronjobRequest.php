<?php

declare(strict_types=1);

namespace Sefirosweb\LaravelCronjobs\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CronjobRequest extends FormRequest
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
        $id = $this->input('cronjob_id', $this->input('id'));

        return [
            'name' => [
                'required',
                'min:3',
                'max:255',
                'unique:Sefirosweb\LaravelCronjobs\Http\Models\Cronjob,name,' . $id,
            ],
            'description' => [
                'required',
                'min:3',
                'max:255',
            ],
            'function' => [
                'required',
                'min:3',
                'max:255',
            ],
            'controller' => [
                'required',
                'min:3',
                'max:255',
            ],
            'backoff' => [
                'required',
                'integer',
                'min:0',
            ],
            'max_tries' => [
                'required',
                'integer',
                'min:1',
            ],
            'timeout' => [
                'required',
                'integer',
                'min:0',
            ],
        ];
    }
}
