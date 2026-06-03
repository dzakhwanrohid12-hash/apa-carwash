import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import {
    MapPin,
    Phone,
    Mail,
    Send,
    MessageSquare,
    CheckCircle,
} from "lucide-react";

export default function Contact() {
    const [isSuccess, setIsSuccess] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("feedback.store"), {
            onSuccess: () => {
                reset();
                setIsSuccess(true);
                // Menghilangkan pesan sukses otomatis setelah 5 detik
                setTimeout(() => setIsSuccess(false), 5000);
            },
        });
    };

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
            <Head title="Hubungi Kami" />

            {/* HEADER */}
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
                            HUBUNGI KAMI
                        </div>

                        <h1 className="text-[48px] md:text-[56px] leading-none font-bold mb-7">
                            <span className="text-white">Tetap Terhubung </span>
                            <span className="text-[#F2C94C]">Dengan Kami</span>
                        </h1>

                        <div className="flex justify-center items-center gap-5 mb-8">
                            <div className="w-24 h-[1px] bg-white/15" />
                            <div className="w-3 h-3 rotate-45 border border-[#F2C94C] bg-[#F2C94C]/20" />
                            <div className="w-24 h-[1px] bg-white/15" />
                        </div>

                        <p className="max-w-3xl mx-auto text-[18px] leading-9 text-[#C8D2DD]">
                            Punya pertanyaan, kritik, atau butuh bantuan
                            reservasi? Tim kami selalu siap sedia mendengar dan
                            melayani Anda dengan sepenuh hati.
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
            <section className="py-20 bg-slate-50 relative overflow-hidden">
                <div className="absolute top-[10%] left-[-5%] w-[400px] h-[400px] bg-amber-400/10 blur-[100px] rounded-full pointer-events-none" />
                <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-yellow-300/10 blur-[100px] rounded-full pointer-events-none" />

                <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20">
                    {/* BAGIAN KIRI: Info Kontak & Map */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="space-y-6"
                    >
                        <h2 className="font-display font-bold text-3xl text-slate-800 mb-8">
                            Informasi{" "}
                            <span className="text-amber-500">Kontak</span>
                        </h2>

                        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 flex items-start gap-5 group hover:-translate-y-1 transition-transform duration-300">
                            <div className="p-4 bg-amber-50 rounded-2xl text-amber-500 group-hover:scale-110 group-hover:bg-amber-100 transition-all duration-300">
                                <MapPin size={28} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-slate-800 mb-2 font-display">
                                    Lokasi Kedai
                                </h3>
                                <p className="text-slate-500 leading-relaxed">
                                    Jl. Kaharuddin Nasution No. 123
                                    <br />
                                    Pekanbaru, Riau, Indonesia
                                    <br />
                                    Kode Pos 28284
                                </p>
                            </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-6">
                            <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 flex flex-col gap-4 group hover:-translate-y-1 transition-transform duration-300">
                                <div className="p-3.5 bg-blue-50 w-fit rounded-2xl text-blue-500 group-hover:scale-110 group-hover:bg-blue-100 transition-all duration-300">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-slate-800 mb-1 font-display">
                                        Telepon / WA
                                    </h3>
                                    <p className="text-slate-500 font-medium">
                                        0812-3456-7890
                                    </p>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 flex flex-col gap-4 group hover:-translate-y-1 transition-transform duration-300">
                                <div className="p-3.5 bg-emerald-50 w-fit rounded-2xl text-emerald-500 group-hover:scale-110 group-hover:bg-emerald-100 transition-all duration-300">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-slate-800 mb-1 font-display">
                                        Email
                                    </h3>
                                    <p className="text-slate-500 font-medium">
                                        halo@apacarwash.com
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 bg-white p-2 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden relative group">
                            <div className="w-full h-[250px] rounded-[1.5rem] overflow-hidden">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127672.82772591605!2d101.35925345717462!3d0.5103460831627768!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d5ab8078ea2ea5%3A0x6a218fbd9265f24f!2sPekanbaru%2C%20Pekanbaru%20City%2C%20Riau!5e0!3m2!1sen!2sid!4v1716999999999!5m2!1sen!2sid"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="grayscale-[30%] contrast-[1.1] group-hover:grayscale-0 transition-all duration-700"
                                ></iframe>
                            </div>
                        </div>
                    </motion.div>

                    {/* BAGIAN KANAN: Form Feedback */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 0.8,
                            ease: "easeOut",
                            delay: 0.2,
                        }}
                    >
                        <div className="bg-white/80 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] border border-white shadow-[0_20px_60px_rgba(242,201,76,.15)] relative overflow-hidden">
                            <div className="absolute -top-20 -right-20 w-64 h-64 bg-amber-400/10 blur-3xl rounded-full pointer-events-none" />

                            <div className="flex items-center gap-4 mb-8 relative z-10">
                                <div className="p-3 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-xl shadow-lg shadow-amber-500/30 text-white">
                                    <MessageSquare size={24} />
                                </div>
                                <h3 className="font-display font-bold text-2xl text-slate-800">
                                    Kirim Pesan{" "}
                                    <span className="text-amber-500">
                                        Langsung
                                    </span>
                                </h3>
                            </div>

                            <form
                                onSubmit={submit}
                                className="space-y-5 relative z-10"
                            >
                                {/* PESAN ALERT SUKSES */}
                                <AnimatePresence>
                                    {isSuccess && (
                                        <motion.div
                                            initial={{
                                                opacity: 0,
                                                y: -10,
                                                scale: 0.95,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                y: 0,
                                                scale: 1,
                                            }}
                                            exit={{
                                                opacity: 0,
                                                y: -10,
                                                scale: 0.95,
                                            }}
                                            className="bg-emerald-50 border border-emerald-200 text-emerald-600 px-5 py-4 rounded-2xl flex items-center gap-3 shadow-sm"
                                        >
                                            <CheckCircle
                                                size={24}
                                                className="text-emerald-500 shrink-0"
                                            />
                                            <span className="font-medium text-sm leading-snug">
                                                Terima kasih! Pesan Anda
                                                berhasil terkirim dan akan
                                                segera kami proses.
                                            </span>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <div>
                                    <InputLabel
                                        value="Nama Lengkap"
                                        className="text-slate-600 mb-1.5"
                                    />
                                    <TextInput
                                        className="w-full"
                                        placeholder="Cth: Budi Santoso"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        required
                                    />
                                    <InputError
                                        message={errors.name}
                                        className="mt-2 text-red-500"
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <InputLabel
                                            value="Email (Opsional)"
                                            className="text-slate-600 mb-1.5"
                                        />
                                        <TextInput
                                            type="email"
                                            className="w-full"
                                            placeholder="budi@email.com"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                        />
                                    </div>
                                    <div>
                                        <InputLabel
                                            value="No. WhatsApp"
                                            className="text-slate-600 mb-1.5"
                                        />
                                        <TextInput
                                            className="w-full"
                                            placeholder="0812xxxx"
                                            value={data.phone}
                                            onChange={(e) =>
                                                setData("phone", e.target.value)
                                            }
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <InputLabel
                                        value="Pesan / Saran / Pertanyaan"
                                        className="text-slate-600 mb-1.5"
                                    />
                                    <textarea
                                        className="w-full px-5 py-3.5 border-transparent bg-slate-100/80 text-slate-800 placeholder-slate-400 focus:border-amber-400 focus:ring-4 focus:ring-amber-400/20 focus:bg-white rounded-2xl shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] transition-all duration-300 resize-y"
                                        rows="5"
                                        placeholder="Tuliskan pesan Anda di sini..."
                                        required
                                        value={data.message}
                                        onChange={(e) =>
                                            setData("message", e.target.value)
                                        }
                                    ></textarea>
                                    <InputError
                                        message={errors.message}
                                        className="mt-2 text-red-500"
                                    />
                                </div>

                                {/* PERBAIKAN: Bungkus dengan div flex-row agar sejajar sempurna */}
                                <PrimaryButton
                                    disabled={processing}
                                    className="w-full mt-4 text-lg py-4"
                                >
                                    <div className="flex flex-row items-center justify-center gap-3 whitespace-nowrap">
                                        <Send size={20} />
                                        <span>Kirim Pesan</span>
                                    </div>
                                </PrimaryButton>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </section>
        </GuestLayout>
    );
}
