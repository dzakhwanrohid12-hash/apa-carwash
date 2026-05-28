import MainLayout from "@/Layouts/MainLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { ArrowLeft, Save } from "lucide-react";

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

            <div className="mb-8">
                <Link
                    href={route("admin.users.index")}
                    className="inline-flex items-center gap-2 text-neutral-400 hover:text-primary-300 mb-4 transition-colors"
                >
                    <ArrowLeft size={18} /> Kembali ke Daftar
                </Link>
                <h1 className="text-3xl font-display font-bold text-neutral-50">
                    Tambah Pengguna Baru
                </h1>
                <p className="text-neutral-400">
                    Buat akun untuk Kasir atau Admin baru.
                </p>
            </div>

            <div className="bg-secondary-800 p-6 md:p-8 rounded-2xl border border-tertiary-800/50 max-w-3xl">
                <form onSubmit={submit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <InputLabel value="Nama Lengkap" />
                            <TextInput
                                className="w-full mt-1"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.name}
                                className="mt-2 text-red-400"
                            />
                        </div>
                        <div>
                            <InputLabel value="Email" />
                            <TextInput
                                type="email"
                                className="w-full mt-1"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.email}
                                className="mt-2 text-red-400"
                            />
                        </div>
                        <div>
                            <InputLabel value="Nomor WhatsApp" />
                            <TextInput
                                placeholder="08..."
                                className="w-full mt-1"
                                value={data.phone}
                                onChange={(e) =>
                                    setData("phone", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.phone}
                                className="mt-2 text-red-400"
                            />
                        </div>
                        <div>
                            <InputLabel value="Role" />
                            <select
                                className="w-full mt-1 bg-secondary-900 border-tertiary-700 text-neutral-50 rounded-xl focus:ring-primary-300 focus:border-primary-300"
                                value={data.role}
                                onChange={(e) =>
                                    setData("role", e.target.value)
                                }
                            >
                                <option value="kasir">Kasir</option>
                                <option value="admin">Admin</option>
                            </select>
                            <InputError
                                message={errors.role}
                                className="mt-2 text-red-400"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <InputLabel value="Password Default" />
                            <TextInput
                                type="password"
                                className="w-full mt-1"
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.password}
                                className="mt-2 text-red-400"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end pt-4 border-t border-tertiary-800/50">
                        <PrimaryButton disabled={processing} className="gap-2">
                            <Save size={18} /> Simpan Pengguna
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </MainLayout>
    );
}
