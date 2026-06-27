<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Laporan Pendapatan</title>
    <style>
        body { font-family: 'Helvetica', 'Arial', sans-serif; font-size: 12px; color: #333; }
        .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #f59e0b; padding-bottom: 10px; }
        .header h1 { margin: 0; color: #1e293b; font-size: 24px; }
        .header p { margin: 5px 0 0 0; color: #64748b; }
        .info-table { width: 100%; margin-bottom: 20px; }
        .info-table td { padding: 5px 0; }
        .summary-box { background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 15px; margin-bottom: 20px; text-align: center; border-radius: 8px; }
        .summary-box h3 { margin: 0 0 5px 0; color: #475569; font-size: 14px; }
        .summary-box p { margin: 0; font-size: 20px; font-weight: bold; color: #1e293b; }
        .data-table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        .data-table th, .data-table td { border: 1px solid #cbd5e1; padding: 8px; text-align: left; }
        .data-table th { background-color: #f1f5f9; font-weight: bold; color: #334155; }
        .text-right { text-align: right !important; }
        .text-center { text-align: center !important; }
        .footer { position: fixed; bottom: -10px; left: 0px; right: 0px; height: 30px; font-size: 10px; text-align: center; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 10px;}
    </style>
</head>
<body>
    <div class="header">
        <h1>APA CAR WASH</h1>
        <p>Jl. Tiram No.28, Pekanbaru | Telp: 0812-3456-7890</p>
    </div>

    <table class="info-table">
        <tr>
            <td><strong>Jenis Laporan:</strong> Rekapitulasi Pendapatan</td>
            <td class="text-right"><strong>Tanggal Cetak:</strong> {{ \Carbon\Carbon::now()->format('d M Y H:i') }}</td>
        </tr>
        <tr>
            <td><strong>Periode:</strong> {{ \Carbon\Carbon::parse($startDate)->format('d M Y') }} s.d {{ \Carbon\Carbon::parse($endDate)->format('d M Y') }}</td>
            <td class="text-right"><strong>Dicetak Oleh:</strong> {{ auth()->user()->name ?? 'Admin' }}</td>
        </tr>
    </table>

    <table class="info-table">
        <tr>
            <td>
                <div class="summary-box">
                    <h3>Total Transaksi</h3>
                    <p>{{ $stats['total_transactions'] }} Unit</p>
                </div>
            </td>
            <td style="width: 20px;"></td>
            <td>
                <div class="summary-box">
                    <h3>Total Pendapatan Bersih</h3>
                    <p>Rp {{ number_format($stats['total_revenue'], 0, ',', '.') }}</p>
                </div>
            </td>
        </tr>
    </table>

    <table class="data-table">
        <thead>
            <tr>
                <th class="text-center">No</th>
                <th>Tanggal</th>
                <th>Kode</th>
                <th>Layanan</th>
                <th>Plat / Pelanggan</th>
                <th>Kasir</th>
                <th class="text-right">Total (Rp)</th>
            </tr>
        </thead>
        <tbody>
            @forelse($transactions as $index => $row)
            <tr>
                <td class="text-center">{{ $index + 1 }}</td>
                <td>{{ $row->created_at->format('d/m/Y H:i') }}</td>
                <td>{{ $row->transaction_code }}</td>
                <td>{{ $row->service ? $row->service->name : '-' }}</td>
                <td>{{ $row->vehicle_plate ?? 'Walk-in' }}</td>
                <td>{{ $row->cashier ? $row->cashier->name : '-' }}</td>
                <td class="text-right">{{ number_format($row->total, 0, ',', '.') }}</td>
            </tr>
            @empty
            <tr>
                <td colspan="7" class="text-center">Tidak ada transaksi lunas pada periode ini.</td>
            </tr>
            @endforelse
        </tbody>
    </table>

    <div class="footer">
        Dokumen ini dihasilkan secara otomatis oleh Sistem Manajemen APA Car Wash. Valid pada tanggal dicetak.
    </div>
</body>
</html>
