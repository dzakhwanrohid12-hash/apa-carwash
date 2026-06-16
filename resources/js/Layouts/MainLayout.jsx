import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import { motion } from "framer-motion";
import {
    LayoutDashboard,
    Users,
    Wrench,
    Ticket,
    CalendarClock,
    Settings,
    BarChart,
    MessageSquare,
    MonitorPlay,
    ListTodo,
    LogOut,
    Menu,
    X,
    History,
    PanelLeftClose,
    PanelLeftOpen,
} from "lucide-react";
import PageTransition from "@/Components/Animations/PageTransition";

export default function MainLayout({ children }) {
    const { auth } = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const role = auth.user?.role || "admin";

    // Menu Admin yang sudah diratakan (tanpa dropdown)
    const adminMenus = [
        { title: "Dashboard", icon: LayoutDashboard, href: "/admin/dashboard" },
        { title: "Manajemen Pengguna", icon: Users, href: "/admin/users" },
        { title: "Manajemen Layanan", icon: Wrench, href: "/admin/services" },
        { title: "Manajemen Voucher", icon: Ticket, href: "/admin/vouchers" },
        {
            title: "Operasional",
            icon: Settings,
            href: "/admin/settings/operational",
        },
        { title: "Laporan", icon: BarChart, href: "/admin/reports" },
        { title: "Feedback", icon: MessageSquare, href: "/admin/feedback" },
    ];

    const cashierMenus = [
        {
            title: "Dashboard",
            icon: LayoutDashboard,
            href: "/cashier/dashboard",
        },
        {
            title: "Manajemen Karyawan",
            icon: CalendarClock,
            href: "/cashier/employees",
        },
        { title: "POS", icon: MonitorPlay, href: "/cashier/pos" },
        { title: "Reservasi", icon: ListTodo, href: "/cashier/transactions" },
        { title: "Antrean", icon: CalendarClock, href: "/cashier/queue" },
        { title: "Riwayat", icon: History, href: "/cashier/history" },
    ];

    const menusList = role === "admin" ? adminMenus : cashierMenus;
    const active = (href) => window.location.pathname.startsWith(href);

    const menus = menusList.map((menu, index) => {
        const Icon = menu.icon;
        const isSelected = active(menu.href);

        return (
            <motion.div
                key={menu.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
            >
                <Link
                    href={menu.href}
                    className={`h-[58px] rounded-[18px] px-5 flex items-center gap-4 transition-all duration-300 ${
                        isSelected
                            ? "bg-[linear-gradient(180deg,#F8DD72,#F2C94C)] shadow-[0_20px_50px_rgba(242,201,76,.18),0_0_80px_rgba(242,201,76,.10),inset_0_1px_0_rgba(255,255,255,.30)] text-secondary-700"
                            : "text-white/65 hover:bg-[linear-gradient(90deg,rgba(255,255,255,.04),rgba(242,201,76,.05))] hover:shadow-[0_18px_50px_rgba(242,201,76,.05)] hover:text-white"
                    }`}
                >
                    <Icon size={20} />
                    {!collapsed && (
                        <span className="font-medium whitespace-nowrap">
                            {menu.title}
                        </span>
                    )}
                </Link>
            </motion.div>
        );
    });

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex">
            <aside
                className={`fixed md:sticky top-0 left-0 z-50 h-screen overflow-hidden bg-[linear-gradient(180deg,#18344A,#132033)] rounded-tr-[42px] rounded-br-[42px] border-r border-white/[0.04] transition-all duration-300 shadow-[0_50px_120px_rgba(0,0,0,.18)] ${
                    collapsed ? "w-[92px]" : "w-[300px]"
                } ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
            >
                {/* SILUET BACKGROUND */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                    <div className="absolute top-[-220px] right-[-180px] w-[500px] h-[500px] rounded-full bg-primary-300/[0.04] blur-3xl" />
                    <div className="absolute bottom-[-240px] left-[-240px] w-[720px] h-[720px] rounded-full bg-[#2C5B82]/[0.12] blur-3xl" />
                    <div className="absolute right-[-90px] bottom-[160px] w-[280px] h-[280px] rounded-full border border-white/[0.06]" />
                    <div className="absolute right-[40px] bottom-[110px] w-[120px] h-[120px] rounded-full border border-primary-300/[0.05]" />
                    <div className="absolute left-[26px] bottom-[170px] w-[20px] h-[20px] rounded-full bg-white/[0.08] shadow-[0_0_25px_rgba(255,255,255,.08)]" />
                    <div className="absolute left-[95px] bottom-[105px] w-[10px] h-[10px] rounded-full bg-primary-300/[0.08]" />
                    <div className="absolute left-[250px] bottom-[85px] w-[7px] h-[7px] rounded-full bg-white/[0.08]" />
                </div>

                <div className="relative h-full flex flex-col z-10">
                    <div className="h-[88px] px-5 flex items-center justify-center relative border-b border-white/[0.04]">
                        <img
                            src="/img/logo/logo.png"
                            className={`object-contain mx-auto transition-all duration-300 ${
                                collapsed ? "h-[36px]" : "h-[54px]"
                            }`}
                            alt="Logo"
                        />
                        <button
                            className="hidden md:flex absolute right-5 w-[40px] h-[40px] rounded-[14px] hover:bg-white/10 items-center justify-center text-white transition-colors"
                            onClick={() => setCollapsed(!collapsed)}
                        >
                            {collapsed ? (
                                <PanelLeftOpen size={20} />
                            ) : (
                                <PanelLeftClose size={20} />
                            )}
                        </button>
                        <button
                            className="md:hidden absolute right-4 w-[42px] h-[42px] rounded-[14px] text-white hover:bg-white/10 flex items-center justify-center"
                            onClick={() => setSidebarOpen(false)}
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto px-4 py-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                        <nav className="space-y-2">{menus}</nav>
                    </div>

                    <div className="relative mt-auto px-5 pt-6 pb-8 border-t border-white/[0.04] overflow-hidden">
                        <svg
                            className="absolute bottom-0 left-0 w-full opacity-[.13]"
                            viewBox="0 0 1440 420"
                        >
                            <path
                                fill="#F2C94C"
                                d="M0,160 C200,100 420,280 650,190 C870,100 1130,250 1440,150 L1440,420 L0,420 Z"
                            />
                        </svg>
                        <div className="relative space-y-4">
                            {!collapsed && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    <div className="text-white font-semibold truncate text-lg">
                                        {auth.user.name}
                                    </div>
                                    <div className="text-white/40 text-sm tracking-wider uppercase mt-0.5">
                                        {role === "admin"
                                            ? "Administrator"
                                            : "Kasir"}
                                    </div>
                                </motion.div>
                            )}
                            <Link
                                href={route("logout")}
                                method="post"
                                as="button"
                                className="w-full h-[58px] rounded-[20px] bg-white/[0.06] hover:bg-red-500/80 hover:text-white hover:shadow-[0_0_20px_rgba(239,68,68,0.3)] text-white/80 transition-all duration-300 flex items-center justify-center gap-3 backdrop-blur-md border border-white/5"
                            >
                                <LogOut size={20} />
                                {!collapsed && (
                                    <span className="font-semibold">
                                        Keluar Akun
                                    </span>
                                )}
                            </Link>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Overlay Mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-secondary-900/60 backdrop-blur-sm z-40 md:hidden transition-opacity"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <div className="flex-1 flex flex-col min-w-0">
                <header className="sticky top-0 z-30 h-[92px] bg-white/80 backdrop-blur-2xl border-b border-secondary-100/50 px-6 lg:px-8 flex items-center justify-between shadow-sm">
                    {/* Left Side: Mobile Menu & Context */}
                    <div className="flex items-center gap-4">
                        <button
                            className="md:hidden w-[48px] h-[48px] rounded-[16px] hover:bg-secondary-50 flex items-center justify-center transition"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <Menu className="text-secondary-600" size={24} />
                        </button>
                        <div>
                            <h1 className="font-display text-[24px] font-semibold text-secondary-800">
                                {/* Judul dinamis berdasarkan menu yang aktif */}
                                {menusList.find((m) => active(m.href))?.title ||
                                    "Dashboard"}
                            </h1>
                            <p className="text-xs font-bold text-secondary-400 uppercase tracking-wider mt-0.5">
                                APA Car Wash Management
                            </p>
                        </div>
                    </div>

                    {/* Right Side: Profile Area */}
                    <div className="flex items-center gap-4">
                        <Link
                            href="/profile"
                            className="group flex items-center gap-3 rounded-[20px] border border-secondary-100 px-2 py-1.5 pr-5 transition-all duration-300 hover:border-amber-300 hover:shadow-lg hover:shadow-amber-400/10 bg-white"
                        >
                            <div className="w-[44px] h-[44px] rounded-[16px] bg-amber-400 text-slate-900 font-bold flex items-center justify-center transition-transform group-hover:scale-105 shadow-sm">
                                {auth.user.name.charAt(0)}
                            </div>
                            <div className="hidden sm:block">
                                <div className="font-bold text-secondary-800 text-sm">
                                    {auth.user.name}
                                </div>
                                <div className="text-[10px] text-secondary-400 uppercase font-bold tracking-widest mt-0.5">
                                    {role === "admin"
                                        ? "Administrator"
                                        : "Kasir"}
                                </div>
                            </div>
                        </Link>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-6 lg:p-8">
                    <div className="max-w-[1800px] mx-auto">
                        <PageTransition>{children}</PageTransition>
                    </div>
                </main>
            </div>
        </div>
    );
}
