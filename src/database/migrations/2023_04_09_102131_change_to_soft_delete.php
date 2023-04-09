<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Sefirosweb\LaravelCronjobs\Http\Models\Cronjob;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('cronjobs', function (Blueprint $table) {
            $table->softDeletes()->after('next_run_at');
        });

        foreach (Cronjob::where('is_active', 0)->get() as $cronjob) {
            $cronjob->deleted_at = date('Y-m-d H:i:s');
            $cronjob->save();
        }

        Schema::table('cronjobs', function (Blueprint $table) {
            $table->dropColumn('is_active');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('cronjobs', function (Blueprint $table) {
            $table->boolean('is_active')->after('message');
        });

        foreach (Cronjob::withTrashed()->get() as $cronjob) {
            $cronjob->is_active = $cronjob->deleted_at === null;
            $cronjob->save();
        }

        Schema::table('cronjobs', function (Blueprint $table) {
            $table->dropColumn('deleted_at');
        });
    }
};
