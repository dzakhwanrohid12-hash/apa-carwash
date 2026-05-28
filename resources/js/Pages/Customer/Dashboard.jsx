import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import {
    CalendarClock,
    CheckCircle,
    Clock,
    Car,
    History,
    ArrowRight,
} from "lucide-react";
import StatusBadge from "@/Components/Shared/StatusBadge";

export default function Dashboard({
    activeReservations = [],
    stats = { active: 0, completed: 0 },
}) {
    // Mengambil data user yang sedang login untuk ucapan selamat datang
    const { auth } = usePage().props;

    return (
        <GuestLayout>
            <Head title="Dashboard Pelanggan" />

            {/* Container utama dengan max-width agar tidak melebar penuh dan tetap rapi di tengah */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header Section */}
                <div className="mb-10">
                    <h1 className="text-4xl font-display font-bold text-neutral-50 mb-2">
                        Selamat datang, {auth?.user?.name || "Pelanggan"}!
                    </h1>
                    <p className="text-neutral-400 text-lg">
                        Kelola kendaraan dan pantau reservasi Anda di sini.
                    </p>
                </div>

                {/* Area Statistik & Aksi Cepat */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {/* Card Reservasi Aktif */}
                    <div className="bg-secondary-800 p-6 rounded-2xl border border-tertiary-800/50 shadow-lg relative overflow-hidden">
                        <div className="flex justify-between items-start mb-4 relative z-10">
                            <div>
                                <p className="text-neutral-400 text-sm font-medium mb-1">
                                    Reservasi Aktif
                                </p>
                                <h3 className="text-4xl font-display font-bold text-neutral-50">
                                    {stats.active}
                                </h3>
                            </div>
                            <div className="p-3 bg-amber-500/10 rounded-xl text-amber-400">
                                <Clock size={28} />
                            </div>
                        </div>
                        {/* Icon Background Transparan */}
                        <div className="absolute -bottom-4 -right-4 text-amber-500/5 pointer-events-none">
                            <Clock size={100} />
                        </div>
                    </div>

                    {/* Card Total Selesai (Bisa diklik menuju riwayat) */}
                    <Link
                        href={route("customer.reservations.history")}
                        className="bg-secondary-800 p-6 rounded-2xl border border-tertiary-800/50 shadow-lg relative overflow-hidden hover:border-emerald-500/30 transition-colors group cursor-pointer block"
                    >
                        <div className="flex justify-between items-start mb-2 relative z-10">
                            <div>
                                <p className="text-neutral-400 text-sm font-medium mb-1">
                                    Total Selesai
                                </p>
                                <h3 className="text-4xl font-display font-bold text-neutral-50">
                                    {stats.completed}
                                </h3>
                            </div>
                            <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400 group-hover:scale-110 transition-transform">
                                <CheckCircle size={28} />
                            </div>
                        </div>
                        <div className="flex items-center text-xs text-emerald-400 font-medium relative z-10 mt-3 group-hover:text-emerald-300">
                            Lihat Riwayat{" "}
                            <ArrowRight size={14} className="ml-1" />
                        </div>
                        {/* Icon Background Transparan */}
                        <div className="absolute -bottom-4 -right-4 text-emerald-500/5 pointer-events-none">
                            <CheckCircle size={100} />
                        </div>
                    </Link>

                    {/* Card Buat Reservasi */}
                    <Link
                        href={route("customer.reservations.create")}
                        className="bg-primary-300/10 p-6 rounded-2xl border border-primary-300/30 shadow-[0_0_15px_rgba(242,201,76,0.15)] hover:bg-primary-300/20 hover:shadow-[0_0_25px_rgba(242,201,76,0.25)] transition-all group flex flex-col justify-center relative overflow-hidden"
                    >
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-2">
                                <CalendarClock
                                    size={28}
                                    className="text-primary-300 group-hover:scale-110 transition-transform"
                                />
                                <h3 className="text-xl font-bold text-primary-300">
                                    Buat Reservasi Baru
                                </h3>
                            </div>
                            <p className="text-neutral-400 text-sm leading-relaxed">
                                Pilih jadwal cuci tanpa perlu antre panjang di
                                kedai.
                            </p>
                        </div>
                        {/* Icon Background Transparan */}
                        <div className="absolute -bottom-4 -right-4 text-primary-300/5 group-hover:text-primary-300/10 transition-colors pointer-events-none">
                            <CalendarClock size={100} />
                        </div>
                    </Link>
                </div>

                {/* Area Daftar Reservasi Aktif & Tombol History */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary-300/10 rounded-lg">
                            <Clock className="text-primary-300" size={20} />
                        </div>
                        <h2 className="text-2xl font-display font-bold text-neutral-50">
                            Sedang Berjalan
                        </h2>
                    </div>

                    {/* Tombol Menuju Halaman Riwayat */}
                    <Link
                        href={route("customer.reservations.history")}
                        className="flex items-center gap-2 px-4 py-2.5 bg-secondary-800 border border-tertiary-700 rounded-xl text-sm font-bold text-neutral-300 hover:text-primary-300 hover:border-primary-300/50 hover:bg-secondary-700 transition-all shadow-sm"
                    >
                        <History size={16} />
                        Semua Riwayat
                    </Link>
                </div>

                {/* Grid Daftar Reservasi */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
                    {activeReservations.length > 0 ? (
                        activeReservations.map((res) => (
                            <div
                                key={res.id}
                                className="bg-secondary-800 p-6 rounded-2xl border border-tertiary-800/50 shadow-lg relative overflow-hidden hover:border-primary-300/30 transition-colors"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex items-center gap-4">
                                        <div className="p-4 bg-secondary-900 rounded-xl border border-tertiary-800/50 shadow-inner">
                                            <Car
                                                className="text-primary-300"
                                                size={28}
                                            />
                                        </div>
                                        <div>
                                            <h3 className="font-mono text-2xl font-bold text-neutral-50 uppercase tracking-wider">
                                                {res.vehicle_plate ||
                                                    "Tanpa Plat"}
                                            </h3>
                                            <p className="text-sm text-neutral-400 mt-0.5">
                                                {res.service?.name ||
                                                    "Layanan Tidak Diketahui"}
                                            </p>
                                        </div>
                                    </div>
                                    <StatusBadge status={res.status} />
                                </div>

                                <div className="bg-secondary-900/50 p-4 rounded-xl flex justify-between items-center border border-tertiary-800/50">
                                    <div className="flex flex-col">
                                        <span className="text-xs text-neutral-500 font-bold uppercase tracking-wider mb-1">
                                            Tanggal
                                        </span>
                                        <span className="text-sm font-medium text-neutral-200">
                                            {/* Format Tanggal menjadi lebih cantik (Cth: 24 Mei 2026) */}
                                            {new Date(
                                                res.reservation_date,
                                            ).toLocaleDateString("id-ID", {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric",
                                            })}
                                        </span>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className="text-xs text-neutral-500 font-bold uppercase tracking-wider mb-1">
                                            Waktu
                                        </span>
                                        <span className="font-mono text-lg text-primary-300 font-bold bg-primary-300/10 px-2 py-0.5 rounded-md">
                                            {res.reservation_time}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-16 flex flex-col items-center justify-center bg-secondary-800/30 border border-dashed border-tertiary-700/50 rounded-3xl">
                            <div className="p-4 bg-secondary-900 rounded-full mb-4 shadow-inner">
                                <Car className="text-tertiary-600" size={32} />
                            </div>
                            <h3 className="text-lg font-bold text-neutral-300 mb-2">
                                Belum ada reservasi aktif
                            </h3>
                            <p className="text-neutral-500 text-sm text-center max-w-sm leading-relaxed">
                                Anda tidak memiliki kendaraan yang sedang dicuci
                                atau menunggu. Silakan buat reservasi baru.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </GuestLayout>
    );
}
