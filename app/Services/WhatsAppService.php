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

            // Mengambil data pelanggan
            $customerName = $reservation->user->name ?? 'Pelanggan';
            $customerPhone = $reservation->user->phone ?? '-';

            // Membuat link WA agar kasir bisa langsung klik (mengubah awalan 0 menjadi 62)
            $waLink = '-';
            if ($customerPhone !== '-') {
                // Memastikan format awal 0 diganti 62 untuk API wa.me
                $formattedPhone = preg_replace('/^0/', '62', $customerPhone);
                $waLink = "wa.me/{$formattedPhone}";
            }

            $vehicleDesc = $reservation->vehicle_description ?: '-';
            $paymentMethod = strtoupper($reservation->payment_method);

            return "🔔 *RESERVASI BARU ONLINE - APA Car Wash*\n\n"
                . "Telah masuk reservasi baru dari pelanggan. Berikut detailnya:\n\n"
                . "👤 *INFO PELANGGAN*\n"
                . "Nama   : {$customerName}\n"
                . "No. WA : {$customerPhone}\n"
                . "Hubungi: {$waLink}\n\n"
                . "🚗 *INFO KENDARAAN*\n"
                . "Plat   : {$reservation->vehicle_plate}\n"
                . "Detail : {$vehicleDesc}\n\n"
                . "📅 *INFO LAYANAN*\n"
                . "Layanan: {$reservation->service->name}\n"
                . "Tanggal: {$date}\n"
                . "Jam    : {$reservation->reservation_time}\n\n"
                . "💳 *INFO PEMBAYARAN*\n"
                . "Metode : {$paymentMethod}\n"
                . "Total  : *Rp{$total}*\n\n"
                . "⚠️ *TINDAKAN DIPERLUKAN*\n"
                . "Segera buka Dashboard Kasir untuk memverifikasi bukti transfer pelanggan. Jika ada kendala, Anda dapat menghubungi pelanggan melalui link WA di atas.";
        }

        /**
         * Format notifikasi untuk Pelanggan saat kendaraan selesai
         */
        public function formatJobCompleteMessage(Transaction $transaction): string
        {
            $name = $transaction->user ? $transaction->user->name : 'Pelanggan Setia';

            // Menyesuaikan sebutan jika layanan berupa cuci karpet (dari kode sebelumnya)
            $isCarpet = $transaction->service && stripos($transaction->service->name, 'karpet') !== false;
            $item = $isCarpet ? 'Karpet' : 'Kendaraan';

            $vehicle = $transaction->vehicle_plate ?: $item;

            return "✅ *PESANAN SELESAI - APA Car Wash*\n\n"
                . "Halo *{$name}*!\n\n"
                . "Kabar gembira! {$item} Anda dengan nomor plat/identitas *{$vehicle}* telah selesai dikerjakan dan sudah siap untuk diambil.\n\n"
                . "📋 *RINCIAN PESANAN:*\n"
                . "• Kode Trx : {$transaction->transaction_code}\n"
                . "• Layanan  : {$transaction->service->name}\n\n"
                . "Mohon tunjukkan pesan ini atau bukti reservasi Anda kepada Kasir saat melakukan pengambilan.\n\n"
                . "Terima kasih telah mempercayakan perawatan {$item} Anda di *APA Car Wash*! Kami tunggu kedatangan Anda kembali. 🚗✨";
        }
    }
