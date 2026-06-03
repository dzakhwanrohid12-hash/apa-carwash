import MainLayout from "@/Layouts/MainLayout";
import { Head, Link } from "@inertiajs/react";
import Table from "@/Components/UI/Table";
import { Plus, Edit, CheckCircle2, XCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function ServiceIndex({ services }) {
    const columns = [
        {
            header: "Kategori",
            render: (row) => (
                <span className="px-3 py-1.5 bg-slate-100 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold uppercase tracking-wider">
                    {row.category?.name || "Tanpa Kategori"}
                </span>
            ),
        },
        {
            header: "Nama Layanan",
            className: "w-1/3",
            render: (row) => (
                <div>
                    <p className="font-bold text-slate-800 text-base">
                        {row.name}
                    </p>
                    <p className="text-sm text-slate-500 mt-1 truncate max-w-xs font-medium">
                        {row.description || "Tidak ada deskripsi"}
                    </p>
                </div>
            ),
        },
        {
            header: "Harga",
            className: "text-right",
            cellClassName: "text-right",
            render: (row) => (
                <span className="font-mono font-bold text-amber-600 text-lg bg-amber-50 px-3 py-1 rounded-lg border border-amber-100">
                    Rp {new Intl.NumberFormat("id-ID").format(row.price)}
                </span>
            ),
        },
        {
            header: "Durasi",
            render: (row) => (
                <span className="font-medium text-slate-600">
                    {row.duration_minutes} Menit
                </span>
            ),
        },
        {
            header: "Status",
            render: (row) =>
                row.is_active ? (
                    <span className="inline-flex items-center gap-1.5 text-emerald-600 text-xs font-bold bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl uppercase tracking-wider">
                        <CheckCircle2 size={14} /> Aktif
                    </span>
                ) : (
                    <span className="inline-flex items-center gap-1.5 text-red-600 text-xs font-bold bg-red-50 border border-red-200 px-3 py-1.5 rounded-xl uppercase tracking-wider">
                        <XCircle size={14} /> Nonaktif
                    </span>
                ),
        },
        {
            header: "Aksi",
            className: "text-right",
            cellClassName: "text-right",
            render: (row) => (
                <Link
                    href={`/admin/services/${row.id}/edit`}
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-amber-600 bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-300 px-4 py-2 rounded-xl transition-all duration-300 shadow-sm font-bold text-sm"
                >
                    <Edit size={16} /> Edit
                </Link>
            ),
        },
    ];

    return (
        <MainLayout>
            <Head title="Manajemen Layanan" />

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6"
            >
                <div>
                    <h1 className="text-3xl md:text-4xl font-display font-bold text-slate-800 mb-2">
                        Katalog <span className="text-amber-500">Layanan</span>
                    </h1>
                    <p className="text-slate-500 font-medium">
                        Atur harga, durasi, status, dan detail layanan cuci
                        kendaraan.
                    </p>
                </div>
                <Link
                    href={route("admin.services.create")}
                    className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 px-6 py-3.5 rounded-2xl font-bold hover:scale-105 hover:shadow-xl hover:shadow-amber-500/20 transition-all duration-300"
                >
                    <Plus size={20} /> Tambah Layanan
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
                    data={services}
                    emptyMessage="Belum ada layanan yang ditambahkan ke dalam katalog."
                />
            </motion.div>
        </MainLayout>
    );
}
