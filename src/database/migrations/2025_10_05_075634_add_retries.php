<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

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
            $table->unsignedInteger('timeout')->default(120)->after('max_tries');
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
            $table->dropColumn('timeout');
        });
    }
};
