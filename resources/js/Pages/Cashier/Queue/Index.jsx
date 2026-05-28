import MainLayout from "@/Layouts/MainLayout";
import { Head, router } from "@inertiajs/react";
import { Car, Clock, Play, CheckCircle2, UserCircle } from "lucide-react";
import StatusBadge from "@/Components/Shared/StatusBadge";

export default function Index({ queues, employees }) {
    // Fungsi untuk menugaskan karyawan
    const handleAssignEmployee = (transactionId, employeeId) => {
        if (!employeeId) return;
        router.put(
            route("cashier.queue.assign", transactionId),
            {
                employee_id: employeeId,
            },
            { preserveScroll: true },
        );
    };

    // Fungsi untuk mengubah status (Mulai / Selesai)
    const handleUpdateStatus = (transactionId, newStatus) => {
        router.put(
            route("cashier.queue.status", transactionId),
            {
                status: newStatus,
            },
            { preserveScroll: true },
        );
    };

    return (
        <MainLayout>
            <Head title="Manajemen Antrean" />

            <div className="mb-8">
                <h1 className="text-3xl font-display font-bold text-neutral-50">
                    Manajemen Antrean
                </h1>
                <p className="text-neutral-400 mt-1">
                    Tugaskan karyawan dan kelola status pencucian kendaraan hari
                    ini.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {queues.length > 0 ? (
                    queues.map((queue) => (
                        <div
                            key={queue.id}
                            className="bg-secondary-800 p-6 rounded-2xl border border-tertiary-800/50 shadow-lg flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-3 bg-secondary-900 rounded-xl border border-tertiary-800/50">
                                            <Car
                                                className="text-primary-300"
                                                size={24}
                                            />
                                        </div>
                                        <div>
                                            <span className="block font-mono text-xl font-bold text-neutral-50 uppercase tracking-wider">
                                                {queue.vehicle_plate ||
                                                    "WALK-IN"}
                                            </span>
                                            <span className="text-xs text-neutral-400 flex items-center gap-1 mt-0.5">
                                                <Clock size={12} />
                                                Masuk:{" "}
                                                {new Date(
                                                    queue.created_at,
                                                ).toLocaleTimeString("id-ID", {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </span>
                                        </div>
                                    </div>
                                    <StatusBadge status={queue.status} />
                                </div>

                                <div className="space-y-3 mb-6">
                                    <div className="bg-secondary-900/50 p-3 rounded-xl border border-tertiary-800/30">
                                        <p className="text-xs text-neutral-400 mb-1">
                                            Layanan
                                        </p>
                                        <p className="font-medium text-neutral-200 text-sm">
                                            {queue.service?.name}
                                        </p>
                                    </div>

                                    {/* Area Penugasan Karyawan */}
                                    <div className="bg-secondary-900/50 p-3 rounded-xl border border-tertiary-800/30">
                                        <p className="text-xs text-neutral-400 mb-1 flex items-center gap-1">
                                            <UserCircle size={14} /> Dikerjakan
                                            Oleh
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
                                            className="w-full mt-1 rounded-lg bg-secondary-800 border-tertiary-800/50 text-neutral-200 text-sm focus:border-primary-300 focus:ring-primary-300 disabled:opacity-50 disabled:cursor-not-allowed"
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

                            {/* Area Tombol Aksi */}
                            <div className="pt-4 border-t border-tertiary-800/50">
                                {queue.status === "menunggu" &&
                                queue.employee_id ? (
                                    <button
                                        onClick={() =>
                                            handleUpdateStatus(
                                                queue.id,
                                                "diproses",
                                            )
                                        }
                                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-neutral-500/10 border border-neutral-500/20 text-neutral-300 rounded-xl font-medium shadow-sm hover:bg-neutral-500/20 transition-all"
                                    >
                                        <Play size={18} /> Mulai Proses
                                    </button>
                                ) : queue.status === "diproses" ? (
                                    <button
                                        onClick={() =>
                                            handleUpdateStatus(
                                                queue.id,
                                                "selesai",
                                            )
                                        }
                                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-neutral-500/10 border border-neutral-500/20 text-neutral-300 rounded-xl font-medium shadow-sm hover:bg-neutral-500/20 transition-all"
                                    >
                                        <CheckCircle2 size={18} /> Selesaikan
                                    </button>
                                ) : (
                                    <p className="text-center text-xs text-neutral-500 py-2">
                                        Pilih karyawan terlebih dahulu untuk
                                        memulai.
                                    </p>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center bg-secondary-800/30 border border-dashed border-tertiary-800 rounded-3xl">
                        <Car
                            className="text-neutral-600 mx-auto mb-4"
                            size={48}
                        />
                        <h3 className="text-xl font-bold text-neutral-400">
                            Tidak ada antrean aktif
                        </h3>
                        <p className="text-neutral-500 mt-2">
                            Daftar kendaraan yang sedang menunggu atau diproses
                            akan muncul di sini.
                        </p>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
