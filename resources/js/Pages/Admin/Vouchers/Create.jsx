import MainLayout from "@/Layouts/MainLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { ArrowLeft, Save } from "lucide-react";

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

            <div className="mb-8">
                <Link
                    href={route("admin.vouchers.index")}
                    className="inline-flex items-center gap-2 text-neutral-400 hover:text-primary-300 mb-4 transition-colors"
                >
                    <ArrowLeft size={18} /> Kembali ke Daftar
                </Link>
                <h1 className="text-3xl font-display font-bold text-neutral-50">
                    Buat Voucher Baru
                </h1>
            </div>

            <div className="bg-secondary-800 p-6 md:p-8 rounded-2xl border border-tertiary-800/50 max-w-3xl">
                <form onSubmit={submit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <InputLabel value="Kode Voucher" />
                            <TextInput
                                className="w-full mt-1 uppercase font-mono"
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
                                className="mt-2 text-red-400"
                            />
                        </div>
                        <div>
                            <InputLabel value="Tipe Diskon" />
                            <select
                                className="w-full mt-1 bg-secondary-900 border-tertiary-700 text-neutral-50 rounded-xl focus:ring-primary-300"
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
                                className="mt-2 text-red-400"
                            />
                        </div>
                        <div>
                            <InputLabel
                                value={
                                    data.discount_type === "percentage"
                                        ? "Nilai Diskon (%)"
                                        : "Nilai Diskon (Rp)"
                                }
                            />
                            <TextInput
                                type="number"
                                className="w-full mt-1"
                                value={data.discount_value}
                                onChange={(e) =>
                                    setData("discount_value", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.discount_value}
                                className="mt-2 text-red-400"
                            />
                        </div>
                        <div>
                            <InputLabel value="Minimal Transaksi (Rp)" />
                            <TextInput
                                type="number"
                                className="w-full mt-1"
                                value={data.min_transaction}
                                onChange={(e) =>
                                    setData("min_transaction", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.min_transaction}
                                className="mt-2 text-red-400"
                            />
                        </div>
                        <div>
                            <InputLabel value="Total Kuota" />
                            <TextInput
                                type="number"
                                className="w-full mt-1"
                                value={data.quota}
                                onChange={(e) =>
                                    setData("quota", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.quota}
                                className="mt-2 text-red-400"
                            />
                        </div>
                        <div className="hidden md:block"></div> {/* Spacer */}
                        <div>
                            <InputLabel value="Berlaku Dari" />
                            <TextInput
                                type="date"
                                className="w-full mt-1"
                                value={data.valid_from}
                                onChange={(e) =>
                                    setData("valid_from", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.valid_from}
                                className="mt-2 text-red-400"
                            />
                        </div>
                        <div>
                            <InputLabel value="Berlaku Sampai" />
                            <TextInput
                                type="date"
                                className="w-full mt-1"
                                value={data.valid_until}
                                onChange={(e) =>
                                    setData("valid_until", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.valid_until}
                                className="mt-2 text-red-400"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end pt-4 border-t border-tertiary-800/50">
                        <PrimaryButton disabled={processing} className="gap-2">
                            <Save size={18} /> Simpan Voucher
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </MainLayout>
    );
}
