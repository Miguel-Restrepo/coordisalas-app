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
    Schema::create('reports', function (Blueprint $table) {
      $table->id();
      $table->longText('description');
      $table->boolean('electrical_damage')->default(false);
      $table->boolean('flooding')->default(false);
      $table->boolean('damaged_PC')->default(false);
      $table->timestamps();
      $table->string('user_id')->unsigned();
      $table->foreign("user_id")
        ->references("document")
        ->on("users")
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
    Schema::dropIfExists('reports');
  }
};
