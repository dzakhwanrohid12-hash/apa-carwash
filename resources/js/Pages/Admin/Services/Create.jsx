import MainLayout from "@/Layouts/MainLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { motion } from "framer-motion";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { ArrowLeft, Save, Wrench } from "lucide-react";

export default function ServiceCreate({ categories }) {
    const { data, setData, post, processing, errors } = useForm({
        service_category_id: categories[0]?.id || "",
        name: "",
        description: "",
        price: "",
        duration_minutes: "60",
        is_active: true,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("admin.services.store"));
    };

    return (
        <MainLayout>
            <Head title="Tambah Layanan" />

            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
            >
                <Link
                    href={route("admin.services.index")}
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-amber-500 font-bold mb-6 transition-colors bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm hover:shadow-md"
                >
                    <ArrowLeft size={18} /> Kembali ke Katalog
                </Link>

                <h1 className="text-3xl md:text-4xl font-display font-bold text-slate-800 mb-2">
                    Tambah Layanan <span className="text-amber-500">Baru</span>
                </h1>
                <p className="text-slate-500 font-medium">
                    Tambahkan paket perawatan atau layanan cuci baru ke dalam
                    sistem.
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 max-w-4xl relative overflow-hidden"
            >
                {/* Background Ornament dalam Card */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 blur-3xl rounded-full pointer-events-none" />

                <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100 relative z-10">
                    <div className="p-3.5 bg-slate-900 rounded-2xl text-amber-400 shadow-md">
                        <Wrench size={28} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-slate-800">
                            Detail Layanan
                        </h2>
                        <p className="text-sm text-slate-500 mt-0.5">
                            Lengkapi form berikut untuk menambahkan layanan.
                        </p>
                    </div>
                </div>

                <form onSubmit={submit} className="space-y-8 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <InputLabel
                                value="Kategori Layanan"
                                className="text-slate-700 mb-2"
                            />
                            <select
                                className="w-full bg-slate-50 border-slate-200 text-slate-800 rounded-xl px-4 py-3.5 focus:ring-4 focus:ring-amber-400/20 focus:border-amber-400 transition-all font-bold cursor-pointer"
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
                                className="mt-2 text-red-500"
                            />
                        </div>

                        <div>
                            <InputLabel
                                value="Nama Layanan"
                                className="text-slate-700 mb-2"
                            />
                            <TextInput
                                className="w-full bg-slate-50 border-slate-200 focus:border-amber-400 focus:ring-amber-400/20 rounded-xl py-3.5"
                                placeholder="Cth: Cuci Mobil Menengah"
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

                        <div className="md:col-span-2">
                            <InputLabel
                                value="Deskripsi Singkat (Opsional)"
                                className="text-slate-700 mb-2"
                            />
                            <textarea
                                className="w-full bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400 rounded-xl px-5 py-4 focus:ring-4 focus:ring-amber-400/20 focus:border-amber-400 transition-all resize-y"
                                rows="3"
                                placeholder="Jelaskan detail apa saja yang didapatkan pada layanan ini..."
                                value={data.description}
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                            ></textarea>
                            <InputError
                                message={errors.description}
                                className="mt-2 text-red-500"
                            />
                        </div>

                        <div>
                            <InputLabel
                                value="Harga Layanan (Rp)"
                                className="text-slate-700 mb-2"
                            />
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                                    Rp
                                </span>
                                <TextInput
                                    type="number"
                                    className="w-full bg-slate-50 border-slate-200 focus:border-amber-400 focus:ring-amber-400/20 rounded-xl py-3.5 pl-12 font-mono font-bold text-amber-700"
                                    placeholder="40000"
                                    value={data.price}
                                    onChange={(e) =>
                                        setData("price", e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <InputError
                                message={errors.price}
                                className="mt-2 text-red-500"
                            />
                        </div>

                        <div>
                            <InputLabel
                                value="Estimasi Durasi Pengerjaan"
                                className="text-slate-700 mb-2"
                            />
                            <div className="relative">
                                <TextInput
                                    type="number"
                                    className="w-full bg-slate-50 border-slate-200 focus:border-amber-400 focus:ring-amber-400/20 rounded-xl py-3.5 pr-20 font-mono font-bold text-slate-700"
                                    placeholder="60"
                                    value={data.duration_minutes}
                                    onChange={(e) =>
                                        setData(
                                            "duration_minutes",
                                            e.target.value,
                                        )
                                    }
                                    required
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium bg-slate-100 px-2 py-0.5 rounded">
                                    Menit
                                </span>
                            </div>
                            <InputError
                                message={errors.duration_minutes}
                                className="mt-2 text-red-500"
                            />
                        </div>

                        {/* STATUS TOGGLE CARD */}
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
                                    Layanan Tersedia Segera
                                </span>
                                <span className="block text-slate-400 text-sm leading-relaxed">
                                    Jika dicentang, layanan ini akan langsung
                                    tayang dan dapat dipesan oleh pelanggan
                                    setelah disimpan.
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
                                <span>Simpan Layanan Baru</span>
                            </div>
                        </PrimaryButton>
                    </div>
                </form>
            </motion.div>
        </MainLayout>
    );
}
