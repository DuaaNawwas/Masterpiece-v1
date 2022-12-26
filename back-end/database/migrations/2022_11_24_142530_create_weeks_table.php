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
        Schema::create('weeks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('subscription_id')->constrained()->onDelete('cascade');
            $table->integer('week_num');
            $table->unsignedBigInteger('meal1_id')->nullable();
            $table->unsignedBigInteger('meal2_id')->nullable();
            $table->unsignedBigInteger('meal3_id')->nullable();
            $table->unsignedBigInteger('meal4_id')->nullable();
            $table->unsignedBigInteger('meal5_id')->nullable();
            $table->unsignedBigInteger('meal6_id')->nullable();
            $table->foreign('meal1_id')->references('id')->on('meals')->constrained()->onDelete('cascade');
            $table->foreign('meal2_id')->references('id')->on('meals')->constrained()->onDelete('cascade');
            $table->foreign('meal3_id')->references('id')->on('meals')->constrained()->onDelete('cascade');
            $table->foreign('meal4_id')->references('id')->on('meals')->constrained()->onDelete('cascade');
            $table->foreign('meal5_id')->references('id')->on('meals')->constrained()->onDelete('cascade');
            $table->foreign('meal6_id')->references('id')->on('meals')->constrained()->onDelete('cascade');
            $table->string('day_of_delivery');
            $table->date('starting_date');
            $table->date('ending_date');
            $table->boolean('is_delivered')->default(0);
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
        Schema::dropIfExists('weeks');
    }
};
