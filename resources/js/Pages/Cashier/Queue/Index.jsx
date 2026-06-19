import MainLayout from "@/Layouts/MainLayout";
import { Head, router } from "@inertiajs/react";
import {
    Car,
    Clock,
    Play,
    CheckCircle2,
    UserCircle,
    Users,
} from "lucide-react";
import StatusBadge from "@/Components/Shared/StatusBadge";
import { motion, AnimatePresence } from "framer-motion";

export default function Index({ queues, employees }) {
    // Fungsi untuk menugaskan karyawan
    const handleAssignEmployee = (transactionId, employeeId) => {
        if (!employeeId) return;
        router.put(
            route("cashier.queue.assign", transactionId),
            { employee_id: employeeId },
            { preserveScroll: true },
        );
    };

    // Fungsi untuk mengubah status (Mulai / Selesai)
    const handleUpdateStatus = (transactionId, newStatus) => {
        router.put(
            route("cashier.queue.status", transactionId),
            { status: newStatus },
            { preserveScroll: true },
        );
    };

    return (
        <MainLayout>
            <Head title="Manajemen Antrean" />

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
                    <Users size={28} />
                </div>
                <div>
                    <h1 className="text-3xl md:text-4xl font-display font-bold text-slate-800 mb-1">
                        Manajemen{" "}
                        <span className="text-amber-500">Antrean</span>
                    </h1>
                    <p className="text-slate-500 font-medium">
                        Tugaskan karyawan dan pantau proses pencucian kendaraan
                        secara real-time.
                    </p>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                <AnimatePresence>
                    {queues.length > 0 ? (
                        queues.map((queue, index) => (
                            <motion.div
                                key={queue.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{
                                    duration: 0.3,
                                    delay: index * 0.05,
                                }}
                                className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 flex flex-col justify-between overflow-hidden relative group hover:-translate-y-1 transition-transform"
                            >
                                {/* Background Glow */}
                                <div
                                    className={`absolute top-0 right-0 w-32 h-32 blur-2xl rounded-full pointer-events-none transition-colors ${
                                        queue.status === "diproses"
                                            ? "bg-amber-400/15"
                                            : "bg-slate-200/20"
                                    }`}
                                />

                                <div>
                                    <div className="flex justify-between items-start mb-6 relative z-10">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 shadow-sm text-slate-500">
                                                <Car size={24} />
                                            </div>
                                            <div>
                                                <span className="block font-mono text-xl font-bold text-slate-800 uppercase tracking-wider leading-none">
                                                    {queue.vehicle_plate ||
                                                        "WALK-IN"}
                                                </span>
                                                <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5 mt-2 bg-slate-100 w-fit px-2 py-0.5 rounded border border-slate-200">
                                                    <Clock
                                                        size={12}
                                                        className="text-amber-500"
                                                    />
                                                    Masuk:{" "}
                                                    {new Date(
                                                        queue.created_at,
                                                    ).toLocaleTimeString(
                                                        "id-ID",
                                                        {
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                        },
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                       <StatusBadge
    status={
        queue.status === "menunggu" && queue.payment_status === "lunas"
            ? "lunas"
            : queue.status
    }
/>
                                    </div>

                                    <div className="space-y-4 mb-6 relative z-10">
                                        {/* Area Layanan */}
                                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                                                Layanan Terpilih
                                            </p>
                                            <p className="font-bold text-slate-700 text-sm">
                                                {queue.service?.name}
                                            </p>
                                        </div>

                                        {/* Area Penugasan Karyawan */}
                                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                                <UserCircle
                                                    size={14}
                                                    className="text-amber-500"
                                                />{" "}
                                                Dikerjakan Oleh
                                            </p>
                                            <select
                                                value={queue.employee_id || ""}
                                                onChange={(e) =>
                                                    handleAssignEmployee(
                                                        queue.id,
                                                        e.target.value,
                                                    )
                                                }
                                                disabled={
                                                    queue.status === "diproses"
                                                }
                                                className="w-full rounded-lg bg-white border-slate-200 text-slate-700 font-bold text-sm focus:border-amber-400 focus:ring-4 focus:ring-amber-400/20 disabled:opacity-50 disabled:bg-slate-100 disabled:cursor-not-allowed transition-all py-2.5"
                                            >
                                                <option value="">
                                                    -- Pilih Karyawan --
                                                </option>
                                                {employees.map((emp) => (
                                                    <option
                                                        key={emp.id}
                                                        value={emp.id}
                                                    >
                                                        {emp.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Area Aksi (Mulai / Selesai) */}
                                <div  div className="pt-4 border-t border-slate-100 relative z-10">
                                    {(queue.status === "lunas" || queue.status === "menunggu") && queue.employee_id ? (
                                        <button
                                            onClick={() => handleUpdateStatus(queue.id, "diproses")}
                                            className="w-full flex items-center justify-center gap-2 px-4 py-3.5 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-xl font-bold shadow-md hover:shadow-lg transition-all"
                                        >
                                            <Play size={18} /> Mulai Proses Pencucian
                                        </button>
                                    ) : queue.status === "diproses" ? (
                                        <button
                                            onClick={() => handleUpdateStatus(queue.id, "selesai")}
                                            className="w-full flex items-center justify-center gap-2 px-4 py-3.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-600 rounded-xl font-bold shadow-sm transition-all"
                                        >
                                            <CheckCircle2 size={18} /> Selesaikan Pesanan
                                        </button>
                                    ) : (
                                        <p className="text-center text-xs font-bold text-slate-400 py-3 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                                            Pilih karyawan terlebih dahulu untuk memulai.
                                        </p>
                                    )}
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="col-span-full py-24 px-6 text-center bg-white/50 border-2 border-dashed border-slate-200 rounded-[3rem]"
                        >
                            <div className="bg-slate-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                                <Car size={40} />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-700 mb-2">
                                Belum Ada Antrean Aktif
                            </h3>
                            <p className="text-slate-500 font-medium max-w-md mx-auto">
                                Daftar kendaraan yang sedang menunggu untuk
                                dicuci atau sedang diproses akan muncul di
                                halaman ini.
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </MainLayout>
    );
}
