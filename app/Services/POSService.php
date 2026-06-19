<?php

namespace App\Services;

use App\Models\Service;
use App\Models\Transaction;
use App\Models\Reservation;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class POSService
{
    public function __construct(
        protected VoucherService $voucherService
    ) {}

    // PERBAIKAN: Generate TRX yang 100% Anti-Duplicate
    private function generateTransactionCode(): string
    {
        return 'TRX-' . date('Ymd') . '-' . strtoupper(substr(uniqid(), -5));
    }

    public function createWalkIn(array $data, User $cashier): Transaction
    {
        return DB::transaction(function () use ($data, $cashier) {
            $service = Service::with('category')->findOrFail($data['service_id']);
            $isCarpet = $service->category->name === 'Karpet';

            $subtotal = $service->price;
            $discountAmount = 0;
            $voucherId = null;

            if (!empty($data['voucher_code'])) {
                $voucherResult = $this->voucherService->validateVoucher($data['voucher_code'], $subtotal);
                if ($voucherResult['valid']) {
                    $discountAmount = $voucherResult['discount_amount'];
                    $voucherId = $voucherResult['voucher']->id;
                    $this->voucherService->applyVoucher($voucherResult['voucher'], $cashier->id, null, null);
                } else {
                    throw new \Exception($voucherResult['message']);
                }
            }

            $total = max(0, $subtotal - $discountAmount);

            $transaction = Transaction::create([
                'transaction_code' => $this->generateTransactionCode(),
                'cashier_id' => $cashier->id,
                'service_id' => $service->id,
                'vehicle_plate' => strtoupper($data['vehicle_plate'] ?? ''),
                'vehicle_description' => $data['vehicle_description'] ?? null,
                'voucher_id' => $voucherId,
                'discount_amount' => $discountAmount,
                'subtotal' => $subtotal,
                'total' => $total,
                'payment_method' => $data['payment_method'],
                'payment_status' => 'lunas',
                'transaction_type' => 'walkin',
                'status' => 'lunas', // <-- SUDAH DIUBAH MENJADI LUNAS
                'is_carpet_service' => $isCarpet,
                'carpet_status' => $isCarpet ? 'dicuci' : null,
            ]);

            return $transaction;
        });
    }

    public function validateReservationPayment(Reservation $reservation, User $cashier): Transaction
    {
        return DB::transaction(function () use ($reservation, $cashier) {
            $reservation->update([
                'payment_status' => 'paid',
                'status' => 'menunggu' // <-- SUDAH DIUBAH MENJADI LUNAS
            ]);

            $isCarpet = $reservation->service->category->name === 'Karpet';

            $transaction = Transaction::create([
                'transaction_code' => $this->generateTransactionCode(),
                'reservation_id' => $reservation->id,
                'user_id' => $reservation->user_id,
                'cashier_id' => $cashier->id,
                'service_id' => $reservation->service_id,
                'vehicle_plate' => $reservation->vehicle_plate,
                'vehicle_description' => $reservation->vehicle_description,
                'voucher_id' => $reservation->voucher_id,
                'discount_amount' => $reservation->discount_amount,
                'subtotal' => $reservation->original_price,
                'total' => $reservation->final_price,
                'payment_method' => $reservation->payment_method ?? 'transfer',
                'payment_status' => 'lunas',
                'transaction_type' => 'online',
                'status' => 'menunggu', // <-- SUDAH DIUBAH MENJADI LUNAS
                'is_carpet_service' => $isCarpet,
                'carpet_status' => $isCarpet ? 'dicuci' : null,
            ]);

            if ($reservation->voucher_id) {
                \App\Models\VoucherUsage::where('reservation_id', $reservation->id)
                    ->update(['transaction_id' => $transaction->id]);
            }

            return $transaction;
        });
    }
}
