import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, ShieldCheck, Clock3 } from "lucide-react";
import ServiceCard from "@/Components/Shared/ServiceCard";

export default function Home({
    services = [],
    stats = { total_transactions: 0 },
}) {
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
                        {/* LEFT */}
                        <div className="max-w-[560px]">
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
                            <div className="mt-10 flex gap-4 flex-wrap">
                                <Link
                                    href="/customer/reservations/create"
                                    className="h-[56px] px-8 rounded-[18px] bg-[#F2C94C] text-[#132033] font-semibold inline-flex items-center gap-3 shadow-[0_20px_50px_rgba(242,201,76,.22)] hover:-translate-y-[2px] transition"
                                >
                                    Reservasi Sekarang <ArrowRight size={18} />
                                </Link>
                                <Link
                                    href="/services"
                                    className="h-[56px] px-8 rounded-[18px] border border-[#DCE4EB] text-[#132033] font-semibold inline-flex items-center"
                                >
                                    Lihat Layanan
                                </Link>
                            </div>

                            {/* STATS */}
                            <div className="mt-14 grid grid-cols-3 gap-4">
                                {[
                                    [
                                        stats.total_transactions + "+",
                                        "Reservasi",
                                        Calendar,
                                    ],
                                    ["15m", "Estimasi", Clock3],
                                    ["100%", "Terjadwal", ShieldCheck],
                                ].map(([value, label, Icon]) => (
                                    <div
                                        key={label}
                                        className="rounded-[22px] bg-white border border-[#EEF3F6] p-5 shadow-sm"
                                    >
                                        <Icon className="text-[#14B8A6] mb-4" />
                                        <div className="text-[36px] font-bold text-[#132033]">
                                            {value}
                                        </div>
                                        <div className="text-[#64748B]">
                                            {label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* RIGHT */}
                        <div className="relative flex justify-center">
                            <div className="relative w-full max-w-[620px]">
                                <div className="absolute right-[-20px] top-[60px] w-[260px] h-[260px] rounded-full bg-[#F2C94C]/10 blur-3xl" />
                                <div className="relative rounded-[34px] bg-white p-4 shadow-[0_50px_120px_rgba(20,184,166,.10)]">
                                    <div className="relative overflow-hidden rounded-[28px] h-[620px]">
                                        <img
                                            src="https://images.unsplash.com/photo-1600320254374-ce2d293c324e?q=80&w=2200"
                                            alt=""
                                            className="absolute inset-0 w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#132033]/75 via-transparent to-transparent" />
                                        <div className="absolute left-6 right-6 bottom-6">
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
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SERVICES */}
            <section className="relative py-24 bg-white">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute left-0 top-0 w-[700px] h-[700px] rounded-full bg-[#14B8A6]/4 blur-3xl" />
                    <div className="absolute right-0 bottom-0 w-[600px] h-[600px] rounded-full bg-[#F2C94C]/6 blur-3xl" />
                </div>
                <div className="relative max-w-7xl mx-auto px-6">
                    <div className="text-center">
                        <div className="inline-flex items-center gap-3 mb-6 text-[#D4A91D] font-semibold">
                            <div className="w-12 h-[2px] bg-[#14B8A6]" />{" "}
                            LAYANAN
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
                    </div>
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                        {services.map((service, index) => (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.08 }}
                            >
                                <ServiceCard service={service} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* WHY US */}
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
                            },
                            {
                                title: "Slot Terjamin",
                                desc: "Sistem memastikan jadwal kendaraan tetap aman.",
                                icon: ShieldCheck,
                                color: "bg-[#14B8A6]/10 text-[#14B8A6]",
                            },
                            {
                                title: "Tracking Real-time",
                                desc: "Pantau progres kendaraan langsung dari dashboard.",
                                icon: Calendar,
                                color: "bg-[#132033]/10 text-[#132033]",
                            },
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="group relative rounded-[32px] bg-white p-10 border border-[#EEF3F7] shadow-[0_20px_40px_rgba(19,32,51,0.04)] transition-all duration-500 hover:shadow-[0_40px_80px_rgba(19,32,51,0.08)] hover:-translate-y-2 overflow-hidden"
                            >
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#14B8A6]/5 to-transparent" />
                                <div
                                    className={`relative w-[72px] h-[72px] rounded-[24px] ${item.color} flex items-center justify-center mb-10 transition-transform group-hover:scale-110 duration-500`}
                                >
                                    <item.icon size={32} />
                                </div>
                                <h3 className="relative font-display text-[26px] font-bold text-[#132033]">
                                    {item.title}
                                </h3>
                                <p className="relative mt-5 leading-8 text-[#64748B]">
                                    {item.desc}
                                </p>
                                <div className="absolute bottom-0 left-10 right-10 h-[2px] bg-[#14B8A6]/0 group-hover:bg-[#14B8A6]/20 transition-all duration-500" />
                            </div>
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
                <div className="relative max-w-5xl mx-auto px-6 text-center">
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
                </div>
            </section>
        </GuestLayout>
    );
}
