<?php

namespace App\Models;

use App\Models\User;
use App\Models\Service;
use App\Models\Employee;
use App\Models\Reservation;
use App\Models\Voucher;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $guarded = ['id'];
    protected $casts = ['is_carpet_service' => 'boolean'];
    public function user() { return $this->belongsTo(User::class); }
    public function cashier() { return $this->belongsTo(User::class, 'cashier_id'); }
    public function service() { return $this->belongsTo(Service::class); }
    public function employee() { return $this->belongsTo(Employee::class); }
    public function reservation(){return $this->belongsTo(Reservation::class);}
    public function voucher(){return $this->belongsTo(Voucher::class);}
}
