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
    Schema::table('room', function (Blueprint $table) {
      $table->boolean('videoBeam')->default(false);
      $table->boolean('tv')->default(false);
      $table->integer('available_seats')->default(0);
      $table->integer('functional_computers')->default(0);
      $table->integer('total_computers')->default(0);
      $table->longText('description')->nullable();;
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::table('room', function (Blueprint $table) {
      //
      $table->dropColumn('videoBeam');
      $table->dropColumn('tv');
      $table->dropColumn('available_seats');
      $table->dropColumn('functional_computers');
      $table->dropColumn('total_computers');
      $table->dropColumn('description');
    });
  }
};
