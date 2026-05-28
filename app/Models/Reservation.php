<?php

namespace App\Models;

use App\Models\User;
use App\Models\Service;
use App\Models\Transaction;
use App\Models\Voucher;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    protected $guarded = ['id'];
   protected $fillable = [
    'user_id', 'service_id', 'vehicle_plate', 'vehicle_description',
    'reservation_date', 'reservation_time', 'slot_number', // <--- TAMBAHKAN INI
    'final_price', 'payment_method', 'payment_proof_path',
    'payment_status', 'status', 'original_price', 'discount_amount'
];
    public function user() { return $this->belongsTo(User::class); }
    public function service() { return $this->belongsTo(Service::class); }
    public function transaction() { return $this->hasOne(Transaction::class); }
    public function voucher(){return $this->belongsTo(Voucher::class);}
}
