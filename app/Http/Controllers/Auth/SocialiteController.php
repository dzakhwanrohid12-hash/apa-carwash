<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use Exception;

class SocialiteController extends Controller
{
    // Mengarahkan pengguna ke halaman login Google
    public function redirectToGoogle()
    {
        return Socialite::driver('google')
            ->with(['prompt' => 'select_account'])
            ->redirect();
    }

    // Menangani kembalian data dari Google
    public function handleGoogleCallback()
    {
        try {
            $googleUser = Socialite::driver('google')->user();

            // Cek apakah email sudah terdaftar sebelumnya
            $user = User::where('email', $googleUser->email)->first();

            if ($user) {
                // Jika user sudah ada (mungkin admin/kasir), update google_id nya saja
                $user->update([
                    'google_id' => $googleUser->id,
                ]);
            } else {
                // Jika pengguna baru, daftarkan sebagai pelanggan
                $user = User::create([
                    'name' => $googleUser->name,
                    'email' => $googleUser->email,
                    'google_id' => $googleUser->id,
                    'role' => 'pelanggan',
                    // Password dibiarkan kosong
                ]);
            }

            // Login otomatis
            Auth::login($user);

            // Arahkan ke dashboard sesuai role masing-masing
            if ($user->role === 'admin') return redirect()->route('admin.dashboard');
            if ($user->role === 'kasir') return redirect()->route('cashier.dashboard');

            return redirect()->route('customer.dashboard');

        } catch (Exception $e) {
            return redirect()->route('login')->with('error', 'Gagal masuk menggunakan Google. Silakan coba lagi.');
        }
    }
}
