import GuestLayout from "@/Layouts/GuestLayout";
import { Head, router } from "@inertiajs/react";
import { useEffect } from "react";
import StatusBadge from "@/Components/Shared/StatusBadge";
import { Car, Clock } from "lucide-react";

export default function QueueMonitor({ queueItems = [] }) {
    // Auto-refresh data setiap 10 detik tanpa me-reload seluruh halaman
    useEffect(() => {
        const interval = setInterval(() => {
            router.reload({ only: ["queueItems"], preserveScroll: true });
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    // Fungsi untuk menyamarkan plat nomor demi privasi
    const maskPlateNumber = (plate) => {
        if (!plate) return "WALK-IN";
        const parts = plate.split(" ");

        // Format standar plat nomor Indonesia: [Kode Wilayah] [Angka] [Seri Huruf] (Misal: BM 1828 QAU)
        if (parts.length >= 3) {
            const letters = parts[0];
            const numbers = parts[1].charAt(0) + "***"; // Ambil angka pertama saja
            const backLetters =
                parts[2].length > 1 ? "*" + parts[2].substring(1) : "*";
            return `${letters} ${numbers} ${backLetters}`;
        }

        return plate.substring(0, 4) + "***"; // Fallback jika format tidak standar
    };

    return (
        <GuestLayout>
            <Head title="Pantau Antrean Live" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-display font-bold text-neutral-50 mb-4">
                        Pantau Antrean Live
                    </h1>
                    <p className="text-neutral-400 max-w-2xl mx-auto">
                        Pantau status pengerjaan kendaraan Anda secara
                        real-time. Halaman ini akan diperbarui secara otomatis.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {queueItems.length > 0 ? (
                        queueItems.map((item) => (
                            <div
                                key={item.id}
                                className="bg-secondary-800 p-6 rounded-2xl border border-tertiary-800/50 shadow-lg flex flex-col justify-between hover:border-primary-300/30 transition-colors"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="p-3 bg-secondary-900 rounded-xl">
                                            <Car
                                                className="text-primary-300"
                                                size={24}
                                            />
                                        </div>
                                        <div>
                                            <span className="block font-mono text-xl font-bold text-neutral-50 uppercase tracking-wider">
                                                {maskPlateNumber(
                                                    item.vehicle_plate,
                                                )}
                                            </span>
                                            <span className="text-xs text-neutral-400 flex items-center gap-1 mt-0.5">
                                                Masuk:{" "}
                                                {new Date(
                                                    item.created_at,
                                                ).toLocaleTimeString("id-ID", {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="pb-4 border-b border-tertiary-800/50">
                                        <p className="text-sm text-neutral-400 mb-1">
                                            Layanan
                                        </p>
                                        <p className="font-medium text-neutral-50">
                                            {item.service?.name}
                                        </p>
                                    </div>

                                    <div className="flex justify-between items-center pt-2">
                                        <p className="text-sm text-neutral-400 flex items-center gap-2">
                                            <Clock size={16} /> Status
                                        </p>
                                        <StatusBadge status={item.status} />
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center bg-secondary-800/30 border border-dashed border-tertiary-800 rounded-3xl">
                            <Car
                                className="text-neutral-500 mx-auto mb-4"
                                size={48}
                            />
                            <h3 className="text-xl font-bold text-neutral-400">
                                Antrean Sedang Kosong
                            </h3>
                            <p className="text-neutral-500 mt-2">
                                Belum ada kendaraan yang sedang menunggu atau
                                diproses saat ini.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </GuestLayout>
    );
}
