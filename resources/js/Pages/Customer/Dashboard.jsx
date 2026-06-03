import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { motion } from "framer-motion";
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
    const { auth } = usePage().props;

    return (
        <GuestLayout>
            <Head title="Dashboard Pelanggan" />

            {/* Background Ornaments */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
                <div className="absolute left-[-10%] top-[5%] w-[500px] h-[500px] rounded-full bg-amber-400/10 blur-[100px]" />
                <div className="absolute right-[-5%] top-[40%] w-[600px] h-[600px] rounded-full bg-yellow-300/10 blur-[120px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-800 mb-3">
                        Selamat datang,{" "}
                        <span className="text-amber-500">
                            {auth?.user?.name || "Pelanggan"}
                        </span>
                        !
                    </h1>
                    <p className="text-slate-500 text-lg max-w-2xl">
                        Kelola kendaraan dan pantau progres reservasi cuci Anda
                        secara real-time di sini.
                    </p>
                </motion.div>

                {/* Area Statistik & Aksi Cepat */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    {/* Card Reservasi Aktif (Hanya Info) */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300"
                    >
                        <div className="flex justify-between items-start mb-4 relative z-10">
                            <div>
                                <p className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-2">
                                    Reservasi Aktif
                                </p>
                                <h3 className="text-5xl font-display font-bold text-slate-800">
                                    {stats.active}
                                </h3>
                            </div>
                            <div className="p-4 bg-amber-50 rounded-2xl text-amber-500 group-hover:scale-110 group-hover:bg-amber-100 transition-all duration-300 shadow-sm">
                                <Clock size={32} />
                            </div>
                        </div>
                        <div className="absolute -bottom-6 -right-6 text-amber-500/5 pointer-events-none group-hover:scale-110 transition-transform duration-500">
                            <Clock size={140} />
                        </div>
                    </motion.div>

                    {/* Card Total Selesai (PERBAIKAN: Dibungkus motion.div, isinya Link) */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <Link
                            href={route("customer.reservations.history")}
                            className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden group hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 cursor-pointer block h-full"
                        >
                            <div className="flex justify-between items-start mb-2 relative z-10">
                                <div>
                                    <p className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-2">
                                        Total Selesai
                                    </p>
                                    <h3 className="text-5xl font-display font-bold text-slate-800">
                                        {stats.completed}
                                    </h3>
                                </div>
                                <div className="p-4 bg-emerald-50 rounded-2xl text-emerald-500 group-hover:scale-110 group-hover:bg-emerald-100 transition-all duration-300 shadow-sm">
                                    <CheckCircle size={32} />
                                </div>
                            </div>
                            <div className="flex items-center text-sm text-emerald-500 font-bold relative z-10 mt-4 group-hover:text-emerald-600">
                                Lihat Riwayat Lengkap{" "}
                                <ArrowRight
                                    size={16}
                                    className="ml-1.5 group-hover:translate-x-1 transition-transform"
                                />
                            </div>
                            <div className="absolute -bottom-6 -right-6 text-emerald-500/5 pointer-events-none group-hover:scale-110 transition-transform duration-500">
                                <CheckCircle size={140} />
                            </div>
                        </Link>
                    </motion.div>

                    {/* Card Buat Reservasi (PERBAIKAN: Dibungkus motion.div, isinya Link) */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <Link
                            href={route("customer.reservations.create")}
                            className="bg-gradient-to-br from-yellow-400 to-amber-500 p-8 rounded-[2rem] shadow-xl shadow-amber-500/30 hover:shadow-2xl hover:shadow-amber-500/40 hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-center relative overflow-hidden h-full block"
                        >
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl text-white group-hover:scale-110 transition-transform shadow-sm">
                                        <CalendarClock size={28} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 font-display">
                                        Buat Reservasi
                                    </h3>
                                </div>
                                <p className="text-slate-900/80 font-medium leading-relaxed">
                                    Bebas antre. Pilih jadwal cuci sekarang dan
                                    nikmati pengalaman prioritas.
                                </p>
                            </div>
                            <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-white/30 blur-2xl rounded-full pointer-events-none" />
                            <div className="absolute -bottom-6 -right-6 text-slate-900/5 group-hover:text-slate-900/10 transition-colors pointer-events-none group-hover:scale-110 duration-500">
                                <CalendarClock size={140} />
                            </div>
                        </Link>
                    </motion.div>
                </div>

                {/* Area Daftar Reservasi Aktif & Tombol History */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
                >
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-amber-100 rounded-xl shadow-sm">
                            <Clock className="text-amber-500" size={24} />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-800">
                            Sedang Berjalan
                        </h2>
                    </div>

                    <Link
                        href={route("customer.reservations.history")}
                        className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:text-amber-600 hover:border-amber-300 hover:bg-amber-50 hover:shadow-sm transition-all"
                    >
                        <History size={18} />
                        Semua Riwayat
                    </Link>
                </motion.div>

                {/* Grid Daftar Reservasi */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-12">
                    {activeReservations.length > 0 ? (
                        activeReservations.map((res, index) => (
                            <motion.div
                                key={res.id}
                                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{
                                    delay: 0.5 + index * 0.1,
                                    duration: 0.5,
                                    type: "spring",
                                }}
                            >
                                <Link
                                    href={route(
                                        "customer.reservations.show",
                                        res.id,
                                    )}
                                    className="group block bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden hover:border-amber-200 hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300"
                                >
                                    <div className="absolute top-0 left-0 w-full h-1.5 bg-transparent group-hover:bg-amber-400 transition-colors duration-500" />

                                    <div className="flex justify-between items-start mb-8">
                                        <div className="flex items-center gap-5">
                                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm group-hover:bg-amber-50 group-hover:border-amber-100 transition-colors duration-300 text-slate-400 group-hover:text-amber-500">
                                                <Car size={32} />
                                            </div>
                                            <div>
                                                <h3 className="font-mono text-2xl font-bold text-slate-800 uppercase tracking-wider">
                                                    {res.vehicle_plate ||
                                                        "Tanpa Plat"}
                                                </h3>
                                                <p className="text-sm font-medium text-slate-500 mt-1">
                                                    {res.service?.name ||
                                                        "Layanan Tidak Diketahui"}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end gap-2 mt-1">
                                            <StatusBadge status={res.status} />
                                            <div className="flex items-center gap-1 text-xs font-bold text-amber-500 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                                Lihat Detail{" "}
                                                <ArrowRight size={14} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-slate-50 p-5 rounded-2xl flex flex-col sm:flex-row justify-between sm:items-center border border-slate-100 group-hover:border-amber-200/50 group-hover:bg-amber-50/50 transition-colors gap-4 sm:gap-0">
                                        <div className="flex flex-col">
                                            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                                                <CalendarClock size={14} />{" "}
                                                Tanggal Jadwal
                                            </span>
                                            <span className="text-base font-bold text-slate-700">
                                                {new Date(
                                                    res.reservation_date,
                                                ).toLocaleDateString("id-ID", {
                                                    day: "numeric",
                                                    month: "long",
                                                    year: "numeric",
                                                })}
                                            </span>
                                        </div>

                                        <div className="hidden sm:block w-px h-10 bg-slate-200 mx-4"></div>

                                        <div className="flex flex-col sm:items-end">
                                            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                                                <Clock size={14} /> Jam (WIB)
                                            </span>
                                            <span className="font-mono text-lg text-amber-600 font-bold bg-amber-100/60 px-3 py-1 rounded-lg border border-amber-200/50 shadow-sm w-fit">
                                                {res.reservation_time}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                            className="col-span-full py-20 flex flex-col items-center justify-center bg-white/50 backdrop-blur-sm border-2 border-dashed border-slate-200 rounded-[2.5rem] shadow-sm"
                        >
                            <div className="p-5 bg-slate-100 rounded-full mb-5 shadow-inner">
                                <Car className="text-slate-400" size={40} />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-700 mb-2 font-display">
                                Belum ada reservasi aktif
                            </h3>
                            <p className="text-slate-500 text-base text-center max-w-md leading-relaxed">
                                Anda tidak memiliki kendaraan yang sedang dicuci
                                atau masuk dalam antrean.
                                <br />
                                Silakan buat reservasi baru.
                            </p>
                        </motion.div>
                    )}
                </div>
            </div>
        </GuestLayout>
    );
}
