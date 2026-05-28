<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // Mengubah kolom ENUM menjadi VARCHAR agar bisa menerima status 'pending_payment'
        DB::statement("ALTER TABLE transactions MODIFY COLUMN payment_status VARCHAR(50) DEFAULT 'pending_payment'");
    }

    public function down(): void
    {
        // Rollback ke ENUM (Opsional, untuk keamanan)
        DB::statement("ALTER TABLE transactions MODIFY COLUMN payment_status ENUM('lunas', 'dibatalkan') DEFAULT 'lunas'");
    }
};
