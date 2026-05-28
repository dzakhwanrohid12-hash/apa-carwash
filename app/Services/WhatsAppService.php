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
        // public function send(string $phone, string $message): bool
        // {
        //     try {
        //         $response = Http::withHeaders([
        //             'Authorization' => env('FONNTE_TOKEN'),
        //         ])->post('https://api.fonnte.com/send', [
        //             'target' => $phone,
        //             'message' => $message,
        //         ]);

        //         return $response->json('status') === true;
        //     } catch (\Exception $e) {
        //         Log::error('Fonnte API Error: ' . $e->getMessage());
        //         return false;
        //     }
        // }
        public function send(string $phone, string $message): bool
    {
        // Cek apakah token Fonnte kosong atau bernilai default
        if (empty(env('FONNTE_TOKEN')) || env('FONNTE_TOKEN') === 'masukkan_token_fonnte_anda_di_sini') {
            // Catat pesan ke file storage/logs/laravel.log
            Log::info("=== MOCK WHATSAPP NOTIFICATION ===");
            Log::info("To: {$phone}");
            Log::info("Message:\n{$message}");
            Log::info("==================================");

            return true; // Pura-pura berhasil
        }

        // Jika token ada, jalankan API sungguhan
        try {
            $response = Http::withHeaders([
                'Authorization' => env('FONNTE_TOKEN'),
            ])->post('https://api.fonnte.com/send', [
                'target' => $phone,
                'message' => $message,
            ]);

            return $response->json('status') === true;
        } catch (\Exception $e) {
            Log::error('Fonnte API Error: ' . $e->getMessage());
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
