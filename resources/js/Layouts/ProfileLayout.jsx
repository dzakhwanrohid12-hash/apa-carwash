import { Link, usePage } from "@inertiajs/react";
import { User, Lock, ArrowLeft } from "lucide-react";
import PageTransition from "@/Components/Animations/PageTransition";
export default function ProfileLayout({ children }) {
    const { auth } = usePage().props;
    const dashboardUrl =
        auth.user.role === "pelanggan"
            ? "/customer/dashboard"
            : `/${auth.user.role}/dashboard`;
    return (
        <div className="relative min-h-screen bg-surface overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute left-[-300px] top-[-250px] w-[800px] h-[800px] rounded-full bg-primary-300/[0.05] blur-3xl" />
                <div className="absolute right-[-260px] top-[-200px] w-[700px] h-[700px] rounded-full bg-secondary-500/[0.05] blur-3xl" />
            </div>
            <div className="relative max-w-7xl mx-auto px-5 sm:px-8 py-10">
                <Link
                    href={dashboardUrl}
                    className="inline-flex items-center gap-3 mb-8 text-secondary-500 font-medium hover:text-secondary-600"
                >
                    <ArrowLeft size={18} /> Kembali ke Dashboard
                </Link>
                <div className="grid xl:grid-cols-[320px_1fr] gap-8">
                    <aside>
                        <div className="card overflow-hidden">
                            <div className="relative h-[140px] bg-gradient-to-r from-secondary-600 to-secondary-500">
                                <div className="absolute right-[-50px] top-[-50px] w-[180px] h-[180px] rounded-full bg-primary-300/[0.12]" />
                            </div>
                            <div className="relative px-8 pb-8">
                                <div className="w-[96px] h-[96px] rounded-[28px] bg-primary-300 text-secondary-700 font-display font-bold text-[34px] flex items-center justify-center shadow-[0_24px_60px_rgba(242,201,76,.18)] mx-auto -translate-y-10">
                                    {auth.user.name.charAt(0)}
                                </div>
                                <div className="text-center -mt-3">
                                    <h2 className="font-display font-bold text-[28px] text-secondary-700">
                                        {auth.user.name}
                                    </h2>
                                    <p className="mt-2 text-text-muted break-all">
                                        {auth.user.email}
                                    </p>
                                    <div className="mt-5 inline-flex items-center rounded-full px-4 py-2 bg-primary-50 text-primary-400 font-semibold">
                                        {auth.user.role}
                                    </div>
                                </div>
                                <nav className="mt-10 space-y-3">
                                    <Link
                                        href={route("profile.edit")}
                                        className="h-[58px] rounded-[18px] bg-secondary-500 text-white flex items-center gap-4 px-5"
                                    >
                                        <User size={18} /> Informasi Akun
                                    </Link>
                                    <button className="w-full h-[58px] rounded-[18px] border border-secondary-100 text-text-muted hover:bg-secondary-50 hover:text-secondary-500 flex items-center gap-4 px-5">
                                        <Lock size={18} /> Keamanan
                                    </button>
                                </nav>
                            </div>
                        </div>
                    </aside>
                    <section className="min-w-0">
                        <div className="card p-6 sm:p-8 lg:p-10">
                            <PageTransition>{children}</PageTransition>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
