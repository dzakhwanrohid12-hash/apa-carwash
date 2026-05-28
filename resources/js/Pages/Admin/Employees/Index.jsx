import MainLayout from "@/Layouts/MainLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { Plus, Power, PowerOff, Trash2 } from "lucide-react";

export default function Index({ employees }) {
    const { auth } = usePage().props;
    const role = auth.user.role;

    // PERBAIKAN BUG KASIR:
    // Jika role di database adalah 'kasir', arahkan ke route name 'cashier.'
    const routePrefix = role === "kasir" ? "cashier" : "admin";

    const { data, setData, post, processing, reset, errors } = useForm({
        name: "",
        phone: "",
    });

    const { put, delete: destroy } = useForm();

    const submit = (e) => {
        e.preventDefault();
        // Menggunakan routePrefix yang sudah diperbaiki
        post(route(`${routePrefix}.employees.store`), {
            onSuccess: () => reset(),
        });
    };

    const toggleStatus = (id) => {
        put(route(`${routePrefix}.employees.toggle`, id), {
            preserveScroll: true,
        });
    };

    // FUNGSI BARU: Hapus Karyawan
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

            <div className="mb-8">
                <h1 className="text-3xl font-display font-bold text-neutral-50">
                    Karyawan & Ketersediaan
                </h1>
                <p className="text-neutral-400 mt-1">
                    Kelola data karyawan yang akan mengerjakan pencucian
                    kendaraan.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form Tambah Karyawan */}
                <div className="bg-secondary-800 border border-tertiary-800/50 rounded-2xl shadow-lg p-6 h-fit">
                    <h2 className="text-xl font-bold text-neutral-50 mb-4">
                        Tambah Karyawan
                    </h2>
                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <label className="block text-sm text-neutral-400 mb-1">
                                Nama Karyawan
                            </label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                className="w-full rounded-xl bg-secondary-900 border-tertiary-800 text-neutral-50 focus:border-primary-300 focus:ring-primary-300"
                                required
                            />
                            {errors.name && (
                                <p className="text-red-400 text-xs mt-1">
                                    {errors.name}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm text-neutral-400 mb-1">
                                No. HP (Opsional)
                            </label>
                            <input
                                type="text"
                                value={data.phone}
                                onChange={(e) =>
                                    setData("phone", e.target.value)
                                }
                                className="w-full rounded-xl bg-secondary-900 border-tertiary-800 text-neutral-50 focus:border-primary-300 focus:ring-primary-300"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full flex items-center justify-center gap-2 py-3 bg-primary-300 text-secondary-950 font-bold rounded-xl hover:bg-primary-400 transition-colors disabled:opacity-50 shadow-[0_0_15px_rgba(242,201,76,0.3)]"
                        >
                            <Plus size={18} /> Simpan Data
                        </button>
                    </form>
                </div>

                {/* Daftar Karyawan */}
                <div className="lg:col-span-2 bg-secondary-800 border border-tertiary-800/50 rounded-2xl shadow-lg p-6">
                    <h2 className="text-xl font-bold text-neutral-50 mb-4">
                        Daftar Karyawan Aktif
                    </h2>
                    <div className="space-y-3">
                        {employees.length > 0 ? (
                            employees.map((emp) => (
                                <div
                                    key={emp.id}
                                    className="flex items-center justify-between p-4 bg-secondary-900 border border-tertiary-800/50 rounded-xl hover:border-primary-300/30 transition-colors"
                                >
                                    <div>
                                        <p className="font-bold text-neutral-50 text-lg">
                                            {emp.name}
                                        </p>
                                        <p className="text-sm text-neutral-400">
                                            {emp.phone || "-"}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2 sm:gap-4">
                                        <span
                                            className={`hidden sm:inline-block text-xs font-bold uppercase px-2.5 py-1 rounded-lg ${emp.is_active ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"}`}
                                        >
                                            {emp.is_active
                                                ? "Siap Bekerja"
                                                : "Nonaktif"}
                                        </span>

                                        <div className="flex gap-2">
                                            {/* Tombol Toggle Aktif/Nonaktif */}
                                            <button
                                                onClick={() =>
                                                    toggleStatus(emp.id)
                                                }
                                                className={`p-2 rounded-lg border transition-colors ${emp.is_active ? "bg-secondary-800 border-tertiary-700 text-red-400 hover:bg-red-500/10 hover:border-red-500/30" : "bg-secondary-800 border-tertiary-700 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/30"}`}
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
                                                className="p-2 rounded-lg bg-secondary-800 border border-tertiary-700 text-neutral-400 hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/30 transition-colors"
                                                title="Hapus Permanen"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-10 border border-dashed border-tertiary-800 rounded-xl">
                                <p className="text-neutral-500">
                                    Belum ada data karyawan terdaftar.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
