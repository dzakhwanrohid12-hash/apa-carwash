import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import {
    Menu,
    X,
    ChevronDown,
    MapPin,
    Phone,
    Mail,
    ChevronRight,
    LayoutDashboard,
    User,
    LogOut,
} from "lucide-react";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import PageTransition from "@/Components/Animations/PageTransition";

export default function GuestLayout({ children }) {
    const { auth } = usePage().props;
    const [mobile, setMobile] = useState(false);
    const current = window.location.pathname;
    const nav = [
        ["/", "Beranda"],
        ["/services", "Layanan"],
        ["/queue/monitor", "Antrean"],
        ["/about", "Tentang"],
        ["/contact", "Kontak"],
    ];

    const profileDropdown = auth?.user ? (
        <Dropdown>
            <Dropdown.Trigger>
                <button className="flex items-center gap-3 h-[58px] pl-2 pr-4 rounded-[18px] bg-white border border-secondary-100 hover:border-primary-300">
                    <div className="relative w-[42px] h-[42px] rounded-[16px] bg-primary-300 text-secondary-700 font-bold flex items-center justify-center">
                        {auth?.user?.name?.charAt(0)}
                    </div>
                    <div className="text-left">
                        <div className="font-semibold text-secondary-700">
                            {auth?.user?.name}
                        </div>
                        <div className="text-xs text-text-muted">Akun</div>
                    </div>
                    <ChevronDown size={18} />
                </button>
            </Dropdown.Trigger>
            <Dropdown.Content width="56">
                <div className="px-4 py-3 border-b border-secondary-100">
                    <div className="font-semibold text-secondary-700">
                        {auth?.user?.name}
                    </div>

                    <div className="text-xs text-text-muted">Akun Pengguna</div>
                </div>

                <div className="p-2">
                    <Dropdown.Link href="/customer/dashboard">
                        <LayoutDashboard size={18} />
                        Dashboard
                    </Dropdown.Link>

                    <Dropdown.Link href="/profile">
                        <User size={18} />
                        Pengaturan Profil
                    </Dropdown.Link>

                    <Dropdown.Link
                        href={route("logout")}
                        method="post"
                        as="button"
                        className="text-red-500 hover:bg-red-50 hover:text-red-600"
                    >
                        <LogOut size={18} />
                        Keluar
                    </Dropdown.Link>
                </div>
            </Dropdown.Content>
        </Dropdown>
    ) : null;

    return (
        <div className="relative min-h-screen bg-surface flex flex-col overflow-hidden">
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute left-[-260px] top-[-260px] w-[700px] h-[700px] rounded-full bg-primary-300/[0.05] blur-3xl" />
                <div className="absolute right-[-240px] top-[-180px] w-[650px] h-[650px] rounded-full bg-secondary-500/[0.04] blur-3xl" />
            </div>

            <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-secondary-100">
                <div className="section">
                    <div className="h-[90px] flex items-center justify-between">
                        <Link href="/">
                            <img
                                src="/img/logo/logo.png"
                                className="h-[58px] object-contain"
                            />
                        </Link>
                        <nav className="hidden lg:flex items-center gap-2">
                            {nav.map(([href, label]) => (
                                <NavLink
                                    key={href}
                                    href={href}
                                    active={current === href}
                                >
                                    {label}
                                </NavLink>
                            ))}
                        </nav>
                        <div className="hidden lg:flex items-center gap-4">
                            {auth?.user ? (
                                profileDropdown
                            ) : (
                                <>
                                    <Link href="/login">
                                        <SecondaryButton
                                            className="!w-[124px]"
                                            onClick={() =>
                                                (window.location.href =
                                                    "/login")
                                            }
                                        >
                                            Masuk
                                        </SecondaryButton>
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="w-[150px]"
                                    >
                                        <PrimaryButton>Reservasi</PrimaryButton>
                                    </Link>
                                </>
                            )}
                        </div>
                        <button
                            className="lg:hidden w-[48px] h-[48px] rounded-[18px] border border-secondary-100 flex items-center justify-center"
                            onClick={() => setMobile(!mobile)}
                        >
                            {mobile ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
                {mobile && (
                    <div className="lg:hidden bg-white border-t border-secondary-100">
                        <div className="px-6 py-5 space-y-2">
                            {nav.map(([href, label]) => (
                                <NavLink
                                    key={href}
                                    href={href}
                                    active={current === href}
                                    className="w-full justify-start"
                                >
                                    {label}
                                </NavLink>
                            ))}
                            <div className="grid grid-cols-2 gap-3 pt-3">
                                <Link href="/login">
                                    <SecondaryButtonb
                                        onClick={() =>
                                            (window.location.href = "/login")
                                        }
                                    >
                                        Masuk
                                    </SecondaryButtonb>
                                </Link>
                                <Link href="/register">
                                    <PrimaryButton>Reservasi</PrimaryButton>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </header>

            <main className="pt-[90px] flex-1">
                <PageTransition>{children}</PageTransition>
            </main>

            <footer className="relative overflow-hidden bg-[linear-gradient(180deg,#18344A_0%,#132033_100%)] text-white">
                <div className="absolute inset-0">
                    <div className="absolute right-[-200px] top-[-220px] w-[520px] h-[520px] rounded-full bg-primary-300/[0.08] blur-3xl" />
                    <div className="absolute left-[-260px] bottom-[-260px] w-[700px] h-[700px] rounded-full bg-white/[0.03] blur-3xl" />
                    <svg
                        className="absolute bottom-0 left-0 w-full opacity-[.06]"
                        viewBox="0 0 1440 320"
                    >
                        <path
                            fill="#F2C94C"
                            d="M0,256 C260,220 520,280 760,240 C1040,180 1220,210 1440,260 L1440,320 L0,320 Z"
                        />
                    </svg>
                </div>
                <div className="relative section pt-14 pb-8">
                    <div className="grid sm:grid-cols-2 xl:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10">
                        <div>
                            <img
                                src="/img/logo/logo.png"
                                className="h-[74px] mb-5"
                            />
                            <p className="max-w-[420px] leading-8 text-secondary-200">
                                Reservasi dan antrean modern untuk pengalaman
                                perawatan kendaraan yang lebih cepat, nyaman,
                                dan premium.
                            </p>
                            <div className="mt-8 space-y-3 text-secondary-200">
                                <div className="flex items-center gap-3">
                                    <MapPin
                                        size={18}
                                        className="text-primary-300"
                                    />
                                    <span>Jl. Tiram No.28, Pekanbaru</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Phone
                                        size={18}
                                        className="text-primary-300"
                                    />
                                    <span>0812-3456-7890</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Mail
                                        size={18}
                                        className="text-primary-300"
                                    />
                                    <span>info@apacarwash.com</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-display text-[20px] mb-5">
                                Navigasi
                            </h4>
                            <div className="space-y-3">
                                {nav.map(([href, label]) => (
                                    <Link
                                        key={href}
                                        href={href}
                                        className="flex items-center gap-2 text-secondary-200 hover:text-primary-300"
                                    >
                                        <ChevronRight size={16} /> {label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="font-display text-[20px] mb-5">
                                Jam Operasional
                            </h4>
                            <div className="space-y-4">
                                <div className="text-secondary-200">
                                    Setiap Hari
                                </div>
                                <div className="inline-flex rounded-full bg-primary-300 text-secondary-700 px-5 py-3 font-semibold">
                                    07:30 — 18:00
                                </div>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-display text-[20px] mb-5">
                                Masukan
                            </h4>
                            <p className="text-secondary-200 leading-8 mb-6">
                                Bantu kami meningkatkan pelayanan dan
                                pengalaman.
                            </p>
                            <PrimaryButton className="max-w-[180px]" onClick={() => (window.location.href = "/contact")}>
                                Kirim Kritik
                            </PrimaryButton>
                        </div>
                    </div>
                    <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-4 justify-between text-secondary-300">
                        <div>© 2026 APA Car Wash</div>
                        <div>Premium Vehicle Care</div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
