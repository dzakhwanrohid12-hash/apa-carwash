<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    public function handle(Request $request, Closure $next, string ...$roles): Response
    {
        $user = $request->user();

        // Jika user belum login, biarkan middleware 'auth' bawaan Laravel yang menangani
        if (! $user) {
            return redirect()->route('login');
        }

        // Cek apakah role user ada di dalam array roles yang diizinkan
        if (! in_array($user->role, $roles)) {
            // Redirect sesuai role aslinya jika ia mencoba mengakses halaman role lain
            $redirectRoute = match ($user->role) {
                'admin' => 'admin.dashboard',
                'kasir' => 'cashier.dashboard',
                default => 'customer.dashboard',
            };

            return redirect()->route($redirectRoute)->with('error', 'Akses ditolak. Anda tidak memiliki izin untuk halaman tersebut.');
        }

        return $next($request);
    }
}
