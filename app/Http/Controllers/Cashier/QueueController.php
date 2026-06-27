<?php

namespace App\Http\Controllers\Cashier;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use App\Models\Employee;
use App\Models\Reservation;
use App\Services\WhatsAppService;
use App\Jobs\SendWhatsAppNotification;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class QueueController extends Controller
{
    public function index()
    {
        $queues = Transaction::with(['service', 'employee', 'user'])
            ->whereDate('created_at', Carbon::today())
            ->whereIn('status', ['lunas', 'menunggu', 'diproses'])
            ->orderBy('created_at', 'asc')
            ->get();

        // Ambil ID karyawan yang SAAT INI status pekerjaannya 'diproses'
        $busyEmployeeIds = $queues->where('status', 'diproses')->pluck('employee_id')->filter()->toArray();

        // Ambil karyawan aktif, lalu tandai jika mereka sedang sibuk
        $employees = Employee::where('is_active', true)->get()->map(function ($emp) use ($busyEmployeeIds) {
            $emp->is_busy = in_array($emp->id, $busyEmployeeIds);
            return $emp;
        });

        return Inertia::render('Cashier/Queue/Index', compact('queues', 'employees'));
    }

    public function assignEmployee(Request $request, Transaction $transaction)
    {
        $request->validate([
            'employee_id' => 'required|exists:employees,id'
        ]);

        $transaction->update([
            'employee_id' => $request->employee_id
        ]);

        return back()->with('success', 'Karyawan berhasil ditugaskan.');
    }

    public function updateStatus(Request $request, Transaction $transaction)
    {
        $request->validate([
            'status' => 'required|in:diproses,selesai'
        ]);

        // 1. Update status pada antrean kasir (tabel transactions)
        $transaction->update([
            'status' => $request->status
        ]);

        // 2. Sinkronisasi ke Dashboard Pelanggan (tabel reservations)
        if ($transaction->reservation_id) {
            Reservation::where('id', $transaction->reservation_id)
                ->update(['status' => $request->status]);
        }

        // --- FITUR WHATSAPP: NOTIFIKASI KE PELANGGAN SAAT SELESAI ---
        if ($request->status === 'selesai') {
            // Pastikan relasi user dan layanannya di-load
            $transaction->load(['user', 'service']);

        if ($transaction->user && !empty($transaction->user->phone)) {
        $waService = new WhatsAppService();
        $message = $waService->formatJobCompleteMessage($transaction);

        Log::info("WA Debug: Mengirim notif selesai ke " . $transaction->user->phone);
        SendWhatsAppNotification::dispatch($transaction->user->phone, $message);
        }
        }
        // ------------------------------------------------------------

        return back()->with('success', 'Status antrean berhasil diperbarui.');
    }
}
