import MainLayout from "@/Layouts/MainLayout";
import { Head, useForm } from "@inertiajs/react";
import Table from "@/Components/UI/Table";
import { useState } from "react";
import { CheckCircle, XCircle, Eye } from "lucide-react";

export default function TransactionIndex({ reservations }) {
    const [selectedProof, setSelectedProof] = useState(null);
    const { put, processing } = useForm();

    const handleValidate = (id) => {
        if (confirm("Validasi pembayaran ini dan masukkan ke antrean?")) {
            put(route("cashier.transactions.validate", id));
        }
    };

    const columns = [
        {
            header: "Kode / Waktu",
            render: (row) => (
                <div>
                    <span className="font-mono text-neutral-50 block">
                        {row.id}
                    </span>
                    <span className="text-xs text-neutral-400">
                        {row.reservation_date} {row.reservation_time}
                    </span>
                </div>
            ),
        },
        {
            header: "Pelanggan",
            render: (row) => (
                <div>
                    <span className="font-medium text-neutral-50">
                        {row.user?.name}
                    </span>
                    <span className="block text-xs text-neutral-400 font-mono mt-0.5">
                        {row.vehicle_plate}
                    </span>
                </div>
            ),
        },
        { header: "Layanan", render: (row) => row.service?.name },
        {
            header: "Total",
            cellClassName: "font-mono text-primary-300",
            render: (row) =>
                `Rp ${new Intl.NumberFormat("id-ID").format(row.final_price)}`,
        },
        {
            header: "Status",
            render: (row) =>
                row.payment_status === "pending_payment" ? (
                    <span className="px-2 py-1 bg-amber-500/10 text-amber-400 rounded text-xs font-bold uppercase tracking-wider">
                        Menunggu
                    </span>
                ) : (
                    <span className="px-2 py-1 bg-secondary-700 text-neutral-400 rounded text-xs font-bold uppercase tracking-wider">
                        Lunas
                    </span>
                ),
        },
        {
            header: "Aksi",
            cellClassName: "text-right",
            render: (row) => (
                <div className="flex items-center justify-end gap-2">
                    {/* PERBAIKAN: Tombol Lihat Bukti Transfer */}
                    {row.payment_proof_path && (
                        <button
                            onClick={() => {
                                let proofUrl = row.payment_proof_path;
                                // Pastikan awalan URL adalah /storage/
                                if (
                                    !proofUrl.startsWith("http") &&
                                    !proofUrl.startsWith("/storage/")
                                ) {
                                    proofUrl = `/storage/${proofUrl}`;
                                }
                                setSelectedProof(proofUrl);
                            }}
                            className="p-2 bg-secondary-900 border border-tertiary-700 rounded-lg text-primary-300 transition-all duration-300 hover:bg-neutral-500/10 hover:shadow-[0_4px_15px_rgba(0,0,0,0.3)]"
                            title="Lihat Bukti"
                        >
                            <Eye size={18} />
                        </button>
                    )}
                    {row.payment_status === "pending_payment" && (
                        <>
                            <button
                                onClick={() => handleValidate(row.id)}
                                disabled={processing}
                                className="p-2 bg-secondary-900 border border-tertiary-700 rounded-lg text-primary-300 transition-all duration-300 hover:bg-neutral-500/10 hover:shadow-[0_4px_15px_rgba(0,0,0,0.3)]"
                                title="Validasi Lunas"
                            >
                                <CheckCircle size={18} />
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

            <div className="mb-8">
                <h1 className="text-3xl font-display font-bold text-neutral-50">
                    Verifikasi Pembayaran
                </h1>
                <p className="text-neutral-400">
                    Validasi bukti transfer dari pelanggan reservasi online.
                </p>
            </div>

            <Table
                columns={columns}
                data={reservations}
                emptyMessage="Tidak ada reservasi yang perlu diverifikasi."
            />

            {/* Modal untuk Preview Gambar */}
            {selectedProof && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                    onClick={() => setSelectedProof(null)}
                >
                    <div
                        className="relative max-w-3xl w-full bg-secondary-900 rounded-2xl p-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={selectedProof}
                            alt="Bukti Transfer"
                            className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                            onError={(e) => {
                                e.target.src =
                                    "https://via.placeholder.com/600x400?text=Gambar+Tidak+Ditemukan";
                            }}
                        />
                        <button
                            onClick={() => setSelectedProof(null)}
                            className="absolute top-6 right-6 p-2 bg-secondary-950 rounded-full text-neutral-400 hover:text-white"
                        >
                            <XCircle size={24} />
                        </button>
                    </div>
                </div>
            )}
        </MainLayout>
    );
}
