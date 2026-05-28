import {
    Clock3,
    Activity,
    CheckCircle2,
    XCircle,
    CreditCard,
    BadgeCheck,
} from "lucide-react";

export default function StatusBadge({ status }) {
    const getStyle = () => {
        switch (status) {
            /* antrean */

            case "menunggu":
                return {
                    bg: "bg-primary-50 border-primary-200 text-primary-400",

                    icon: Clock3,

                    label: "Menunggu",
                };

            case "diproses":

            case "dicuci":

            case "pengeringan":
                return {
                    bg: "bg-secondary-50 border-secondary-100 text-secondary-500",

                    icon: Activity,

                    label: status === "diproses" ? "Diproses" : status,
                };

            /* selesai */

            case "selesai":

            case "siap_diambil":
                return {
                    bg: "bg-secondary-100 border-secondary-200 text-secondary-600",

                    icon: CheckCircle2,

                    label: status === "selesai" ? "Selesai" : "Siap Diambil",
                };

            /* pembayaran */

            case "pending_payment":
                return {
                    bg: "bg-primary-50 border-primary-200 text-primary-400",

                    icon: CreditCard,

                    label: "Menunggu Bayar",
                };

            case "paid":

            case "lunas":
                return {
                    bg: "bg-secondary-100 border-secondary-200 text-secondary-600",

                    icon: BadgeCheck,

                    label: "Lunas",
                };

            /* gagal */

            case "dibatalkan":

            case "rejected":
                return {
                    bg: "bg-red-50 border-red-100 text-red-500",

                    icon: XCircle,

                    label: status === "rejected" ? "Ditolak" : "Dibatalkan",
                };

            default:
                return {
                    bg: "bg-surface-muted border-secondary-100 text-text-muted",

                    icon: Clock3,

                    label: status,
                };
        }
    };

    const style = getStyle();

    const Icon = style.icon;

    return (
        <span
            className={`

inline-flex

items-center

gap-2

h-[34px]

px-4

rounded-full

border

text-[12px]

font-semibold

tracking-[.03em]
transition-all

duration-300

${style.bg}

`}
        >
            <Icon
                size={14}
                className={status === "diproses" ? "animate-pulse" : ""}
            />

            {style.label}
        </span>
    );
}
