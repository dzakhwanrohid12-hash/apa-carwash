import GuestLayout from "@/Layouts/GuestLayout";
import { Head, router } from "@inertiajs/react";
import { useEffect } from "react";
import { motion } from "framer-motion";
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

            {/* Background Ornaments (Konsisten dengan tema cerah) */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
                <div className="absolute left-[-10%] top-[10%] w-[600px] h-[600px] rounded-full bg-amber-400/10 blur-[100px]" />
                <div className="absolute right-[-5%] top-[30%] w-[500px] h-[500px] rounded-full bg-yellow-300/10 blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-[calc(100vh-100px)]">
                {/* HEADER SECTION */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-3 mb-4 text-amber-500 font-bold uppercase tracking-widest text-sm">
                        <div className="w-8 h-0.5 bg-amber-500" />
                        Live Tracking
                        <div className="w-8 h-0.5 bg-amber-500" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-800 mb-6">
                        Pantau Antrean{" "}
                        <span className="text-amber-500">Live</span>
                    </h1>
                    <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
                        Pantau status pengerjaan kendaraan Anda secara
                        real-time. Halaman ini akan diperbarui secara otomatis
                        tanpa perlu memuat ulang.
                    </p>
                </motion.div>

                {/* KONTEN GRID ANTREAN */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {queueItems.length > 0 ? (
                        queueItems.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{
                                    delay: index * 0.1,
                                    duration: 0.5,
                                    type: "spring",
                                    stiffness: 100,
                                }}
                                className="group bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden relative"
                            >
                                {/* Aksen Glow on Hover */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-amber-400/5 to-transparent pointer-events-none" />

                                <div className="flex justify-between items-start mb-8 relative z-10">
                                    <div className="flex items-center gap-4">
                                        <div className="p-4 bg-amber-100 rounded-2xl text-amber-500 group-hover:scale-110 transition-transform duration-500 shadow-sm">
                                            <Car size={28} />
                                        </div>
                                        <div>
                                            <span className="block font-mono text-2xl font-bold text-slate-800 uppercase tracking-wider">
                                                {maskPlateNumber(
                                                    item.vehicle_plate,
                                                )}
                                            </span>
                                            <span className="text-sm font-medium text-slate-500 flex items-center gap-1.5 mt-1">
                                                Masuk:{" "}
                                                <span className="text-amber-600 font-bold">
                                                    {new Date(
                                                        item.created_at,
                                                    ).toLocaleTimeString(
                                                        "id-ID",
                                                        {
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                        },
                                                    )}
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-5 relative z-10">
                                    <div className="pb-5 border-b border-slate-100">
                                        <p className="text-sm font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                                            Layanan
                                        </p>
                                        <p className="font-bold text-slate-700 text-lg">
                                            {item.service?.name}
                                        </p>
                                    </div>

                                    <div className="flex justify-between items-center pt-2">
                                        <p className="text-sm font-bold text-slate-500 flex items-center gap-2">
                                            <Clock
                                                size={18}
                                                className="text-amber-500"
                                            />{" "}
                                            Status
                                        </p>
                                        {/* StatusBadge akan otomatis menyesuaikan styling internalnya,
                                            namun posisinya sekarang lebih lega di dalam kartu */}
                                        <StatusBadge status={item.status} />
                                    </div>
                                </div>

                                {/* Garis Bawah Dekoratif */}
                                <div className="absolute bottom-0 left-10 right-10 h-1.5 bg-transparent group-hover:bg-amber-400 transition-colors duration-500 rounded-t-full" />
                            </motion.div>
                        ))
                    ) : (
                        /* STATE KOSONG (EMPTY STATE) */
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="col-span-full py-24 text-center bg-white/50 backdrop-blur-sm border-2 border-dashed border-slate-200 rounded-[3rem] shadow-sm"
                        >
                            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Car className="text-slate-400" size={48} />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-700 mb-2 font-display">
                                Antrean Sedang Kosong
                            </h3>
                            <p className="text-slate-500 text-lg max-w-md mx-auto">
                                Belum ada kendaraan yang sedang menunggu atau
                                diproses saat ini. Kedai siap melayani Anda!
                            </p>
                        </motion.div>
                    )}
                </div>
            </div>
        </GuestLayout>
    );
}
