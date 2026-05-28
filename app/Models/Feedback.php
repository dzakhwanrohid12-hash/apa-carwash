<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Feedback extends Model
{
    use HasFactory;

    // Menentukan tabel secara eksplisit (opsional tapi aman)
    protected $table = 'feedbacks';

    // Kolom yang boleh diisi
    protected $fillable = [
        'user_id',
        'name',
        'email',
        'phone',
        'message',
        'is_read',
    ];

    // Relasi ke User (Jika pengirim dalam keadaan login)
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
