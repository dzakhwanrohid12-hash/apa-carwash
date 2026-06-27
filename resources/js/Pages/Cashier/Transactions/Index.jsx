import MainLayout from "@/Layouts/MainLayout";
import { Head, useForm } from "@inertiajs/react";
import Table from "@/Components/UI/Table";
import { useState } from "react";
import { CheckCircle, XCircle, Eye, ShieldCheck, User, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function TransactionIndex({ reservations }) {
    const [selectedProof, setSelectedProof] = useState(null);

    // State untuk Modal Penolakan
    const [rejectingId, setRejectingId] = useState(null);

    // Form untuk Validasi Lunas (tanpa data tambahan)
    const { put: putValidate, processing: processingValidate } = useForm();

    // Form khusus untuk Penolakan (wajib isi alasan/notes)
    const { data: rejectData, setData: setRejectData, put: putReject, processing: processingReject, errors: rejectErrors, reset: resetReject, clearErrors } = useForm({
        notes: ''
    });

    // Handler Validasi Lunas
    const handleValidate = (id) => {
        if (confirm("Validasi pembayaran ini dan masukkan pesanan ke antrean?")) {
            putValidate(route("cashier.transactions.validate", id));
        }
    };

    // Handler Buka Modal Tolak
    const openRejectModal = (id) => {
        setRejectingId(id);
        resetReject();
        clearErrors();
    };

    // Handler Tutup Modal Tolak
    const closeRejectModal = () => {
        setRejectingId(null);
        resetReject();
        clearErrors();
    };

    // Handler Submit Penolakan
    const submitReject = (e) => {
        e.preventDefault();
        putReject(route("cashier.transactions.reject", rejectingId), {
            onSuccess: () => closeRejectModal(),
        });
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

                    {/* Tombol Aksi Kasir (Hanya jika masih pending) */}
                    {row.payment_status === "pending_payment" && (
                        <>
                            <button
                                onClick={() => openRejectModal(row.id)}
                                disabled={processingValidate || processingReject}
                                className="flex items-center gap-1.5 px-3 py-2 bg-red-50 hover:bg-red-100 border border-red-200 hover:border-red-300 text-red-600 hover:text-red-700 rounded-xl transition-all duration-300 shadow-sm font-bold text-xs whitespace-nowrap disabled:opacity-50"
                                title="Tolak Pembayaran"
                            >
                                <XCircle size={16} /> Tolak
                            </button>

                            <button
                                onClick={() => handleValidate(row.id)}
                                disabled={processingValidate || processingReject}
                                className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg font-bold text-xs whitespace-nowrap disabled:opacity-50"
                                title="Validasi Pembayaran Lunas"
                            >
                                <CheckCircle size={16} /> Validasi Lunas
                            </button>
                        </>
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

            {/* Modal untuk Preview Gambar (Tampilan Bukti) */}
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

            {/* Modal Konfirmasi Penolakan (Wajib Isi Alasan) */}
            <AnimatePresence>
                {rejectingId && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md"
                        onClick={closeRejectModal}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative max-w-md w-full bg-white rounded-3xl p-8 shadow-2xl border border-slate-100"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center gap-4 mb-6 text-red-500">
                                <div className="p-3 bg-red-50 rounded-2xl">
                                    <AlertTriangle size={32} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-800">Tolak Pembayaran</h3>
                                    <p className="text-sm text-slate-500">Berikan alasan mengapa bukti tidak valid.</p>
                                </div>
                            </div>

                            <form onSubmit={submitReject}>
                                <div className="mb-6">
                                    <textarea
                                        value={rejectData.notes}
                                        onChange={e => setRejectData('notes', e.target.value)}
                                        placeholder="Contoh: Bukti transfer buram / nominal tidak sesuai tagihan."
                                        rows="4"
                                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-red-500/10 focus:border-red-500 text-slate-700 outline-none transition-all resize-none"
                                        required
                                    ></textarea>
                                    {rejectErrors.notes && <p className="text-sm text-red-500 mt-2 pl-1">{rejectErrors.notes}</p>}
                                </div>

                                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                                    <button
                                        type="button"
                                        onClick={closeRejectModal}
                                        disabled={processingReject}
                                        className="px-5 py-3 text-slate-500 font-bold hover:bg-slate-50 rounded-xl transition-colors"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processingReject || !rejectData.notes.trim()}
                                        className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition-colors shadow-lg shadow-red-500/20 disabled:opacity-50"
                                    >
                                        Tolak Sekarang
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </MainLayout>
    );
}
