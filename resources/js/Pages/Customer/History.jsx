import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import StatusBadge from "@/Components/Shared/StatusBadge";
import {
    History as HistoryIcon,
    Calendar,
    Car,
    ArrowRight,
    Clock,
} from "lucide-react";

export default function History({ reservations = [] }) {
    const fadeUp = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" },
        },
    };

    return (
        <GuestLayout>
            <Head title="Riwayat Reservasi" />

            {/* HEADER (Konsisten dengan halaman lain) */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,#132033_0%,#17273D_35%,#15263F_70%,#112036_100%)]" />
                    <div className="absolute left-[10%] top-[-300px] w-[700px] h-[700px] rounded-full bg-[#14B8A6]/10 blur-3xl" />
                    <div className="absolute right-[5%] top-[-300px] w-[700px] h-[700px] rounded-full bg-[#F2C94C]/10 blur-3xl" />
                </div>

                <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-32">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        className="text-center"
                    >
                        <div className="uppercase tracking-[.25em] text-[#9AA9BB] font-semibold text-[15px] mb-5">
                            RIWAYAT KENDARAAN
                        </div>

                        <h1 className="text-[48px] md:text-[56px] leading-none font-bold mb-7">
                            <span className="text-white">Semua </span>
                            <span className="text-[#F2C94C]">Riwayat</span>
                        </h1>

                        <div className="flex justify-center items-center gap-5 mb-8">
                            <div className="w-24 h-[1px] bg-white/15" />
                            <div className="w-3 h-3 rotate-45 border border-[#F2C94C] bg-[#F2C94C]/20" />
                            <div className="w-24 h-[1px] bg-white/15" />
                        </div>

                        <p className="max-w-3xl mx-auto text-[18px] leading-9 text-[#C8D2DD]">
                            Daftar lengkap seluruh layanan perawatan dan
                            pencucian yang pernah Anda pesan bersama kami.
                        </p>
                    </motion.div>
                </div>

                {/* WAVE SEPARATOR */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10">
                    <svg
                        viewBox="0 0 1440 90"
                        className="relative block w-full h-[70px] text-slate-50"
                        preserveAspectRatio="none"
                    >
                        <path
                            fill="currentColor"
                            d="M0,40 C220,70 420,60 720,40 C1000,20 1220,35 1440,40 L1440,90 L0,90 Z"
                        />
                    </svg>
                </div>
            </section>

            {/* MAIN CONTENT */}
            <section className="py-16 bg-slate-50 relative overflow-hidden min-h-[50vh]">
                {/* Background Ornaments */}
                <div className="absolute top-[10%] right-[-5%] w-[400px] h-[400px] bg-amber-400/10 blur-[100px] rounded-full pointer-events-none" />
                <div className="absolute bottom-[10%] left-[-5%] w-[500px] h-[500px] bg-sky-300/10 blur-[100px] rounded-full pointer-events-none" />

                <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
                    {/* List Riwayat */}
                    <div className="space-y-6">
                        {reservations.length > 0 ? (
                            reservations.map((res, index) => (
                                <motion.div
                                    key={res.id}
                                    initial={{ opacity: 0, y: 30, scale: 0.98 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{
                                        delay: index * 0.1,
                                        duration: 0.5,
                                        type: "spring",
                                        stiffness: 100,
                                    }}
                                    className="group bg-white p-6 md:p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-amber-500/10 hover:border-amber-200 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden"
                                >
                                    {/* Accent Glow on Hover */}
                                    <div className="absolute top-0 left-0 w-1.5 h-full bg-transparent group-hover:bg-amber-400 transition-colors duration-500" />

                                    {/* Bagian Kiri: Info Kendaraan & Layanan */}
                                    <div className="flex items-center gap-5 md:w-1/3">
                                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-slate-400 group-hover:bg-amber-50 group-hover:text-amber-500 group-hover:border-amber-100 transition-all duration-300 shadow-sm shrink-0">
                                            <Car size={32} />
                                        </div>
                                        <div>
                                            <h3 className="font-mono text-xl md:text-2xl font-bold text-slate-800 uppercase tracking-wider">
                                                {res.vehicle_plate ||
                                                    "TANPA PLAT"}
                                            </h3>
                                            <p className="text-sm font-medium text-slate-500 mt-1">
                                                {res.service?.name ||
                                                    "Layanan Tidak Diketahui"}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Bagian Tengah: Tanggal & Waktu */}
                                    <div className="flex flex-row md:flex-col gap-4 md:gap-1 bg-slate-50 md:bg-transparent p-4 md:p-0 rounded-xl md:w-1/3 justify-between md:justify-center border border-slate-100 md:border-none">
                                        <div className="flex items-center gap-2 text-slate-700">
                                            <Calendar
                                                size={16}
                                                className="text-amber-500 shrink-0"
                                            />
                                            <span className="font-bold text-sm md:text-base">
                                                {new Date(
                                                    res.reservation_date,
                                                ).toLocaleDateString("id-ID", {
                                                    day: "numeric",
                                                    month: "long",
                                                    year: "numeric",
                                                })}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-slate-500">
                                            <Clock
                                                size={16}
                                                className="text-slate-400 shrink-0"
                                            />
                                            <span className="font-mono text-sm md:text-base bg-white md:bg-transparent px-2 py-1 md:p-0 rounded-md border border-slate-200 md:border-none shadow-sm md:shadow-none font-semibold">
                                                {res.reservation_time} WIB
                                            </span>
                                        </div>
                                    </div>

                                    {/* Bagian Kanan: Status & Aksi */}
                                    <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-4 md:w-1/4">
                                        <div className="shrink-0">
                                            <StatusBadge status={res.status} />
                                        </div>

                                        <Link
                                            href={route(
                                                "customer.reservations.show",
                                                res.id,
                                            )}
                                            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-700 text-sm font-bold rounded-xl hover:bg-amber-400 hover:text-slate-900 hover:border-amber-400 hover:shadow-md transition-all duration-300 w-full md:w-auto"
                                        >
                                            Lihat Detail{" "}
                                            <ArrowRight size={16} />
                                        </Link>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            /* State Kosong */
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                className="py-24 flex flex-col items-center justify-center bg-white/50 backdrop-blur-sm border-2 border-dashed border-slate-200 rounded-[3rem] shadow-sm"
                            >
                                <div className="p-6 bg-slate-100 rounded-full mb-6 shadow-inner">
                                    <HistoryIcon
                                        className="text-slate-400"
                                        size={48}
                                    />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-700 mb-2 font-display">
                                    Belum ada riwayat reservasi
                                </h3>
                                <p className="text-slate-500 text-lg text-center max-w-md leading-relaxed mb-8">
                                    Anda belum pernah melakukan pemesanan cuci
                                    kendaraan. Yuk, mulai buat reservasi pertama
                                    Anda!
                                </p>
                                <Link
                                    href={route("customer.reservations.create")}
                                    className="px-8 py-3.5 bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 font-bold rounded-xl shadow-lg shadow-amber-500/30 hover:shadow-xl hover:scale-105 transition-all duration-300 inline-flex items-center gap-2"
                                >
                                    Buat Reservasi <ArrowRight size={18} />
                                </Link>
                            </motion.div>
                        )}
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}
