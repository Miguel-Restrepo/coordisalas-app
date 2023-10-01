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
        Schema::create('request', function (Blueprint $table) {
            $table->id();
            $table->date('date');
            $table->time('start_date');
            $table->time('end_date');
            $table->timestamps();
            $table->enum('status', ["approved", "pending", "rejected"]);
            $table->string('user_id')->unsigned();
            $table->string('room_id')->unsigned();
            $table->foreign("user_id")
                ->references("document")
                ->on("users")
                ->onDelete("cascade")
                ->onUpdate("cascade");
            $table->foreign("room_id")
                ->references("name")
                ->on("room")
                ->onDelete("cascade")
                ->onUpdate("cascade");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('request');
    }
};
