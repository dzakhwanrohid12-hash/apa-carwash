import MainLayout from "@/Layouts/MainLayout";
import { Head, Link } from "@inertiajs/react";
import Table from "@/Components/UI/Table";
import { Plus, Edit, Ticket } from "lucide-react";
import { motion } from "framer-motion";

export default function VoucherIndex({ vouchers }) {
    const getStatus = (voucher) => {
        if (!voucher.is_active)
            return {
                label: "Nonaktif",
                color: "bg-slate-100 text-slate-600 border border-slate-200",
            };
        if (voucher.used_count >= voucher.quota)
            return {
                label: "Habis",
                color: "bg-red-50 text-red-600 border border-red-200",
            };

        const today = new Date().toISOString().split("T")[0];
        if (today > voucher.valid_until)
            return {
                label: "Kadaluarsa",
                color: "bg-orange-50 text-orange-600 border border-orange-200",
            };

        return {
            label: "Aktif",
            color: "bg-emerald-50 text-emerald-600 border border-emerald-200",
        };
    };

    const columns = [
        {
            header: "Kode Voucher",
            render: (row) => (
                <span className="font-mono font-bold text-amber-600 px-3 py-1.5 bg-amber-50 border border-amber-100 rounded-lg tracking-wider">
                    {row.code}
                </span>
            ),
        },
        {
            header: "Diskon",
            render: (row) => (
                <span className="text-slate-800 font-bold text-base">
                    {row.discount_type === "percentage"
                        ? `${row.discount_value}%`
                        : `Rp ${new Intl.NumberFormat("id-ID").format(row.discount_value)}`}
                </span>
            ),
        },
        {
            header: "Min. Trx",
            className: "text-right",
            cellClassName:
                "text-right font-mono text-sm text-slate-500 font-medium",
            render: (row) =>
                `Rp ${new Intl.NumberFormat("id-ID").format(row.min_transaction)}`,
        },
        {
            header: "Kuota Terpakai",
            render: (row) => (
                <div className="flex items-center gap-3">
                    <div className="w-full bg-slate-100 rounded-full h-2.5 max-w-[100px] overflow-hidden shadow-inner">
                        <div
                            className="bg-gradient-to-r from-yellow-400 to-amber-500 h-full rounded-full"
                            style={{
                                width: `${(row.used_count / row.quota) * 100}%`,
                            }}
                        ></div>
                    </div>
                    <span className="text-xs font-bold text-slate-500">
                        {row.used_count} / {row.quota}
                    </span>
                </div>
            ),
        },
        {
            header: "Masa Berlaku",
            render: (row) => (
                <div className="flex flex-col">
                    <span className="text-xs font-medium text-slate-500">
                        {row.valid_from}
                    </span>
                    <span className="text-xs font-bold text-slate-700">
                        s/d {row.valid_until}
                    </span>
                </div>
            ),
        },
        {
            header: "Status",
            render: (row) => {
                const status = getStatus(row);
                return (
                    <span
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm ${status.color}`}
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
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-amber-600 bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-300 px-4 py-2 rounded-xl transition-all duration-300 shadow-sm font-bold text-sm"
                >
                    <Edit size={16} /> Edit
                </Link>
            ),
        },
    ];

    return (
        <MainLayout>
            <Head title="Manajemen Voucher" />

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6"
            >
                <div>
                    <h1 className="text-3xl md:text-4xl font-display font-bold text-slate-800 mb-2">
                        Voucher & <span className="text-amber-500">Diskon</span>
                    </h1>
                    <p className="text-slate-500 font-medium">
                        Kelola kode promosi, potongan harga, dan kuota untuk
                        pelanggan.
                    </p>
                </div>
                <Link
                    href={route("admin.vouchers.create")}
                    className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 px-6 py-3.5 rounded-2xl font-bold hover:scale-105 hover:shadow-xl hover:shadow-amber-500/20 transition-all duration-300"
                >
                    <Plus size={20} /> Buat Voucher
                </Link>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden"
            >
                <Table
                    columns={columns}
                    data={vouchers}
                    emptyMessage="Belum ada voucher yang dibuat."
                />
            </motion.div>
        </MainLayout>
    );
}
