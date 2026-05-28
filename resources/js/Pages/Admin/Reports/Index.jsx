import MainLayout from "@/Layouts/MainLayout";
import { Head, router } from "@inertiajs/react";
import StatCard from "@/Components/Shared/StatCard";
import Table from "@/Components/UI/Table";
import { Wallet, Activity, TrendingUp, Search } from "lucide-react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { useState } from "react";

export default function ReportIndex({
    transactions,
    stats,
    chartData,
    filters,
}) {
    const [start, setStart] = useState(filters.start);
    const [end, setEnd] = useState(filters.end);

    const handleFilter = (e) => {
        e.preventDefault();
        router.get("/admin/reports", { start, end }, { preserveState: true });
    };

    const columns = [
        {
            header: "Tanggal",
            render: (row) =>
                new Date(row.created_at).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                }),
        },
        {
            header: "Kode Transaksi",
            key: "transaction_code",
            className: "font-mono",
        },
        {
            header: "Layanan",
            render: (row) => (
                <div>
                    <span className="text-neutral-50 font-medium">
                        {row.service?.name}
                    </span>
                    <span className="block text-xs text-neutral-400 font-mono mt-1">
                        {row.vehicle_plate || "Walk-in"}
                    </span>
                </div>
            ),
        },
        { header: "Kasir", render: (row) => row.cashier?.name || "-" },
        {
            header: "Metode",
            render: (row) => (
                <span className="uppercase text-xs font-bold text-neutral-400">
                    {row.payment_method}
                </span>
            ),
        },
        {
            header: "Total",
            className: "text-right",
            cellClassName: "text-right font-mono font-bold text-primary-300",
            render: (row) =>
                `Rp ${new Intl.NumberFormat("id-ID").format(row.total)}`,
        },
    ];

    return (
        <MainLayout>
            <Head title="Laporan & Statistik" />

            <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-display font-bold text-neutral-50">
                        Laporan Transaksi
                    </h1>
                    <p className="text-neutral-400">
                        Analisis pendapatan dan rekapitulasi data layanan.
                    </p>
                </div>

                {/* Filter Tanggal */}
                <form
                    onSubmit={handleFilter}
                    className="flex items-center gap-2 bg-secondary-800 p-2 rounded-xl border border-tertiary-800/50"
                >
                    <input
                        type="date"
                        value={start}
                        onChange={(e) => setStart(e.target.value)}
                        className="bg-secondary-900 border-none text-neutral-50 text-sm rounded-lg focus:ring-primary-300"
                    />
                    <span className="text-neutral-500">-</span>
                    <input
                        type="date"
                        value={end}
                        onChange={(e) => setEnd(e.target.value)}
                        className="bg-secondary-900 border-none text-neutral-50 text-sm rounded-lg focus:ring-primary-300"
                    />
                    <button
                        type="submit"
                        className="p-2 bg-primary-300/10 text-primary-300 rounded-lg hover:bg-primary-300/20 transition-colors"
                    >
                        <Search size={18} />
                    </button>
                </form>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard
                    title={`Total Pendapatan (${chartData.length} hari)`}
                    value={new Intl.NumberFormat("id-ID").format(
                        stats.total_revenue,
                    )}
                    prefix="Rp "
                    icon={Wallet}
                />
                <StatCard
                    title="Volume Transaksi"
                    value={stats.total_transactions}
                    icon={Activity}
                />
                <StatCard
                    title="Rata-rata Nilai Transaksi"
                    value={new Intl.NumberFormat("id-ID").format(
                        Math.round(stats.avg_transaction),
                    )}
                    prefix="Rp "
                    icon={TrendingUp}
                />
            </div>

            {/* Chart Area */}
            {chartData.length > 0 && (
                <div className="bg-secondary-800 p-6 rounded-2xl border border-tertiary-800/50 shadow-lg mb-8">
                    <h3 className="text-lg font-bold mb-6 text-neutral-50">
                        Grafik Pendapatan
                    </h3>
                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartData}>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="#333333"
                                    vertical={false}
                                />
                                <XAxis
                                    dataKey="date"
                                    stroke="#999999"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis
                                    stroke="#999999"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(val) => `Rp${val / 1000}k`}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "#1A1A1A",
                                        borderColor: "#333333",
                                        borderRadius: "8px",
                                    }}
                                    itemStyle={{ color: "#F2C94C" }}
                                    formatter={(value) => [
                                        `Rp ${new Intl.NumberFormat("id-ID").format(value)}`,
                                        "Pendapatan",
                                    ]}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke="#F2C94C"
                                    strokeWidth={3}
                                    dot={{ r: 4, fill: "#F2C94C" }}
                                    activeDot={{ r: 6 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}

            {/* Data Table */}
            <div className="mb-8">
                <h3 className="text-lg font-bold mb-4 text-neutral-50">
                    Rincian Transaksi
                </h3>
                <Table
                    columns={columns}
                    data={transactions}
                    emptyMessage="Tidak ada transaksi lunas pada periode ini."
                />
            </div>
        </MainLayout>
    );
}
