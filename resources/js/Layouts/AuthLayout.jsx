import { Link } from "@inertiajs/react";
import PageTransition from "@/Components/Animations/PageTransition";

export default function AuthLayout({ children, title, subtitle }) {
    return (
        <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(135deg,#0F1B2B_0%,#132033_50%,#1C314A_100%)] flex items-center justify-center px-6 py-12">
            <div className="absolute inset-0">
                <div className="absolute -left-[320px] -top-[280px] w-[900px] h-[900px] rounded-full bg-[#14B8A6]/8 blur-3xl" />
                <div className="absolute right-[-280px] bottom-[-280px] w-[900px] h-[900px] rounded-full bg-[#F2C94C]/12 blur-3xl" />
                <div className="absolute right-[8%] top-[10%] w-[560px] h-[560px] rounded-full border border-[#F2C94C]/10" />
                <div className="absolute right-[12%] top-[15%] w-[400px] h-[400px] rounded-full border border-[#F2C94C]/8" />
                <div className="absolute right-[18%] top-[24%] w-[220px] h-[220px] rounded-full bg-[#F2C94C]/6 blur-3xl" />
                <div className="absolute left-[10%] top-[12%] w-[700px] h-[700px] rounded-full border border-white/[0.04]" />
                <div className="absolute left-[13%] top-[15%] w-[560px] h-[560px] rounded-full border border-white/[0.03]" />
                <div className="absolute left-[18%] top-[20%] w-[420px] h-[420px] rounded-full border border-[#14B8A6]/10" />
                <div className="absolute left-[18%] top-[16%] w-[18px] h-[18px] rounded-full bg-[#14B8A6]/20" />
                <div className="absolute left-[28%] top-[30%] w-[12px] h-[12px] rounded-full bg-[#F2C94C]/20" />
                <div className="absolute right-[22%] top-[18%] w-[18px] h-[18px] rounded-full bg-[#F2C94C]/18" />
                <div className="absolute right-[15%] top-[42%] w-[14px] h-[14px] rounded-full bg-[#F2C94C]/15" />
                <div className="absolute right-[20%] bottom-[24%] w-[12px] h-[12px] rounded-full bg-[#14B8A6]/20" />
                <svg
                    className="absolute bottom-0 left-0 w-full opacity-[0.08]"
                    viewBox="0 0 1440 320"
                >
                    <path
                        fill="#14B8A6"
                        d="M0,224 C240,180 520,260 760,230 C980,210 1180,150 1440,240 L1440,320 L0,320 Z"
                    />
                </svg>
            </div>
            <PageTransition className="relative z-10 w-full max-w-[1080px]">
                <div className="relative overflow-hidden rounded-[32px] bg-white/[0.95] backdrop-blur-xl border border-white/20 shadow-[0_45px_120px_rgba(19,32,51,.22)]">
                    <div className="flex flex-col lg:flex-row min-h-[660px]">
                        <div className="relative lg:w-[40%] overflow-hidden bg-[linear-gradient(180deg,#132033_0%,#162740_100%)]">
                            <div className="absolute inset-0">
                                <div className="absolute left-1/2 top-[28%] -translate-x-1/2 w-[420px] h-[420px] rounded-full bg-[#F2C94C]/10 blur-3xl" />
                                <div className="absolute left-1/2 top-[34%] -translate-x-1/2 w-[300px] h-[300px] rounded-full border border-[#F2C94C]/10" />
                                <svg
                                    className="absolute bottom-0 left-0 w-full opacity-[0.10]"
                                    viewBox="0 0 1440 320"
                                >
                                    <path
                                        fill="#14B8A6"
                                        d="M0,224 C240,170 460,250 760,220 C980,190 1220,150 1440,240 L1440,320 L0,320 Z"
                                    />
                                </svg>
                            </div>
                            <div className="relative h-full flex flex-col items-center justify-center px-10 text-center">
                                <Link href="/">
                                    <img
                                        src="/img/logo/logo.png"
                                        className="w-[210px] object-contain"
                                    />
                                </Link>
                                <div className="mt-10">
                                    <h2 className="font-display text-[46px] leading-none font-bold">
                                        <div className="text-white">
                                            Standar Baru
                                        </div>
                                        <div className="inline-block mt-4 bg-[#F2C94C] text-[#132033] px-5 py-2">
                                            Perawatan
                                        </div>
                                        <div className="mt-4 italic text-[#F2C94C]">
                                            Kendaraan.
                                        </div>
                                    </h2>
                                    <p className="mt-8 leading-8 text-[#C8D2DD]">
                                        Reservasi lebih cepat, lebih nyaman, dan
                                        pengalaman kendaraan yang lebih premium.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="relative lg:w-[60%] bg-white flex items-center justify-center px-10 py-14">
                            <div className="w-full max-w-[400px]">
                                <div className="mb-8">
                                    <h1 className="font-display text-[44px] font-bold text-[#111827]">
                                        {title}
                                    </h1>
                                    {subtitle && (
                                        <p className="mt-4 leading-8 text-[#64748B]">
                                            {subtitle}
                                        </p>
                                    )}
                                </div>
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </PageTransition>
        </div>
    );
}
