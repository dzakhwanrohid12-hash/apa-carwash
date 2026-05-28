import { useState } from "react";
import MainLayout from "@/Layouts/MainLayout";
import { Head, useForm } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import { ShoppingCart, CheckCircle } from "lucide-react";

export default function POSIndex({ categories }) {
    const [selectedService, setSelectedService] = useState(null);
    const [activeTab, setActiveTab] = useState(categories[0]?.id);

    const { data, setData, post, processing, errors, reset } = useForm({
        service_id: "",
        vehicle_plate: "",
        vehicle_description: "",
        voucher_code: "",
        payment_method: "tunai",
    });

    const handleSelectService = (service) => {
        setSelectedService(service);
        setData("service_id", service.id);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("cashier.pos.store"), {
            onSuccess: () => {
                reset();
                setSelectedService(null);
                // Di dunia nyata, ini bisa memicu print struk
            },
        });
    };

    // Deteksi jika yang diklik adalah kategori Karpet
    const isCarpet =
        selectedService?.category?.name === "Karpet" ||
        (selectedService?.name &&
            selectedService.name.toLowerCase().includes("karpet"));

    return (
        <MainLayout>
            <Head title="Point of Sales" />

            <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-120px)]">
                {/* KIRI: Katalog Layanan */}
                <div className="flex-1 flex flex-col bg-secondary-800 rounded-2xl border border-tertiary-800/50 overflow-hidden">
                    <div className="flex border-b border-tertiary-800/50 p-2">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveTab(cat.id)}
                                className={`flex-1 py-3 text-center rounded-xl font-bold text-sm transition-colors ${activeTab === cat.id ? "bg-primary-300 text-secondary-900" : "text-neutral-400 hover:text-neutral-50"}`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                        {categories
                            .find((c) => c.id === activeTab)
                            ?.services.map((svc) => (
                                <div
                                    key={svc.id}
                                    onClick={() => handleSelectService(svc)}
                                    className={`p-4 rounded-xl border cursor-pointer transition-all ${selectedService?.id === svc.id ? "bg-primary-300/10 border-primary-300" : "bg-secondary-900 border-tertiary-800 hover:border-primary-300/50"}`}
                                >
                                    <h4 className="font-bold text-neutral-50 mb-1">
                                        {svc.name}
                                    </h4>
                                    <p className="text-primary-300 font-mono text-sm">
                                        Rp
                                        {new Intl.NumberFormat("id-ID").format(
                                            svc.price,
                                        )}
                                    </p>
                                </div>
                            ))}
                    </div>
                </div>

                {/* KANAN: Form & Pembayaran */}
                <div className="w-full lg:w-[400px] bg-secondary-800 rounded-2xl border border-tertiary-800/50 flex flex-col">
                    <div className="p-4 border-b border-tertiary-800/50 flex items-center gap-2">
                        <ShoppingCart className="text-primary-300" />
                        <h2 className="font-bold text-lg text-neutral-50">
                            Detail Transaksi
                        </h2>
                    </div>

                    <form
                        onSubmit={submit}
                        className="flex-1 flex flex-col overflow-y-auto"
                    >
                        <div className="p-4 space-y-4 flex-1">
                            {!selectedService ? (
                                <div className="h-full flex items-center justify-center text-neutral-500 text-sm">
                                    Pilih layanan terlebih dahulu.
                                </div>
                            ) : (
                                <>
                                    <div className="bg-secondary-900 p-4 rounded-xl border border-tertiary-800">
                                        <p className="text-xs text-neutral-400 mb-1">
                                            Layanan Terpilih
                                        </p>
                                        <p className="font-bold text-neutral-50">
                                            {selectedService.name}
                                        </p>
                                        <p className="font-mono text-primary-300 text-lg mt-1">
                                            Rp{" "}
                                            {new Intl.NumberFormat(
                                                "id-ID",
                                            ).format(selectedService.price)}
                                        </p>
                                    </div>

                                    {/* PERBAIKAN: Form Dinamis Karpet vs Kendaraan */}
                                    {isCarpet ? (
                                        <>
                                            <div>
                                                <InputLabel value="Nama Label / Pemilik Karpet (Opsional)" />
                                                <TextInput
                                                    className="w-full mt-1 uppercase"
                                                    placeholder="Cth: MASJID AL-IKHLAS / PAK BUDI"
                                                    value={data.vehicle_plate}
                                                    onChange={(e) =>
                                                        setData(
                                                            "vehicle_plate",
                                                            e.target.value
                                                                .substring(
                                                                    0,
                                                                    15,
                                                                )
                                                                .toUpperCase(),
                                                        )
                                                    }
                                                />
                                                <p className="text-xs text-neutral-500 mt-1">
                                                    Isi '-' atau kosongkan jika
                                                    tidak ada label.
                                                </p>
                                            </div>
                                            <div>
                                                <InputLabel value="Warna / Ciri Khas Karpet (Opsional)" />
                                                <TextInput
                                                    className="w-full mt-1"
                                                    placeholder="Cth: Merah Motif Bunga"
                                                    value={
                                                        data.vehicle_description
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "vehicle_description",
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div>
                                                <InputLabel value="Nomor Plat Kendaraan" />
                                                <TextInput
                                                    className="w-full mt-1 uppercase"
                                                    placeholder="BM 1234 ABC"
                                                    value={data.vehicle_plate}
                                                    onChange={(e) =>
                                                        setData(
                                                            "vehicle_plate",
                                                            e.target.value.toUpperCase(),
                                                        )
                                                    }
                                                    required={!isCarpet}
                                                />
                                                {errors.vehicle_plate && (
                                                    <p className="text-red-400 text-xs mt-1">
                                                        {errors.vehicle_plate}
                                                    </p>
                                                )}
                                            </div>
                                            <div>
                                                <InputLabel value="Deskripsi Kendaraan (Opsional)" />
                                                <TextInput
                                                    className="w-full mt-1"
                                                    placeholder="Cth: Avanza Hitam / Nmax Putih"
                                                    value={
                                                        data.vehicle_description
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "vehicle_description",
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </div>
                                        </>
                                    )}

                                    <div>
                                        <InputLabel value="Kode Voucher (Opsional)" />
                                        <div className="flex gap-2">
                                            <TextInput
                                                className="flex-1 uppercase font-mono mt-1"
                                                value={data.voucher_code}
                                                onChange={(e) =>
                                                    setData(
                                                        "voucher_code",
                                                        e.target.value.toUpperCase(),
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <InputLabel value="Metode Pembayaran" />
                                        <select
                                            className="w-full mt-1 bg-secondary-900 border-tertiary-700 text-neutral-50 rounded-xl focus:ring-primary-300"
                                            value={data.payment_method}
                                            onChange={(e) =>
                                                setData(
                                                    "payment_method",
                                                    e.target.value,
                                                )
                                            }
                                        >
                                            <option value="tunai">
                                                Tunai / Cash
                                            </option>
                                            <option value="qris">QRIS</option>
                                            <option value="transfer">
                                                Transfer Bank
                                            </option>
                                        </select>
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="p-4 border-t border-tertiary-800/50 bg-secondary-900/50">
                            <PrimaryButton
                                disabled={processing || !selectedService}
                                className="w-full justify-center gap-2 py-3 text-lg"
                            >
                                <CheckCircle size={20} /> Proses Bayar
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </MainLayout>
    );
}
