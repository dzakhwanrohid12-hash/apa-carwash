<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reservations', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')->constrained()->cascadeOnDelete();
    $table->foreignId('service_id')->constrained()->cascadeOnDelete();
    $table->string('vehicle_plate', 15);
    $table->string('vehicle_description')->nullable();
    $table->date('reservation_date');
    $table->time('reservation_time');
    $table->integer('slot_number');
    $table->foreignId('voucher_id')->nullable()->constrained()->nullOnDelete();
    $table->decimal('discount_amount', 10, 2)->default(0);
    $table->decimal('original_price', 10, 2);
    $table->decimal('final_price', 10, 2);
    $table->string('payment_proof_path')->nullable();
    $table->enum('payment_method', ['transfer'])->nullable();
    $table->enum('payment_status', ['pending_payment', 'paid', 'rejected'])->default('pending_payment');
    $table->enum('status', ['menunggu', 'diproses', 'selesai', 'dibatalkan'])->default('menunggu');
    $table->text('notes')->nullable();
    $table->timestamp('whatsapp_notified_at')->nullable();
    $table->timestamps();
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservations');
    }
};
