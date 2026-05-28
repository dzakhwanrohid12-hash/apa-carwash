import { ArrowUpRight } from "lucide-react";

export default function StatCard({
    title,
    value,
    icon: Icon,
    subtitle,
    variant = "primary", // Default ke primary
    prefix = "",
}) {
    const variants = {
        primary: {
            card: "bg-[linear-gradient(135deg,#1E3A59_0%,#0F1C2E_100%)] text-white shadow-[0_20px_40px_rgba(19,32,51,.15)]",
            icon: "bg-white/10 text-[#F2C94C]",
            sub: "text-white/60",
            overview: "text-white/15",
        },
        "green-dark": {
            card: "bg-[linear-gradient(135deg,#65a30d_0%,#14532d_100%)] text-white shadow-[0_20px_40px_rgba(20,83,45,0.2)]",
            icon: "bg-white/20 text-white",
            sub: "text-white/70",
            overview: "text-white/20",
        },
        "blue-dark": {
            card: "bg-[linear-gradient(135deg,#3b82f6_0%,#1e3a8a_100%)] text-white shadow-[0_20px_40px_rgba(30,58,138,0.2)]",
            icon: "bg-white/20 text-white",
            sub: "text-white/70",
            overview: "text-white/20",
        },
    };

    const current = variants[variant] || variants.primary;

    return (
        <div
            className={`relative overflow-hidden rounded-[28px] px-8 py-7 min-h-[190px] transition-all duration-300 hover:-translate-y-[4px] ${current.card}`}
        >
            {/* Siluet dekoratif */}
            <div className="absolute right-[-30px] top-[-30px] w-[140px] h-[140px] rounded-full border border-white/10" />
            <div className="absolute left-[-40px] bottom-[-40px] w-[160px] h-[160px] rounded-full bg-black/10 blur-2xl" />

            {/* Icon */}
            <div
                className={`w-[60px] h-[60px] rounded-[20px] flex items-center justify-center mb-6 ${current.icon}`}
            >
                <Icon size={24} strokeWidth={2.5} />
            </div>

            {/* Konten */}
            <div className="text-[13px] font-semibold opacity-80 tracking-widest uppercase">
                {title}
            </div>
            <div className="mt-2 font-display text-[40px] leading-none break-words">
                {prefix}
                {value}
            </div>

            {subtitle && (
                <div
                    className={`mt-5 flex items-center gap-1.5 text-[13px] font-medium ${current.sub}`}
                >
                    <ArrowUpRight size={14} />
                    {subtitle}
                </div>
            )}

            {/* Overview Tag */}
            <div
                className={`absolute top-6 right-6 text-[10px] font-bold tracking-[.2em] uppercase ${current.overview}`}
            >
                Overview
            </div>
        </div>
    );
}
