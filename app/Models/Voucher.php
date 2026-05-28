<?php

namespace App\Models;

use App\Models\Reservation;
use App\Models\VoucherUsage;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Voucher extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    protected $casts = [
        'valid_from' => 'date',
        'valid_until' => 'date',
        'is_active' => 'boolean',
        'discount_value' => 'decimal:2',
        'min_transaction' => 'decimal:2',
    ];

    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }

    public function usages()
    {
        return $this->hasMany(VoucherUsage::class);
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
