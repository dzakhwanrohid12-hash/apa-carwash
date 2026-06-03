import MainLayout from "@/Layouts/MainLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { motion } from "framer-motion";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { ArrowLeft, Save } from "lucide-react";

export default function UserEdit({ user }) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name ?? "",
        email: user.email ?? "",
        phone: user.phone ?? "",
        role: user.role ?? "kasir",
        password: "", // kosong = tidak update password
        is_active: user.is_active ?? true,
    });

    const submit = (e) => {
        e.preventDefault();
        put(route("admin.users.update", user.id), {
            preserveScroll: true,
        });
    };

    return (
        <MainLayout>
            <Head title="Edit Pengguna" />

            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
            >
                <Link
                    href={route("admin.users.index")}
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-amber-500 font-bold mb-6 transition-colors bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm hover:shadow-md"
                >
                    <ArrowLeft size={18} /> Kembali ke Daftar
                </Link>

                <h1 className="text-3xl md:text-4xl font-display font-bold text-slate-800 mb-2">
                    Edit Akun <span className="text-amber-500">Pengguna</span>
                </h1>
                <p className="text-slate-500 font-medium">
                    Perbarui informasi identitas, kontak, dan hak akses pengguna
                    ini.
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 max-w-4xl relative overflow-hidden"
            >
                {/* Background Ornament dalam Card */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/5 blur-3xl rounded-full pointer-events-none" />

                <form onSubmit={submit} className="space-y-8 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <InputLabel
                                value="Nama Lengkap"
                                className="text-slate-700 mb-2"
                            />
                            <TextInput
                                className="w-full bg-slate-50 border-slate-200 focus:border-amber-400 focus:ring-amber-400/20 rounded-xl py-3.5"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.name}
                                className="mt-2 text-red-500"
                            />
                        </div>

                        <div>
                            <InputLabel
                                value="Alamat Email"
                                className="text-slate-700 mb-2"
                            />
                            <TextInput
                                type="email"
                                className="w-full bg-slate-50 border-slate-200 focus:border-amber-400 focus:ring-amber-400/20 rounded-xl py-3.5"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.email}
                                className="mt-2 text-red-500"
                            />
                        </div>

                        <div>
                            <InputLabel
                                value="Nomor WhatsApp"
                                className="text-slate-700 mb-2"
                            />
                            <TextInput
                                className="w-full bg-slate-50 border-slate-200 focus:border-amber-400 focus:ring-amber-400/20 rounded-xl py-3.5 font-mono"
                                value={data.phone}
                                onChange={(e) =>
                                    setData("phone", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.phone}
                                className="mt-2 text-red-500"
                            />
                        </div>

                        <div>
                            <InputLabel
                                value="Role Akses"
                                className="text-slate-700 mb-2"
                            />
                            <select
                                value={data.role}
                                onChange={(e) =>
                                    setData("role", e.target.value)
                                }
                                className="w-full bg-slate-50 border-slate-200 text-slate-800 rounded-xl px-4 py-3.5 focus:ring-4 focus:ring-amber-400/20 focus:border-amber-400 transition-all font-bold cursor-pointer"
                            >
                                <option value="kasir">Kasir</option>
                                <option value="admin">Administrator</option>
                                <option value="pelanggan">Pelanggan</option>
                            </select>
                            <InputError
                                message={errors.role}
                                className="mt-2 text-red-500"
                            />
                        </div>

                        <div className="md:col-span-2 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                            <InputLabel
                                value="Password Baru (Opsional)"
                                className="text-slate-700 mb-2"
                            />
                            <TextInput
                                type="password"
                                className="w-full bg-white border-slate-200 focus:border-amber-400 focus:ring-amber-400/20 rounded-xl py-3.5"
                                value={data.password}
                                placeholder="Kosongkan jika tidak ingin mengubah password saat ini"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.password}
                                className="mt-2 text-red-500"
                            />
                        </div>

                        <div className="md:col-span-2 flex items-start gap-4 p-5 bg-slate-900 rounded-2xl border border-slate-800 shadow-md">
                            <input
                                type="checkbox"
                                checked={data.is_active}
                                onChange={(e) =>
                                    setData("is_active", e.target.checked)
                                }
                                className="mt-1 w-5 h-5 rounded border-slate-600 text-amber-500 focus:ring-amber-500 bg-slate-800 cursor-pointer"
                                id="status_aktif"
                            />
                            <label
                                htmlFor="status_aktif"
                                className="cursor-pointer"
                            >
                                <span className="block text-white font-bold text-lg mb-1">
                                    Akun Berstatus Aktif
                                </span>
                                <span className="block text-slate-400 text-sm leading-relaxed">
                                    Hapus centang untuk menonaktifkan pengguna
                                    ini. Pengguna yang dinonaktifkan tidak akan
                                    dapat login ke dalam sistem.
                                </span>
                            </label>
                        </div>
                    </div>

                    <div className="flex justify-end pt-6 border-t border-slate-100">
                        <PrimaryButton
                            disabled={processing}
                            className="px-8 py-4"
                        >
                            <div className="flex flex-row items-center justify-center gap-2 whitespace-nowrap">
                                <Save size={20} />
                                <span>Simpan Perubahan</span>
                            </div>
                        </PrimaryButton>
                    </div>
                </form>
            </motion.div>
        </MainLayout>
    );
}
