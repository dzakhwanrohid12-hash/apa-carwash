import MainLayout from "@/Layouts/MainLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { motion } from "framer-motion";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { ArrowLeft, Save, Ticket } from "lucide-react";

export default function VoucherCreate() {
    const { data, setData, post, processing, errors } = useForm({
        code: "",
        discount_type: "nominal",
        discount_value: "",
        min_transaction: "0",
        quota: "",
        valid_from: new Date().toISOString().split("T")[0],
        valid_until: "",
        is_active: true,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("admin.vouchers.store"));
    };

    return (
        <MainLayout>
            <Head title="Buat Voucher" />

            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto mb-8"
            >
                <Link
                    href={route("admin.vouchers.index")}
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-amber-500 font-bold mb-6 transition-colors bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm hover:shadow-md"
                >
                    <ArrowLeft size={18} /> Kembali ke Daftar
                </Link>

                <h1 className="text-3xl md:text-4xl font-display font-bold text-slate-800 mb-2">
                    Buat Voucher <span className="text-amber-500">Baru</span>
                </h1>
                <p className="text-slate-500 font-medium">
                    Tambahkan kode promo baru untuk menarik lebih banyak
                    pelanggan.
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="max-w-4xl mx-auto bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 blur-3xl rounded-full pointer-events-none" />

                <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100 relative z-10">
                    <div className="p-3.5 bg-slate-900 rounded-2xl text-amber-400 shadow-md">
                        <Ticket size={28} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-slate-800">
                            Aturan Voucher
                        </h2>
                        <p className="text-sm text-slate-500 mt-0.5">
                            Tentukan kode, nominal diskon, dan masa berlaku.
                        </p>
                    </div>
                </div>

                <form onSubmit={submit} className="space-y-8 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <InputLabel
                                value="Kode Voucher"
                                className="text-slate-700 mb-2"
                            />
                            <TextInput
                                className="w-full bg-slate-50 border-slate-200 focus:border-amber-400 focus:ring-amber-400/20 rounded-xl py-3.5 uppercase font-mono tracking-wider font-bold text-amber-600"
                                placeholder="PROMO2026"
                                value={data.code}
                                onChange={(e) =>
                                    setData(
                                        "code",
                                        e.target.value.toUpperCase(),
                                    )
                                }
                                required
                            />
                            <InputError
                                message={errors.code}
                                className="mt-2 text-red-500"
                            />
                        </div>
                        <div>
                            <InputLabel
                                value="Tipe Diskon"
                                className="text-slate-700 mb-2"
                            />
                            <select
                                className="w-full bg-slate-50 border-slate-200 text-slate-800 rounded-xl px-4 py-3.5 focus:ring-4 focus:ring-amber-400/20 focus:border-amber-400 transition-all font-bold cursor-pointer"
                                value={data.discount_type}
                                onChange={(e) =>
                                    setData("discount_type", e.target.value)
                                }
                            >
                                <option value="nominal">
                                    Nominal (Rupiah)
                                </option>
                                <option value="percentage">
                                    Persentase (%)
                                </option>
                            </select>
                            <InputError
                                message={errors.discount_type}
                                className="mt-2 text-red-500"
                            />
                        </div>
                        <div>
                            <InputLabel
                                value={
                                    data.discount_type === "percentage"
                                        ? "Nilai Diskon (%)"
                                        : "Nilai Diskon (Rp)"
                                }
                                className="text-slate-700 mb-2"
                            />
                            <div className="relative">
                                {data.discount_type === "nominal" && (
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                                        Rp
                                    </span>
                                )}
                                <TextInput
                                    type="number"
                                    className={`w-full bg-slate-50 border-slate-200 focus:border-amber-400 focus:ring-amber-400/20 rounded-xl py-3.5 font-mono font-bold text-slate-700 ${data.discount_type === "nominal" ? "pl-12" : ""}`}
                                    value={data.discount_value}
                                    onChange={(e) =>
                                        setData(
                                            "discount_value",
                                            e.target.value,
                                        )
                                    }
                                    required
                                />
                                {data.discount_type === "percentage" && (
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                                        %
                                    </span>
                                )}
                            </div>
                            <InputError
                                message={errors.discount_value}
                                className="mt-2 text-red-500"
                            />
                        </div>
                        <div>
                            <InputLabel
                                value="Minimal Transaksi (Rp)"
                                className="text-slate-700 mb-2"
                            />
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                                    Rp
                                </span>
                                <TextInput
                                    type="number"
                                    className="w-full bg-slate-50 border-slate-200 focus:border-amber-400 focus:ring-amber-400/20 rounded-xl py-3.5 pl-12 font-mono font-bold text-slate-700"
                                    value={data.min_transaction}
                                    onChange={(e) =>
                                        setData(
                                            "min_transaction",
                                            e.target.value,
                                        )
                                    }
                                    required
                                />
                            </div>
                            <InputError
                                message={errors.min_transaction}
                                className="mt-2 text-red-500"
                            />
                        </div>
                        <div>
                            <InputLabel
                                value="Total Kuota Promo"
                                className="text-slate-700 mb-2"
                            />
                            <TextInput
                                type="number"
                                className="w-full bg-slate-50 border-slate-200 focus:border-amber-400 focus:ring-amber-400/20 rounded-xl py-3.5 font-mono font-bold text-slate-700"
                                placeholder="Contoh: 50"
                                value={data.quota}
                                onChange={(e) =>
                                    setData("quota", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.quota}
                                className="mt-2 text-red-500"
                            />
                        </div>
                        <div className="hidden md:block"></div> {/* Spacer */}
                        <div>
                            <InputLabel
                                value="Berlaku Dari Tanggal"
                                className="text-slate-700 mb-2"
                            />
                            <TextInput
                                type="date"
                                className="w-full bg-slate-50 border-slate-200 focus:border-amber-400 focus:ring-amber-400/20 rounded-xl py-3.5"
                                value={data.valid_from}
                                onChange={(e) =>
                                    setData("valid_from", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.valid_from}
                                className="mt-2 text-red-500"
                            />
                        </div>
                        <div>
                            <InputLabel
                                value="Berlaku Sampai Tanggal"
                                className="text-slate-700 mb-2"
                            />
                            <TextInput
                                type="date"
                                className="w-full bg-slate-50 border-slate-200 focus:border-amber-400 focus:ring-amber-400/20 rounded-xl py-3.5"
                                value={data.valid_until}
                                onChange={(e) =>
                                    setData("valid_until", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.valid_until}
                                className="mt-2 text-red-500"
                            />
                        </div>
                        {/* Status Aktif */}
                        <div className="md:col-span-2 flex items-start gap-4 p-5 bg-slate-900 rounded-2xl border border-slate-800 shadow-md">
                            <input
                                type="checkbox"
                                id="is_active"
                                checked={data.is_active}
                                onChange={(e) =>
                                    setData("is_active", e.target.checked)
                                }
                                className="mt-1 w-5 h-5 rounded border-slate-600 text-amber-500 focus:ring-amber-500 bg-slate-800 cursor-pointer"
                            />
                            <label
                                htmlFor="is_active"
                                className="cursor-pointer"
                            >
                                <span className="block text-white font-bold text-lg mb-1">
                                    Voucher Berstatus Aktif
                                </span>
                                <span className="block text-slate-400 text-sm leading-relaxed">
                                    Jika dicentang, pelanggan dapat menggunakan
                                    kode voucher ini saat melakukan checkout
                                    reservasi.
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
                                <span>Simpan Voucher</span>
                            </div>
                        </PrimaryButton>
                    </div>
                </form>
            </motion.div>
        </MainLayout>
    );
}
