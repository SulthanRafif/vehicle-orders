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
        Schema::table('vehicle_orders', function (Blueprint $table) {
            $table->boolean('return_status')->default(false)->comment('0=belum kembali, 1=sudah kembali')->after('approval_two_status');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('vehicle_orders', function (Blueprint $table) {
            Schema::dropIfExists('return_status');
        });
    }
};
