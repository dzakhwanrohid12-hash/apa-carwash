import MainLayout from "@/Layouts/MainLayout";
import { Head, Link } from "@inertiajs/react";
import Table from "@/Components/UI/Table";
import { Plus, Edit } from "lucide-react";

export default function VoucherIndex({ vouchers }) {
    const getStatus = (voucher) => {
        if (!voucher.is_active)
            return {
                label: "Nonaktif",
                color: "bg-secondary-700 text-neutral-400",
            };
        if (voucher.used_count >= voucher.quota)
            return {
                label: "Habis",
                color: "bg-red-500/10 text-red-400 border border-red-500/20",
            };

        const today = new Date().toISOString().split("T")[0];
        if (today > voucher.valid_until)
            return {
                label: "Kadaluarsa",
                color: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
            };

        return {
            label: "Aktif",
            color: "bg-primary-300/10 text-primary-300 border border-primary-300/20",
        };
    };

    const columns = [
        {
            header: "Kode Voucher",
            render: (row) => (
                <span className="font-mono font-bold text-neutral-50 px-2 py-1 bg-secondary-900 border border-tertiary-700 rounded-md">
                    {row.code}
                </span>
            ),
        },
        {
            header: "Diskon",
            render: (row) => (
                <span className="text-primary-300 font-semibold">
                    {row.discount_type === "percentage"
                        ? `${row.discount_value}%`
                        : `Rp ${new Intl.NumberFormat("id-ID").format(row.discount_value)}`}
                </span>
            ),
        },
        {
            header: "Min. Trx",
            className: "text-right",
            cellClassName: "text-right font-mono text-sm",
            render: (row) =>
                `Rp ${new Intl.NumberFormat("id-ID").format(row.min_transaction)}`,
        },
        {
            header: "Kuota",
            render: (row) => (
                <div className="flex items-center gap-2">
                    <div className="w-full bg-secondary-900 rounded-full h-2 max-w-[80px]">
                        <div
                            className="bg-primary-300 h-2 rounded-full"
                            style={{
                                width: `${(row.used_count / row.quota) * 100}%`,
                            }}
                        ></div>
                    </div>
                    <span className="text-xs text-neutral-400">
                        {row.used_count}/{row.quota}
                    </span>
                </div>
            ),
        },
        {
            header: "Berlaku",
            render: (row) => (
                <span className="text-xs text-neutral-400">
                    {row.valid_from} s.d {row.valid_until}
                </span>
            ),
        },
        {
            header: "Status",
            render: (row) => {
                const status = getStatus(row);
                return (
                    <span
                        className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider ${status.color}`}
                    >
                        {status.label}
                    </span>
                );
            },
        },
        {
            header: "Aksi",
            className: "text-right",
            cellClassName: "text-right",
            render: (row) => (
                <Link
                    href={`/admin/vouchers/${row.id}/edit`}
                    className="inline-flex items-center gap-2 text-primary-300 hover:text-primary-400 bg-primary-300/10 hover:bg-primary-300/20 px-3 py-1.5 rounded-lg transition-colors"
                >
                    <Edit size={16} /> Edit
                </Link>
            ),
        },
    ];

    return (
        <MainLayout>
            <Head title="Manajemen Voucher" />

            <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-display font-bold text-neutral-50">
                        Voucher & Diskon
                    </h1>
                    <p className="text-neutral-400">
                        Kelola kode promosi untuk pelanggan.
                    </p>
                </div>
                <Link
                    href={route("admin.vouchers.create")}
                    className="flex items-center gap-2 bg-gradient-to-r from-primary-400 to-primary-500 text-secondary-950 px-4 py-2 rounded-xl font-bold hover:scale-105 transition-transform"
                >
                    <Plus size={20} /> Buat Voucher
                </Link>
            </div>

            <Table
                columns={columns}
                data={vouchers}
                emptyMessage="Belum ada voucher yang dibuat."
            />
        </MainLayout>
    );
}
