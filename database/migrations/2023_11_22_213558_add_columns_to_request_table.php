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
        Schema::table('request', function (Blueprint $table) {
            //
            $table->boolean('is_recurring_event')->default(false);
            $table->date('start_date_recurrent')->nullable();
            $table->date('end_date_recurrent')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('request', function (Blueprint $table) {
            //
            $table->dropColumn('is_recurring_event');
            $table->dropColumn('start_date_recurrent');
            $table->dropColumn('end_date_recurrent');
        });
    }
};
