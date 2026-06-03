import GuestLayout from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";
import { motion } from "framer-motion";
import { MapPin, Smartphone, Sparkles, Droplets } from "lucide-react";

export default function About() {
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
            <Head title="Tentang Kami" />

            {/* HEADER (Konsisten dengan Halaman Layanan) */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,#132033_0%,#17273D_35%,#15263F_70%,#112036_100%)]" />
                    <div className="absolute left-[10%] top-[-300px] w-[700px] h-[700px] rounded-full bg-[#14B8A6]/10 blur-3xl" />
                    <div className="absolute right-[5%] top-[-300px] w-[700px] h-[700px] rounded-full bg-[#F2C94C]/10 blur-3xl" />
                </div>

                <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-32">
                    <motion.div
                        initial={{ opacity: 0, y: -40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-center"
                    >
                        <div className="uppercase tracking-[.25em] text-[#9AA9BB] font-semibold text-[15px] mb-5">
                            TENTANG KAMI
                        </div>

                        <h1 className="text-[48px] md:text-[56px] leading-none font-bold mb-7">
                            <span className="text-white">Mengenal Lebih </span>
                            <span className="text-[#F2C94C]">Dekat</span>
                        </h1>

                        <div className="flex justify-center items-center gap-5 mb-8">
                            <div className="w-24 h-[1px] bg-white/15" />
                            <div className="w-3 h-3 rotate-45 border border-[#F2C94C] bg-[#F2C94C]/20" />
                            <div className="w-24 h-[1px] bg-white/15" />
                        </div>

                        <p className="max-w-3xl mx-auto text-[18px] leading-9 text-[#C8D2DD]">
                            Kisah di balik inovasi perawatan kendaraan dan
                            karpet revolusioner yang dirancang khusus untuk
                            kenyamanan Anda.
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

            {/* MAIN CONTENT SECTION */}
            <section className="py-20 bg-slate-50 relative overflow-hidden">
                {/* Background Ornaments */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-400/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sky-300/10 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/3 pointer-events-none" />

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    {/* HIGHLIGHT CARD */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        className="mb-20"
                    >
                        <div className="bg-white rounded-[2.5rem] p-10 md:p-16 shadow-2xl shadow-slate-200/50 border border-slate-100 flex flex-col md:flex-row items-center gap-12 overflow-hidden relative">
                            {/* Accent Glow */}
                            <div className="absolute -top-32 -right-32 w-64 h-64 bg-amber-400/20 blur-3xl rounded-full" />

                            <div className="md:w-1/3 flex justify-center">
                                <div className="relative w-40 h-40 md:w-56 md:h-56 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/30">
                                    <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                                        <Droplets
                                            size={64}
                                            className="text-amber-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="md:w-2/3 text-center md:text-left z-10">
                                <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-800 mb-6">
                                    Revolusi Cuci Premium di{" "}
                                    <span className="text-amber-500">
                                        Pekanbaru
                                    </span>
                                </h2>
                                <p className="text-lg text-slate-500 leading-relaxed mb-6">
                                    Berdiri sejak tahun 2024,{" "}
                                    <strong className="text-slate-700">
                                        APA Car Wash
                                    </strong>{" "}
                                    tidak hanya sekadar tempat mencuci
                                    kendaraan. Kami lahir dari visi untuk
                                    memberikan solusi atas masalah klasik:
                                    membuang waktu berjam-jam hanya untuk
                                    mengantre.
                                </p>
                                <p className="text-lg text-slate-500 leading-relaxed">
                                    Kini, kami menghadirkan pengalaman pencucian
                                    kendaraan dan karpet yang 100% transparan,
                                    dapat diprediksi, dan dikelola langsung dari
                                    ujung jari Anda.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* VALUES / FEATURES CARDS */}
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: MapPin,
                                title: "Hadir di Pekanbaru",
                                desc: "Menjadi pelopor layanan cuci kendaraan dan karpet berbasis digital yang didesain khusus untuk memenuhi kebutuhan gaya hidup masyarakat modern.",
                                color: "text-blue-500",
                                bg: "bg-blue-50",
                            },
                            {
                                icon: Smartphone,
                                title: "Teknologi Reservasi Pintar",
                                desc: "Kami memadukan standar cuci premium dengan sistem online real-time. Pilih jadwal dari rumah, serahkan kendaraan, dan pantau progresnya langsung via smartphone.",
                                color: "text-amber-500",
                                bg: "bg-amber-50",
                            },
                            {
                                icon: Sparkles,
                                title: "Kualitas Tanpa Kompromi",
                                desc: "Dengan tim yang sangat terlatih dan penggunaan bahan pembersih berkualitas tinggi, kami menjanjikan efisiensi dan kilau maksimal di setiap tetes air.",
                                color: "text-emerald-500",
                                bg: "bg-emerald-50",
                            },
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    delay: index * 0.2,
                                    duration: 0.6,
                                }}
                                className="group bg-white rounded-[2rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/30 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div
                                    className={`relative w-20 h-20 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}
                                >
                                    <item.icon size={36} strokeWidth={1.5} />
                                </div>

                                <h3 className="relative text-2xl font-display font-bold text-slate-800 mb-4">
                                    {item.title}
                                </h3>

                                <p className="relative text-slate-500 leading-relaxed">
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}
