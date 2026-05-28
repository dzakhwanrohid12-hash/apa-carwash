<?php

namespace App\Models;

use App\Models\ServiceCategory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $guarded = ['id'];
    protected $casts = ['is_active' => 'boolean'];
    public function category() { return $this->belongsTo(ServiceCategory::class, 'service_category_id'); }
}
