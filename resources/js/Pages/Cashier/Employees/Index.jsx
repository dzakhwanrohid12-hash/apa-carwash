import MainLayout from "@/Layouts/MainLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Plus,
    Power,
    PowerOff,
    Trash2,
    UserPlus,
    Users,
    UserCheck,
    UserX,
} from "lucide-react";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";

export default function Index({ employees }) {
    const { auth } = usePage().props;
    const role = auth.user.role;

    // Logika routePrefix dipertahankan (Aman dari error)
    const routePrefix = role === "kasir" ? "cashier" : "admin";

    const { data, setData, post, processing, reset, errors } = useForm({
        name: "",
        phone: "",
    });

    const { put, delete: destroy } = useForm();

    const submit = (e) => {
        e.preventDefault();
        post(route(`${routePrefix}.employees.store`), {
            onSuccess: () => reset(),
        });
    };

    const toggleStatus = (id) => {
        put(route(`${routePrefix}.employees.toggle`, id), {
            preserveScroll: true,
        });
    };

    const handleDelete = (id) => {
        if (
            confirm(
                "Apakah Anda yakin ingin menghapus data karyawan ini secara permanen?",
            )
        ) {
            destroy(route(`${routePrefix}.employees.destroy`, id), {
                preserveScroll: true,
            });
        }
    };

    return (
        <MainLayout>
            <Head title="Manajemen Karyawan" />

            {/* Background Ornaments */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
                <div className="absolute left-[-10%] top-[10%] w-[500px] h-[500px] rounded-full bg-amber-400/10 blur-[120px]" />
                <div className="absolute right-[-10%] bottom-[10%] w-[600px] h-[600px] rounded-full bg-sky-300/10 blur-[120px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
            >
                <h1 className="text-3xl md:text-4xl font-display font-bold text-slate-800 mb-2">
                    Manajemen <span className="text-amber-500">Pekerja</span>
                </h1>
                <p className="text-slate-500 font-medium">
                    Kelola data tim Anda dan atur status ketersediaan mereka
                    dalam menangani pencucian.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* BAGIAN KIRI: Form Tambah Karyawan */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="bg-white border border-slate-100 rounded-[2rem] shadow-xl shadow-slate-200/40 p-6 md:p-8 h-fit relative overflow-hidden"
                >
                    {/* Inner Ornament */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 blur-2xl rounded-full pointer-events-none" />

                    <div className="flex items-center gap-3 mb-6 relative z-10">
                        <div className="p-3 bg-slate-900 rounded-xl text-amber-400 shadow-sm">
                            <UserPlus size={20} />
                        </div>
                        <h2 className="text-xl font-bold text-slate-800">
                            Tambah Pekerja
                        </h2>
                    </div>

                    <form onSubmit={submit} className="space-y-5 relative z-10">
                        <div>
                            <InputLabel
                                value="Nama Lengkap"
                                className="text-slate-600 mb-2"
                            />
                            <TextInput
                                type="text"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                className="w-full bg-slate-50 border-slate-200 focus:border-amber-400 focus:ring-amber-400/20 rounded-xl py-3"
                                placeholder="Cth: Budi Santoso"
                                required
                            />
                            <InputError
                                message={errors.name}
                                className="mt-2 text-red-500"
                            />
                        </div>

                        <div>
                            <InputLabel
                                value="Nomor WhatsApp (Opsional)"
                                className="text-slate-600 mb-2"
                            />
                            <TextInput
                                type="text"
                                value={data.phone}
                                onChange={(e) =>
                                    setData("phone", e.target.value)
                                }
                                className="w-full bg-slate-50 border-slate-200 focus:border-amber-400 focus:ring-amber-400/20 rounded-xl py-3 font-mono"
                                placeholder="08..."
                            />
                            <InputError
                                message={errors.phone}
                                className="mt-2 text-red-500"
                            />
                        </div>

                        <div className="pt-2 border-t border-slate-100">
                            <PrimaryButton
                                type="submit"
                                disabled={processing}
                                className="w-full justify-center py-3.5 mt-2"
                            >
                                <span className="flex flex-row items-center justify-center gap-2 whitespace-nowrap text-[15px]">
                                    <Plus size={18} /> Simpan Data Pekerja
                                </span>
                            </PrimaryButton>
                        </div>
                    </form>
                </motion.div>

                {/* BAGIAN KANAN: Daftar Karyawan */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="lg:col-span-2 bg-white border border-slate-100 rounded-[2.5rem] shadow-xl shadow-slate-200/40 p-6 md:p-8"
                >
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                        <div className="p-3 bg-amber-50 rounded-xl text-amber-500 shadow-sm">
                            <Users size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-800 leading-tight">
                                Daftar Pekerja Tim
                            </h2>
                            <p className="text-sm text-slate-500">
                                Atur siapa yang sedang stand-by.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {employees.length > 0 ? (
                            <AnimatePresence>
                                {employees.map((emp) => (
                                    <motion.div
                                        key={emp.id}
                                        initial={{ opacity: 0, scale: 0.98 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.98 }}
                                        transition={{ duration: 0.2 }}
                                        className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border transition-all duration-300 ${
                                            emp.is_active
                                                ? "bg-white border-slate-200 shadow-sm hover:border-amber-300"
                                                : "bg-slate-50 border-slate-200 opacity-75 hover:opacity-100"
                                        }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            {/* Indikator visual aktif/nonaktif */}
                                            <div
                                                className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
                                                    emp.is_active
                                                        ? "bg-emerald-100 text-emerald-600"
                                                        : "bg-slate-200 text-slate-400"
                                                }`}
                                            >
                                                {emp.is_active ? (
                                                    <UserCheck size={24} />
                                                ) : (
                                                    <UserX size={24} />
                                                )}
                                            </div>

                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <p
                                                        className={`font-bold text-lg ${emp.is_active ? "text-slate-800" : "text-slate-500"}`}
                                                    >
                                                        {emp.name}
                                                    </p>
                                                    {/* Badge Status untuk layar kecil */}
                                                    <span
                                                        className={`sm:hidden text-[10px] font-bold uppercase px-2 py-0.5 rounded-md ${
                                                            emp.is_active
                                                                ? "bg-emerald-100 text-emerald-600"
                                                                : "bg-slate-200 text-slate-500"
                                                        }`}
                                                    >
                                                        {emp.is_active
                                                            ? "Siap"
                                                            : "Off"}
                                                    </span>
                                                </div>
                                                <p className="text-sm font-medium text-slate-500 font-mono mt-0.5">
                                                    {emp.phone ||
                                                        "Tanpa No. HP"}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto mt-2 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-0 border-slate-100">
                                            {/* Badge Status Layar Besar */}
                                            <span
                                                className={`hidden sm:inline-block text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-xl border ${
                                                    emp.is_active
                                                        ? "bg-emerald-50 border-emerald-200 text-emerald-600"
                                                        : "bg-slate-100 border-slate-200 text-slate-500"
                                                }`}
                                            >
                                                {emp.is_active
                                                    ? "Siap Bekerja"
                                                    : "Sedang Libur"}
                                            </span>

                                            <div className="flex gap-2 w-full sm:w-auto">
                                                {/* Tombol Toggle Aktif/Nonaktif */}
                                                <button
                                                    onClick={() =>
                                                        toggleStatus(emp.id)
                                                    }
                                                    className={`flex-1 sm:flex-none flex items-center justify-center p-2.5 rounded-xl border transition-all duration-300 shadow-sm ${
                                                        emp.is_active
                                                            ? "bg-white border-red-200 text-red-500 hover:bg-red-50 hover:border-red-300"
                                                            : "bg-white border-emerald-200 text-emerald-500 hover:bg-emerald-50 hover:border-emerald-300"
                                                    }`}
                                                    title={
                                                        emp.is_active
                                                            ? "Nonaktifkan Karyawan"
                                                            : "Aktifkan Karyawan"
                                                    }
                                                >
                                                    {emp.is_active ? (
                                                        <PowerOff size={20} />
                                                    ) : (
                                                        <Power size={20} />
                                                    )}
                                                </button>

                                                {/* Tombol Hapus */}
                                                <button
                                                    onClick={() =>
                                                        handleDelete(emp.id)
                                                    }
                                                    className="flex-1 sm:flex-none flex items-center justify-center p-2.5 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-red-500 hover:bg-red-50 hover:border-red-200 transition-all duration-300 shadow-sm"
                                                    title="Hapus Permanen"
                                                >
                                                    <Trash2 size={20} />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        ) : (
                            /* State Kosong */
                            <div className="text-center py-16 px-4 bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl">
                                <div className="bg-slate-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                                    <Users size={32} />
                                </div>
                                <p className="text-slate-600 font-bold text-lg mb-1">
                                    Belum Ada Pekerja
                                </p>
                                <p className="text-slate-500 text-sm">
                                    Silakan tambahkan data pekerja tim Anda
                                    melalui form di samping.
                                </p>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </MainLayout>
    );
}
