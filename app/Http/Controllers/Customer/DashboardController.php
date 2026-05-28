<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $userId = auth()->id();

        // Mengambil semua reservasi yang berstatus MENUNGGU atau DIPROSES
        $activeReservations = Reservation::with('service')
            ->where('user_id', $userId)
            ->whereIn('status', ['menunggu', 'diproses'])
            ->latest()
            ->get();

        // Mengambil murni angka yang sudah SELESAI
        $completedCount = Reservation::where('user_id', $userId)
            ->where('status', 'selesai')
            ->count();

        $stats = [
            'active' => $activeReservations->count(),
            'completed' => $completedCount
        ];

        return Inertia::render('Customer/Dashboard', compact('activeReservations', 'stats'));
    }
}
