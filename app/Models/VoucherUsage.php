<?php

namespace App\Models;

use App\Models\User;
use App\Models\Voucher;
use App\Models\Reservation;
use App\Models\Transaction;
use Illuminate\Database\Eloquent\Model;

class VoucherUsage extends Model
{
    protected $guarded = ['id'];
    public function voucher()
{
    return $this->belongsTo(Voucher::class);
}

public function user()
{
    return $this->belongsTo(User::class);
}

public function reservation()
{
    return $this->belongsTo(Reservation::class);
}

public function transaction()
{
    return $this->belongsTo(Transaction::class);
}
}
