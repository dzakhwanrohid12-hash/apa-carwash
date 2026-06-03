import MainLayout from "@/Layouts/MainLayout";
import { Head, Link } from "@inertiajs/react";
import {
    MonitorPlay,
    ListTodo,
    Car,
    CheckCircle,
    BellRing,
    ArrowRight,
    LayoutDashboard,
} from "lucide-react";
import { motion } from "framer-motion";

export default function CashierDashboard({
    activeQueue,
    completedToday,
    pendingReservations,
}) {
    // Variabel animasi untuk efek bertahap (staggered)
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <MainLayout>
            <Head title="Dashboard Kasir" />

            {/* Background Ornaments (Light Theme) */}
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
                    <LayoutDashboard size={28} />
                </div>
                <div>
                    <h1 className="text-3xl md:text-4xl font-display font-bold text-slate-800 mb-1">
                        Area <span className="text-amber-500">Kasir</span>
                    </h1>
                    <p className="text-slate-500 font-medium">
                        Pusat kendali transaksi walk-in, verifikasi pembayaran
                        online, dan pantauan antrean.
                    </p>
                </div>
            </motion.div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
            >
                {/* Alert Pending Reservations */}
                {pendingReservations > 0 && (
                    <motion.div
                        variants={itemVariants}
                        className="mb-8 bg-amber-50 border border-amber-200 p-5 rounded-[1.5rem] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/20 blur-2xl rounded-full pointer-events-none" />
                        <div className="flex items-center gap-4 relative z-10">
                            <div className="relative flex items-center justify-center p-2.5 bg-amber-100 rounded-xl text-amber-600">
                                <BellRing size={24} />
                                <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-amber-50 rounded-full animate-ping"></span>
                                <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-amber-50 rounded-full"></span>
                            </div>
                            <div>
                                <h3 className="text-amber-800 font-bold text-lg leading-tight">
                                    Butuh Perhatian Segera!
                                </h3>
                                <p className="text-amber-700/80 font-medium text-sm mt-0.5">
                                    Ada{" "}
                                    <strong className="text-amber-600 text-base">
                                        {pendingReservations}
                                    </strong>{" "}
                                    reservasi online yang menunggu untuk
                                    divalidasi.
                                </p>
                            </div>
                        </div>
                        <Link
                            href="/cashier/transactions"
                            className="w-full sm:w-auto px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-sm font-bold transition-all shadow-md shadow-amber-500/20 flex items-center justify-center gap-2 whitespace-nowrap relative z-10 hover:-translate-y-0.5"
                        >
                            Verifikasi Sekarang <ArrowRight size={16} />
                        </Link>
                    </motion.div>
                )}

                {/* Stat Cards (Redesigned Inline for Theme Consistency) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <motion.div
                        variants={itemVariants}
                        className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden group hover:-translate-y-1 transition-transform"
                    >
                        <div className="absolute top-0 right-0 w-24 h-24 bg-sky-400/10 blur-2xl rounded-full pointer-events-none" />
                        <div className="flex justify-between items-start relative z-10">
                            <div>
                                <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">
                                    Antrean Aktif Saat Ini
                                </p>
                                <h3 className="text-4xl font-display font-bold text-slate-800">
                                    {activeQueue}
                                </h3>
                            </div>
                            <div className="p-3 bg-sky-50 rounded-2xl text-sky-500 shadow-sm">
                                <Car size={24} />
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden group hover:-translate-y-1 transition-transform"
                    >
                        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-400/10 blur-2xl rounded-full pointer-events-none" />
                        <div className="flex justify-between items-start relative z-10">
                            <div>
                                <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">
                                    Pencucian Selesai Hari Ini
                                </p>
                                <h3 className="text-4xl font-display font-bold text-slate-800">
                                    {completedToday}
                                </h3>
                            </div>
                            <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-500 shadow-sm">
                                <CheckCircle size={24} />
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden group hover:-translate-y-1 transition-transform"
                    >
                        <div className="absolute top-0 right-0 w-24 h-24 bg-amber-400/10 blur-2xl rounded-full pointer-events-none" />
                        <div className="flex justify-between items-start relative z-10">
                            <div>
                                <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">
                                    Menunggu Verifikasi (Online)
                                </p>
                                <h3 className="text-4xl font-display font-bold text-amber-500">
                                    {pendingReservations}
                                </h3>
                            </div>
                            <div className="p-3 bg-amber-50 rounded-2xl text-amber-500 shadow-sm">
                                <ListTodo size={24} />
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Quick Action Links */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Action 1: POS (Navy Theme) */}
                    <motion.div variants={itemVariants}>
                        <Link
                            href="/cashier/pos"
                            className="group relative block p-8 bg-slate-900 rounded-[2.5rem] border border-slate-800 shadow-xl hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-300 overflow-hidden hover:-translate-y-1"
                        >
                            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-400/10 blur-3xl rounded-full pointer-events-none transition-transform group-hover:scale-125" />

                            <div className="relative z-10 flex flex-col h-full">
                                <div className="p-4 bg-slate-800 rounded-2xl w-fit mb-6 text-amber-400 group-hover:text-amber-300 transition-colors shadow-inner">
                                    <MonitorPlay size={36} />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">
                                    Buka POS (Point of Sales)
                                </h3>
                                <p className="text-slate-400 text-sm font-medium mb-6">
                                    Catat transaksi pelanggan yang datang
                                    langsung (Walk-in) ke kedai dan cetak struk
                                    pembayaran.
                                </p>
                                <div className="mt-auto flex items-center text-amber-400 text-sm font-bold">
                                    Buat Transaksi Baru{" "}
                                    <ArrowRight
                                        size={16}
                                        className="ml-2 group-hover:translate-x-1 transition-transform"
                                    />
                                </div>
                            </div>
                        </Link>
                    </motion.div>

                    {/* Action 2: Antrean (Light Theme) */}
                    <motion.div variants={itemVariants}>
                        <Link
                            href="/cashier/queue"
                            className="group relative block p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-xl hover:shadow-2xl hover:shadow-sky-500/10 transition-all duration-300 overflow-hidden hover:-translate-y-1 h-full"
                        >
                            <div className="absolute top-0 right-0 w-48 h-48 bg-sky-400/5 blur-3xl rounded-full pointer-events-none transition-transform group-hover:scale-125" />

                            <div className="relative z-10 flex flex-col h-full">
                                <div className="p-4 bg-sky-50 border border-sky-100 rounded-2xl w-fit mb-6 text-sky-500 transition-colors shadow-sm">
                                    <Car size={36} />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-800 mb-2">
                                    Manajemen Antrean
                                </h3>
                                <p className="text-slate-500 text-sm font-medium mb-6">
                                    Tugaskan pekerja ke kendaraan yang akan
                                    dicuci dan perbarui status pengerjaan secara
                                    real-time.
                                </p>
                                <div className="mt-auto flex items-center text-sky-600 text-sm font-bold">
                                    Pantau Antrean{" "}
                                    <ArrowRight
                                        size={16}
                                        className="ml-2 group-hover:translate-x-1 transition-transform"
                                    />
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                </div>
            </motion.div>
        </MainLayout>
    );
}
