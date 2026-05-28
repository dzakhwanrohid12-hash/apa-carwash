import { Link } from "@inertiajs/react";
export default function NavLink({
    active = false,
    className = "",
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={`relative group overflow-hidden inline-flex items-center justify-center h-[54px] px-7 rounded-[18px] font-medium text-[15px] transition-all duration-300 ${active ? "bg-[linear-gradient(180deg,#F2C94C_0%,#E8BE3F_100%)] text-secondary-700 shadow-[0_18px_40px_rgba(242,201,76,.20)]" : "text-text-muted hover:bg-secondary-50 hover:text-secondary-500"} ${className}`}
        >
            {active && (
                <>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#FFFFFF55,transparent_60%)]" />
                </>
            )}
            {!active && (
                <div className="absolute left-0 bottom-0 h-[3px] w-0 rounded-full bg-primary-300 group-hover:w-full transition-all duration-300" />
            )}
            <span className="relative z-10">{children}</span>
        </Link>
    );
}
