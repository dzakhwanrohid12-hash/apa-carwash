import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link } from "@inertiajs/react";
import StatusBadge from "@/Components/Shared/StatusBadge";
import {
    History as HistoryIcon,
    Calendar,
    Car,
    ArrowRight,
} from "lucide-react";

export default function History({ reservations = [] }) {
    return (
        <GuestLayout>
            <Head title="Riwayat Reservasi" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header Section */}
                <div className="flex items-center gap-4 mb-10">
                    <div className="p-4 bg-primary-300/10 rounded-2xl border border-primary-300/20 shadow-inner">
                        <HistoryIcon className="text-primary-300" size={32} />
                    </div>
                    <div>
                        <h1 className="text-4xl font-display font-bold text-neutral-50 mb-1">
                            Riwayat Reservasi
                        </h1>
                        <p className="text-neutral-400 text-lg">
                            Daftar semua layanan yang pernah Anda pesan.
                        </p>
                    </div>
                </div>

                {/* Table Section */}
                <div className="bg-secondary-800 border border-tertiary-800/50 rounded-3xl overflow-hidden shadow-xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-neutral-300">
                            <thead className="bg-secondary-900/80 border-b border-tertiary-800">
                                <tr>
                                    <th className="p-5 font-bold text-neutral-400 uppercase tracking-wider text-sm">
                                        Tanggal & Waktu
                                    </th>
                                    <th className="p-5 font-bold text-neutral-400 uppercase tracking-wider text-sm">
                                        Layanan
                                    </th>
                                    <th className="p-5 font-bold text-neutral-400 uppercase tracking-wider text-sm">
                                        Status
                                    </th>
                                    <th className="p-5 font-bold text-neutral-400 uppercase tracking-wider text-sm text-center">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-tertiary-800/50">
                                {reservations.length > 0 ? (
                                    reservations.map((res) => (
                                        <tr
                                            key={res.id}
                                            className="hover:bg-secondary-700/30 transition-colors group"
                                        >
                                            <td className="p-5">
                                                <div className="flex items-center gap-3">
                                                    <Calendar
                                                        size={18}
                                                        className="text-neutral-500 group-hover:text-primary-300 transition-colors"
                                                    />
                                                    <div>
                                                        <p className="font-bold text-neutral-200">
                                                            {new Date(
                                                                res.reservation_date,
                                                            ).toLocaleDateString(
                                                                "id-ID",
                                                                {
                                                                    day: "numeric",
                                                                    month: "long",
                                                                    year: "numeric",
                                                                },
                                                            )}
                                                        </p>
                                                        <p className="text-sm font-mono text-primary-400">
                                                            {
                                                                res.reservation_time
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-secondary-900 rounded-lg border border-tertiary-800">
                                                        <Car
                                                            size={16}
                                                            className="text-neutral-400"
                                                        />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-neutral-200 uppercase">
                                                            {res.vehicle_plate ||
                                                                "TANPA PLAT"}
                                                        </p>
                                                        <p className="text-sm text-neutral-500">
                                                            {res.service
                                                                ?.name || "-"}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-5">
                                                <StatusBadge
                                                    status={res.status}
                                                />
                                            </td>
                                            <td className="p-5 text-center">
                                                <Link
                                                    href={route(
                                                        "customer.reservations.show",
                                                        res.id,
                                                    )}
                                                    className="inline-flex items-center justify-center gap-1 px-4 py-2 bg-secondary-900 border border-tertiary-700 text-primary-300 text-sm font-bold rounded-xl hover:bg-primary-300 hover:text-secondary-950 transition-all"
                                                >
                                                    Detail{" "}
                                                    <ArrowRight size={14} />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="4"
                                            className="py-16 text-center"
                                        >
                                            <div className="flex flex-col items-center justify-center">
                                                <div className="p-4 bg-secondary-900 rounded-full mb-3">
                                                    <HistoryIcon
                                                        className="text-tertiary-600"
                                                        size={32}
                                                    />
                                                </div>
                                                <p className="text-neutral-400 font-medium">
                                                    Belum ada riwayat reservasi.
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
