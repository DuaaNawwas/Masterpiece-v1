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
        Schema::create('removed_ingredients', function (Blueprint $table) {
            $table->id();
            $table->foreignId('week_id')->constrained()->onDelete('cascade');
            $table->foreignId('meal_id')->constrained()->onDelete('cascade');
            $table->integer('remove_1')->nullable();
            $table->integer('remove_2')->nullable();
            $table->integer('remove_3')->nullable();
            $table->integer('remove_4')->nullable();
            $table->integer('remove_5')->nullable();
            $table->integer('remove_6')->nullable();
            $table->integer('remove_7')->nullable();
            $table->integer('remove_8')->nullable();
            $table->integer('remove_9')->nullable();
            $table->integer('remove_10')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('removed_ingredients');
    }
};
