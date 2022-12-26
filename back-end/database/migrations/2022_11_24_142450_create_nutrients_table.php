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
        Schema::create('nutrients', function (Blueprint $table) {
            $table->id();
            $table->foreignId('meal_id')->constrained()->onDelete('cascade');
            $table->float('calories')->nullable();
            $table->float('fat')->nullable();
            $table->float('saturated_fat')->nullable();
            $table->float('carbs')->nullable();
            $table->float('sugar')->nullable();
            $table->float('fiber')->nullable();
            $table->float('protein')->nullable();
            $table->float('cholesterol')->nullable();
            $table->float('sodium')->nullable();
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
        Schema::dropIfExists('nutrients');
    }
};
