<?php

namespace Sefirosweb\LaravelCronjobs\Http\Models;

use Illuminate\Database\Eloquent\Model;

class Cronjobs extends Model
{
    protected $fillable = [
        'name',
        'description'
    ];
}
