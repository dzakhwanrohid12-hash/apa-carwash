<?php

namespace App\Services;

use App\Jobs\SendWhatsAppNotification;
use App\Services\WhatsAppService;
use App\Models\Transaction;

class QueueService
{
    // public function __construct(protected WhatsAppService $waService) {} // Akan di-uncomment saat integrasi WA

    public function assignEmployee(Transaction $transaction, int $employeeId): Transaction
    {
        $transaction->update([
            'employee_id' => $employeeId,
            'status' => 'diproses'
        ]);

        return $transaction;
    }

    public function updateStatus(Transaction $transaction, string $newStatus, ?string $carpetStatus = null): Transaction
    {
        $data = ['status' => $newStatus];

        if ($transaction->is_carpet_service && $carpetStatus) {
            $data['carpet_status'] = $carpetStatus;
        }

        $transaction->update($data);

       // Kirim notifikasi jika status selesai (dan punya ID user/nomor hp)
    if ($newStatus === 'selesai' && $transaction->user && $transaction->user->phone) {
        $waService = app(WhatsAppService::class);
        $message = $waService->formatJobCompleteMessage($transaction);

        SendWhatsAppNotification::dispatch($transaction->user->phone, $message);
    }

        return $transaction;
    }
}
