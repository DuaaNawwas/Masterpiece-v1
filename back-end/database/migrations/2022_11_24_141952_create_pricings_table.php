<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
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
        Schema::create('pricings', function (Blueprint $table) {
            $table->id();
            $table->float('servings');
            $table->float('price_per_serving');
            $table->float('total_price');
            $table->softDeletes();
            $table->timestamps();
        });

        // Default pricings
        DB::table('pricings')->insert([
            ['servings' => 4, 'price_per_serving' => 5, 'total_price' => 80],
            ['servings' => 6, 'price_per_serving' => 4.5, 'total_price' => 108],
            ['servings' => 8, 'price_per_serving' => 4.25, 'total_price' => 136],
            ['servings' => 10, 'price_per_serving' => 4, 'total_price' => 160],
            ['servings' => 12, 'price_per_serving' => 3.75, 'total_price' => 180],
            ['servings' => 16, 'price_per_serving' => 3.5, 'total_price' => 224],
            ['servings' => 20, 'price_per_serving' => 3.25, 'total_price' => 260],
            ['servings' => 24, 'price_per_serving' => 3, 'total_price' => 288],
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('pricings');
    }
};
