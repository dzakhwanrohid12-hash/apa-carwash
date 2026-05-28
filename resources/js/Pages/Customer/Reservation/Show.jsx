import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link } from "@inertiajs/react";
import {
    CheckCircle,
    Clock,
    Info,
    ArrowLeft,
    Receipt,
    Car,
    MapPin,
} from "lucide-react";

export default function ShowReservation({ reservation }) {
    // Fungsi untuk menerjemahkan status pembayaran menjadi badge cantik
    const getPaymentStatusBadge = (status) => {
        switch (status) {
            case "pending_payment":
                return (
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-bold">
                        <Clock size={16} /> Menunggu Konfirmasi Kasir
                    </div>
                );
            case "paid":
            case "lunas":
                return (
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-bold">
                        <CheckCircle size={16} /> Pembayaran Diterima
                    </div>
                );
            case "rejected":
                return (
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-bold">
                        <Info size={16} /> Pembayaran Ditolak
                    </div>
                );
            default:
                return null;
        }
    };

    // Fungsi untuk menerjemahkan status antrean
    const getQueueStatus = (status) => {
        const statuses = {
            menunggu: { text: "Menunggu Antrean", color: "text-amber-400" },
            diproses: { text: "Sedang Dicuci", color: "text-sky-400" },
            selesai: { text: "Selesai", color: "text-emerald-400" },
            dibatalkan: { text: "Dibatalkan", color: "text-red-400" },
        };
        const current = statuses[status] || statuses.menunggu;
        return (
            <span className={`font-bold ${current.color} uppercase`}>
                {current.text}
            </span>
        );
    };

    return (
        <GuestLayout>
            <Head title="Detail Reservasi" />

            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
                <Link
                    href={route("customer.dashboard")}
                    className="inline-flex items-center text-neutral-400 hover:text-primary-300 mb-8 transition-colors"
                >
                    <ArrowLeft size={18} className="mr-2" /> Kembali ke
                    Dashboard
                </Link>

                {/* Tiket Wrapper */}
                <div className="bg-secondary-800 rounded-3xl border border-tertiary-800/50 shadow-2xl overflow-hidden relative">
                    {/* Header Tiket */}
                    <div className="bg-secondary-900/80 p-8 border-b border-tertiary-800/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="p-4 bg-primary-300/10 rounded-2xl">
                                <Receipt
                                    className="text-primary-300"
                                    size={32}
                                />
                            </div>
                            <div>
                                <p className="text-neutral-400 text-sm font-bold uppercase tracking-wider mb-1">
                                    ID Reservasi
                                </p>
                                <h1 className="text-2xl font-mono font-bold text-neutral-50">
                                    #RES-
                                    {reservation.id.toString().padStart(4, "0")}
                                </h1>
                            </div>
                        </div>
                        <div className="flex flex-col items-start sm:items-end gap-2">
                            {getPaymentStatusBadge(reservation.payment_status)}
                        </div>
                    </div>

                    {/* Alert jika masih menunggu */}
                    {reservation.payment_status === "pending_payment" && (
                        <div className="bg-amber-500/10 p-4 border-b border-amber-500/20 flex gap-3 px-8">
                            <Info
                                className="text-amber-400 shrink-0 mt-0.5"
                                size={20}
                            />
                            <p className="text-sm text-amber-300/90 leading-relaxed">
                                Bukti pembayaran Anda sedang divalidasi oleh
                                kasir kami. Antrean kendaraan Anda akan otomatis
                                dikonfirmasi setelah pembayaran disahkan.
                            </p>
                        </div>
                    )}

                    {/* Jika ditolak */}
                    {reservation.payment_status === "rejected" &&
                        reservation.notes && (
                            <div className="bg-red-500/10 p-4 border-b border-red-500/20 flex gap-3 px-8">
                                <Info
                                    className="text-red-400 shrink-0 mt-0.5"
                                    size={20}
                                />
                                <div>
                                    <p className="text-sm font-bold text-red-400 mb-1">
                                        Pembayaran Ditolak
                                    </p>
                                    <p className="text-sm text-red-300/90">
                                        {reservation.notes}
                                    </p>
                                </div>
                            </div>
                        )}

                    {/* Body Tiket */}
                    <div className="p-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                            {/* Kiri: Jadwal & Kendaraan */}
                            <div className="space-y-6">
                                <div>
                                    <p className="text-sm text-neutral-500 font-bold uppercase tracking-wider mb-2">
                                        Jadwal Kedatangan
                                    </p>
                                    <div className="flex items-center gap-3 bg-secondary-900/50 p-4 rounded-xl border border-tertiary-800/30">
                                        <Clock
                                            className="text-primary-300"
                                            size={24}
                                        />
                                        <div>
                                            <p className="text-neutral-50 font-bold">
                                                {new Date(
                                                    reservation.reservation_date,
                                                ).toLocaleDateString("id-ID", {
                                                    weekday: "long",
                                                    day: "numeric",
                                                    month: "long",
                                                    year: "numeric",
                                                })}
                                            </p>
                                            <p className="font-mono text-primary-300 font-bold mt-1 text-lg">
                                                {reservation.reservation_time}{" "}
                                                WIB
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-sm text-neutral-500 font-bold uppercase tracking-wider mb-2">
                                        Informasi Kendaraan/Karpet
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <div className="p-3 bg-secondary-900 rounded-lg border border-tertiary-800/50">
                                            <Car
                                                className="text-neutral-400"
                                                size={20}
                                            />
                                        </div>
                                        <div>
                                            <p className="text-xl font-mono font-bold text-neutral-50 uppercase">
                                                {reservation.vehicle_plate ||
                                                    "Tanpa Label"}
                                            </p>
                                            <p className="text-neutral-400 text-sm">
                                                {reservation.vehicle_description ||
                                                    "-"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Kanan: Layanan & Status */}
                            <div className="space-y-6">
                                <div>
                                    <p className="text-sm text-neutral-500 font-bold uppercase tracking-wider mb-2">
                                        Detail Layanan
                                    </p>
                                    <div className="bg-secondary-900/50 p-4 rounded-xl border border-tertiary-800/30">
                                        <p className="text-neutral-50 font-bold text-lg">
                                            {reservation.service?.name}
                                        </p>
                                        <p className="text-neutral-400 text-sm mt-1">
                                            {reservation.service?.category
                                                ?.name || "Kategori Umum"}
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-sm text-neutral-500 font-bold uppercase tracking-wider mb-2">
                                        Status Pekerjaan
                                    </p>
                                    <div className="bg-secondary-900/50 p-4 rounded-xl border border-tertiary-800/30">
                                        {getQueueStatus(reservation.status)}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Garis Pemisah Tiket (Putus-putus) */}
                        <div className="relative flex items-center justify-center my-8">
                            <div className="absolute w-full border-t-2 border-dashed border-tertiary-700"></div>
                            <div className="absolute left-[-40px] w-8 h-8 bg-secondary-950 rounded-full"></div>
                            <div className="absolute right-[-40px] w-8 h-8 bg-secondary-950 rounded-full"></div>
                        </div>

                        {/* Ringkasan Pembayaran */}
                        <div>
                            <p className="text-sm text-neutral-500 font-bold uppercase tracking-wider mb-4">
                                Ringkasan Pembayaran (
                                {reservation.payment_method?.toUpperCase()})
                            </p>
                            <div className="space-y-3">
                                <div className="flex justify-between text-neutral-400">
                                    <span>Harga Layanan</span>
                                    <span>
                                        Rp{" "}
                                        {parseFloat(
                                            reservation.original_price,
                                        ).toLocaleString("id-ID")}
                                    </span>
                                </div>
                                {parseFloat(reservation.discount_amount) >
                                    0 && (
                                    <div className="flex justify-between text-emerald-400">
                                        <span>Diskon Promo</span>
                                        <span>
                                            - Rp{" "}
                                            {parseFloat(
                                                reservation.discount_amount,
                                            ).toLocaleString("id-ID")}
                                        </span>
                                    </div>
                                )}
                                <div className="flex justify-between text-xl font-bold text-primary-300 pt-3 border-t border-tertiary-800/50 mt-3">
                                    <span>Total Dibayar</span>
                                    <span>
                                        Rp{" "}
                                        {parseFloat(
                                            reservation.final_price,
                                        ).toLocaleString("id-ID")}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Bantuan */}
                <div className="mt-8 text-center text-sm text-neutral-500 flex items-center justify-center gap-2">
                    <MapPin size={16} /> Tunjukkan tiket ini kepada kasir saat
                    Anda tiba di lokasi.
                </div>
            </div>
        </GuestLayout>
    );
}
