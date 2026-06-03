import MainLayout from "@/Layouts/MainLayout";
import { Head } from "@inertiajs/react";
import Table from "@/Components/UI/Table";
import StatusBadge from "@/Components/Shared/StatusBadge";
import { History as HistoryIcon, Car, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function History({ transactions = [] }) {
    // Saya ubah tabel HTML manual menjadi format array columns agar menggunakan <Table /> yang konsisten
    const columns = [
        {
            header: "Kode / Waktu",
            render: (row) => (
                <div>
                    <span className="font-mono font-bold text-amber-600 px-2 py-1 bg-amber-50 border border-amber-100 rounded-md text-xs tracking-wider">
                        {row.transaction_code}
                    </span>
                    <span className="block text-xs text-slate-500 mt-1.5 font-medium">
                        {new Date(row.created_at).toLocaleString("id-ID")}
                    </span>
                </div>
            ),
        },
        {
            header: "Layanan & Kendaraan",
            render: (row) => (
                <div className="flex items-start gap-3">
                    <div className="p-2 bg-slate-100 rounded-lg text-slate-400 mt-0.5">
                        <Car size={16} />
                    </div>
                    <div>
                        <span className="font-bold text-slate-800 block uppercase">
                            {row.vehicle_plate || "TANPA IDENTITAS"}
                        </span>
                        <span className="block text-xs text-slate-500 mt-0.5">
                            {row.service?.name}
                        </span>
                    </div>
                </div>
            ),
        },
        {
            header: "Pekerja Terpilih",
            render: (row) =>
                row.employee ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-sky-50 text-sky-700 border border-sky-100 rounded-xl text-xs font-bold tracking-wider">
                        {row.employee.name}
                    </span>
                ) : (
                    <span className="text-slate-400 italic text-sm font-medium">
                        Belum Ditentukan
                    </span>
                ),
        },
        {
            header: "Nominal & Metode",
            render: (row) => (
                <div>
                    <span className="font-mono font-bold text-lg text-slate-800 block leading-none">
                        Rp {parseFloat(row.total).toLocaleString("id-ID")}
                    </span>
                    <span className="inline-block mt-1 px-2 py-0.5 bg-slate-100 border border-slate-200 rounded text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        {row.payment_method}
                    </span>
                </div>
            ),
        },
        {
            header: "Status Transaksi",
            render: (row) => (
                <div className="flex flex-col gap-2 items-start">
                    <StatusBadge status={row.status} />
                    {row.payment_status === "lunas" && (
                        <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-50 text-emerald-600 border border-emerald-200 px-2 py-1 rounded-lg font-bold uppercase tracking-wider shadow-sm">
                            <CheckCircle2 size={12} /> LUNAS
                        </span>
                    )}
                </div>
            ),
        },
    ];

    return (
        <MainLayout>
            <Head title="Riwayat Seluruh Transaksi" />

            {/* Background Ornaments */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
                <div className="absolute left-[-10%] top-[10%] w-[500px] h-[500px] rounded-full bg-amber-400/10 blur-[120px]" />
                <div className="absolute right-[-10%] bottom-[10%] w-[600px] h-[600px] rounded-full bg-sky-300/10 blur-[120px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8 flex items-center gap-4"
            >
                <div className="p-3.5 bg-amber-50 border border-amber-100 rounded-2xl text-amber-500 shadow-sm">
                    <HistoryIcon size={28} />
                </div>
                <div>
                    <h1 className="text-3xl md:text-4xl font-display font-bold text-slate-800 mb-1">
                        Riwayat{" "}
                        <span className="text-amber-500">Transaksi</span>
                    </h1>
                    <p className="text-slate-500 font-medium">
                        Lacak semua data pesanan pelanggan, status pencucian,
                        dan rekaman pembayaran.
                    </p>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden"
            >
                <Table
                    columns={columns}
                    data={transactions}
                    emptyMessage="Belum ada riwayat transaksi yang terekam pada sistem."
                />
            </motion.div>
        </MainLayout>
    );
}
