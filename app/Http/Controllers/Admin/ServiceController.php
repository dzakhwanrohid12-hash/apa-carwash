<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Service;
use App\Models\ServiceCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiceController extends Controller
{
    public function index()
    {
        $services = Service::with('category')->latest()->get();
        return Inertia::render('Admin/Services/Index', compact('services'));
    }

    public function create()
    {
        $categories = ServiceCategory::all();
        return Inertia::render('Admin/Services/Create', compact('categories'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'service_category_id' => 'required|exists:service_categories,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'duration_minutes' => 'required|integer|min:5',
            'is_active' => 'boolean'
        ]);

        // Cek duplikasi nama di kategori yang sama
        if (Service::where('service_category_id', $validated['service_category_id'])
                   ->where('name', $validated['name'])->exists()) {
            return back()->withErrors(['name' => 'Layanan dengan nama ini sudah ada di kategori tersebut.']);
        }

        Service::create($validated);

        return redirect()->route('admin.services.index')->with('success', 'Layanan berhasil ditambahkan.');
    }

    public function edit(Service $service)
    {
        $categories = ServiceCategory::all();
        return Inertia::render('Admin/Services/Edit', compact('service', 'categories'));
    }

    public function update(Request $request, Service $service)
    {
        $validated = $request->validate([
            'service_category_id' => 'required|exists:service_categories,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'duration_minutes' => 'required|integer|min:5',
            'is_active' => 'boolean'
        ]);

        $service->update($validated);

        return redirect()->route('admin.services.index')->with('success', 'Layanan berhasil diperbarui.');
    }
}
