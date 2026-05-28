import MainLayout from "@/Layouts/MainLayout";
import { Head, Link } from "@inertiajs/react";
import Table from "@/Components/UI/Table";
import { Plus, Edit } from "lucide-react";

export default function ServiceIndex({ services }) {
    const columns = [
        {
            header: "Kategori",
            render: (row) => (
                <span className="px-3 py-1 bg-secondary-900 border border-tertiary-700 text-neutral-300 rounded-full text-xs font-semibold">
                    {row.category?.name}
                </span>
            ),
        },
        {
            header: "Nama Layanan",
            render: (row) => (
                <div>
                    <p className="font-medium text-neutral-50">{row.name}</p>
                    <p className="text-xs text-neutral-400 mt-1 truncate max-w-xs">
                        {row.description || "-"}
                    </p>
                </div>
            ),
        },
        {
            header: "Harga",
            className: "text-right",
            cellClassName: "text-right",
            render: (row) => (
                <span className="font-mono text-primary-300">
                    Rp {new Intl.NumberFormat("id-ID").format(row.price)}
                </span>
            ),
        },
        {
            header: "Durasi",
            render: (row) => `${row.duration_minutes} menit`,
        },
        {
            header: "Status",
            render: (row) =>
                row.is_active ? (
                    <span className="text-green-400 text-xs font-bold bg-green-400/10 px-2 py-1 rounded">
                        Aktif
                    </span>
                ) : (
                    <span className="text-red-400 text-xs font-bold bg-red-400/10 px-2 py-1 rounded">
                        Nonaktif
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
                    className="inline-flex items-center gap-2 text-primary-300 hover:text-primary-400 bg-primary-300/10 hover:bg-primary-300/20 px-3 py-1.5 rounded-lg transition-colors"
                >
                    <Edit size={16} /> Edit
                </Link>
            ),
        },
    ];

    return (
        <MainLayout>
            <Head title="Manajemen Layanan" />

            <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-display font-bold text-neutral-50">
                        Katalog Layanan
                    </h1>
                    <p className="text-neutral-400">
                        Atur harga, durasi, dan detail layanan cuci.
                    </p>
                </div>
                <Link
                    href={route("admin.services.create")}
                    className="flex items-center gap-2 bg-gradient-to-r from-primary-400 to-primary-500 text-secondary-950 px-4 py-2 rounded-xl font-bold hover:scale-105 transition-transform"
                >
                    <Plus size={20} /> Tambah Layanan
                </Link>
            </div>

            <Table
                columns={columns}
                data={services}
                emptyMessage="Belum ada layanan yang ditambahkan."
            />
        </MainLayout>
    );
}
