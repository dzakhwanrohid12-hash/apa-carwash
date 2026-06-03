import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link } from "@inertiajs/react";
import { useState } from "react";
import { motion } from "framer-motion";
import ServiceCard from "@/Components/Shared/ServiceCard";

export default function Services({ categories = [], services = [] }) {
    const [activeFilter, setActiveFilter] = useState("Semua");

    const filtered =
        activeFilter === "Semua"
            ? services
            : services.filter((s) => s.category?.name === activeFilter);

    return (
        <GuestLayout>
            <Head title="Layanan" />

            {/* HEADER */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,#132033_0%,#17273D_35%,#15263F_70%,#112036_100%)]" />
                    <div className="absolute left-[10%] top-[-300px] w-[700px] h-[700px] rounded-full bg-[#14B8A6]/10 blur-3xl" />
                    <div className="absolute right-[5%] top-[-300px] w-[700px] h-[700px] rounded-full bg-[#F2C94C]/10 blur-3xl" />
                </div>

                <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-24">
                    <motion.div
                        initial={{ opacity: 0, y: -40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-center"
                    >
                        <div className="uppercase tracking-[.25em] text-[#9AA9BB] font-semibold text-[15px] mb-5">
                            LAYANAN
                        </div>

                        <h1 className="text-[56px] leading-none font-bold mb-7">
                            <span className="text-white">Perawatan </span>
                            <span className="text-[#F2C94C]">Premium</span>
                        </h1>

                        <div className="flex justify-center items-center gap-5 mb-8">
                            <div className="w-24 h-[1px] bg-white/15" />
                            <div className="w-3 h-3 rotate-45 border border-[#F2C94C] bg-[#F2C94C]/20" />
                            <div className="w-24 h-[1px] bg-white/15" />
                        </div>

                        <p className="max-w-3xl mx-auto text-[18px] leading-9 text-[#C8D2DD]">
                            Kualitas perawatan kendaraan yang lebih bersih,
                            lebih cepat, dan lebih nyaman.
                        </p>
                    </motion.div>
                </div>

                {/* WAVE */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
                    <svg
                        viewBox="0 0 1440 90"
                        className="relative block w-full h-[70px]"
                        preserveAspectRatio="none"
                    >
                        <path
                            fill="#FAFCFD"
                            d="M0,40 C220,70 420,60 720,40 C1000,20 1220,35 1440,40 L1440,90 L0,90 Z"
                        />
                    </svg>
                </div>
            </section>

            {/* FILTER */}
            <section className="py-14">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-wrap justify-center gap-3 mb-14">
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{
                                type: "spring",
                                stiffness: 200,
                                damping: 15,
                            }}
                            onClick={() => setActiveFilter("Semua")}
                            className={`h-11 px-6 rounded-lg border font-medium transition-all duration-300 ${
                                activeFilter === "Semua"
                                    ? "bg-[#1A2A41] border-[#253853] text-[#F2C94C] shadow-[0_15px_35px_rgba(17,32,54,.20)]"
                                    : "bg-white border-[#E4EBF0] text-[#64748B] hover:bg-[#132033] hover:border-[#22344C] hover:text-[#F2C94C] hover:-translate-y-[1px]"
                            }`}
                        >
                            Semua
                        </motion.button>

                        {categories.map((cat, index) => (
                            <motion.button
                                key={cat.id}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{
                                    type: "spring",
                                    stiffness: 200,
                                    damping: 15,
                                    delay: (index + 1) * 0.1,
                                }}
                                onClick={() => setActiveFilter(cat.name)}
                                className={`h-11 px-6 rounded-lg border font-medium transition-all duration-300 ${
                                    activeFilter === cat.name
                                        ? "bg-[#1A2A41] border-[#253853] text-[#F2C94C] shadow-[0_15px_35px_rgba(17,32,54,.20)]"
                                        : "bg-white border-[#E4EBF0] text-[#64748B] hover:bg-[#132033] hover:border-[#22344C] hover:text-[#F2C94C] hover:-translate-y-[1px]"
                                }`}
                            >
                                {cat.name}
                            </motion.button>
                        ))}
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filtered.map((service, index) => (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1,
                                }}
                            >
                                <ServiceCard service={service} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="relative mt-14">
                <div className="relative overflow-hidden bg-[linear-gradient(90deg,#122033_0%,#162740_45%,#203A56_100%)] min-h-[300px] flex items-center">
                    <div className="absolute inset-0">
                        <div className="absolute left-[-280px] top-[-280px] w-[850px] h-[850px] rounded-full bg-[#14B8A6]/10 blur-3xl" />
                        <div className="absolute right-[-250px] bottom-[-250px] w-[700px] h-[700px] rounded-full bg-[#F2C94C]/8 blur-3xl" />
                        <div className="absolute right-[-120px] top-[40px] w-[60%] h-[180px] bg-white/[0.03] rotate-[-5deg]" />
                        <div className="absolute right-[10%] top-[50%] translate-y-[-50%] w-[320px] h-[320px] rounded-full border border-[#F2C94C]/10" />
                    </div>

                    <div className="relative max-w-7xl mx-auto w-full px-8 py-20">
                        <div className="grid lg:grid-cols-[1fr_auto] gap-14 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7, ease: "easeOut" }}
                            >
                                <div className="inline-flex items-center gap-3 mb-5">
                                    <div className="w-10 h-[1px] bg-[#14B8A6]" />
                                    <span className="uppercase tracking-[.25em] text-[#F2C94C] text-[12px]">
                                        Reservasi
                                    </span>
                                </div>

                                <h2 className="text-[46px] leading-[1.1] font-bold text-white mb-5 max-w-[700px]">
                                    Sudah Menentukan Pilihan Anda?
                                </h2>

                                <p className="text-[18px] leading-9 text-[#C8D2DD] max-w-[650px]">
                                    Reservasi sekarang dan nikmati pengalaman
                                    perawatan kendaraan premium yang lebih cepat
                                    dan lebih nyaman.
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.7,
                                    ease: "easeOut",
                                    delay: 0.2,
                                }}
                                className="flex justify-center"
                            >
                                <Link
                                    href="/register"
                                    className="group relative overflow-hidden inline-flex items-center justify-center h-[68px] px-14 bg-[#F2C94C] text-[#132033] font-semibold text-lg shadow-[0_20px_60px_rgba(242,201,76,.18)] hover:translate-y-[-2px] transition"
                                >
                                    <div className="absolute left-[-80px] top-0 w-[70px] h-full bg-white/25 rotate-[18deg] group-hover:left-[140%] transition-all duration-700" />
                                    <span className="relative">
                                        Reservasi Sekarang
                                    </span>
                                </Link>
                            </motion.div>
                        </div>
                    </div>

                    {/* INTERNAL WAVE */}
                    <div className="absolute bottom-0 left-0 w-full overflow-hidden">
                        <svg
                            viewBox="0 0 1440 140"
                            className="block w-full h-[56px]"
                            preserveAspectRatio="none"
                        >
                            <path
                                fill="rgba(255,255,255,.06)"
                                d="M0,70 C250,120 480,20 760,45 C1030,70 1220,120 1440,65 L1440,140 L0,140 Z"
                            />
                        </svg>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}
