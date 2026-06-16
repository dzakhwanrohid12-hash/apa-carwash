<?php

namespace App\Http\Controllers\Cashier;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    public function index()
    {
        // Hanya kirim data master karyawan ke frontend (UI Index.jsx yang baru)
        $employees = Employee::latest()->get();

        return Inertia::render('Cashier/Employees/Index', [
            'employees' => $employees,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:20',
        ]);

        // Karyawan baru defaultnya langsung aktif
        $validated['is_active'] = true;

        Employee::create($validated);
        return back()->with('success', 'Karyawan berhasil ditambahkan.');
    }

    public function toggleActive(Employee $employee)
    {
        $employee->update(['is_active' => !$employee->is_active]);
        return back()->with('success', 'Status karyawan berhasil diubah.');
    }

    public function destroy(Employee $employee)
    {
        $employee->delete();
        return back()->with('success', 'Karyawan berhasil dihapus secara permanen.');
    }
}
