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
            className={`relative inline-flex items-center justify-center h-[44px] px-5 rounded-[14px] text-[15px] font-semibold transition-all duration-300 ${
                active
                    ? "bg-secondary-500 text-white shadow-[0_16px_40px_rgba(19,32,51,.14)]"
                    : "text-text-muted hover:bg-secondary-50 hover:text-secondary-500"
            } ${className}`}
        >
            <span className="relative z-10">{children}</span>
            {active && (
                <div className="absolute inset-0 rounded-[14px] border border-secondary-400/10" />
            )}
        </Link>
    );
}
