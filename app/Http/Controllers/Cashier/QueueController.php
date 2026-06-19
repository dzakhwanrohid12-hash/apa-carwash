<?php

namespace App\Http\Controllers\Cashier;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use App\Models\Employee;
use App\Models\Reservation; // Jangan lupa import model Reservation
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

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

        // 2. PERBAIKAN: Sinkronisasi ke Dashboard Pelanggan (tabel reservations)
        if ($transaction->reservation_id) {
            Reservation::where('id', $transaction->reservation_id)
                ->update(['status' => $request->status]);
        }

        return back()->with('success', 'Status antrean berhasil diperbarui.');
    }
}
