<?php

namespace App\Services;

use App\Models\Reservation;
use App\Models\Service;
use App\Models\Voucher;
use App\Models\VoucherUsage;
use Illuminate\Support\Facades\DB;

class ReservationService
{
    protected $voucherService;

    public function __construct(VoucherService $voucherService)
    {
        $this->voucherService = $voucherService;
    }

    public function createReservation(array $data, $user)
    {
        return DB::transaction(function () use ($data, $user) {

            $service = Service::findOrFail($data['service_id']);
            $originalPrice = $service->price;
            $finalPrice = $originalPrice;
            $discountAmount = 0;
            $voucher = null;

            if (!empty($data['voucher_code'])) {
                $voucherValidation = $this->voucherService->validateVoucher($data['voucher_code'], $originalPrice);

                if ($voucherValidation && isset($voucherValidation['valid']) && $voucherValidation['valid']) {
                    $discountAmount = $voucherValidation['discount_amount'];
                    $finalPrice = $originalPrice - $discountAmount;
                    $voucher = Voucher::where('code', strtoupper($data['voucher_code']))->first();
                }
            }

            // MURNI HANYA MENYIMPAN RESERVASI
            $reservation = Reservation::create([
                'user_id' => $user->id,
                'service_id' => $service->id,
                'vehicle_plate' => strtoupper($data['vehicle_plate']),
                'vehicle_description' => $data['vehicle_description'] ?? null,
                'reservation_date' => $data['reservation_date'],
                'reservation_time' => $data['reservation_time'],
                'slot_number' => 1,
                'original_price' => $originalPrice,
                'discount_amount' => $discountAmount,
                'final_price' => $finalPrice,
                'payment_method' => $data['payment_method'],
                'payment_proof_path' => $data['payment_proof'] ?? null,
                'payment_status' => 'pending_payment',
                'status' => 'menunggu',
            ]);

            // Catat penggunaan voucher (transaction_id akan diisi nanti saat divalidasi kasir)
            if ($voucher) {
                VoucherUsage::create([
                    'voucher_id' => $voucher->id,
                    'user_id' => $user->id,
                    'reservation_id' => $reservation->id,
                    'used_at' => now(),
                ]);
                $voucher->increment('used_count');
            }

            return $reservation;
        });
    }
}
