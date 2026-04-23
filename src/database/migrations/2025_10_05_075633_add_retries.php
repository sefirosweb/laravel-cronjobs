<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('cronjobs', function (Blueprint $table) {
            $table->unsignedTinyInteger('max_tries')->default(1)->after('next_run_at');
            $table->unsignedInteger('backoff')->default(60)->after('max_tries');
        });
    }

    public function down(): void
    {
        Schema::table('cronjobs', function (Blueprint $table) {
            $table->dropColumn('max_tries');
            $table->dropColumn('backoff');
        });
    }
};
