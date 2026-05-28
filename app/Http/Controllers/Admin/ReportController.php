<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class ReportController extends Controller
{
    public function index(Request $request)
    {
        // Default: Awal bulan ini sampai hari ini
        $startDate = $request->query('start', Carbon::now()->startOfMonth()->toDateString());
        $endDate = $request->query('end', Carbon::today()->toDateString());

        // Ambil data transaksi lunas
        $transactions = Transaction::with(['service', 'cashier'])
            ->where('payment_status', 'lunas')
            ->whereBetween('created_at', [$startDate . ' 00:00:00', $endDate . ' 23:59:59'])
            ->latest()
            ->get();

        $stats = [
            'total_revenue' => $transactions->sum('total'),
            'total_transactions' => $transactions->count(),
            'avg_transaction' => $transactions->count() > 0 ? $transactions->sum('total') / $transactions->count() : 0,
        ];

        // Format data untuk Chart
        $chartData = $transactions->groupBy(function($item) {
            return $item->created_at->format('d M');
        })->map(function($row, $date) {
            return [
                'date' => $date,
                'revenue' => $row->sum('total')
            ];
        })->values();

        return Inertia::render('Admin/Reports/Index', [
            'transactions' => $transactions,
            'stats' => $stats,
            'chartData' => $chartData,
            'filters' => ['start' => $startDate, 'end' => $endDate]
        ]);
    }
}
