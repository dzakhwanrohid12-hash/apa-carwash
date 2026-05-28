<?php

namespace App\Http\Controllers\Cashier;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function __invoke()
    {
        $today = Carbon::today();

        $activeQueue = Transaction::whereDate('created_at', $today)
            ->whereIn('status', ['menunggu', 'diproses'])
            ->count();

        $completedToday = Transaction::whereDate('created_at', $today)
            ->where('status', 'selesai')
            ->count();

        $pendingReservations = Reservation::whereDate('reservation_date', '>=', $today)
            ->where('payment_status', 'pending_payment')
            ->count();

        return Inertia::render('Cashier/Dashboard', compact('activeQueue', 'completedToday', 'pendingReservations'));
    }
}
