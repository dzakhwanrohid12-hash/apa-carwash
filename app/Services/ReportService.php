<?php

namespace App\Services;

use App\Models\Transaction;
use App\Models\Reservation;
use Carbon\Carbon;

class ReportService
{
    public function getDashboardSummary(string $period = 'today'): array
    {
        $queryDate = match($period) {
            'today' => Carbon::today(),
            'week' => Carbon::now()->startOfWeek(),
            'month' => Carbon::now()->startOfMonth(),
            default => Carbon::today(),
        };

        $transactions = Transaction::where('payment_status', 'lunas')
            ->when($period === 'today', fn($q) => $q->whereDate('created_at', $queryDate))
            ->when($period !== 'today', fn($q) => $q->where('created_at', '>=', $queryDate))
            ->get();

        $revenue = $transactions->sum('total');
        $transactionCount = $transactions->count();

        $pendingReservations = Reservation::where('status', 'menunggu')
            ->where('payment_status', 'pending_payment')
            ->count();

        // Contoh sederhana chart data (7 hari terakhir)
        $chartData = [];
        for ($i = 6; $i >= 0; $i--) {
            $date = Carbon::today()->subDays($i);
            $dailyTotal = Transaction::where('payment_status', 'lunas')
                ->whereDate('created_at', $date)
                ->sum('total');

            $chartData[] = [
                'date' => $date->format('d M'),
                'revenue' => $dailyTotal
            ];
        }

        return [
            'revenue' => $revenue,
            'transaction_count' => $transactionCount,
            'pending_reservations' => $pendingReservations,
            'chart_data' => $chartData
        ];
    }
}
