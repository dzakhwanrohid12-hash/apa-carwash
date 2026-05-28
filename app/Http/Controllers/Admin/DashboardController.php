<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\ReportService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __invoke(Request $request, ReportService $reportService)
    {
        $period = $request->query('period', 'today');
        $summary = $reportService->getDashboardSummary($period);

        return Inertia::render('Admin/Dashboard', [
            'summary' => $summary,
            'filters' => ['period' => $period]
        ]);
    }
}
