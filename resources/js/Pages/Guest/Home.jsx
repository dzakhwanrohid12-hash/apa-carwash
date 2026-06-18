import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import { useState } from "react";
import {
    ArrowRight,
    Calendar,
    ShieldCheck,
    Clock3,
    Ticket,
    Copy,
    CheckCircle,
    Clock,
} from "lucide-react";
import ServiceCard from "@/Components/Shared/ServiceCard";

export default function Home({
    services = [],
    stats = { total_transactions: 0 },
    vouchers = [], // Tambahkan props vouchers
}) {
    const [copiedCode, setCopiedCode] = useState(null);

    // Fungsi untuk menyalin kode voucher ke clipboard
    const handleCopy = (code) => {
        navigator.clipboard.writeText(code);
        setCopiedCode(code);
        setTimeout(() => setCopiedCode(null), 3000);
    };

    return (
        <GuestLayout>
            <Head title="Beranda" />

            {/* HERO */}
            <section className="relative overflow-hidden bg-[#FBFCFD] pt-8 pb-20">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute left-[-300px] top-[-250px] w-[800px] h-[800px] rounded-full bg-[#14B8A6]/4 blur-3xl" />
                    <div className="absolute right-[-260px] top-[-260px] w-[700px] h-[700px] rounded-full bg-[#F2C94C]/8 blur-3xl" />
                    <div className="absolute left-[14%] top-[12%] w-[700px] h-[700px] rounded-full border border-[#14B8A6]/7" />
                </div>

                <div className="relative max-w-7xl mx-auto px-6 xl:px-8">
                    <div className="grid lg:grid-cols-[1fr_1fr] gap-16 items-center">
                        {/* LEFT (Animasi Slide dari Kiri) */}
                        <motion.div
                            initial={{ opacity: 0, x: -60 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="max-w-[560px]"
                        >
                            <div className="inline-flex items-center rounded-full bg-[#F2C94C]/12 px-4 py-2 text-[#D4A91D] font-semibold">
                                Premium Vehicle Care
                            </div>
                            <h1 className="mt-8 font-display font-bold leading-[.92] text-[#132033] text-[54px] lg:text-[72px]">
                                Perawatan{" "}
                                <span className="inline-block ml-2 bg-[#F2C94C] px-4">
                                    Modern
                                </span>
                                <div>Untuk</div>
                                <div className="text-[#F2C94C]">
                                    Kendaraan Anda
                                </div>
                            </h1>
                            <p className="mt-8 text-[18px] leading-9 text-[#64748B]">
                                Reservasi lebih cepat, antrian lebih teratur,
                                dan pengalaman perawatan kendaraan yang lebih
                                premium.
                            </p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                                className="mt-10 flex gap-4 flex-wrap"
                            >
                                <Link
                                    href="/customer/reservations/create"
                                    className="h-[56px] px-8 rounded-[18px] bg-[#F2C94C] text-[#132033] font-semibold inline-flex items-center gap-3 shadow-[0_20px_50px_rgba(242,201,76,.22)] hover:-translate-y-[2px] transition"
                                >
                                    Reservasi Sekarang <ArrowRight size={18} />
                                </Link>
                                <a
                                    href="#promo"
                                    className="h-[56px] px-8 rounded-[18px] border border-[#DCE4EB] text-[#132033] font-semibold inline-flex items-center gap-2 hover:bg-[#F8FAFC] transition cursor-pointer"
                                >
                                    Lihat Promo <Ticket size={18} />
                                </a>
                            </motion.div>

                            {/* STATS (Menggunakan Data Dinamis + Stagger Effect) */}
                            <div className="mt-14 grid grid-cols-3 gap-4">
                                {[
                                    [
                                        stats.total_transactions + "+",
                                        "Total Reservasi",
                                        Calendar,
                                    ],
                                    [
                                        services.length + "+",
                                        "Pilihan Layanan",
                                        ShieldCheck,
                                    ],
                                    ["Live", "Tracking", Clock3],
                                ].map(([value, label, Icon], index) => (
                                    <motion.div
                                        key={label}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{
                                            delay: 0.6 + index * 0.15,
                                            type: "spring",
                                            stiffness: 100,
                                        }}
                                        className="rounded-[22px] bg-white border border-[#EEF3F6] p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
                                    >
                                        <Icon className="text-[#14B8A6] mb-4" />
                                        <div className="text-[36px] font-bold text-[#132033]">
                                            {value}
                                        </div>
                                        <div className="text-[#64748B]">
                                            {label}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* RIGHT (Animasi Slide dari Kanan + Float) */}
                        <motion.div
                            initial={{ opacity: 0, x: 60, rotate: 2 }}
                            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.9, ease: "easeOut" }}
                            className="relative flex justify-center"
                        >
                            <div className="relative w-full max-w-[620px]">
                                <div className="absolute right-[-20px] top-[60px] w-[260px] h-[260px] rounded-full bg-[#F2C94C]/10 blur-3xl" />
                                <div className="relative rounded-[34px] bg-white p-4 shadow-[0_50px_120px_rgba(20,184,166,.10)]">
                                    <div className="relative overflow-hidden rounded-[28px] h-[620px]">
                                        <img
                                            src="https://images.unsplash.com/photo-1600320254374-ce2d293c324e?q=80&w=2200"
                                            alt=""
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#132033]/75 via-transparent to-transparent" />

                                        <motion.div
                                            initial={{ y: 30, opacity: 0 }}
                                            whileInView={{ y: 0, opacity: 1 }}
                                            transition={{
                                                delay: 0.5,
                                                duration: 0.6,
                                            }}
                                            className="absolute left-6 right-6 bottom-6"
                                        >
                                            <div className="rounded-[24px] bg-white/10 backdrop-blur-xl border border-white/10 p-6">
                                                <div className="inline-flex rounded-full bg-[#F2C94C] px-4 py-2 text-[#132033] font-semibold">
                                                    Premium Vehicle Care
                                                </div>
                                                <h3 className="mt-5 font-display font-bold text-[44px] leading-none text-white">
                                                    APA <div>Car Wash</div>
                                                </h3>
                                                <p className="mt-4 text-white/75">
                                                    Cepat • Bersih • Premium
                                                </p>
                                            </div>
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
            {/* SECTION VOUCHER DINAMIS */}
            <section
                id="promo"
                className="relative overflow-hidden py-28 bg-[linear-gradient(135deg,#132033_0%,#162740_100%)] text-white"
            >
                {/* Background Effects & Wave */}
                <div className="absolute inset-0 pointer-events-none">
                    {/* Glowing Orbs */}
                    <div className="absolute left-[-200px] top-[-200px] w-[600px] h-[600px] rounded-full bg-[#14B8A6]/10 blur-[100px]" />
                    <div className="absolute right-[-200px] bottom-[-200px] w-[600px] h-[600px] rounded-full bg-[#F2C94C]/10 blur-[100px]" />

                    {/* SVG Wave Bottom */}
                    <svg
                        className="absolute bottom-0 left-0 w-full opacity-[.06] transform translate-y-1"
                        viewBox="0 0 1440 320"
                        preserveAspectRatio="none"
                    >
                        <path
                            fill="#F2C94C"
                            d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                        ></path>
                    </svg>

                    {/* SVG Wave Top (Flipped) */}
                    <svg
                        className="absolute top-0 left-0 w-full opacity-[.04] rotate-180 transform -translate-y-1"
                        viewBox="0 0 1440 320"
                        preserveAspectRatio="none"
                    >
                        <path
                            fill="#14B8A6"
                            d="M0,256L48,229.3C96,203,192,149,288,154.7C384,160,480,224,576,218.7C672,213,768,139,864,128C960,117,1056,171,1152,197.3C1248,224,1344,224,1392,224L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                        ></path>
                    </svg>
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-center mb-16"
                    >
                        <div className="inline-flex items-center gap-2 mb-8 rounded-full bg-white/5 border border-white/10 px-5 py-2 text-[#F2C94C] font-semibold text-sm">
                            <Ticket size={16} /> Promo Spesial
                        </div>
                        <h2 className="font-display font-bold leading-[1.1] text-[40px] md:text-[56px] text-white mb-6">
                            Voucher &{" "}
                            <div className="inline-block mt-2 md:mt-0 bg-[#F2C94C] text-[#132033] px-4 py-1">
                                Diskon
                            </div>
                        </h2>
                        <p className="text-[#D7E2EB] font-medium text-[18px] max-w-2xl mx-auto leading-9">
                            Salin kode voucher di bawah ini dan gunakan saat
                            melakukan checkout reservasi online untuk
                            mendapatkan potongan harga.
                        </p>
                    </motion.div>

                    {vouchers.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {vouchers.map((voucher, index) => (
                                <motion.div
                                    key={voucher.id}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{
                                        duration: 0.6,
                                        delay: index * 0.1,
                                        type: "spring",
                                    }}
                                    className="flex bg-white rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden relative group hover:-translate-y-2 transition-all duration-300"
                                >
                                    {/* Sisi Kiri Tiket (Nominal Diskon) */}
                                    <div className="bg-[#F2C94C] p-6 flex flex-col items-center justify-center text-[#132033] border-r-[3px] border-dashed border-[#132033]/20 w-[35%] relative">
                                        {/* Potongan efek tiket sobek */}
                                        <div className="absolute -top-4 -right-4 w-8 h-8 bg-[#162740] rounded-full" />
                                        <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-[#162740] rounded-full" />

                                        <span className="text-3xl lg:text-4xl font-black mb-1 tracking-tight">
                                            {voucher.discount_type ===
                                            "percentage"
                                                ? `${voucher.discount_value}%`
                                                : `Rp${voucher.discount_value / 1000}K`}
                                        </span>
                                        <span className="text-[11px] font-bold uppercase tracking-widest text-[#132033]/70 bg-white/30 px-3 py-1 rounded-md mt-1">
                                            Potongan
                                        </span>
                                    </div>

                                    {/* Sisi Kanan Tiket (Detail) */}
                                    <div className="p-6 flex-1 flex flex-col justify-center bg-white relative">
                                        <p className="text-[12px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                            <ShieldCheck
                                                size={14}
                                                className="text-[#14B8A6]"
                                            />{" "}
                                            Min. Trx Rp{" "}
                                            {new Intl.NumberFormat(
                                                "id-ID",
                                            ).format(voucher.min_transaction)}
                                        </p>

                                        <div className="flex items-center justify-between mb-3">
                                            <span className="font-mono font-black text-2xl text-[#132033] tracking-wider">
                                                {voucher.code}
                                            </span>
                                        </div>

                                        <p className="text-[12px] text-slate-500 flex items-center gap-1.5 font-bold mb-5">
                                            <Clock
                                                size={14}
                                                className="text-[#F2C94C]"
                                            />{" "}
                                            Berlaku s/d{" "}
                                            {new Date(
                                                voucher.valid_until,
                                            ).toLocaleDateString("id-ID", {
                                                day: "numeric",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </p>

                                        {/* Tombol Salin Interaktif */}
                                        <button
                                            onClick={() =>
                                                handleCopy(voucher.code)
                                            }
                                            className={`w-full py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all duration-300 ${
                                                copiedCode === voucher.code
                                                    ? "bg-[#14B8A6]/10 text-[#14B8A6] border border-[#14B8A6]/30 shadow-inner"
                                                    : "bg-slate-50 text-slate-600 border border-slate-200 hover:bg-[#F2C94C]/10 hover:text-[#D4A91D] hover:border-[#F2C94C]/30 shadow-sm hover:shadow-md"
                                            }`}
                                        >
                                            {copiedCode === voucher.code ? (
                                                <>
                                                    <CheckCircle size={18} />{" "}
                                                    Tersalin!
                                                </>
                                            ) : (
                                                <>
                                                    <Copy size={18} /> Salin
                                                    Kode Promo
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="text-center py-20 px-6 bg-white/5 border border-dashed border-white/20 rounded-[32px] max-w-3xl mx-auto backdrop-blur-sm"
                        >
                            <div className="bg-white/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10">
                                <Ticket className="text-[#F2C94C]" size={40} />
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-3">
                                Belum Ada Promo Saat Ini
                            </h3>
                            <p className="text-[#D7E2EB] font-medium text-lg">
                                Nantikan kejutan promo dan potongan harga
                                spesial dari kami di waktu mendatang!
                            </p>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* SERVICES */}
            <section className="relative py-24 bg-white">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute left-0 top-0 w-[700px] h-[700px] rounded-full bg-[#14B8A6]/4 blur-3xl" />
                    <div className="absolute right-0 bottom-0 w-[600px] h-[600px] rounded-full bg-[#F2C94C]/6 blur-3xl" />
                </div>
                <div className="relative max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <div className="inline-flex items-center gap-3 mb-6 text-[#D4A91D] font-semibold">
                            <div className="w-12 h-[2px] bg-[#14B8A6]" />{" "}
                            LAYANAN KAMI{" "}
                            <div className="w-12 h-[2px] bg-[#14B8A6]" />
                        </div>
                        <h2 className="font-display font-bold text-[48px] leading-none text-[#132033]">
                            Perawatan{" "}
                            <span className="bg-[#F2C94C] px-3">Premium</span>
                        </h2>
                        <p className="mt-8 max-w-3xl mx-auto text-[18px] leading-9 text-[#64748B]">
                            Pilih layanan terbaik untuk kendaraan Anda.
                            Reservasi lebih cepat, hasil lebih bersih, dan
                            pengalaman lebih nyaman.
                        </p>
                    </motion.div>

                    <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                        {services.map((service, index) => (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{
                                    delay: index * 0.1,
                                    duration: 0.5,
                                    type: "spring",
                                    stiffness: 70,
                                }}
                            >
                                <ServiceCard service={service} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* WHY US (Dipercantik & Animasi Spring) */}
            <section className="py-24 bg-[#FBFCFD] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#14B8A6]/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/3" />
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Reservasi Cepat",
                                desc: "Pilih layanan, atur jadwal, dan datang tanpa antre.",
                                icon: Clock3,
                                color: "bg-[#F2C94C]/10 text-[#D4A91D]",
                                glow: "bg-[#F2C94C]",
                            },
                            {
                                title: "Slot Terjamin",
                                desc: "Sistem memastikan jadwal kendaraan tetap aman.",
                                icon: ShieldCheck,
                                color: "bg-[#14B8A6]/10 text-[#14B8A6]",
                                glow: "bg-[#14B8A6]",
                            },
                            {
                                title: "Tracking Real-time",
                                desc: "Pantau progres kendaraan langsung dari dashboard.",
                                icon: Calendar,
                                color: "bg-[#132033]/10 text-[#132033]",
                                glow: "bg-[#132033]",
                            },
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{
                                    delay: index * 0.2,
                                    duration: 0.6,
                                    type: "spring",
                                }}
                                className="group relative rounded-[32px] bg-white p-10 border border-[#EEF3F7] shadow-[0_10px_30px_rgba(19,32,51,0.02)] transition-all duration-500 hover:shadow-[0_40px_80px_rgba(19,32,51,0.08)] hover:-translate-y-2 overflow-hidden z-10"
                            >
                                {/* Efek Cahaya / Blur Blob di dalam kartu saat Hover */}
                                <div
                                    className={`absolute -right-12 -top-12 w-40 h-40 rounded-full ${item.glow} opacity-0 blur-3xl group-hover:opacity-10 transition-all duration-700 ease-out`}
                                />

                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-slate-50/50 to-transparent" />

                                <div
                                    className={`relative w-[72px] h-[72px] rounded-[24px] ${item.color} flex items-center justify-center mb-10 transition-all group-hover:scale-110 group-hover:rotate-3 duration-500 shadow-sm`}
                                >
                                    <item.icon size={32} />
                                </div>
                                <h3 className="relative font-display text-[26px] font-bold text-[#132033]">
                                    {item.title}
                                </h3>
                                <p className="relative mt-5 leading-8 text-[#64748B]">
                                    {item.desc}
                                </p>
                                <div
                                    className={`absolute bottom-0 left-10 right-10 h-[3px] bg-transparent group-hover:${item.glow} group-hover:opacity-30 transition-all duration-500 rounded-t-full`}
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="relative overflow-hidden py-24 bg-[linear-gradient(135deg,#132033_0%,#162740_100%)] text-white">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute left-[-220px] bottom-[-220px] w-[700px] h-[700px] rounded-full bg-[#14B8A6]/10 blur-3xl" />
                    <div className="absolute right-[-220px] top-[-220px] w-[700px] h-[700px] rounded-full bg-[#F2C94C]/10 blur-3xl" />
                    <svg
                        className="absolute bottom-0 left-0 w-full opacity-[.10]"
                        viewBox="0 0 1440 320"
                    >
                        <path
                            fill="#14B8A6"
                            d="M0,256 C240,210 520,280 760,230 C980,180 1180,180 1440,250 L1440,320 L0,320 Z"
                        />
                    </svg>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative max-w-5xl mx-auto px-6 text-center"
                >
                    <div className="inline-flex items-center gap-3 mb-8 rounded-full bg-white/5 px-5 py-2 text-[#F2C94C]">
                        Reservasi Modern
                    </div>
                    <h2 className="font-display font-bold leading-[1] text-[46px] lg:text-[64px]">
                        Rawat Kendaraan{" "}
                        <div className="inline-block mt-3 bg-[#F2C94C] text-[#132033] px-5 py-2">
                            Tanpa Menunggu
                        </div>
                    </h2>
                    <p className="mt-8 max-w-3xl mx-auto leading-9 text-[#D7E2EB] text-[18px]">
                        Pilih layanan, tentukan jadwal, datang sesuai waktu, dan
                        nikmati pengalaman perawatan kendaraan yang lebih
                        nyaman.
                    </p>
                    <div className="mt-12 flex justify-center gap-5 flex-wrap">
                        <Link
                            href="/customer/reservations/create"
                            className="h-[60px] px-9 rounded-[20px] bg-[#F2C94C] text-[#132033] font-semibold inline-flex items-center gap-3 shadow-[0_20px_50px_rgba(242,201,76,.25)] hover:-translate-y-[2px] transition"
                        >
                            Reservasi Sekarang <ArrowRight size={18} />
                        </Link>
                        <Link
                            href="/services"
                            className="h-[60px] px-9 rounded-[20px] border border-white/12 text-white font-semibold inline-flex items-center hover:bg-white/5 transition"
                        >
                            Lihat Layanan
                        </Link>
                    </div>
                </motion.div>
            </section>
        </GuestLayout>
    );
}
