<?php

namespace App\Http\Controllers\Cashier;

use App\Http\Controllers\Controller;
use App\Models\Service;
use App\Models\ServiceCategory;
use App\Services\POSService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class POSController extends Controller
{
    public function index()
    {
        $categories = ServiceCategory::with(['services' => function($q) {
            $q->where('is_active', true);
        }])->get();

        return Inertia::render('Cashier/POS/Index', compact('categories'));
    }

    public function store(Request $request, POSService $posService)
    {
        // Cek manual apakah ini layanan karpet dari database
        $service = Service::with('category')->find($request->service_id);
        $isCarpet = $service && $service->category->name === 'Karpet';

        $rules = [
            'service_id' => 'required|exists:services,id',
            'payment_method' => 'required|in:tunai,qris,transfer',
        ];

        // Jika bukan karpet, plat wajib diisi
        if (!$isCarpet) {
            $rules['vehicle_plate'] = 'required|string';
        }

        $request->validate($rules);

        try {
            $transaction = $posService->createWalkIn($request->all(), auth()->user());
            return back()->with('success', "Transaksi berhasil! Kode: {$transaction->transaction_code}");
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }
}
