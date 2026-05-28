<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Voucher;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VoucherController extends Controller
{
    public function index()
    {
        $vouchers = Voucher::with('creator')->latest()->get();
        return Inertia::render('Admin/Vouchers/Index', compact('vouchers'));
    }

    public function create()
    {
        return Inertia::render('Admin/Vouchers/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'code' => 'required|string|max:20|unique:vouchers,code',
            'discount_type' => 'required|in:percentage,nominal',
            'discount_value' => 'required|numeric|min:0',
            'min_transaction' => 'required|numeric|min:0',
            'quota' => 'required|integer|min:1',
            'valid_from' => 'required|date',
            'valid_until' => 'required|date|after_or_equal:valid_from',
            'is_active' => 'boolean'
        ]);

        $validated['code'] = strtoupper($validated['code']);
        $validated['created_by'] = auth()->id();

        Voucher::create($validated);

        return redirect()->route('admin.vouchers.index')->with('success', 'Voucher berhasil ditambahkan.');
    }

    public function edit(Voucher $voucher)
    {
        return Inertia::render('Admin/Vouchers/Edit', compact('voucher'));
    }

    public function update(Request $request, Voucher $voucher)
    {
        // Hanya izinkan update kuota, tanggal kedaluwarsa, dan status
        $validated = $request->validate([
            'quota' => 'required|integer|min:' . $voucher->used_count, // Kuota tidak boleh lebih kecil dari yang sudah terpakai
            'valid_until' => 'required|date|after_or_equal:valid_from',
            'is_active' => 'boolean'
        ]);

        $voucher->update($validated);

        return redirect()->route('admin.vouchers.index')->with('success', 'Data voucher berhasil diperbarui.');
    }
}
