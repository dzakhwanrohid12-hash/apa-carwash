<?php

namespace App\Services;

use Carbon\Carbon;
use App\Models\Employee;
use App\Models\Reservation;
use App\Models\OperationalSetting;

class AvailabilityService
{
    public function getAvailableSlots($date)
    {
        $tz = 'Asia/Jakarta';

        $parsedDate = date('Y-m-d', strtotime($date));
        $requestedDate = Carbon::parse($parsedDate, $tz)->startOfDay();
        $today = Carbon::today($tz);
        $now = Carbon::now($tz);

        if ($requestedDate->isBefore($today)) {
            return [];
        }

        // PERBAIKAN: Baca dari sistem key-value database
        $openStr = OperationalSetting::where('key', 'open_time')->value('value') ?: '07:30:00';
        $closeStr = OperationalSetting::where('key', 'close_time')->value('value') ?: '18:00:00';
        $slotDuration = OperationalSetting::where('key', 'slot_duration_minutes')->value('value') ?: 60;

        $activeEmployeesCount = Employee::whereIn('is_active', [1, true, '1'])->count();

        if ($activeEmployeesCount === 0) {
            $activeEmployeesCount = Employee::count();
        }

        if ($activeEmployeesCount === 0) {
            return [];
        }

        $currentTime = Carbon::parse($parsedDate . ' ' . $openStr, $tz);
        $closeTime = Carbon::parse($parsedDate . ' ' . $closeStr, $tz);

        $slots = [];

        while ($currentTime->isBefore($closeTime)) {
            $timeString = $currentTime->format('H:i');
            $slotDateTime = $currentTime->copy();

            if ($requestedDate->isSameDay($today) && $slotDateTime->isBefore($now)) {
                // Gunakan slotDuration dari database (bisa 30, 60, 80 menit dll)
                $currentTime->addMinutes((int)$slotDuration);
                continue;
            }

            $bookedCount = Reservation::whereDate('reservation_date', $requestedDate)
                ->whereTime('reservation_time', $timeString)
                ->whereNotIn('status', ['dibatalkan'])
                ->count();

            $availableCapacity = $activeEmployeesCount - $bookedCount;

            $slots[] = [
                'time' => $timeString,
                'available_capacity' => $availableCapacity,
                'is_available' => $availableCapacity > 0
            ];

            // Melompat sesuai interval waktu yang di-setting Admin
            $currentTime->addMinutes((int)$slotDuration);
        }

        return $slots;
    }
}
