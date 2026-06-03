import { useState, useEffect } from "react";
import MainLayout from "@/Layouts/MainLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios"; // Tambahkan axios untuk cek voucher
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import {
    ShoppingCart,
    CheckCircle,
    Car,
    Ticket,
    Wallet,
    Info,
} from "lucide-react";

export default function POSIndex({ categories = [] }) {
    const { flash = {} } = usePage().props;

    const [selectedService, setSelectedService] = useState(null);
    const [activeTab, setActiveTab] = useState(categories[0]?.id);

    // State khusus untuk menangani pesan sukses secara manual agar pasti muncul
    const [localSuccessMsg, setLocalSuccessMsg] = useState("");

    // State untuk data perhitungan voucher
    const [discountData, setDiscountData] = useState({
        amount: 0,
        isValid: false,
        message: "",
    });

    const { data, setData, post, processing, errors, reset } = useForm({
        service_id: "",
        vehicle_plate: "",
        vehicle_description: "",
        voucher_code: "",
        payment_method: "tunai",
    });

    // Menampilkan alert sukses jika ada flash message dari backend (opsional)
    useEffect(() => {
        if (flash?.success) {
            setLocalSuccessMsg(flash.success);
            const timer = setTimeout(() => setLocalSuccessMsg(""), 5000);
            return () => clearTimeout(timer);
        }
    }, [flash]);

    const handleSelectService = (service) => {
        setSelectedService(service);
        setData("service_id", service.id);
        // Reset voucher jika ganti layanan karena minimal transaksi bisa berbeda
        if (discountData.amount > 0) {
            setData("voucher_code", "");
            setDiscountData({ amount: 0, isValid: false, message: "" });
        }
    };

    // Fungsi Validasi Voucher secara Real-Time
    const handleCheckVoucher = async () => {
        if (!data.voucher_code || !selectedService) return;

        try {
            const response = await axios.post("/api/voucher/validate", {
                code: data.voucher_code,
                price: parseFloat(selectedService.price),
            });

            if (response.data.valid) {
                setDiscountData({
                    amount: parseFloat(response.data.discount_amount),
                    isValid: true,
                    message: "Voucher berhasil diterapkan!",
                });
            } else {
                setDiscountData({
                    amount: 0,
                    isValid: false,
                    message: response.data.message,
                });
            }
        } catch (error) {
            setDiscountData({
                amount: 0,
                isValid: false,
                message:
                    error.response?.data?.message || "Voucher tidak valid.",
            });
        }
    };

    // Perhitungan Total Harga
    const basePrice = selectedService ? parseFloat(selectedService.price) : 0;
    const finalPrice = Math.max(0, basePrice - discountData.amount);

    const submit = (e) => {
        e.preventDefault();
        post(route("cashier.pos.store"), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setSelectedService(null);
                setDiscountData({ amount: 0, isValid: false, message: "" });

                // Set pesan sukses manual yang diminta
                setLocalSuccessMsg(
                    "Pesanan berhasil! Kendaraan telah masuk ke Area Tunggu / Antrean.",
                );
                setTimeout(() => setLocalSuccessMsg(""), 6000);
            },
        });
    };

    // Deteksi Karpet
    const isCarpet =
        selectedService?.category?.name === "Karpet" ||
        (selectedService?.name &&
            selectedService.name.toLowerCase().includes("karpet"));

    return (
        <MainLayout>
            <Head title="Point of Sales" />

            {/* Background Ornaments */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
                <div className="absolute left-[-10%] top-[10%] w-[500px] h-[500px] rounded-full bg-amber-400/10 blur-[120px]" />
                <div className="absolute right-[-10%] bottom-[10%] w-[600px] h-[600px] rounded-full bg-sky-300/10 blur-[120px]" />
            </div>

            {/* Alert Sukses Interaktif */}
            <AnimatePresence>
                {localSuccessMsg && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between shadow-sm"
                    >
                        <div className="flex items-center gap-3 text-emerald-600 font-bold">
                            <CheckCircle size={24} />
                            <span>{localSuccessMsg}</span>
                        </div>
                        <button
                            onClick={() => setLocalSuccessMsg("")}
                            className="text-emerald-500 hover:text-emerald-700 font-bold"
                        >
                            Tutup
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
            >
                <h1 className="text-3xl md:text-4xl font-display font-bold text-slate-800 mb-1">
                    Point of <span className="text-amber-500">Sales</span>
                </h1>
                <p className="text-slate-500 font-medium">
                    Buat transaksi pelanggan langsung di tempat (Walk-in).
                </p>
            </motion.div>

            <div className="flex flex-col lg:flex-row gap-6 h-auto lg:h-[calc(100vh-180px)]">
                {/* KIRI: Katalog Layanan */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="flex-1 flex flex-col bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden"
                >
                    {/* Tabs Kategori Custom */}
                    <div
                        className="flex overflow-x-auto gap-3 p-6 border-b border-slate-100"
                        style={{ scrollbarWidth: "none" }}
                    >
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveTab(cat.id)}
                                className={`px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 whitespace-nowrap ${
                                    activeTab === cat.id
                                        ? "bg-amber-400 text-slate-900 shadow-md shadow-amber-400/30 scale-105"
                                        : "bg-slate-50 text-slate-500 border border-slate-200 hover:bg-slate-100 hover:text-slate-800"
                                }`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>

                    {/* Grid Layanan */}
                    <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 content-start">
                        <AnimatePresence mode="popLayout">
                            {(
                                categories.find((c) => c.id === activeTab)
                                    ?.services || []
                            ).map((svc) => (
                                <motion.div
                                    key={svc.id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    onClick={() => handleSelectService(svc)}
                                    className={`relative p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 overflow-hidden flex flex-col justify-between min-h-[140px] ${
                                        selectedService?.id === svc.id
                                            ? "border-amber-400 bg-amber-50 shadow-lg shadow-amber-400/20"
                                            : "border-slate-100 bg-white hover:border-amber-200 hover:shadow-md"
                                    }`}
                                >
                                    <div className="flex justify-between items-start mb-4 relative z-10">
                                        <h4 className="font-bold text-lg text-slate-800 leading-tight pr-6">
                                            {svc.name}
                                        </h4>

                                        {/* Icon Centang Jika Dipilih */}
                                        <div
                                            className={`absolute top-0 right-0 transition-transform duration-300 ${selectedService?.id === svc.id ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}
                                        >
                                            <div className="bg-amber-400 text-white rounded-full p-0.5 shadow-sm">
                                                <CheckCircle
                                                    size={20}
                                                    className="fill-slate-900 text-amber-400"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="relative z-10 mt-auto pt-3 border-t border-slate-200/60 flex justify-between items-end">
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                                            Tarif
                                        </span>
                                        <span className="font-mono text-xl font-bold text-amber-600">
                                            Rp{" "}
                                            {new Intl.NumberFormat(
                                                "id-ID",
                                            ).format(svc.price)}
                                        </span>
                                    </div>

                                    {/* Background Glow jika dipilih */}
                                    {selectedService?.id === svc.id && (
                                        <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-amber-400/15 blur-xl rounded-full pointer-events-none" />
                                    )}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* KANAN: Form & Pembayaran */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="w-full lg:w-[420px] bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 flex flex-col overflow-hidden shrink-0"
                >
                    <div className="p-6 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
                        <div className="p-2.5 bg-amber-100 text-amber-600 rounded-xl shadow-sm">
                            <ShoppingCart size={22} />
                        </div>
                        <div>
                            <h2 className="font-bold text-xl text-slate-800">
                                Keranjang
                            </h2>
                            <p className="text-xs font-medium text-slate-500">
                                Detail & Checkout Transaksi
                            </p>
                        </div>
                    </div>

                    <form
                        onSubmit={submit}
                        className="flex-1 flex flex-col overflow-hidden"
                    >
                        <div className="p-6 space-y-6 flex-1 overflow-y-auto">
                            {/* Ringkasan Layanan yang Dipilih (Menampilkan Perhitungan Voucher) */}
                            {!selectedService ? (
                                <div className="h-32 flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50">
                                    <Car
                                        size={32}
                                        className="mb-2 opacity-50"
                                    />
                                    <span className="text-sm font-medium">
                                        Pilih layanan di samping
                                    </span>
                                </div>
                            ) : (
                                <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-lg relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 blur-2xl rounded-full pointer-events-none" />
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                        <CheckCircle
                                            size={14}
                                            className="text-amber-400"
                                        />{" "}
                                        Layanan Terpilih
                                    </p>
                                    <p className="font-bold text-lg text-white leading-snug">
                                        {selectedService.name}
                                    </p>

                                    <div className="mt-4 pt-4 border-t border-slate-700 flex flex-col gap-2">
                                        <div className="flex justify-between items-center text-sm text-slate-400 font-medium">
                                            <span>Harga Normal</span>
                                            <span>
                                                Rp{" "}
                                                {new Intl.NumberFormat(
                                                    "id-ID",
                                                ).format(basePrice)}
                                            </span>
                                        </div>

                                        {discountData.isValid && (
                                            <div className="flex justify-between items-center text-sm text-emerald-400 font-bold">
                                                <span>Diskon Promo</span>
                                                <span>
                                                    - Rp{" "}
                                                    {new Intl.NumberFormat(
                                                        "id-ID",
                                                    ).format(
                                                        discountData.amount,
                                                    )}
                                                </span>
                                            </div>
                                        )}

                                        <div className="flex justify-between items-center mt-2 pt-3 border-t border-slate-700/50">
                                            <span className="text-sm font-bold text-slate-300">
                                                Total Pembayaran
                                            </span>
                                            <p className="font-mono text-amber-400 font-bold text-2xl">
                                                Rp{" "}
                                                {new Intl.NumberFormat(
                                                    "id-ID",
                                                ).format(finalPrice)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Form Dinamis Karpet vs Kendaraan */}
                            <div className="space-y-5">
                                {isCarpet ? (
                                    <>
                                        <div className="p-3 bg-sky-50 border border-sky-100 rounded-xl flex items-start gap-3">
                                            <Info
                                                className="text-sky-500 shrink-0 mt-0.5"
                                                size={18}
                                            />
                                            <p className="text-xs text-sky-700 leading-relaxed font-medium">
                                                Untuk karpet, nama pemilik/label
                                                wajib diisi agar tidak tertukar.
                                            </p>
                                        </div>
                                        <div>
                                            <InputLabel
                                                value="Nama Label / Pemilik Karpet"
                                                className="text-slate-700 mb-1.5"
                                            />
                                            <TextInput
                                                className="w-full bg-slate-50 border-slate-200 focus:border-amber-400 focus:ring-amber-400/20 rounded-xl py-3 uppercase"
                                                placeholder="Cth: MASJID / PAK BUDI"
                                                value={data.vehicle_plate}
                                                onChange={(e) =>
                                                    setData(
                                                        "vehicle_plate",
                                                        e.target.value
                                                            .substring(0, 15)
                                                            .toUpperCase(),
                                                    )
                                                }
                                                required
                                            />
                                            <InputError
                                                message={errors.vehicle_plate}
                                                className="mt-1.5 text-red-500"
                                            />
                                        </div>
                                        <div>
                                            <InputLabel
                                                value="Warna / Ciri Khas (Opsional)"
                                                className="text-slate-700 mb-1.5"
                                            />
                                            <TextInput
                                                className="w-full bg-slate-50 border-slate-200 focus:border-amber-400 focus:ring-amber-400/20 rounded-xl py-3"
                                                placeholder="Cth: Merah Motif Bunga"
                                                value={data.vehicle_description}
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
                                            <InputLabel
                                                value="Nomor Plat Kendaraan"
                                                className="text-slate-700 mb-1.5"
                                            />
                                            <TextInput
                                                className="w-full bg-slate-50 border-slate-200 focus:border-amber-400 focus:ring-amber-400/20 rounded-xl py-3 uppercase font-bold"
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
                                            <InputError
                                                message={errors.vehicle_plate}
                                                className="mt-1.5 text-red-500"
                                            />
                                        </div>
                                        <div>
                                            <InputLabel
                                                value="Deskripsi Kendaraan (Opsional)"
                                                className="text-slate-700 mb-1.5"
                                            />
                                            <TextInput
                                                className="w-full bg-slate-50 border-slate-200 focus:border-amber-400 focus:ring-amber-400/20 rounded-xl py-3"
                                                placeholder="Cth: Avanza Hitam / Nmax Putih"
                                                value={data.vehicle_description}
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
                                    <InputLabel
                                        value="Kode Voucher (Opsional)"
                                        className="text-slate-700 mb-1.5"
                                    />
                                    <div className="flex gap-2">
                                        <div className="relative flex-1">
                                            <Ticket
                                                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                                                size={18}
                                            />
                                            <TextInput
                                                className="w-full pl-10 bg-slate-50 border-slate-200 focus:border-amber-400 focus:ring-amber-400/20 rounded-xl py-3 uppercase font-mono tracking-wider"
                                                placeholder="KODE PROMO"
                                                value={data.voucher_code}
                                                onChange={(e) => {
                                                    setData(
                                                        "voucher_code",
                                                        e.target.value.toUpperCase(),
                                                    );
                                                    // Reset info diskon jika kode dirubah
                                                    setDiscountData({
                                                        amount: 0,
                                                        isValid: false,
                                                        message: "",
                                                    });
                                                }}
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={handleCheckVoucher}
                                            disabled={
                                                !data.voucher_code ||
                                                !selectedService
                                            }
                                            className="px-5 py-3 bg-slate-800 text-amber-400 font-bold rounded-xl hover:bg-slate-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Terapkan
                                        </button>
                                    </div>
                                    {/* Pesan status validasi voucher */}
                                    {discountData.message && (
                                        <p
                                            className={`mt-2 text-sm font-bold ${discountData.isValid ? "text-emerald-500" : "text-red-500"}`}
                                        >
                                            {discountData.message}
                                        </p>
                                    )}
                                    <InputError
                                        message={errors.voucher_code}
                                        className="mt-1.5 text-red-500"
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        value="Metode Pembayaran"
                                        className="text-slate-700 mb-1.5"
                                    />
                                    <div className="relative">
                                        <Wallet
                                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                                            size={18}
                                        />
                                        <select
                                            className="w-full pl-10 bg-slate-50 border-slate-200 text-slate-800 rounded-xl focus:ring-4 focus:ring-amber-400/20 focus:border-amber-400 transition-all font-bold cursor-pointer py-3"
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
                                </div>
                            </div>
                        </div>

                        {/* Tombol Submit Melayang (Sticky Bottom) */}
                        <div className="p-6 border-t border-slate-100 bg-white">
                            {errors.system && (
                                <p className="text-red-500 text-sm font-bold text-center mb-3 bg-red-50 py-2 rounded-lg border border-red-100">
                                    {errors.system}
                                </p>
                            )}
                            <PrimaryButton
                                disabled={processing || !selectedService}
                                className="w-full justify-center py-4 text-lg shadow-lg shadow-amber-500/20 hover:-translate-y-0.5 transition-transform"
                            >
                                <span className="flex flex-row items-center justify-center gap-2 whitespace-nowrap">
                                    <CheckCircle size={22} /> Proses Pembayaran
                                </span>
                            </PrimaryButton>
                        </div>
                    </form>
                </motion.div>
            </div>
        </MainLayout>
    );
}
