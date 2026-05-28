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
    Schema::table('reservations', function (Blueprint $table) {
        // Mengubah kolom agar mendukung 'tunai', 'qris', 'transfer'
        $table->string('payment_method')->nullable()->change();

        // Memastikan status sesuai dengan yang ada di controller
        $table->string('payment_status')->default('pending_payment')->change();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
