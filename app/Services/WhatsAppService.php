<?php

namespace App\Services;

use App\Models\Reservation;
use App\Models\Transaction;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class WhatsAppService
{
    /**
     * Core method untuk menembak API Fonnte
     */
    public function send(string $phone, string $message): bool
    {
        // Pastikan token valid
        $token = env('FONNTE_TOKEN');
        if (empty($token) || $token === 'masukkan_token_fonnte_anda_di_sini') {
            Log::info("=== MOCK WHATSAPP NOTIFICATION ===");
            Log::info("To: {$phone}");
            Log::info("Message:\n{$message}");
            Log::info("==================================");
            return true;
        }

        try {
            $response = Http::withoutVerifying()
                ->timeout(30)
                ->withHeaders([
                    'Authorization' => $token,
                ])
                ->post('https://api.fonnte.com/send', [
                    'target'  => $phone,
                    'message' => $message,
                ]);

            // Cek apakah response berhasil dan status status true
            if ($response->successful() && $response->json('status') === true) {
                return true;
            }

            Log::error('Fonnte API Response Error: ' . $response->body());
            return false;

        } catch (\Exception $e) {
            Log::error('Fonnte API Exception: ' . $e->getMessage());
            return false;
        }
    }

        /**
         * Format notifikasi untuk Kasir saat ada reservasi baru
         */
        public function formatNewReservationMessage(Reservation $reservation): string
        {
            $total = number_format($reservation->final_price, 0, ',', '.');
            $date = \Carbon\Carbon::parse($reservation->reservation_date)->format('d M Y');

            return "🔔 *RESERVASI BARU - APA Car Wash*\n\n"
                . "Pelanggan : {$reservation->user->name}\n"
                . "Layanan   : {$reservation->service->name}\n"
                . "Plat      : {$reservation->vehicle_plate}\n"
                . "Tanggal   : {$date}\n"
                . "Jam       : {$reservation->reservation_time}\n"
                . "Total     : Rp{$total}\n\n"
                . "Segera verifikasi bukti pembayaran di dashboard kasir.";
        }

        /**
         * Format notifikasi untuk Pelanggan saat kendaraan selesai
         */
        public function formatJobCompleteMessage(Transaction $transaction): string
        {
            $name = $transaction->user ? $transaction->user->name : 'Pelanggan Setia';
            $vehicle = $transaction->vehicle_plate ?: 'Kendaraan/Karpet';

            return "✅ *APA Car Wash - Selesai*\n\n"
                . "Halo {$name}!\n"
                . "{$vehicle} Anda sudah selesai dikerjakan dan siap untuk diambil.\n\n"
                . "Kode Trx : {$transaction->transaction_code}\n"
                . "Layanan  : {$transaction->service->name}\n\n"
                . "Terima kasih telah mempercayakan perawatan kendaraan Anda di APA Car Wash! 🚗✨";
        }
    }
