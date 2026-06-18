<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

// Tambahkan import ProfileController di sini
use App\Http\Controllers\ProfileController;

// Admin Controllers
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\ServiceController as AdminServiceController;
use App\Http\Controllers\Admin\VoucherController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\ReportController;

// Cashier Controllers
use App\Http\Controllers\Cashier\DashboardController as CashierDashboardController;
use App\Http\Controllers\Cashier\EmployeeController;
use App\Http\Controllers\Cashier\POSController;
use App\Http\Controllers\Cashier\TransactionController;
use App\Http\Controllers\Cashier\QueueController;

// Customer & Public Controllers
use App\Http\Controllers\Customer\ReservationController;
use App\Http\Controllers\Customer\FeedbackController;
use App\Http\Controllers\Api\AvailabilityController;
use App\Services\VoucherService;
use App\Http\Controllers\Auth\SocialiteController;

/*
|--------------------------------------------------------------------------
| Public Routes (GuestLayout)
|--------------------------------------------------------------------------
*/
Route::get('/', function (VoucherService $voucherService) {
    return Inertia::render('Guest/Home', [
        // Mengambil data services dan stats bawaan Anda sebelumnya
        'services' => \App\Models\Service::with('category')->where('is_active', true)->take(6)->get(),
        'stats' => [
            'total_transactions' => \App\Models\Transaction::where('payment_status', 'lunas')->count()
        ],
        // Menambahkan data vouchers melalui Service yang baru kita buat
        'vouchers' => $voucherService->getActiveVouchersForDisplay(6)
    ]);
})->name('home');

Route::get('/services', function () {
    return Inertia::render('Guest/Services', [
        'categories' => \App\Models\ServiceCategory::all(),
        'services' => \App\Models\Service::with('category')->where('is_active', true)->get(),
    ]);
})->name('services');

Route::get('/about', function () { return Inertia::render('Guest/About'); })->name('about');
Route::get('/contact', function () { return Inertia::render('Guest/Contact'); })->name('contact');

Route::post('/feedback', [FeedbackController::class, 'store'])->name('feedback.store');

Route::get('/queue/monitor', function () {
    return Inertia::render('Guest/Queue/Monitor', [
        'queueItems' => \App\Models\Transaction::with(['service', 'employee'])
            ->whereDate('created_at', Carbon::today())
            ->whereIn('status', ['menunggu', 'diproses'])
            ->orderBy('created_at')
            ->get()
    ]);
})->name('queue.monitor');


/*
|--------------------------------------------------------------------------
| Customer Routes (Auth + Role: pelanggan)
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'role:pelanggan'])->prefix('customer')->name('customer.')->group(function () {

    // 1. Dashboard sekarang dipanggil lewat Controller dengan bersih
    Route::get('/dashboard', [\App\Http\Controllers\Customer\DashboardController::class, 'index'])->name('dashboard');

    // 2. Rute History (HARUS ADA SEBELUM RESOURCE AGAR TIDAK BENTROK)
    Route::get('/reservations/history', [\App\Http\Controllers\Customer\ReservationController::class, 'history'])->name('reservations.history');

    // 3. Resource Reservation
    Route::resource('reservations', \App\Http\Controllers\Customer\ReservationController::class)->only(['create', 'store', 'show']);
});


/*
|--------------------------------------------------------------------------
| Admin Routes (Auth + Role: admin)
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', AdminDashboardController::class)->name('dashboard');

    Route::resource('/users', UserController::class)->except(['show']);
    Route::resource('/services', AdminServiceController::class)->except(['show']);
    Route::resource('/vouchers', VoucherController::class)->except(['show']);

    Route::get('/settings/operational', [SettingController::class, 'operational'])->name('settings.operational');
    Route::put('/settings/operational', [SettingController::class, 'updateOperational'])->name('settings.operational.update');

    Route::get('/reports', [ReportController::class, 'index'])->name('reports.index');

    Route::get('/feedback', [FeedbackController::class, 'index'])->name('feedback.index');
    Route::put('/feedback/{feedback}/read', [FeedbackController::class, 'markAsRead'])->name('feedback.read');
});


/*
|--------------------------------------------------------------------------
| Cashier Routes
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'role:kasir'])->prefix('cashier')->name('cashier.')->group(function () {
    Route::get('/dashboard', App\Http\Controllers\Cashier\DashboardController::class)->name('dashboard');
    Route::get('/pos', [App\Http\Controllers\Cashier\POSController::class, 'index'])->name('pos.index');
    Route::post('/pos', [App\Http\Controllers\Cashier\POSController::class, 'store'])->name('pos.store');



    Route::get('/transactions', [App\Http\Controllers\Cashier\TransactionController::class, 'index'])->name('transactions.index');
    Route::put('/transactions/{transaction}/validate', [App\Http\Controllers\Cashier\TransactionController::class, 'validatePayment'])->name('transactions.validate');

    Route::get('/queue', [App\Http\Controllers\Cashier\QueueController::class, 'index'])->name('queue.index');
    Route::put('/queue/{transaction}/assign', [App\Http\Controllers\Cashier\QueueController::class, 'assignEmployee'])->name('queue.assign');
    Route::put('/queue/{transaction}/status', [App\Http\Controllers\Cashier\QueueController::class, 'updateStatus'])->name('queue.status');

    Route::get('/employees', [EmployeeController::class, 'index'])->name('employees.index');
    Route::post('/employees', [EmployeeController::class, 'store'])->name('employees.store');
    Route::put('/employees/availability', [EmployeeController::class, 'updateAvailability'])->name('employees.availability.update');
    Route::put('/employees/{employee}/toggle', [EmployeeController::class, 'toggleActive'])->name('employees.toggle');
    Route::delete('/employees/{employee}', [EmployeeController::class, 'destroy'])->name('employees.destroy');

    Route::get('/history', [\App\Http\Controllers\Cashier\TransactionController::class, 'history'])->name('transactions.history');
});


/*
|--------------------------------------------------------------------------
| API & Profile Routes (Internal use, with Auth)
|--------------------------------------------------------------------------
*/
Route::middleware('auth')->group(function () {
    // --- Rute Profil Bawaan Breeze ---
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Mengecek Slot Jam Reservasi
    Route::get('/api/availability', [AvailabilityController::class, 'check'])->name('api.availability');

    // Validasi Voucher secara Real-time
    Route::post('/api/voucher/validate', function (Request $request, VoucherService $voucherService) {
        $request->validate([
            'code' => 'required|string',
            'price' => 'required|numeric'
        ]);
        return response()->json($voucherService->validateVoucher($request->code, $request->price));
    })->name('api.voucher.validate');
});

// Rute untuk Login Google
Route::middleware('guest')->group(function () {
    Route::get('/auth/google', [SocialiteController::class, 'redirectToGoogle'])->name('auth.google');
    Route::get('/auth/google/callback', [SocialiteController::class, 'handleGoogleCallback']);
});

/* Bawaan Laravel Breeze (Login, Register) */
require __DIR__.'/auth.php';
