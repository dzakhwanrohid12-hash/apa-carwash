<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class EmployeeAvailability extends Model
{
    protected $guarded = ['id'];
    public function admin()
{
    return $this->belongsTo(User::class,'set_by_admin');
}
}
