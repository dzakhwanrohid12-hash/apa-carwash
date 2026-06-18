<?php

namespace App\Services;

use App\Models\Voucher;
use App\Models\VoucherUsage;
use Carbon\Carbon;

class VoucherService
{
    public function validateVoucher(string $code, float $originalPrice): array
    {
        $voucher = Voucher::where('code', strtoupper($code))
            ->where('is_active', true)
            ->first();

        if (!$voucher) {
            return ['valid' => false, 'message' => 'Voucher tidak ditemukan atau tidak aktif.'];
        }

        $today = Carbon::today();
        if ($today->lt($voucher->valid_from) || $today->gt($voucher->valid_until)) {
            return ['valid' => false, 'message' => 'Voucher sudah kadaluarsa atau belum aktif.'];
        }

        if ($voucher->used_count >= $voucher->quota) {
            return ['valid' => false, 'message' => 'Kuota voucher sudah habis.'];
        }

        if ($originalPrice < $voucher->min_transaction) {
            return ['valid' => false, 'message' => "Minimal transaksi untuk voucher ini adalah Rp" . number_format($voucher->min_transaction, 0, ',', '.')];
        }

        // Kalkulasi diskon
        $discountAmount = 0;
        if ($voucher->discount_type === 'percentage') {
            $discountAmount = $originalPrice * ($voucher->discount_value / 100);
        } else {
            $discountAmount = $voucher->discount_value;
        }

        // Pastikan diskon tidak melebihi harga asli
        $discountAmount = min($discountAmount, $originalPrice);

        return [
            'valid' => true,
            'message' => 'Voucher berhasil diterapkan!',
            'discount_amount' => $discountAmount,
            'voucher' => $voucher
        ];
    }

    public function applyVoucher(Voucher $voucher, int $userId, ?int $reservationId = null, ?int $transactionId = null): void
    {
        $voucher->increment('used_count');

        VoucherUsage::create([
            'voucher_id' => $voucher->id,
            'user_id' => $userId,
            'reservation_id' => $reservationId,
            'transaction_id' => $transactionId,
            'used_at' => now(),
        ]);
    }

    /**
     * Mengambil daftar voucher aktif untuk ditampilkan di halaman beranda.
     */
    public function getActiveVouchersForDisplay(int $limit = 6)
    {
        return Voucher::where('is_active', true)
            ->whereDate('valid_until', '>=', Carbon::today())
            ->whereColumn('used_count', '<', 'quota')
            ->latest()
            ->take($limit)
            ->get();
    }
}
