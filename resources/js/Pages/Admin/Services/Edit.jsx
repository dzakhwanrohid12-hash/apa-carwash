import MainLayout from "@/Layouts/MainLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { ArrowLeft, Save } from "lucide-react";

export default function ServiceEdit({ service, categories }) {
    // Inisialisasi useForm dengan data dari prop 'service'
    const { data, setData, put, processing, errors } = useForm({
        service_category_id: service.service_category_id || "",
        name: service.name || "",
        description: service.description || "",
        price: service.price || "",
        duration_minutes: service.duration_minutes || "",
        is_active: service.is_active === 1 || service.is_active === true,
    });

    const submit = (e) => {
        e.preventDefault();
        // Gunakan PUT untuk proses update
        put(route("admin.services.update", service.id));
    };

    return (
        <MainLayout>
            <Head title={`Edit Layanan - ${service.name}`} />

            <div className="mb-8">
                <Link
                    href={route("admin.services.index")}
                    className="inline-flex items-center gap-2 text-neutral-400 hover:text-primary-300 mb-4 transition-colors"
                >
                    <ArrowLeft size={18} /> Kembali ke Katalog
                </Link>
                <h1 className="text-3xl font-display font-bold text-neutral-50">
                    Edit Layanan
                </h1>
                <p className="text-neutral-400">
                    Ubah harga, durasi, atau status layanan.
                </p>
            </div>

            <div className="bg-secondary-800 p-6 md:p-8 rounded-2xl border border-tertiary-800/50 max-w-3xl shadow-lg">
                <form onSubmit={submit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <InputLabel value="Kategori Layanan" />
                            <select
                                className="w-full mt-1 bg-secondary-900 border-tertiary-700 text-neutral-50 rounded-xl focus:ring-primary-300 focus:border-primary-300 transition-colors"
                                value={data.service_category_id}
                                onChange={(e) =>
                                    setData(
                                        "service_category_id",
                                        e.target.value,
                                    )
                                }
                            >
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                            <InputError
                                message={errors.service_category_id}
                                className="mt-2 text-red-400"
                            />
                        </div>

                        <div>
                            <InputLabel value="Nama Layanan" />
                            <TextInput
                                className="w-full mt-1"
                                placeholder="Cth: Cuci Mobil Menengah"
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

                        <div className="md:col-span-2">
                            <InputLabel value="Deskripsi Singkat (Opsional)" />
                            <textarea
                                className="w-full mt-1 bg-secondary-900 border-tertiary-700 text-neutral-50 rounded-xl focus:ring-primary-300 focus:border-primary-300 transition-colors"
                                rows="3"
                                value={data.description}
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                            ></textarea>
                            <InputError
                                message={errors.description}
                                className="mt-2 text-red-400"
                            />
                        </div>

                        <div>
                            <InputLabel value="Harga (Rp)" />
                            <TextInput
                                type="number"
                                className="w-full mt-1 font-mono"
                                placeholder="40000"
                                value={data.price}
                                onChange={(e) =>
                                    setData("price", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.price}
                                className="mt-2 text-red-400"
                            />
                        </div>

                        <div>
                            <InputLabel value="Estimasi Waktu (Menit)" />
                            <TextInput
                                type="number"
                                className="w-full mt-1 font-mono"
                                placeholder="60"
                                value={data.duration_minutes}
                                onChange={(e) =>
                                    setData("duration_minutes", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.duration_minutes}
                                className="mt-2 text-red-400"
                            />
                        </div>

                        <div className="md:col-span-2 p-4 bg-secondary-900 rounded-xl border border-tertiary-800">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={data.is_active}
                                    onChange={(e) =>
                                        setData("is_active", e.target.checked)
                                    }
                                    className="bg-secondary-900 border-tertiary-700 text-primary-300 rounded focus:ring-primary-300 focus:ring-offset-secondary-900 w-5 h-5 transition-colors"
                                />
                                <div>
                                    <span className="text-neutral-50 font-medium block">
                                        Layanan Aktif
                                    </span>
                                    <span className="text-xs text-neutral-400">
                                        Jika dimatikan, layanan ini tidak akan
                                        muncul di menu pelanggan.
                                    </span>
                                </div>
                            </label>
                            <InputError
                                message={errors.is_active}
                                className="mt-2 text-red-400"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end pt-6 border-t border-tertiary-800/50">
                        <PrimaryButton disabled={processing} className="gap-2">
                            <Save size={18} /> Perbarui Layanan
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </MainLayout>
    );
}
