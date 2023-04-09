<?php

namespace Sefirosweb\LaravelCronjobs\Events;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Sefirosweb\LaravelCronjobs\Http\Models\Cronjob;

class DispatchCronjobSuccessfully
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    public $cronjob;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Cronjob $cronjob)
    {
        $this->cronjob = $cronjob;
    }
}
