import MainLayout from "@/Layouts/MainLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { motion } from "framer-motion";
import { Save, ArrowLeft, Lock, Ticket } from "lucide-react";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Edit({ voucher }) {
    const formatDate = (dateString) => {
        if (!dateString) return "";
        return String(dateString).substring(0, 10);
    };

    const { data, setData, put, processing, errors } = useForm({
        code: voucher.code || "",
        discount_type: voucher.discount_type || "nominal",
        discount_value: voucher.discount_value || "",
        min_transaction: voucher.min_transaction || 0,
        quota: voucher.quota || "",
        valid_from: formatDate(voucher.valid_from),
        valid_until: formatDate(voucher.valid_until),
        is_active: voucher.is_active === 1 || voucher.is_active === true,
    });

    const submit = (e) => {
        e.preventDefault();
        put(route("admin.vouchers.update", voucher.id));
    };

    return (
        <MainLayout>
            <Head title={`Edit Voucher - ${voucher.code}`} />

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
                    Edit <span className="text-amber-500">Voucher</span>
                </h1>
                <p className="text-slate-500 font-medium">
                    Perbarui kuota, masa berlaku, dan aturan minimal transaksi.
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="max-w-4xl mx-auto bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/5 blur-3xl rounded-full pointer-events-none" />

                <form onSubmit={submit} className="space-y-8 relative z-10">
                    {/* BAGIAN READ-ONLY */}
                    <div className="p-6 md:p-8 bg-slate-50 rounded-2xl border border-slate-200 shadow-inner">
                        <div className="flex items-center gap-2 mb-6 text-slate-500 bg-white w-fit px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
                            <Lock size={16} className="text-amber-500" />
                            <span className="text-sm font-bold">
                                Data Terkunci (Identitas Voucher)
                            </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-600 mb-2">
                                    Kode Voucher
                                </label>
                                <input
                                    type="text"
                                    value={data.code}
                                    disabled
                                    className="w-full rounded-xl bg-slate-100 border-slate-200 text-slate-500 font-mono font-bold cursor-not-allowed"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-600 mb-2">
                                    Tipe Diskon
                                </label>
                                <input
                                    type="text"
                                    value={
                                        data.discount_type === "nominal"
                                            ? "Nominal (Rupiah)"
                                            : "Persentase (%)"
                                    }
                                    disabled
                                    className="w-full rounded-xl bg-slate-100 border-slate-200 text-slate-500 font-bold cursor-not-allowed"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-600 mb-2">
                                    Nilai Diskon
                                </label>
                                <input
                                    type="text"
                                    value={
                                        data.discount_type === "nominal"
                                            ? `Rp ${parseInt(data.discount_value).toLocaleString("id-ID")}`
                                            : `${parseInt(data.discount_value)}%`
                                    }
                                    disabled
                                    className="w-full rounded-xl bg-slate-100 border-slate-200 text-slate-500 font-bold cursor-not-allowed"
                                />
                            </div>
                        </div>
                    </div>

                    {/* BAGIAN EDITABLE */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <InputLabel
                                value="Minimal Transaksi (Rp)"
                                className="text-slate-700 mb-2"
                            />
                            <TextInput
                                type="number"
                                className="w-full bg-slate-50 border-slate-200 focus:border-amber-400 focus:ring-amber-400/20 rounded-xl py-3.5 font-mono"
                                value={data.min_transaction}
                                onChange={(e) =>
                                    setData("min_transaction", e.target.value)
                                }
                                min="0"
                            />
                            <InputError
                                message={errors.min_transaction}
                                className="mt-2 text-red-500"
                            />
                        </div>

                        <div>
                            <InputLabel
                                value={`Total Kuota (Telah dipakai: ${voucher.used_count})`}
                                className="text-slate-700 mb-2"
                            />
                            <TextInput
                                type="number"
                                className="w-full bg-slate-50 border-slate-200 focus:border-amber-400 focus:ring-amber-400/20 rounded-xl py-3.5 font-mono"
                                value={data.quota}
                                onChange={(e) =>
                                    setData("quota", e.target.value)
                                }
                                min={voucher.used_count}
                            />
                            <InputError
                                message={errors.quota}
                                className="mt-2 text-red-500"
                            />
                        </div>

                        <div>
                            <InputLabel
                                value="Berlaku Dari"
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
                                value="Berlaku Sampai"
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
                                <span>Simpan Perubahan</span>
                            </div>
                        </PrimaryButton>
                    </div>
                </form>
            </motion.div>
        </MainLayout>
    );
}
