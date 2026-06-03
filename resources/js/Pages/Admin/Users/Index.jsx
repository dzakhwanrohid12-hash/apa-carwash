import { useState } from "react";
import MainLayout from "@/Layouts/MainLayout";
import { Head, Link, router } from "@inertiajs/react";
import Table from "@/Components/UI/Table";
import {
    Search,
    Plus,
    Edit,
    ShieldAlert,
    BadgeDollarSign,
    User,
} from "lucide-react";
import { motion } from "framer-motion";

export default function UserIndex({ users, filters }) {
    const [search, setSearch] = useState(filters.search || "");
    const [role, setRole] = useState(filters.role || "semua");

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
        {
            header: "Nama Lengkap",
            key: "name",
            className: "w-1/3 font-bold text-slate-800",
        },
        {
            header: "Kontak",
            render: (row) => (
                <div className="flex flex-col">
                    <span className="font-medium text-slate-700">
                        {row.email}
                    </span>
                    <span className="text-xs text-slate-500 font-mono mt-1 bg-slate-100 w-fit px-2 py-0.5 rounded-md border border-slate-200">
                        {row.phone || "Tanpa No. HP"}
                    </span>
                </div>
            ),
        },
        {
            header: "Role Akses",
            render: (row) => {
                let badgeClass = "";
                let Icon = User;

                if (row.role === "admin") {
                    badgeClass =
                        "bg-slate-900 text-amber-400 border-slate-800 shadow-sm";
                    Icon = ShieldAlert;
                } else if (row.role === "kasir") {
                    badgeClass = "bg-amber-100 text-amber-700 border-amber-200";
                    Icon = BadgeDollarSign;
                } else {
                    badgeClass = "bg-slate-100 text-slate-600 border-slate-200";
                    Icon = User;
                }

                return (
                    <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider border ${badgeClass}`}
                    >
                        <Icon size={14} />
                        {row.role}
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
                    href={`/admin/users/${row.id}/edit`}
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-amber-600 bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-300 px-4 py-2 rounded-xl transition-all duration-300 shadow-sm font-bold text-sm"
                >
                    <Edit size={16} /> Edit
                </Link>
            ),
        },
    ];

    return (
        <MainLayout>
            <Head title="Manajemen Pengguna" />

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
            >
                <div>
                    <h1 className="text-3xl md:text-4xl font-display font-bold text-slate-800 mb-2">
                        Pengguna <span className="text-amber-500">Sistem</span>
                    </h1>
                    <p className="text-slate-500 font-medium">
                        Kelola akun administrator, kasir, dan pelanggan
                        terdaftar.
                    </p>
                </div>
                <Link
                    href="/admin/users/create"
                    className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 px-6 py-3.5 rounded-2xl font-bold hover:scale-105 hover:shadow-xl hover:shadow-amber-500/20 transition-all duration-300"
                >
                    <Plus size={20} /> Tambah Akun
                </Link>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 mb-8 flex flex-col sm:flex-row gap-4"
            >
                <div className="relative flex-1">
                    <Search
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        size={20}
                    />
                    <input
                        type="text"
                        placeholder="Cari nama, email, atau no HP..."
                        value={search}
                        onChange={handleSearch}
                        className="w-full bg-slate-50 border-slate-200 text-slate-800 rounded-xl pl-12 pr-4 py-3.5 focus:ring-4 focus:ring-amber-400/20 focus:border-amber-400 transition-all font-medium"
                    />
                </div>
                <select
                    value={role}
                    onChange={handleRoleChange}
                    className="w-full sm:w-56 bg-slate-50 border-slate-200 text-slate-800 rounded-xl px-4 py-3.5 focus:ring-4 focus:ring-amber-400/20 focus:border-amber-400 transition-all font-bold cursor-pointer"
                >
                    <option value="semua">Semua Role</option>
                    <option value="pelanggan">Pelanggan</option>
                    <option value="kasir">Kasir</option>
                    <option value="admin">Administrator</option>
                </select>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden"
            >
                <Table columns={columns} data={users.data} />
            </motion.div>
        </MainLayout>
    );
}
