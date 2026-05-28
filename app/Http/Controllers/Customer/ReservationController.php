<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Service;
use App\Models\Reservation;
use App\Services\ReservationService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReservationController extends Controller
{
    public function create()
    {
        $services = Service::with('category')->where('is_active', true)->get();
        return Inertia::render('Customer/Reservation/Create', compact('services'));
    }

    public function store(Request $request, ReservationService $reservationService)
    {
        $service = Service::find($request->service_id);
        $isCarpet = $service && (stripos($service->name, 'karpet') !== false);

        $rules = [
            'service_id' => 'required|exists:services,id',
            'reservation_date' => 'required|date|after_or_equal:today',
            'reservation_time' => 'required|string',
            'payment_method' => 'required|in:transfer,qris',
            'voucher_code' => 'nullable|string',
            'payment_proof' => 'required|image|max:2048',
        ];

        if (!$isCarpet) {
            $rules['vehicle_plate'] = 'required|string|max:15';
            $rules['vehicle_description'] = 'nullable|string|max:255';
        } else {
            $rules['vehicle_plate'] = 'nullable|string|max:50';
            $rules['vehicle_description'] = 'nullable|string|max:255';
        }

        $request->validate($rules, [
            'payment_proof.required' => 'Bukti pembayaran wajib diunggah.',
            'vehicle_plate.required' => 'Nomor plat kendaraan wajib diisi.'
        ]);

        try {
            $data = $request->all();

            if ($isCarpet && empty($data['vehicle_plate'])) {
                $data['vehicle_plate'] = 'KARPET-' . time();
            }

            if ($request->hasFile('payment_proof')) {
                $file = $request->file('payment_proof');
                $filename = time() . '_' . $file->getClientOriginalName();

                // PERBAIKAN: Menyimpan ke public disk (storage/app/public/payment_proof)
                $path = $file->storeAs('payment_proof', $filename, 'public');
                $data['payment_proof'] = $path; // menghasilkan: "payment_proof/filename.jpg"
            } else {
                $data['payment_proof'] = null;
            }

           $reservation = $reservationService->createReservation($data, auth()->user());

            return redirect()->route('customer.reservations.show', $reservation->id)
                ->with('success', 'Reservasi berhasil dibuat!');

        } catch (\Exception $e) {
            return back()->withErrors(['system' => 'Database Error: ' . $e->getMessage()])->withInput();
        }
    }

    public function show(Reservation $reservation)
    {
        if ($reservation->user_id !== auth()->id()) {
            abort(403);
        }

        $reservation->load('service.category');
        return Inertia::render('Customer/Reservation/Show', compact('reservation'));
    }

    public function history()
    {
        $reservations = Reservation::with('service')
            ->where('user_id', auth()->id())
            ->latest()
            ->get();

        return Inertia::render('Customer/History', compact('reservations'));
    }
}
