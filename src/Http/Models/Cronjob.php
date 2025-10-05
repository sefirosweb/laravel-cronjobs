<?php

namespace Sefirosweb\LaravelCronjobs\Http\Models;

use DateTime;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Cronjob extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'name',
        'description',
        'function',
        'controller',
        'cron_expression',
        'backoff',
        'max_tries',
    ];

    protected $casts = [
        'created_at' => 'datetime:Y-m-d H:i:s',
        'updated_at' => 'datetime:Y-m-d H:i:s',
        'deleted_at' => 'datetime:Y-m-d H:i:s',
    ];
}
