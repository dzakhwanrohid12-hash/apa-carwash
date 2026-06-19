<?php

namespace App\Http\Controllers\Cashier;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use App\Models\Transaction; // <-- Penting agar menu history tidak error!
use App\Services\POSService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransactionController extends Controller
{
    public function index()
    {
        $reservations = Reservation::with(['user', 'service'])
            ->whereIn('payment_status', ['pending_payment', 'paid'])
            ->orderByRaw("FIELD(payment_status, 'pending_payment') DESC")
            ->latest()
            ->get();

        return Inertia::render('Cashier/Transactions/Index', compact('reservations'));
    }

    public function validatePayment(Reservation $transaction, POSService $posService)
    {
        try {
            $posService->validateReservationPayment($transaction, auth()->user());

            return back()->with('success', 'Pembayaran divalidasi. Kendaraan masuk ke antrean.');
        } catch (\Exception $e) {
            // JURUS JITU: Hentikan paksa sistem dan cetak akar masalahnya ke layar!
            dd([
                'STATUS' => 'TANGKAP ERROR VALIDASI',
                'PESAN_ERROR_ASLI' => $e->getMessage(),
                'NAMA_FILE_YANG_ERROR' => $e->getFile(),
                'DI_BARIS_KODE' => $e->getLine()
            ]);
        }
    }

    public function rejectPayment(Request $request, Reservation $transaction)
    {
        $request->validate(['notes' => 'required|string']);

        try {
            // 1. Batalkan di tabel reservations
            $transaction->update([
                'payment_status' => 'rejected',
                'status' => 'dibatalkan',
                'notes' => 'Ditolak: ' . $request->notes
            ]);

            // 2. Batalkan juga di tabel transactions yang terhubung (agar tidak nyangkut)
            Transaction::where('reservation_id', $transaction->id)->update([
                'payment_status' => 'dibatalkan',
                'status' => 'dibatalkan'
            ]);

            return back()->with('success', 'Pembayaran berhasil ditolak.');
        } catch (\Exception $e) {
            dd([
                'STATUS' => 'TANGKAP ERROR PENOLAKAN',
                'PESAN_ERROR_ASLI' => $e->getMessage(),
                'NAMA_FILE_YANG_ERROR' => $e->getFile(),
                'DI_BARIS_KODE' => $e->getLine()
            ]);
        }
    }

    // PENTING: Fungsi history dari diskusi sebelumnya agar jejak tidak hilang!
    public function history()
    {
        $transactions = Transaction::with(['service.category', 'employee', 'user'])
            ->latest()
            ->get();

        return Inertia::render('Cashier/Transactions/History', compact('transactions'));
    }
}
