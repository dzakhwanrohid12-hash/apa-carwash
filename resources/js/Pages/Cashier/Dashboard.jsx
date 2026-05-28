import MainLayout from "@/Layouts/MainLayout";
import { Head, Link } from "@inertiajs/react";
import StatCard from "@/Components/Shared/StatCard";
import { MonitorPlay, ListTodo, Car, CheckCircle } from "lucide-react";

export default function CashierDashboard({
    activeQueue,
    completedToday,
    pendingReservations,
}) {
    return (
        <MainLayout>
            <Head title="Dashboard Kasir" />

            <div className="mb-8">
                <h1 className="text-3xl font-display font-bold text-neutral-50">
                    Area Kasir
                </h1>
                <p className="text-neutral-400">
                    Kelola transaksi walk-in dan verifikasi pembayaran online.
                </p>
            </div>

            {pendingReservations > 0 && (
                <div className="mb-8 bg-amber-500/10 border border-amber-500/30 p-4 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-amber-500 rounded-full animate-ping"></div>
                        <p className="text-amber-400 font-medium">
                            Ada {pendingReservations} reservasi online menunggu
                            verifikasi pembayaran!
                        </p>
                    </div>
                    <Link
                        href="/cashier/transactions"
                        className="px-4 py-2 bg-amber-500/20 text-amber-300 rounded-lg text-sm font-bold hover:bg-amber-500/30"
                    >
                        Lihat Sekarang
                    </Link>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard
                    title="Antrean Aktif Saat Ini"
                    value={activeQueue}
                    icon={Car}
                />
                <StatCard
                    title="Selesai Hari Ini"
                    value={completedToday}
                    icon={CheckCircle}
                />
                <StatCard
                    title="Menunggu Verifikasi"
                    value={pendingReservations}
                    icon={ListTodo}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link
                    href="/cashier/pos"
                    className="group p-8 bg-gradient-to-br from-primary-900/40 to-secondary-800 rounded-2xl border border-primary-300/20 hover:border-primary-300/50 transition-all"
                >
                    <MonitorPlay
                        className="text-primary-300 mb-4 group-hover:scale-110 transition-transform"
                        size={40}
                    />
                    <h3 className="text-2xl font-bold text-neutral-50 mb-2">
                        POS Walk-in
                    </h3>
                    <p className="text-neutral-400 text-sm">
                        Catat transaksi pelanggan yang datang langsung ke kedai.
                    </p>
                </Link>
                <Link
                    href="/cashier/queue"
                    className="group p-8 bg-gradient-to-br from-secondary-800 to-secondary-900 rounded-2xl border border-tertiary-800/50 hover:border-primary-300/50 transition-all"
                >
                    <Car
                        className="text-primary-300 mb-4 group-hover:scale-110 transition-transform"
                        size={40}
                    />
                    <h3 className="text-2xl font-bold text-neutral-50 mb-2">
                        Manajemen Antrean
                    </h3>
                    <p className="text-neutral-400 text-sm">
                        Tugaskan karyawan dan update status pengerjaan.
                    </p>
                </Link>
            </div>
        </MainLayout>
    );
}
