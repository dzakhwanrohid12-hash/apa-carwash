import { Clock3, Car, Bike, Scroll, ArrowRight } from "lucide-react";
import { Link } from "@inertiajs/react";
export default function ServiceCard({ service, onClick, isSelected }) {
    const getIcon = (category) => {
        if (category?.toLowerCase().includes("motor"))
            return <Bike size={24} strokeWidth={2.2} />;
        if (category?.toLowerCase().includes("karpet"))
            return <Scroll size={24} strokeWidth={2.2} />;
        return <Car size={24} strokeWidth={2.2} />;
    };
    return (
        <div
            onClick={onClick}
            className={`relative overflow-hidden rounded-[30px] border cursor-pointer transition-all duration-300 group ${isSelected ? "bg-[linear-gradient(180deg,#FFFFFF_0%,#FFF8E7_100%)] border-primary-300 shadow-[0_24px_60px_rgba(242,201,76,.16)] translate-y-[-4px]" : "bg-white border-secondary-100 hover:border-secondary-500/15 hover:-translate-y-[4px] hover:shadow-[0_30px_70px_rgba(19,32,51,.08)]"}`}
        >
            <div className="absolute right-[-60px] top-[-60px] w-[180px] h-[180px] rounded-full bg-secondary-500/[0.03]" />
            <div className="absolute left-[-80px] bottom-[-80px] w-[160px] h-[160px] rounded-full bg-primary-300/[0.08]" />
            <div className="relative p-7">
                <div className="flex justify-between items-start">
                    <div
                        className={`w-[66px] h-[66px] rounded-[22px] flex items-center justify-center transition ${isSelected ? "bg-primary-300 text-secondary-500" : "bg-primary-50 text-secondary-500 group-hover:bg-secondary-500 group-hover:text-white"}`}
                    >
                        {getIcon(service.category?.name)}
                    </div>
                    <div className="rounded-full px-4 py-2 text-[12px] font-semibold bg-surface-dark border border-secondary-100 text-text-muted">
                        {service.category?.name}
                    </div>
                </div>
                <div className="mt-8">
                    <h3 className="font-display font-bold text-[26px] leading-tight text-text">
                        {service.name}
                    </h3>
                    <div className="mt-5 flex items-center gap-2 text-text-muted">
                        <Clock3 size={16} />
                        <span>~ {service.duration_minutes} menit</span>
                    </div>
                </div>
                <div className="mt-8 pt-6 border-t border-secondary-50 flex items-end justify-between">
                    <div>
                        <div className="text-sm text-text-muted">
                            Mulai dari
                        </div>
                        <div className="mt-2 font-display font-bold text-[30px] leading-none text-secondary-500">
                            Rp{" "}
                            <span className="text-primary-400">
                                {new Intl.NumberFormat("id-ID").format(
                                    service.price,
                                )}
                            </span>
                        </div>
                    </div>
                    <Link
                        href="/services"
                        onClick={(e) => e.stopPropagation()}
                        className={`w-[48px] h-[48px] rounded-[18px] flex items-center justify-center transition ${isSelected ? "bg-secondary-500 text-white" : "bg-surface-dark text-secondary-500 group-hover:bg-secondary-500 group-hover:text-white"}`}
                    >
                        <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        </div>
    );
}
