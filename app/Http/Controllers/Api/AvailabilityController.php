<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\AvailabilityService;

class AvailabilityController extends Controller
{
    public function check(Request $request, AvailabilityService $availabilityService)
    {
        $request->validate([
            'date' => 'required|date'
        ]);

        try {
            // Panggil service untuk mendapatkan slot
            $slots = $availabilityService->getAvailableSlots($request->date);
            return response()->json($slots);
        } catch (\Exception $e) {
            // Jika ada error, kembalikan response 500 agar mudah dilacak
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
