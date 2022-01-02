<?php

namespace Sefirosweb\LaravelCronjobs\Http\Models;

use DateTime;
use Illuminate\Database\Eloquent\Model;

class Cronjob extends Model
{
    protected $fillable = [
        'name',
        'description',
        'function',
        'controller',
        'cron_expression',
        'next_run_at',
        'last_run_at',
        'is_active'
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
