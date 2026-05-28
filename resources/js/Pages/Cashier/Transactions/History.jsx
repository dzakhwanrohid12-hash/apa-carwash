import MainLayout from "@/Layouts/MainLayout";
import { Head } from "@inertiajs/react";
import StatusBadge from "@/Components/Shared/StatusBadge";
import { History as HistoryIcon, Car, CheckCircle } from "lucide-react";

export default function History({ transactions = [] }) {
    return (
        <MainLayout>
            <Head title="Riwayat Seluruh Transaksi" />

            <div className="mb-8">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-primary-300/10 rounded-xl">
                        <HistoryIcon className="text-primary-300" size={28} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-display font-bold text-neutral-50">
                            Riwayat Seluruh Transaksi
                        </h1>
                        <p className="text-neutral-400 mt-1">
                            Lacak semua data pesanan pelanggan, pencucian
                            selesai, dan pendapatan kedai.
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-secondary-800 border border-tertiary-800/50 rounded-2xl overflow-hidden shadow-lg">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-neutral-300 whitespace-nowrap">
                        <thead className="bg-secondary-900 border-b border-tertiary-800 text-sm">
                            <tr>
                                <th className="p-4 font-bold text-neutral-400 uppercase tracking-wider">
                                    Kode / Waktu
                                </th>
                                <th className="p-4 font-bold text-neutral-400 uppercase tracking-wider">
                                    Layanan & Objek
                                </th>
                                <th className="p-4 font-bold text-neutral-400 uppercase tracking-wider">
                                    Pekerja
                                </th>
                                <th className="p-4 font-bold text-neutral-400 uppercase tracking-wider">
                                    Nominal
                                </th>
                                <th className="p-4 font-bold text-neutral-400 uppercase tracking-wider">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-tertiary-800">
                            {transactions.length > 0 ? (
                                transactions.map((trx) => (
                                    <tr
                                        key={trx.id}
                                        className="hover:bg-secondary-700/30 transition-colors"
                                    >
                                        <td className="p-4">
                                            <p className="font-bold text-neutral-200">
                                                {trx.transaction_code}
                                            </p>
                                            <p className="text-xs text-neutral-500 font-mono mt-1">
                                                {new Date(
                                                    trx.created_at,
                                                ).toLocaleString("id-ID")}
                                            </p>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-secondary-900 rounded-lg border border-tertiary-800">
                                                    <Car
                                                        size={18}
                                                        className="text-neutral-400"
                                                    />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-neutral-200 uppercase">
                                                        {trx.vehicle_plate ||
                                                            "TANPA IDENTITAS"}
                                                    </p>
                                                    <p className="text-xs text-neutral-400">
                                                        {trx.service?.name}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            {trx.employee ? (
                                                <span className="bg-secondary-900 px-3 py-1 rounded-lg text-sm text-neutral-300 border border-tertiary-800">
                                                    {trx.employee.name}
                                                </span>
                                            ) : (
                                                <span className="text-neutral-500 italic text-sm">
                                                    Belum/Tidak Ada
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-4">
                                            <p className="font-bold text-emerald-400">
                                                Rp{" "}
                                                {parseFloat(
                                                    trx.total,
                                                ).toLocaleString("id-ID")}
                                            </p>
                                            <p className="text-xs text-neutral-500 mt-1 uppercase">
                                                {trx.payment_method}
                                            </p>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex flex-col gap-1 items-start">
                                                <StatusBadge
                                                    status={trx.status}
                                                />
                                                {trx.payment_status ===
                                                    "lunas" && (
                                                    <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full font-bold uppercase">
                                                        <CheckCircle
                                                            size={10}
                                                        />{" "}
                                                        LUNAS
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="p-12 text-center"
                                    >
                                        <div className="flex flex-col items-center justify-center">
                                            <HistoryIcon
                                                className="text-tertiary-600 mb-3"
                                                size={40}
                                            />
                                            <p className="text-neutral-400 font-medium">
                                                Belum ada riwayat transaksi yang
                                                terekam.
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </MainLayout>
    );
}
