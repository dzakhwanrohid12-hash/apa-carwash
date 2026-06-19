import { Clock3, Car, Bike, Scroll, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "@inertiajs/react";
import { motion } from "framer-motion";

export default function ServiceCard({ service, onClick, isSelected }) {
    // Ikon dinamis berdasarkan nama kategori dari database
    const getIcon = (category) => {
        const catName = category?.toLowerCase() || "";
        if (catName.includes("motor"))
            return <Bike size={32} strokeWidth={1.8} />;
        if (catName.includes("karpet"))
            return <Scroll size={32} strokeWidth={1.8} />;
        return <Car size={32} strokeWidth={1.8} />;
    };

    // Struktur Konten Utama Kartu
    const CardBody = (
        <motion.div
            whileHover={{ y: -8 }}
            whileTap={{ scale: 0.98 }}
            /* --- 1. STRUKTUR UTAMA KARTU (DAISY UI CARD) --- */
            className={`card w-full h-full border-2 transition-all duration-500 overflow-hidden group relative ${
                isSelected
                    ? "border-amber-400 shadow-[0_20px_50px_-12px_rgba(245,158,11,0.3)]"
                    : "border-slate-100 shadow-sm hover:border-amber-300 hover:shadow-[0_24px_50px_-15px_rgba(19,32,51,0.08)] bg-white"
            }`}
        >
            {/* --- 2. BACKDROP GRADIENT MESH & GLOW --- */}
            {/* Mengubah background putih polos menjadi gradasi lembut agar berdimensi */}
            <div
                className={`absolute inset-0 bg-gradient-to-br z-0 pointer-events-none transition-all duration-500 ${
                    isSelected
                        ? "from-white via-amber-50/40 to-amber-100/20"
                        : "from-white via-slate-50/60 to-slate-100/40"
                }`}
            />

            {/* Pendaran cahaya (Glow Orb) di sudut kanan atas */}
            <div
                className={`absolute -right-16 -top-16 w-48 h-48 rounded-full blur-3xl pointer-events-none transition-colors duration-700 z-0 ${
                    isSelected
                        ? "bg-amber-400/25"
                        : "bg-slate-100 group-hover:bg-amber-400/15"
                }`}
            />

            {/* --- 3. SILUET PERCIKAN AIR (WATER SPLASH MOTIF) --- */}
            {/* Menambahkan siluet air organik samar di latar belakang kartu yang berputar halus saat di-hover */}
            <div
                className={`absolute -bottom-12 -right-12 w-48 h-48 opacity-[0.03] group-hover:opacity-[0.06] transition-all duration-700 -rotate-12 group-hover:rotate-6 transform pointer-events-none z-0 ${
                    isSelected ? "text-amber-500" : "text-slate-600"
                }`}
            >
                <svg
                    viewBox="0 0 200 200"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full fill-current"
                >
                    <path
                        d="M44.3,-76.3C56.9,-70.5,66.8,-57.4,74.9,-43.3C83,-29.2,89.3,-14.6,90.4,0.6C91.5,15.8,87.3,31.7,78.8,45C70.3,58.3,57.4,69.1,42.8,76.5C28.2,83.9,14.1,87.9,-0.7,89.1C-15.5,90.3,-30.9,88.7,-45,81.7C-59.1,74.7,-71.8,62.2,-79.8,47.4C-87.8,32.6,-91.1,16.3,-91.3,-0.1C-91.5,-16.5,-88.6,-33.1,-80.4,-47.4C-72.2,-61.7,-58.6,-73.8,-43.5,-78C-28.4,-82.2,-14.2,-78.6,0.9,-77C15.9,-75.4,31.8,-82.1,44.3,-76.3Z"
                        transform="translate(100 100)"
                    />
                </svg>
            </div>

            {/* --- 4. ANIMASI GELEMBUNG SABUN MIKRO (SOAP BUBBLES EFFECT) --- */}
            {/* Partikel gelembung transparan yang mengapung naik ke atas saat kartu di-hover */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute bottom-[-10%] left-[18%] w-2.5 h-2.5 rounded-full bg-sky-400/20 blur-[0.5px] opacity-0 group-hover:opacity-100 group-hover:-translate-y-28 transition-all duration-[1100ms] ease-out" />
                <div className="absolute bottom-[-10%] left-[50%] w-5 h-5 rounded-full bg-sky-400/10 blur-[1.5px] opacity-0 group-hover:opacity-100 group-hover:-translate-y-36 transition-all duration-[1600ms] ease-out delay-300" />
                <div className="absolute bottom-[-10%] left-[78%] w-2 h-2 rounded-full bg-sky-400/25 opacity-0 group-hover:opacity-100 group-hover:-translate-y-20 transition-all duration-[900ms] ease-out delay-150" />
            </div>

            {/* --- 5. ISI UTAMA KARTU (DAISY UI CARD-BODY) --- */}
            <div className="card-body p-8 relative z-10 flex flex-col justify-between h-full">
                {/* Bagian Atas: Ikon & Badge Kategori */}
                <div className="flex justify-between items-start mb-4">
                    <div
                        className={`w-16 h-16 rounded-[20px] flex items-center justify-center transition-all duration-500 shadow-sm ${
                            isSelected
                                ? "bg-amber-400 text-slate-900 scale-110 rotate-3 shadow-amber-400/20"
                                : "bg-slate-50 text-slate-500 border border-slate-100 group-hover:bg-slate-900 group-hover:text-amber-400 group-hover:-translate-y-1 group-hover:rotate-3"
                        }`}
                    >
                        {getIcon(service.category?.name)}
                    </div>

                    <div className="flex flex-col items-end gap-2">
                        {/* Menggunakan Badge Daisy UI */}
                        <span
                            className={`badge border-none px-4 py-4 text-[10px] font-bold tracking-widest uppercase transition-colors duration-300 ${
                                isSelected
                                    ? "bg-slate-900 text-amber-400"
                                    : "bg-slate-100 text-slate-500 group-hover:bg-amber-100 group-hover:text-amber-700"
                            }`}
                        >
                            {service.category?.name || "Layanan"}
                        </span>

                        {isSelected && (
                            <span className="flex items-center gap-1 text-[10px] font-bold text-amber-600 bg-amber-100/80 px-2 py-1 rounded-md animate-pulse">
                                <Sparkles size={12} /> TERPILIH
                            </span>
                        )}
                    </div>
                </div>

                {/* Bagian Tengah: Judul & Informasi Estimasi Waktu */}
                <div className="flex-1 mt-2 mb-6">
                    {/* Menggunakan Card-Title Daisy UI */}
                    <h2
                        className={`card-title font-display font-black text-[26px] leading-tight transition-colors ${
                            isSelected
                                ? "text-slate-900"
                                : "text-slate-800 group-hover:text-slate-900"
                        }`}
                    >
                        {service.name}
                    </h2>
                    <div
                        className={`mt-4 inline-flex items-center gap-2 text-sm font-bold px-3 py-1.5 rounded-lg transition-colors ${
                            isSelected
                                ? "bg-white/60 text-amber-700 border border-amber-200"
                                : "bg-slate-50 text-slate-500 border border-slate-100 group-hover:bg-white"
                        }`}
                    >
                        <Clock3
                            size={16}
                            className={
                                isSelected ? "text-amber-500" : "text-slate-400"
                            }
                        />
                        Est. {service.duration_minutes} Menit
                    </div>
                </div>

                {/* Bagian Bawah: Harga & Tombol Aksi (DAISY UI CARD-ACTIONS) */}
                <div className="card-actions justify-between items-end w-full pt-6 border-t border-slate-100">
                    <div>
                        <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">
                            Tarif Mulai Dari
                        </p>
                        <div className="font-display font-black text-3xl flex items-baseline gap-1 text-slate-800">
                            <span className="text-sm text-slate-400 font-semibold">
                                Rp
                            </span>
                            <span
                                className={
                                    isSelected
                                        ? "text-amber-600"
                                        : "group-hover:text-amber-500 transition-colors"
                                }
                            >
                                {new Intl.NumberFormat("id-ID").format(
                                    service.price,
                                )}
                            </span>
                        </div>
                    </div>

                    {/* Menggunakan Tombol Bulat (btn-circle) dari Daisy UI */}
                    <div
                        className={`btn btn-circle border-none shadow-sm transition-all duration-500 ${
                            isSelected
                                ? "bg-slate-900 text-amber-400 scale-110 shadow-slate-900/20"
                                : "bg-slate-50 text-slate-400 group-hover:bg-amber-400 group-hover:text-slate-900 group-hover:shadow-amber-400/30 group-hover:-rotate-45"
                        }`}
                    >
                        <ArrowRight size={22} strokeWidth={2.5} />
                    </div>
                </div>
            </div>
        </motion.div>
    );

    // LOGIKA REDIRECT KE RESERVASI:
    // Jika komponen dipanggil dengan fungsi klik internal (form checkout), jalankan div biasa.
    // Jika ditampilkan secara umum (Beranda/Katalog), jadikan kartu sebagai Link yang langsung mengarah ke halaman reservasi.
    return onClick ? (
        <div onClick={onClick} className="h-full cursor-pointer block">
            {CardBody}
        </div>
    ) : (
        <Link
            href={`/customer/reservations/create?service_id=${service.id}`}
            className="h-full block cursor-pointer"
            title="Klik untuk langsung memesan layanan ini"
        >
            {CardBody}
        </Link>
    );
}
