import MainLayout from "@/Layouts/MainLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { motion } from "framer-motion";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { ArrowLeft, Save, UserPlus } from "lucide-react";

export default function UserCreate() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        phone: "",
        role: "kasir",
        password: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("admin.users.store"));
    };

    return (
        <MainLayout>
            <Head title="Tambah Pengguna" />

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
                    Tambah Akun <span className="text-amber-500">Baru</span>
                </h1>
                <p className="text-slate-500 font-medium">
                    Buat kredensial akses baru untuk staf Kasir atau
                    Administrator.
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 max-w-4xl relative overflow-hidden"
            >
                {/* Background Ornament dalam Card */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-3xl rounded-full pointer-events-none" />

                <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100 relative z-10">
                    <div className="p-3.5 bg-slate-900 rounded-2xl text-amber-400 shadow-md">
                        <UserPlus size={28} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-slate-800">
                            Formulir Pendaftaran
                        </h2>
                        <p className="text-sm text-slate-500 mt-0.5">
                            Lengkapi seluruh data wajib di bawah ini.
                        </p>
                    </div>
                </div>

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
                                required
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
                                required
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
                                placeholder="08..."
                                value={data.phone}
                                onChange={(e) =>
                                    setData("phone", e.target.value)
                                }
                                required
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
                                className="w-full bg-slate-50 border-slate-200 text-slate-800 rounded-xl px-4 py-3.5 focus:ring-4 focus:ring-amber-400/20 focus:border-amber-400 transition-all font-bold cursor-pointer"
                                value={data.role}
                                onChange={(e) =>
                                    setData("role", e.target.value)
                                }
                            >
                                <option value="kasir">Kasir</option>
                                <option value="admin">Administrator</option>
                            </select>
                            <InputError
                                message={errors.role}
                                className="mt-2 text-red-500"
                            />
                        </div>

                        <div className="md:col-span-2 p-6 bg-amber-50 rounded-2xl border border-amber-100">
                            <InputLabel
                                value="Password Default Awal"
                                className="text-slate-700 mb-2"
                            />
                            <TextInput
                                type="password"
                                className="w-full bg-white border-slate-200 focus:border-amber-400 focus:ring-amber-400/20 rounded-xl py-3.5"
                                value={data.password}
                                placeholder="Masukkan password sementara untuk akun ini"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                required
                            />
                            <p className="text-xs font-bold text-amber-600 mt-3">
                                * Berikan password ini kepada staf yang
                                bersangkutan agar mereka dapat login.
                            </p>
                            <InputError
                                message={errors.password}
                                className="mt-2 text-red-500"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end pt-6 border-t border-slate-100">
                        <PrimaryButton
                            disabled={processing}
                            className="px-8 py-4"
                        >
                            <div className="flex flex-row items-center justify-center gap-2 whitespace-nowrap">
                                <Save size={20} />
                                <span>Simpan Akun Baru</span>
                            </div>
                        </PrimaryButton>
                    </div>
                </form>
            </motion.div>
        </MainLayout>
    );
}
