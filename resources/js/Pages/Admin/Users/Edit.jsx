import MainLayout from "@/Layouts/MainLayout";
import { Head, Link, useForm } from "@inertiajs/react";

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

        // kosong = tidak update password
        password: "",

        // checkbox status
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

            <div className="mb-8">
                <Link
                    href={route("admin.users.index")}
                    className="inline-flex items-center gap-2 text-neutral-400 hover:text-primary-300 mb-4"
                >
                    <ArrowLeft size={18} />
                    Kembali ke Daftar
                </Link>

                <h1 className="text-3xl font-display font-bold text-neutral-50">
                    Edit Pengguna
                </h1>

                <p className="text-neutral-400">
                    Perbarui informasi akun pengguna.
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
                            />

                            <InputError
                                message={errors.name}
                                className="mt-2"
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
                            />

                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel value="Nomor WhatsApp" />

                            <TextInput
                                className="w-full mt-1"
                                value={data.phone}
                                onChange={(e) =>
                                    setData("phone", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.phone}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <InputLabel value="Role" />

                            <select
                                value={data.role}
                                onChange={(e) =>
                                    setData("role", e.target.value)
                                }
                                className="w-full mt-1 bg-secondary-900 rounded-xl"
                            >
                                <option value="kasir">
                                    Kasir
                                </option>

                                <option value="admin">
                                    Admin
                                </option>
                            </select>

                            <InputError
                                message={errors.role}
                                className="mt-2"
                            />
                        </div>

                        {/* PASSWORD OPSIONAL */}

                        <div className="md:col-span-2">

                            <InputLabel value="Password Baru (Opsional)" />

                            <TextInput
                                type="password"
                                className="w-full mt-1"
                                value={data.password}
                                placeholder="Kosongkan jika tidak ingin mengubah"
                                onChange={(e) =>
                                    setData(
                                        "password",
                                        e.target.value
                                    )
                                }
                            />

                            <InputError
                                message={errors.password}
                                className="mt-2"
                            />
                        </div>

                        {/* STATUS */}

                        <div className="md:col-span-2">

                            <label className="flex items-center gap-3">

                                <input
                                    type="checkbox"
                                    checked={data.is_active}
                                    onChange={(e) =>
                                        setData(
                                            "is_active",
                                            e.target.checked
                                        )
                                    }
                                />

                                <span className="text-neutral-200">
                                    Status Aktif
                                </span>

                            </label>

                            <p className="text-sm text-neutral-400 mt-1">
                                Nonaktifkan jika akun tidak boleh login.
                            </p>

                        </div>

                    </div>

                    <div className="flex justify-end pt-4 border-t border-tertiary-800/50">

                        <PrimaryButton
                            disabled={processing}
                            className="gap-2"
                        >
                            <Save size={18} />

                            Simpan Perubahan

                        </PrimaryButton>

                    </div>

                </form>

            </div>
        </MainLayout>
    );
}
