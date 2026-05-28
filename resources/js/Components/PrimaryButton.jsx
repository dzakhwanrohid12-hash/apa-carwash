export default function PrimaryButton({
    className = "",
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            disabled={disabled}
            className={`relative overflow-hidden inline-flex items-center justify-center w-full h-[56px] px-7 rounded-[20px] font-semibold text-[15px] text-secondary-700 bg-primary-300 shadow-[0_16px_42px_rgba(242,201,76,.18)] hover:bg-primary-400 hover:-translate-y-[2px] hover:shadow-[0_24px_60px_rgba(242,201,76,.28)] active:scale-[.985] transition-all duration-300 ${className}`}
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,.32),transparent_55%)]" />
            <div className="absolute top-0 left-0 right-0 h-[45%] bg-[linear-gradient(180deg,rgba(255,255,255,.25),transparent)]" />
            <span className="relative z-10">{children}</span>
        </button>
    );
}
