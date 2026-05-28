<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Feedback;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FeedbackController extends Controller
{
    // Untuk Guest/Customer
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:20',
            'message' => 'required|string|max:1000',
        ]);

        $validated['user_id'] = auth()->check() ? auth()->id() : null;

        Feedback::create($validated);

        return back()->with('success', 'Terima kasih! Pesan dan masukan Anda telah kami terima.');
    }

    // Untuk Admin (Menampilkan list)
    public function index()
    {
        $feedbacks = Feedback::latest()->paginate(15);
        return Inertia::render('Admin/Feedback/Index', compact('feedbacks'));
    }

    // Untuk Admin (Menandai sudah dibaca)
    public function markAsRead(Feedback $feedback)
    {
        $feedback->update(['is_read' => true]);
        return back()->with('success', 'Feedback ditandai telah dibaca.');
    }
}
