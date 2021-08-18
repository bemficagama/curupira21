<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateKeyHasCategoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('key_has_categories', function (Blueprint $table) {
            $table->unsignedBigInteger('key_id');
            $table->unsignedBigInteger('category_id');
            $table->timestamps();

            $table->primary(['key_id', 'category_id']);
            $table->foreign('key_id')->references('id')->on('keys');
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
        Schema::dropIfExists('key_has_categories');
    }
}
