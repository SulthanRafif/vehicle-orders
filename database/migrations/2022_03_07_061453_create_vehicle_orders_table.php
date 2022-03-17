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
        Schema::create('vehicle_orders', function (Blueprint $table) {
            $table->id();
            $table->string('customer_name');
            $table->foreignId('driver_id')->constrained()->cascadeOnDelete();
            $table->foreignId('vehicle_id')->constrained()->cascadeOnDelete();
            $table->foreignId('created_by')->constrained('users')->cascadeOnDelete();
            $table->foreignId('updated_by')->nullable()->constrained('users')->cascadeOnDelete();
            $table->foreignId('approval_one')->constrained('users')->cascadeOnDelete();
            $table->boolean('approval_one_status')->default(false)->comment('0=belum disetujui, 1=sudah disetujui');
            $table->foreignId('approval_two')->constrained('users')->cascadeOnDelete();
            $table->boolean('approval_two_status')->default(false)->comment('0=belum disetujui, 1=sudah disetujui');
            $table->date('order_date')->nullable();
            $table->date('return_date')->nullable();
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
        Schema::dropIfExists('vehicle_orders');
    }
};
