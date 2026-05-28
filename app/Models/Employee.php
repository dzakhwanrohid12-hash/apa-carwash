<?php

namespace App\Models;

use App\Models\Transaction;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    protected $guarded = ['id'];
    public function transactions(){return $this->hasMany(Transaction::class);}
}
