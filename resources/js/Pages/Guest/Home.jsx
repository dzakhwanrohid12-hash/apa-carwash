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
import FeatureCard from "@/Components/Shared/FeatureCard";
import VoucherCard from "@/Components/Shared/VoucherCard";

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
                                {/* Menggunakan DaisyUI: btn, dengan kustomisasi warna dan bentuk (rounded-full) */}
                                <Link
                                    href="/customer/reservations/create"
                                    className="btn border-none bg-[#F2C94C] hover:bg-[#D4A91D] text-[#132033] rounded-full px-8 h-[56px] min-h-[56px] font-semibold text-base shadow-[0_15px_40px_rgba(242,201,76,0.25)] hover:shadow-[0_20px_50px_rgba(242,201,76,0.4)] hover:-translate-y-1 transition-all duration-300"
                                >
                                    Reservasi Sekarang{" "}
                                    <ArrowRight size={20} strokeWidth={2.5} />
                                </Link>

                                {/* Tombol Outline sekunder menggunakan DaisyUI */}
                                <a
                                    href="#promo"
                                    className="btn btn-outline border-[#DCE4EB] hover:bg-[#F8FAFC] hover:border-[#DCE4EB] hover:text-[#132033] text-[#132033] rounded-full px-8 h-[56px] min-h-[56px] font-semibold text-base transition-all duration-300"
                                >
                                    Lihat Promo <Ticket size={20} />
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
            {/* Section hanya akan di-render JIKA ada voucher (vouchers.length > 0) */}
            {vouchers.length > 0 && (
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

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* Memanggil komponen VoucherCard */}
                            {vouchers.map((voucher, index) => (
                                <VoucherCard
                                    key={voucher.id}
                                    voucher={voucher}
                                    index={index}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            )}

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

            {/* WHY US (Menggunakan Komponen Terpisah) */}
            <section className="py-24 bg-[#FBFCFD] relative overflow-hidden">
                {/* Latar Belakang Dekoratif (Glow besar) */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#14B8A6]/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#F2C94C]/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/3 pointer-events-none" />

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    {/* Header Section */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-3 mb-4 text-[#D4A91D] font-semibold text-sm">
                            <div className="w-12 h-[2px] bg-[#14B8A6]" />{" "}
                            MENGAPA KAMI{" "}
                            <div className="w-12 h-[2px] bg-[#14B8A6]" />
                        </div>
                        <h2 className="font-display font-bold text-[36px] md:text-[48px] leading-tight text-[#132033]">
                            Pengalaman Cuci{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F2C94C] to-[#D4A91D]">
                                Berbeda
                            </span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Reservasi Cepat",
                                desc: "Pilih layanan, atur jadwal, dan datang tanpa perlu antre berjam-jam di lokasi.",
                                icon: Clock3,
                                color: "bg-[#F2C94C]/10 text-[#D4A91D]",
                                glow: "bg-[#F2C94C]",
                            },
                            {
                                title: "Slot Terjamin",
                                desc: "Sistem cerdas kami memastikan jadwal kendaraan Anda tetap aman dan tidak bentrok.",
                                icon: ShieldCheck,
                                color: "bg-[#14B8A6]/10 text-[#14B8A6]",
                                glow: "bg-[#14B8A6]",
                            },
                            {
                                title: "Tracking Real-time",
                                desc: "Pantau progres pencucian kendaraan Anda langsung dari genggaman lewat dashboard.",
                                icon: Calendar,
                                color: "bg-[#132033]/10 text-[#132033]",
                                glow: "bg-[#132033]",
                            },
                        ].map((item, index) => (
                            <FeatureCard
                                key={index}
                                title={item.title}
                                desc={item.desc}
                                icon={item.icon}
                                color={item.color}
                                glow={item.glow}
                                delay={index * 0.2}
                            />
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
