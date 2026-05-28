import MainLayout from "@/Layouts/MainLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { Save, ArrowLeft, Lock } from "lucide-react";

export default function Edit({ voucher }) {
    // Fungsi bantu untuk memotong string tanggal dari Laravel menjadi format YYYY-MM-DD
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

            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Link
                            href={route("admin.vouchers.index")}
                            className="p-2 bg-secondary-800 text-neutral-400 hover:text-primary-300 rounded-xl transition-colors"
                        >
                            <ArrowLeft size={20} />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-display font-bold text-neutral-50">
                                Edit Voucher
                            </h1>
                            <p className="text-neutral-400 text-sm mt-1">
                                Perbarui kuota, masa berlaku, dan aturan minimal
                                transaksi.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-secondary-800 border border-tertiary-800/50 rounded-2xl shadow-lg p-6 sm:p-8">
                    <form onSubmit={submit} className="space-y-6">
                        {/* BAGIAN READ-ONLY (Dikunci untuk menjaga riwayat transaksi) */}
                        <div className="p-5 bg-secondary-900/50 rounded-xl border border-tertiary-800/50 mb-8">
                            <div className="flex items-center gap-2 mb-4 text-primary-300/80">
                                <Lock size={16} />
                                <span className="text-sm font-medium">
                                    Data Terkunci (Identitas Voucher)
                                </span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-neutral-500 mb-2">
                                        Kode Voucher
                                    </label>
                                    <input
                                        type="text"
                                        value={data.code}
                                        disabled
                                        className="w-full rounded-xl bg-secondary-900 border-tertiary-800/50 text-neutral-500 cursor-not-allowed"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-neutral-500 mb-2">
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
                                        className="w-full rounded-xl bg-secondary-900 border-tertiary-800/50 text-neutral-500 cursor-not-allowed"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-neutral-500 mb-2">
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
                                        className="w-full rounded-xl bg-secondary-900 border-tertiary-800/50 text-neutral-500 cursor-not-allowed"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* BAGIAN EDITABLE */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-neutral-300 mb-2">
                                    Minimal Transaksi (Rp)
                                </label>
                                <input
                                    type="number"
                                    value={data.min_transaction}
                                    onChange={(e) =>
                                        setData(
                                            "min_transaction",
                                            e.target.value,
                                        )
                                    }
                                    className="w-full rounded-xl bg-secondary-900 border-tertiary-800 text-neutral-50 focus:border-primary-300 focus:ring-primary-300"
                                    min="0"
                                />
                                {errors.min_transaction && (
                                    <p className="text-red-400 text-xs mt-1">
                                        {errors.min_transaction}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-neutral-300 mb-2">
                                    Total Kuota (Telah dipakai:{" "}
                                    {voucher.used_count})
                                </label>
                                <input
                                    type="number"
                                    value={data.quota}
                                    onChange={(e) =>
                                        setData("quota", e.target.value)
                                    }
                                    className="w-full rounded-xl bg-secondary-900 border-tertiary-800 text-neutral-50 focus:border-primary-300 focus:ring-primary-300"
                                    min={voucher.used_count}
                                />
                                {errors.quota && (
                                    <p className="text-red-400 text-xs mt-1">
                                        {errors.quota}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-neutral-300 mb-2">
                                    Berlaku Dari
                                </label>
                                <input
                                    type="date"
                                    value={data.valid_from}
                                    onChange={(e) =>
                                        setData("valid_from", e.target.value)
                                    }
                                    className="w-full rounded-xl bg-secondary-900 border-tertiary-800 text-neutral-50 focus:border-primary-300 focus:ring-primary-300"
                                    required
                                />
                                {errors.valid_from && (
                                    <p className="text-red-400 text-xs mt-1">
                                        {errors.valid_from}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-neutral-300 mb-2">
                                    Berlaku Sampai
                                </label>
                                <input
                                    type="date"
                                    value={data.valid_until}
                                    onChange={(e) =>
                                        setData("valid_until", e.target.value)
                                    }
                                    className="w-full rounded-xl bg-secondary-900 border-tertiary-800 text-neutral-50 focus:border-primary-300 focus:ring-primary-300"
                                    required
                                />
                                {errors.valid_until && (
                                    <p className="text-red-400 text-xs mt-1">
                                        {errors.valid_until}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Status Aktif */}
                        <div className="flex items-center gap-3 bg-secondary-900/50 p-4 rounded-xl border border-tertiary-800/50 mt-4">
                            <input
                                type="checkbox"
                                id="is_active"
                                checked={data.is_active}
                                onChange={(e) =>
                                    setData("is_active", e.target.checked)
                                }
                                className="w-5 h-5 rounded bg-secondary-900 border-tertiary-800 text-primary-300 focus:ring-primary-300 focus:ring-offset-secondary-800"
                            />
                            <label
                                htmlFor="is_active"
                                className="text-sm font-medium text-neutral-300 cursor-pointer"
                            >
                                Voucher Aktif (Pelanggan dapat menggunakan
                                voucher ini saat *checkout*)
                            </label>
                        </div>

                        <div className="flex justify-end pt-6 border-t border-tertiary-800/50">
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex items-center gap-2 px-6 py-2.5 bg-primary-300 text-secondary-950 font-bold rounded-xl hover:scale-105 transition-transform disabled:opacity-50 shadow-[0_0_15px_rgba(242,201,76,0.3)]"
                            >
                                <Save size={18} /> Simpan Perubahan
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </MainLayout>
    );
}
