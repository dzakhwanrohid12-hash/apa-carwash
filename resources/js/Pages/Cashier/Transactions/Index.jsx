import MainLayout from "@/Layouts/MainLayout";
import { Head, useForm } from "@inertiajs/react";
import Table from "@/Components/UI/Table";
import { useState } from "react";
import { CheckCircle, XCircle, Eye, ShieldCheck, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function TransactionIndex({ reservations }) {
    const [selectedProof, setSelectedProof] = useState(null);
    const { put, processing } = useForm();

    const handleValidate = (id) => {
        if (
            confirm("Validasi pembayaran ini dan masukkan pesanan ke antrean?")
        ) {
            put(route("cashier.transactions.validate", id));
        }
    };

    const columns = [
        {
            header: "Kode / Waktu",
            render: (row) => (
                <div>
                    <span className="font-mono font-bold text-amber-600 px-2 py-1 bg-amber-50 border border-amber-100 rounded-md text-xs tracking-wider">
                        {row.id}
                    </span>
                    <span className="block text-xs text-slate-500 mt-1.5 font-medium">
                        {row.reservation_date} <br /> {row.reservation_time}
                    </span>
                </div>
            ),
        },
        {
            header: "Pelanggan",
            render: (row) => (
                <div className="flex items-start gap-3">
                    <div className="p-2 bg-slate-100 rounded-lg text-slate-400 mt-0.5">
                        <User size={16} />
                    </div>
                    <div>
                        <span className="font-bold text-slate-800 block">
                            {row.user?.name || "Tanpa Nama"}
                        </span>
                        <span className="inline-block px-2 py-0.5 mt-1 text-xs font-mono font-medium bg-slate-100 border border-slate-200 text-slate-500 rounded-md">
                            {row.vehicle_plate}
                        </span>
                    </div>
                </div>
            ),
        },
        {
            header: "Layanan",
            render: (row) => (
                <span className="text-slate-700 font-bold">
                    {row.service?.name}
                </span>
            ),
        },
        {
            header: "Total Harga",
            cellClassName: "font-mono font-bold text-lg text-slate-800",
            render: (row) =>
                `Rp ${new Intl.NumberFormat("id-ID").format(row.final_price)}`,
        },
        {
            header: "Status",
            render: (row) =>
                row.payment_status === "pending_payment" ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 text-orange-600 border border-orange-200 rounded-xl text-xs font-bold uppercase tracking-wider animate-pulse shadow-sm">
                        <ShieldCheck size={14} /> Menunggu Validasi
                    </span>
                ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-500 border border-slate-200 rounded-xl text-xs font-bold uppercase tracking-wider">
                        <CheckCircle size={14} /> Lunas
                    </span>
                ),
        },
        {
            header: "Aksi",
            cellClassName: "text-right",
            render: (row) => (
                <div className="flex items-center justify-end gap-2">
                    {/* Tombol Lihat Bukti Transfer */}
                    {row.payment_proof_path && (
                        <button
                            onClick={() => {
                                let proofUrl = row.payment_proof_path;
                                if (
                                    !proofUrl.startsWith("http") &&
                                    !proofUrl.startsWith("/storage/")
                                ) {
                                    proofUrl = `/storage/${proofUrl}`;
                                }
                                setSelectedProof(proofUrl);
                            }}
                            className="flex items-center gap-1.5 px-3 py-2 bg-slate-50 hover:bg-sky-50 border border-slate-200 hover:border-sky-300 text-slate-600 hover:text-sky-600 rounded-xl transition-all duration-300 shadow-sm font-bold text-xs whitespace-nowrap"
                            title="Lihat Bukti Transfer"
                        >
                            <Eye size={16} /> Cek Bukti
                        </button>
                    )}

                    {row.payment_status === "pending_payment" && (
                        <button
                            onClick={() => handleValidate(row.id)}
                            disabled={processing}
                            className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg font-bold text-xs whitespace-nowrap disabled:opacity-50"
                            title="Validasi Pembayaran Lunas"
                        >
                            <CheckCircle size={16} /> Validasi Lunas
                        </button>
                    )}
                </div>
            ),
        },
    ];

    return (
        <MainLayout>
            <Head title="Verifikasi Reservasi" />

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
                    <ShieldCheck size={28} />
                </div>
                <div>
                    <h1 className="text-3xl md:text-4xl font-display font-bold text-slate-800 mb-1">
                        Verifikasi{" "}
                        <span className="text-amber-500">Pembayaran</span>
                    </h1>
                    <p className="text-slate-500 font-medium">
                        Cek bukti transfer dan validasi pembayaran dari
                        pelanggan reservasi online.
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
                    data={reservations}
                    emptyMessage="Hore! Tidak ada reservasi yang perlu diverifikasi saat ini."
                />
            </motion.div>

            {/* Modal untuk Preview Gambar (Dipercantik) */}
            <AnimatePresence>
                {selectedProof && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md"
                        onClick={() => setSelectedProof(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative max-w-3xl w-full bg-white rounded-3xl p-2 shadow-2xl border border-white/20"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header Modal */}
                            <div className="absolute top-4 right-4 z-10 flex gap-2 bg-white/80 backdrop-blur-md p-1.5 rounded-full shadow-sm">
                                <button
                                    onClick={() => setSelectedProof(null)}
                                    className="p-2 bg-red-50 hover:bg-red-100 text-red-500 rounded-full transition-colors"
                                    title="Tutup Preview"
                                >
                                    <XCircle size={24} />
                                </button>
                            </div>

                            <div className="bg-slate-50 rounded-[1.5rem] border border-slate-100 overflow-hidden flex items-center justify-center min-h-[300px]">
                                <img
                                    src={selectedProof}
                                    alt="Bukti Transfer Pelanggan"
                                    className="w-full h-auto max-h-[80vh] object-contain"
                                    onError={(e) => {
                                        e.target.src =
                                            "https://via.placeholder.com/600x400?text=Gambar+Bukti+Tidak+Ditemukan";
                                    }}
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </MainLayout>
    );
}
