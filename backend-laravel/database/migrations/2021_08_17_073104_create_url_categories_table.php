<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUrlCategoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('url_categories', function (Blueprint $table) {
            $table->unsignedBigInteger('url_id');
            $table->unsignedBigInteger('category_id');
            $table->timestamps();

            $table->primary(['url_id', 'category_id']);
            $table->foreign('url_id')->references('id')->on('urls');
            $table->foreign('category_id')->references('id')->on('categories');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('url_categories');
    }
}
