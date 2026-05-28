<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\OperationalSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingController extends Controller
{
    public function operational()
    {
        // Ambil semua data sebagai key-value array [ 'open_time' => '07:30', ... ]
        $settings = OperationalSetting::pluck('value', 'key')->toArray();

        return Inertia::render('Admin/Settings/Operational', [
            'settings' => $settings
        ]);
    }

    public function updateOperational(Request $request)
    {
        $validated = $request->validate([
            'open_time' => 'required|date_format:H:i',
            'close_time' => 'required|date_format:H:i|after:open_time',
            'slot_duration_minutes' => 'required|integer|min:15|max:180',
        ]);

        // Update masing-masing key di database
        foreach ($validated as $key => $value) {
            OperationalSetting::where('key', $key)->update(['value' => $value]);
        }

        return back()->with('success', 'Pengaturan operasional berhasil diperbarui.');
    }
}
