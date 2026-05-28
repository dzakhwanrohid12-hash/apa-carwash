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
        Schema::create('transactions', function (Blueprint $table) {
    $table->id();
    $table->string('transaction_code')->unique();
    $table->foreignId('reservation_id')->nullable()->constrained()->nullOnDelete();
    $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
    $table->foreignId('cashier_id')->nullable()->constrained('users')->nullOnDelete();
    $table->foreignId('service_id')->constrained()->cascadeOnDelete();
    $table->foreignId('employee_id')->nullable()->constrained()->nullOnDelete();
    $table->foreignId('voucher_id')->nullable()->constrained()->nullOnDelete();

    $table->string('vehicle_plate', 15)->nullable();
    $table->string('vehicle_description')->nullable();

    $table->decimal('discount_amount', 10, 2)->default(0);
    $table->decimal('subtotal', 10, 2);
    $table->decimal('total', 10, 2);

    $table->enum('payment_method', ['tunai', 'qris', 'transfer']);
    $table->enum('payment_status', ['lunas', 'dibatalkan'])->default('lunas');
    $table->enum('transaction_type', ['walkin', 'online']);
    $table->enum('status', ['menunggu', 'diproses', 'selesai'])->default('menunggu');

    $table->boolean('is_carpet_service')->default(false);
    $table->enum('carpet_status', ['dicuci', 'pengeringan', 'siap_diambil'])->nullable();
    $table->timestamps();
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
