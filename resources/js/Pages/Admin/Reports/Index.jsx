import MainLayout from "@/Layouts/MainLayout";
import { Head, router } from "@inertiajs/react";
import Table from "@/Components/UI/Table";
import {
    Wallet,
    Activity,
    TrendingUp,
    Search,
    Calendar as CalendarIcon,
    Printer,
} from "lucide-react";
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
import { motion } from "framer-motion";

export default function ReportIndex({
    transactions,
    stats,
    chartData,
    filters,
}) {
    const [start, setStart] = useState(filters.start || "");
    const [end, setEnd] = useState(filters.end || "");

    const handleFilter = (e) => {
        e.preventDefault();
        router.get("/admin/reports", { start, end }, { preserveState: true });
    };

    const columns = [
        {
            header: "Tanggal",
            render: (row) => (
                <div className="flex items-center gap-2 text-slate-600 font-medium">
                    <CalendarIcon size={14} className="text-amber-500" />
                    {new Date(row.created_at).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </div>
            ),
        },
        {
            header: "Kode Transaksi",
            render: (row) => (
                <span className="font-mono font-bold text-amber-600 px-3 py-1.5 bg-amber-50 border border-amber-100 rounded-lg tracking-wider text-xs">
                    {row.transaction_code}
                </span>
            ),
        },
        {
            header: "Layanan & Kendaraan",
            render: (row) => (
                <div>
                    <span className="text-slate-800 font-bold block">
                        {row.service?.name || "Layanan Dihapus"}
                    </span>
                    <span className="inline-block px-2 py-0.5 mt-1 text-xs font-mono font-medium bg-slate-100 border border-slate-200 text-slate-500 rounded-md">
                        {row.vehicle_plate || "Walk-in"}
                    </span>
                </div>
            ),
        },
        {
            header: "Kasir",
            render: (row) => (
                <span className="text-slate-600 font-medium">
                    {row.cashier?.name || "-"}
                </span>
            ),
        },
        {
            header: "Metode",
            render: (row) => (
                <span className="uppercase text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-lg bg-sky-50 text-sky-600 border border-sky-100 shadow-sm">
                    {row.payment_method}
                </span>
            ),
        },
        {
            header: "Total",
            className: "text-right",
            cellClassName:
                "text-right font-mono font-bold text-lg text-slate-800",
            render: (row) =>
                `Rp ${new Intl.NumberFormat("id-ID").format(row.total)}`,
        },
    ];

    return (
        <MainLayout>
            <Head title="Laporan & Statistik" />

            {/* Background Ornaments */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
                <div className="absolute left-[-10%] top-[10%] w-[500px] h-[500px] rounded-full bg-amber-400/10 blur-[120px]" />
                <div className="absolute right-[-10%] bottom-[10%] w-[600px] h-[600px] rounded-full bg-sky-300/10 blur-[120px]" />
            </div>

 {/* Header & Filter */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8 flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6"
            >
                <div>
                    <h1 className="text-3xl md:text-4xl font-display font-bold text-slate-800 mb-2">
                        Laporan{" "}
                        <span className="text-amber-500">Transaksi</span>
                    </h1>
                    <p className="text-slate-500 font-medium">
                        Analisis pendapatan dan rekapitulasi data layanan kedai.
                    </p>
                </div>

                {/* WRAPPER BARU UNTUK FORM DAN TOMBOL PDF */}
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full xl:w-auto">
                    <form
                        onSubmit={handleFilter}
                        className="flex flex-col sm:flex-row items-center gap-3 bg-white p-2.5 rounded-2xl border border-slate-200 shadow-lg shadow-slate-200/40 w-full sm:w-auto"
                    >
                        <div className="flex items-center gap-2 w-full sm:w-auto px-2">
                            <input
                                type="date"
                                value={start}
                                onChange={(e) => setStart(e.target.value)}
                                className="w-full sm:w-auto bg-slate-50 border-slate-200 text-slate-700 font-medium text-sm rounded-xl focus:ring-4 focus:ring-amber-400/20 focus:border-amber-400"
                            />
                            <span className="text-slate-400 font-bold">-</span>
                            <input
                                type="date"
                                value={end}
                                onChange={(e) => setEnd(e.target.value)}
                                className="w-full sm:w-auto bg-slate-50 border-slate-200 text-slate-700 font-medium text-sm rounded-xl focus:ring-4 focus:ring-amber-400/20 focus:border-amber-400"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full sm:w-auto px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                        >
                            <Search size={18} />{" "}
                            <span className="sm:hidden">Terapkan Filter</span>
                        </button>
                    </form>

                    {/* TOMBOL EXPORT PDF */}
                    <a
                        href={`/admin/reports/export-pdf?start=${start}&end=${end}`}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full sm:w-auto px-6 py-3.5 bg-red-500 hover:bg-red-600 text-white font-bold rounded-2xl transition-all shadow-lg shadow-red-500/20 flex items-center justify-center gap-2"
                    >
                        <Printer size={18} /> <span>Cetak PDF</span>
                    </a>
                </div>
            </motion.div>

            {/* Custom Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {/* Card 1: Pendapatan */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden group hover:-translate-y-1 transition-transform"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 blur-2xl rounded-full pointer-events-none" />
                    <div className="flex justify-between items-start relative z-10">
                        <div>
                            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">
                                Total Pendapatan ({chartData.length} hari)
                            </p>
                            <h3 className="text-3xl font-display font-bold text-slate-800">
                                <span className="text-xl text-slate-400 mr-1">
                                    Rp
                                </span>
                                {new Intl.NumberFormat("id-ID").format(
                                    stats.total_revenue,
                                )}
                            </h3>
                        </div>
                        <div className="p-3 bg-amber-50 rounded-2xl text-amber-500 shadow-sm">
                            <Wallet size={24} />
                        </div>
                    </div>
                </motion.div>

                {/* Card 2: Volume */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden group hover:-translate-y-1 transition-transform"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-sky-400/10 blur-2xl rounded-full pointer-events-none" />
                    <div className="flex justify-between items-start relative z-10">
                        <div>
                            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">
                                Volume Transaksi
                            </p>
                            <h3 className="text-3xl font-display font-bold text-slate-800">
                                {stats.total_transactions}{" "}
                                <span className="text-lg text-slate-400 font-medium">
                                    Unit
                                </span>
                            </h3>
                        </div>
                        <div className="p-3 bg-sky-50 rounded-2xl text-sky-500 shadow-sm">
                            <Activity size={24} />
                        </div>
                    </div>
                </motion.div>

                {/* Card 3: Rata-rata */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden group hover:-translate-y-1 transition-transform"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/10 blur-2xl rounded-full pointer-events-none" />
                    <div className="flex justify-between items-start relative z-10">
                        <div>
                            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">
                                Rata-rata Transaksi
                            </p>
                            <h3 className="text-3xl font-display font-bold text-slate-800">
                                <span className="text-xl text-slate-400 mr-1">
                                    Rp
                                </span>
                                {new Intl.NumberFormat("id-ID").format(
                                    Math.round(stats.avg_transaction),
                                )}
                            </h3>
                        </div>
                        <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-500 shadow-sm">
                            <TrendingUp size={24} />
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Chart Area (Diubah ke Tema Terang) */}
            {chartData.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 mb-10"
                >
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-2.5 bg-slate-900 rounded-xl text-amber-400 shadow-sm">
                            <TrendingUp size={20} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800">
                            Grafik Pendapatan
                        </h3>
                    </div>

                    <div className="h-80 w-full pr-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartData}>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="#f1f5f9" // Garis grid sangat tipis (slate-100)
                                    vertical={false}
                                />
                                <XAxis
                                    dataKey="date"
                                    stroke="#94a3b8" // Teks Axis slate-400
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    dy={10}
                                />
                                <YAxis
                                    stroke="#94a3b8"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(val) => `Rp${val / 1000}k`}
                                    dx={-10}
                                />
                                <Tooltip
                                    cursor={{
                                        stroke: "#e2e8f0",
                                        strokeWidth: 2,
                                        strokeDasharray: "5 5",
                                    }}
                                    contentStyle={{
                                        backgroundColor: "#ffffff",
                                        borderColor: "#e2e8f0",
                                        borderRadius: "16px",
                                        boxShadow:
                                            "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
                                        padding: "12px 16px",
                                    }}
                                    itemStyle={{
                                        color: "#d97706",
                                        fontWeight: "bold",
                                        fontSize: "16px",
                                    }}
                                    labelStyle={{
                                        color: "#64748b",
                                        fontSize: "12px",
                                        marginBottom: "4px",
                                    }}
                                    formatter={(value) => [
                                        `Rp ${new Intl.NumberFormat("id-ID").format(value)}`,
                                        "Pendapatan",
                                    ]}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke="#f59e0b" // Warna Amber-500
                                    strokeWidth={4}
                                    dot={{
                                        r: 5,
                                        fill: "#ffffff",
                                        stroke: "#f59e0b",
                                        strokeWidth: 2,
                                    }}
                                    activeDot={{
                                        r: 8,
                                        fill: "#f59e0b",
                                        stroke: "#ffffff",
                                        strokeWidth: 3,
                                    }}
                                    animationDuration={1500}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>
            )}

            {/* Data Table */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden mb-8"
            >
                <div className="p-6 md:p-8 border-b border-slate-100">
                    <h3 className="text-xl font-bold text-slate-800">
                        Rincian Transaksi
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                        Histori transaksi lunas sesuai filter tanggal.
                    </p>
                </div>
                <Table
                    columns={columns}
                    data={transactions}
                    emptyMessage="Tidak ada transaksi lunas pada periode ini."
                />
            </motion.div>
        </MainLayout>
    );
}
