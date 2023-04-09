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
        'next_run_at',
        'last_run_at'
    ];

    public function getUpdatedAtAttribute($date)
    {
        $time = new DateTime($date);
        return $time->format('Y-m-d H:i:s');
    }

    public function getCreatedAtAttribute($date)
    {
        $time = new DateTime($date);
        return $time->format('Y-m-d H:i:s');
    }
}
