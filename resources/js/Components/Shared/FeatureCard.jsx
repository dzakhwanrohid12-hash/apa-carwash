import { motion } from "framer-motion";

export default function FeatureCard({
    title,
    desc,
    icon: Icon,
    color,
    glow,
    delay,
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                delay: delay,
                duration: 0.6,
                type: "spring",
                stiffness: 70,
            }}
            className="group relative rounded-[32px] p-8 md:p-10 border border-slate-100/80 shadow-[0_8px_30px_rgba(19,32,51,0.03)] transition-all duration-500 hover:shadow-[0_30px_60px_rgba(19,32,51,0.08)] hover:-translate-y-2 overflow-hidden flex flex-col items-start z-10 bg-white"
        >
            {/* --- 1. BACKGROUND GRADIENT --- */}
            {/* Gradasi dasar agar tidak flat putih polos */}
            <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50/80 to-slate-100/50 z-0 pointer-events-none" />

            {/* Pendaran warna sesuai tema (Amber, Teal, atau Navy) di sudut-sudut */}
            <div
                className={`absolute -right-20 -top-20 w-64 h-64 rounded-full ${glow} opacity-[0.04] blur-[60px] group-hover:opacity-[0.15] transition-all duration-700 ease-out z-0 pointer-events-none`}
            />
            <div
                className={`absolute -left-20 -bottom-20 w-64 h-64 rounded-full ${glow} opacity-[0.02] blur-[60px] group-hover:opacity-[0.1] transition-all duration-700 ease-out z-0 pointer-events-none`}
            />

            {/* --- 2. SILUET PERCIKAN AIR (WATER SPLASH MOTIF) --- */}
            <div className="absolute -bottom-16 -right-16 w-56 h-56 text-slate-800 opacity-[0.03] group-hover:opacity-[0.05] transition-all duration-700 -rotate-12 group-hover:rotate-0 transform pointer-events-none z-0">
                <svg
                    viewBox="0 0 200 200"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full fill-current"
                >
                    <path
                        d="M45.7,-76.4C58.9,-69.3,69.2,-55.4,78.2,-41.4C87.2,-27.4,94.9,-13.7,94.1,-0.5C93.3,12.8,84.1,25.6,75,38.2C65.8,50.8,56.7,63.1,44.4,72.4C32.1,81.7,16,88,-0.7,89.3C-17.5,90.5,-35,86.6,-49.2,77.7C-63.4,68.8,-74.3,54.8,-81.8,39.6C-89.4,24.4,-93.6,7.9,-91,-7.8C-88.5,-23.4,-79.1,-38.3,-67.2,-49.2C-55.3,-60.1,-40.8,-67,-26.8,-73.4C-12.8,-79.8,0.7,-85.7,14.6,-83.4C28.5,-81.1,45.7,-76.4,45.7,-76.4Z"
                        transform="translate(100 100)"
                    />
                </svg>
            </div>

            {/* --- 3. ANIMASI GELEMBUNG SABUN (CAR WASH EFFECT) --- */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute bottom-[-10%] left-[20%] w-3 h-3 rounded-full bg-sky-400/20 blur-[1px] opacity-0 group-hover:opacity-100 group-hover:-translate-y-24 transition-all duration-[1000ms] ease-out" />
                <div className="absolute bottom-[-10%] left-[55%] w-6 h-6 rounded-full bg-sky-400/10 blur-[2px] opacity-0 group-hover:opacity-100 group-hover:-translate-y-36 transition-all duration-[1500ms] ease-out delay-100" />
                <div className="absolute bottom-[-10%] left-[80%] w-2 h-2 rounded-full bg-sky-400/30 opacity-0 group-hover:opacity-100 group-hover:-translate-y-16 transition-all duration-[800ms] ease-out delay-200" />
            </div>

            {/* --- HEADER KARTU (IKON) --- */}
            <div
                className={`relative w-[68px] h-[68px] rounded-[22px] flex items-center justify-center mb-8 transition-all duration-500 ${color} group-hover:scale-110 group-hover:-rotate-3 shadow-sm group-hover:shadow-md z-10 backdrop-blur-sm border border-white/50`}
            >
                <Icon size={30} strokeWidth={2.5} className="relative z-10" />
            </div>

            {/* --- KONTEN UTAMA --- */}
            <h3 className="relative z-10 font-display text-[24px] md:text-[26px] font-bold text-[#132033] mb-4 transition-colors duration-300">
                {title}
            </h3>

            <p className="relative z-10 leading-[1.8] text-[#64748B] text-[15px] md:text-[16px]">
                {desc}
            </p>

            {/* --- ELEMEN INTERAKTIF BAWAH --- */}
            <div className="relative z-10 mt-6 overflow-hidden flex items-center text-sm font-bold text-[#D4A91D] opacity-0 group-hover:opacity-100 transition-all duration-500">
                <span className="translate-y-6 group-hover:translate-y-0 transition-transform duration-500 flex items-center gap-2">
                    Pelajari Lebih Lanjut
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M5 12H19M19 12L12 5M19 12L12 19"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </span>
            </div>
        </motion.div>
    );
}
