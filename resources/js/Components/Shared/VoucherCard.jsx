import { useState } from "react";
import { motion } from "framer-motion";
import {
    ShieldCheck,
    Clock,
    CheckCircle,
    Copy,
    Gift,
    Sparkles,
} from "lucide-react";

export default function VoucherCard({ voucher, index = 0 }) {
    const [copiedCode, setCopiedCode] = useState(null);

    // Fungsi salin mandiri untuk kartu ini
    const handleCopy = (code) => {
        navigator.clipboard.writeText(code);
        setCopiedCode(code);
        setTimeout(() => setCopiedCode(null), 3000);
    };

    // Format nilai diskon
    const formattedDiscount =
        voucher.discount_type === "percentage"
            ? `${parseFloat(voucher.discount_value)}%`
            : `Rp${parseFloat(voucher.discount_value) / 1000}K`;

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                duration: 0.6,
                delay: index * 0.1,
                type: "spring",
                stiffness: 80,
            }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="flex bg-white rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:shadow-[0_30px_60px_rgba(242,201,76,0.2)] overflow-hidden relative group transition-all duration-300 cursor-pointer"
        >
            {/* Efek Kilauan Cahaya (Shimmer) saat di-hover */}
            <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/60 to-transparent skew-x-12 group-hover:left-[200%] transition-all duration-[1.5s] ease-in-out z-20 pointer-events-none" />

            {/* --- SISI KIRI: GOLDEN TICKET --- */}
            {/* Padding disesuaikan jadi p-4 sm:p-5 agar teks tidak sesak */}
            <div className="bg-gradient-to-br from-[#F2C94C] to-[#D4A91D] p-4 sm:p-5 flex flex-col items-center justify-center text-[#132033] border-r-[3px] border-dashed border-[#132033]/20 w-[38%] md:w-[35%] relative overflow-hidden">
                {/* Tekstur Garis Diagonal */}
                <div className="absolute inset-0 opacity-[0.06] pointer-events-none mix-blend-overlay">
                    <svg
                        width="100%"
                        height="100%"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <defs>
                            <pattern
                                id="diagonal-stripe"
                                width="8"
                                height="8"
                                patternTransform="rotate(45 0 0)"
                                patternUnits="userSpaceOnUse"
                            >
                                <line
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="8"
                                    stroke="#132033"
                                    strokeWidth="2"
                                />
                            </pattern>
                        </defs>
                        <rect
                            width="100%"
                            height="100%"
                            fill="url(#diagonal-stripe)"
                        />
                    </svg>
                </div>

                {/* Siluet Ikon Kado */}
                <Gift className="absolute -bottom-6 -left-4 w-28 h-28 text-[#132033] opacity-[0.07] -rotate-12 group-hover:rotate-0 transition-transform duration-700 pointer-events-none" />

                {/* Potongan tiket sobek */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-[#162740] rounded-full shadow-inner" />
                <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-[#162740] rounded-full shadow-inner" />

                {/* PERBAIKAN: whitespace-nowrap, tracking-tighter, dan penurunan size text agar tidak terpotong */}
                <motion.span className="text-3xl xl:text-4xl font-display font-black mb-1 tracking-tighter whitespace-nowrap relative z-10 drop-shadow-sm group-hover:scale-105 transition-transform duration-500">
                    {formattedDiscount}
                </motion.span>
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-[#132033]/80 bg-white/40 px-2 sm:px-3 py-1 rounded-md mt-1 relative z-10 backdrop-blur-sm border border-white/30 whitespace-nowrap">
                    Potongan
                </span>
            </div>

            {/* --- SISI KANAN: DETAIL TIKET --- */}
            <div className="p-5 sm:p-6 flex-1 flex flex-col justify-center bg-white relative">
                {/* Badge Eksklusif */}
                <div className="absolute top-0 right-4 sm:right-6 px-2 sm:px-3 py-1 bg-amber-100 text-amber-700 text-[9px] font-black uppercase tracking-widest rounded-b-lg shadow-sm flex items-center gap-1">
                    <Sparkles size={10} /> Spesial
                </div>

                <p className="text-[11px] sm:text-[12px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5 mt-2">
                    <ShieldCheck size={14} className="text-[#14B8A6]" /> Min.
                    Trx Rp{" "}
                    {new Intl.NumberFormat("id-ID").format(
                        voucher.min_transaction,
                    )}
                </p>

                <div className="flex items-center justify-between mb-3">
                    <span className="font-mono font-black text-xl sm:text-2xl text-[#132033] tracking-widest bg-slate-50 px-2 py-1 rounded-lg border border-slate-100">
                        {voucher.code}
                    </span>
                </div>

                <p className="text-[11px] sm:text-[12px] text-slate-500 flex items-center gap-1.5 font-bold mb-5">
                    <Clock size={14} className="text-[#F2C94C]" /> Berlaku s/d{" "}
                    {new Date(voucher.valid_until).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                    })}
                </p>

                {/* Tombol Salin */}
                <button
                    onClick={() => handleCopy(voucher.code)}
                    className={`w-full py-2.5 sm:py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all duration-300 relative overflow-hidden ${
                        copiedCode === voucher.code
                            ? "bg-[#14B8A6]/10 text-[#14B8A6] border border-[#14B8A6]/30 shadow-inner"
                            : "bg-[#F2C94C]/10 text-[#D4A91D] border border-[#F2C94C]/30 hover:bg-[#F2C94C] hover:text-[#132033] hover:shadow-lg hover:shadow-[#F2C94C]/40 animate-[pulse_3s_ease-in-out_infinite]"
                    }`}
                >
                    {copiedCode === voucher.code ? (
                        <>
                            <CheckCircle size={18} /> Kode Tersalin!
                        </>
                    ) : (
                        <>
                            <Copy size={18} /> Salin Kode Promo
                        </>
                    )}
                </button>
            </div>
        </motion.div>
    );
}
