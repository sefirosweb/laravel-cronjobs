<?php

declare(strict_types=1);

namespace Sefirosweb\LaravelCronjobs\Tests\Unit;

use Illuminate\Support\Carbon;
use PHPUnit\Framework\TestCase;

class CarbonDiffCastTest extends TestCase
{
    public function test_diff_in_seconds_returns_float_in_carbon_3(): void
    {
        $start = Carbon::parse('2026-01-01 00:00:00.000');
        $end = Carbon::parse('2026-01-01 00:00:01.500');

        $diff = $start->diffInSeconds($end);

        $this->assertIsFloat($diff, 'Carbon 3 diffInSeconds should return float');
        $this->assertEqualsWithDelta(1.5, $diff, 0.001);
    }

    public function test_diff_in_seconds_preserves_sign_in_carbon_3(): void
    {
        $start = Carbon::parse('2026-01-01 00:00:00');
        $end = Carbon::parse('2026-01-01 00:00:10');

        // Carbon 3 breaking change: no longer returns absolute value.
        $this->assertSame(-10.0, $end->diffInSeconds($start));
        $this->assertSame(10.0, $start->diffInSeconds($end));
    }

    public function test_absolute_flag_yields_positive_elapsed_seconds(): void
    {
        $start = Carbon::parse('2026-01-01 00:00:00.000');
        $end = Carbon::parse('2026-01-01 00:00:03.900');

        // This is the pattern used in CronjobsController::test_timeout()
        $elapsed = (int) $end->diffInSeconds($start, true);

        $this->assertIsInt($elapsed);
        $this->assertSame(3, $elapsed, 'Cast (int) with absolute=true should give positive truncated elapsed seconds');
    }
}
