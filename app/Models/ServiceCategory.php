<?php

namespace App\Models;

use App\Models\Service;
use Illuminate\Database\Eloquent\Model;

class ServiceCategory extends Model
{
    protected $guarded = ['id'];
    public function services() { return $this->hasMany(Service::class); }
}
