import { useState } from "react";
import MainLayout from "@/Layouts/MainLayout";
import { Head, Link, router } from "@inertiajs/react";
import Table from "@/Components/UI/Table";
import { Search, Plus, Edit } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce"; // Pastikan hook ini dibuat atau gunakan setTimeout biasa

export default function UserIndex({ users, filters }) {
    const [search, setSearch] = useState(filters.search || "");
    const [role, setRole] = useState(filters.role || "semua");

    // Pencarian dengan delay agar tidak memberatkan server
    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value);
        router.get(
            "/admin/users",
            { search: value, role },
            { preserveState: true, replace: true },
        );
    };

    const handleRoleChange = (e) => {
        const value = e.target.value;
        setRole(value);
        router.get(
            "/admin/users",
            { search, role: value },
            { preserveState: true },
        );
    };

    const columns = [
        { header: "Nama Lengkap", key: "name", className: "w-1/3" },
        {
            header: "Kontak",
            render: (row) => (
                <div className="flex flex-col">
                    <span>{row.email}</span>
                    <span className="text-xs text-neutral-400 font-mono mt-1">
                        {row.phone || "-"}
                    </span>
                </div>
            ),
        },
        {
            header: "Role",
            render: (row) => (
                <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        row.role === "admin"
                            ? "bg-red-500/10 text-red-400 border border-red-500/20"
                            : row.role === "kasir"
                              ? "bg-primary-300/10 text-primary-300 border border-primary-300/20"
                              : "bg-secondary-700 text-neutral-300"
                    }`}
                >
                    {row.role}
                </span>
            ),
        },
        {
            header: "Aksi",
            className: "text-right",
            cellClassName: "text-right",
            render: (row) => (
                <Link
                    href={`/admin/users/${row.id}/edit`}
                    className="inline-flex items-center gap-2 text-primary-300 hover:text-primary-400 bg-primary-300/10 hover:bg-primary-300/20 px-3 py-1.5 rounded-lg transition-colors"
                >
                    <Edit size={16} /> Edit
                </Link>
            ),
        },
    ];

    return (
        <MainLayout>
            <Head title="Manajemen Pengguna" />

            <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-display font-bold text-neutral-50">
                        Pengguna Sistem
                    </h1>
                    <p className="text-neutral-400">
                        Kelola akun admin, kasir, dan pelanggan terdaftar.
                    </p>
                </div>
                <Link
                    href="/admin/users/create"
                    className="flex items-center gap-2 bg-gradient-to-r from-primary-400 to-primary-500 text-secondary-950 px-4 py-2 rounded-xl font-bold hover:scale-105 transition-transform"
                >
                    <Plus size={20} /> Tambah Kasir
                </Link>
            </div>

            <div className="bg-secondary-800 p-4 rounded-2xl border border-tertiary-800/50 mb-6 flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
                        size={20}
                    />
                    <input
                        type="text"
                        placeholder="Cari nama, email, atau no HP..."
                        value={search}
                        onChange={handleSearch}
                        className="w-full bg-secondary-900 border-tertiary-700 text-neutral-50 rounded-xl pl-10 focus:ring-primary-300 focus:border-primary-300"
                    />
                </div>
                <select
                    value={role}
                    onChange={handleRoleChange}
                    className="w-full sm:w-48 bg-secondary-900 border-tertiary-700 text-neutral-50 rounded-xl focus:ring-primary-300 focus:border-primary-300"
                >
                    <option value="semua">Semua Role</option>
                    <option value="pelanggan">Pelanggan</option>
                    <option value="kasir">Kasir</option>
                    <option value="admin">Admin</option>
                </select>
            </div>

            <Table columns={columns} data={users.data} />

            {/* Custom Pagination bisa ditambahkan di sini menggunakan users.links */}
        </MainLayout>
    );
}
