import { useState, useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Check,
    ChevronRight,
    ChevronLeft,
    UploadCloud,
    Info,
    CheckCircle,
    Car,
} from "lucide-react";
import axios from "axios";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";

export default function CreateReservation({ services = [] }) {
    const { flash } = usePage().props;
    const [step, setStep] = useState(1);
    const [availableSlots, setAvailableSlots] = useState([]);
    const [isLoadingSlots, setIsLoadingSlots] = useState(false);

    const [discountData, setDiscountData] = useState({
        amount: 0,
        isValid: false,
        message: "",
    });

    const { data, setData, post, processing, errors } = useForm({
        service_id: "",
        vehicle_plate: "",
        vehicle_description: "",
        reservation_date: new Date().toISOString().split("T")[0],
        reservation_time: "",
        payment_method: "transfer",
        voucher_code: "",
        payment_proof: null,
    });

    const selectedService = services.find((s) => s.id == data.service_id);
    const selectedServicePrice = selectedService
        ? parseFloat(selectedService.price)
        : 0;
    const finalPrice = selectedServicePrice - discountData.amount;

    const isCarpet = selectedService
        ? (selectedService.name &&
              selectedService.name.toLowerCase().includes("karpet")) ||
          (selectedService.category?.name &&
              selectedService.category.name.toLowerCase().includes("karpet"))
        : false;

    const groupedServices = services.reduce((acc, curr) => {
        const categoryName = curr.category?.name || "Lainnya";
        if (!acc[categoryName]) {
            acc[categoryName] = [];
        }
        acc[categoryName].push(curr);
        return acc;
    }, {});

    const categoryNames = Object.keys(groupedServices);
    const [activeCategory, setActiveCategory] = useState(
        categoryNames[0] || "",
    );

    useEffect(() => {
        if (!activeCategory && categoryNames.length > 0) {
            setActiveCategory(categoryNames[0]);
        }
    }, [categoryNames]);

    useEffect(() => {
        if (step === 3 && data.reservation_date) {
            setIsLoadingSlots(true);
            axios
                .get(`/api/availability?date=${data.reservation_date}`)
                .then((res) => setAvailableSlots(res.data))
                .catch((err) => console.error(err))
                .finally(() => setIsLoadingSlots(false));
        }
    }, [step, data.reservation_date]);

    const handleCheckVoucher = async () => {
        if (!data.voucher_code) return;

        try {
            const response = await axios.post("/api/voucher/validate", {
                code: data.voucher_code,
                price: selectedServicePrice,
            });

            if (response.data.valid) {
                setDiscountData({
                    amount: parseFloat(response.data.discount_amount),
                    isValid: true,
                    message: "Voucher berhasil digunakan!",
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

    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);

    const submit = (e) => {
        e.preventDefault();
        if (step !== 4) return;
        post(route("customer.reservations.store"));
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && step !== 4) {
            e.preventDefault();
        }
    };

    const handleFileChange = (e) => {
        setData("payment_proof", e.target.files[0]);
    };

    const isSubmitDisabled = processing || !data.payment_proof;

    const getCategoryIcon = (name) => {
        const lower = name.toLowerCase();
        if (lower.includes("mobil") || lower.includes("motor"))
            return <Car size={18} />;
        return <CheckCircle size={18} />;
    };

    return (
        <GuestLayout>
            <Head title="Buat Reservasi" />

            {/* Background Ornaments Luar */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
                <div className="absolute left-[-10%] top-[10%] w-[500px] h-[500px] rounded-full bg-amber-400/10 blur-[120px]" />
                <div className="absolute right-[-10%] bottom-[10%] w-[600px] h-[600px] rounded-full bg-yellow-300/15 blur-[120px]" />
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 min-h-screen">
                {/* PROGRESS BAR */}
                <div className="mb-12 relative z-10">
                    <div className="flex justify-between relative px-2">
                        <div className="absolute top-1/2 left-0 w-full h-1.5 bg-slate-200 -z-10 -translate-y-1/2 rounded-full"></div>
                        <div
                            className="absolute top-1/2 left-0 h-1.5 bg-amber-400 -z-10 -translate-y-1/2 transition-all duration-700 ease-out rounded-full"
                            style={{ width: `${((step - 1) / 3) * 100}%` }}
                        ></div>

                        {[1, 2, 3, 4].map((i) => (
                            <div
                                key={i}
                                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-500 shadow-sm ${
                                    step >= i
                                        ? "bg-amber-400 text-slate-900 scale-110 shadow-amber-400/40"
                                        : "bg-white text-slate-400 border-2 border-slate-200"
                                }`}
                            >
                                {step > i ? (
                                    <Check strokeWidth={3} size={20} />
                                ) : (
                                    i
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* MAIN FORM CARD */}
                <div className="bg-white/90 p-6 md:p-10 rounded-[2.5rem] border border-white backdrop-blur-xl shadow-2xl shadow-slate-200/50 relative overflow-hidden z-10">
                    {/* ORNAMEN BACKGROUND DALAM KARTU (Navy & Amber Water Blobs) */}
                    <div className="absolute top-[-10%] right-[-10%] w-72 h-72 bg-amber-300/20 rounded-full blur-[80px] -z-10 pointer-events-none" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-80 h-80 bg-slate-800/5 rounded-full blur-[80px] -z-10 pointer-events-none" />
                    <div className="absolute top-[40%] left-[30%] w-64 h-64 bg-blue-900/5 rounded-full blur-[60px] -z-10 pointer-events-none" />

                    <form
                        onSubmit={submit}
                        onKeyDown={handleKeyDown}
                        className="relative z-10"
                    >
                        <AnimatePresence mode="wait">
                            {/* STEP 1: PILIH LAYANAN */}
                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <h2 className="text-3xl font-display font-bold mb-2 text-slate-800">
                                        Pilih Layanan
                                    </h2>
                                    <p className="text-slate-500 mb-8 text-sm md:text-base">
                                        Pilih kategori, lalu tentukan paket cuci
                                        yang Anda inginkan.
                                    </p>

                                    <div className="flex flex-wrap gap-3 mb-6 pb-4 border-b border-slate-100">
                                        {categoryNames.map((catName) => (
                                            <button
                                                key={catName}
                                                type="button"
                                                onClick={() =>
                                                    setActiveCategory(catName)
                                                }
                                                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${
                                                    activeCategory === catName
                                                        ? "bg-amber-400 text-slate-900 shadow-md shadow-amber-400/30 scale-105"
                                                        : "bg-slate-50/80 text-slate-500 border border-slate-200 hover:bg-slate-100 hover:text-slate-700"
                                                }`}
                                            >
                                                {getCategoryIcon(catName)}
                                                {catName}
                                            </button>
                                        ))}
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <AnimatePresence mode="popLayout">
                                            {groupedServices[
                                                activeCategory
                                            ]?.map((svc) => (
                                                <motion.div
                                                    key={svc.id}
                                                    initial={{
                                                        opacity: 0,
                                                        scale: 0.95,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        scale: 1,
                                                    }}
                                                    exit={{
                                                        opacity: 0,
                                                        scale: 0.95,
                                                    }}
                                                    transition={{
                                                        duration: 0.2,
                                                    }}
                                                    onClick={() =>
                                                        setData(
                                                            "service_id",
                                                            svc.id,
                                                        )
                                                    }
                                                    className={`relative p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 overflow-hidden flex flex-col gap-3 ${
                                                        data.service_id ===
                                                        svc.id
                                                            ? "border-amber-400 bg-amber-50 shadow-md shadow-amber-400/20"
                                                            : "border-slate-100 bg-white/80 hover:border-amber-200 hover:shadow-sm"
                                                    }`}
                                                >
                                                    <div className="flex justify-between items-start relative z-10">
                                                        <h4 className="font-bold text-lg text-slate-800 pr-8 leading-tight">
                                                            {svc.name}
                                                        </h4>
                                                        <div
                                                            className={`absolute top-0 right-0 transition-transform duration-300 ${data.service_id === svc.id ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}
                                                        >
                                                            <div className="bg-amber-400 text-white rounded-full p-0.5 shadow-sm">
                                                                <CheckCircle
                                                                    size={20}
                                                                    className="fill-slate-900 text-amber-400"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="relative z-10 mt-2 pt-3 border-t border-slate-200/60 flex justify-between items-end">
                                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                                                            Harga
                                                        </span>
                                                        <span className="font-mono text-xl font-bold text-amber-600">
                                                            Rp{" "}
                                                            {parseFloat(
                                                                svc.price,
                                                            ).toLocaleString(
                                                                "id-ID",
                                                            )}
                                                        </span>
                                                    </div>
                                                    {data.service_id ===
                                                        svc.id && (
                                                        <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-amber-400/15 blur-xl rounded-full pointer-events-none" />
                                                    )}
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                    </div>

                                    <div className="mt-10 flex justify-end pt-6 border-t border-slate-100">
                                        <PrimaryButton
                                            type="button"
                                            onClick={nextStep}
                                            disabled={!data.service_id}
                                            className="w-full sm:w-auto px-8 py-3.5"
                                        >
                                            {/* Bungkusan khusus agar icon sejajar teks */}
                                            <span className="flex flex-row items-center justify-center gap-2 whitespace-nowrap">
                                                Lanjut{" "}
                                                <ChevronRight size={18} />
                                            </span>
                                        </PrimaryButton>
                                    </div>
                                </motion.div>
                            )}

                            {/* STEP 2: DETAIL IDENTITAS */}
                            {step === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <h2 className="text-3xl font-display font-bold mb-6 text-slate-800">
                                        {isCarpet
                                            ? "Identitas Karpet"
                                            : "Detail Kendaraan"}
                                    </h2>
                                    <div className="space-y-6">
                                        {isCarpet ? (
                                            <>
                                                <div className="p-5 bg-blue-900/5 border border-blue-900/10 rounded-2xl flex items-start gap-4 mb-4 shadow-sm backdrop-blur-sm">
                                                    <Info
                                                        className="text-slate-700 shrink-0 mt-0.5"
                                                        size={24}
                                                    />
                                                    <div>
                                                        <p className="font-bold text-slate-800 mb-1.5 text-base md:text-lg">
                                                            Informasi
                                                            Pengeringan Karpet
                                                        </p>
                                                        <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                                                            Jadwal reservasi
                                                            yang Anda pilih
                                                            nantinya adalah
                                                            untuk{" "}
                                                            <strong>
                                                                proses pencucian
                                                                awal
                                                            </strong>
                                                            . Proses pengeringan
                                                            sangat bergantung
                                                            pada cuaca dan
                                                            umumnya memakan
                                                            waktu tambahan{" "}
                                                            <strong>
                                                                1 hingga 3 hari
                                                                kerja
                                                            </strong>{" "}
                                                            sebelum karpet siap
                                                            diambil/dikirim.
                                                        </p>
                                                    </div>
                                                </div>
                                                <div>
                                                    <InputLabel
                                                        value="Nama Label / Pemilik Karpet (Opsional)"
                                                        className="text-slate-600 mb-2"
                                                    />
                                                    <TextInput
                                                        className="w-full uppercase bg-white/60 border-slate-200 focus:border-amber-400 focus:ring-amber-400/20 rounded-xl py-3"
                                                        placeholder="Cth: MASJID AL-IKHLAS / PAK BUDI"
                                                        value={
                                                            data.vehicle_plate
                                                        }
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
                                                    <p className="text-xs text-slate-400 mt-2 font-medium">
                                                        * Kosongkan jika tidak
                                                        ada, sistem akan membuat
                                                        ID otomatis.
                                                    </p>
                                                </div>
                                                <div>
                                                    <InputLabel
                                                        value="Warna / Ciri Khas Karpet (Opsional)"
                                                        className="text-slate-600 mb-2"
                                                    />
                                                    <TextInput
                                                        className="w-full bg-white/60 border-slate-200 focus:border-amber-400 focus:ring-amber-400/20 rounded-xl py-3"
                                                        placeholder="Cth: Warna Merah Motif Bunga"
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
                                                    <InputLabel
                                                        value="Nomor Plat Kendaraan"
                                                        className="text-slate-600 mb-2"
                                                    />
                                                    <TextInput
                                                        className="w-full uppercase bg-white/60 border-slate-200 focus:border-amber-400 focus:ring-amber-400/20 rounded-xl py-3"
                                                        placeholder="BM 1234 ABC"
                                                        value={
                                                            data.vehicle_plate
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "vehicle_plate",
                                                                e.target.value.toUpperCase(),
                                                            )
                                                        }
                                                    />
                                                    {errors.vehicle_plate && (
                                                        <p className="text-red-500 text-sm mt-1">
                                                            {
                                                                errors.vehicle_plate
                                                            }
                                                        </p>
                                                    )}
                                                </div>
                                                <div>
                                                    <InputLabel
                                                        value="Deskripsi Kendaraan (Opsional)"
                                                        className="text-slate-600 mb-2"
                                                    />
                                                    <TextInput
                                                        className="w-full bg-white/60 border-slate-200 focus:border-amber-400 focus:ring-amber-400/20 rounded-xl py-3"
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
                                    </div>
                                    <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-100">
                                        {/* Perbaikan tombol kembali agar lebih rapi berbentuk outline */}
                                        <button
                                            type="button"
                                            onClick={prevStep}
                                            className="w-full sm:w-auto flex justify-center items-center gap-2 px-6 py-3.5 rounded-xl border-2 border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-amber-500 hover:border-amber-300 font-bold transition-all"
                                        >
                                            <ChevronLeft size={18} /> Kembali
                                        </button>
                                        <PrimaryButton
                                            type="button"
                                            onClick={nextStep}
                                            disabled={
                                                !isCarpet && !data.vehicle_plate
                                            }
                                            className="w-full sm:w-auto px-8 py-3.5"
                                        >
                                            <span className="flex flex-row items-center justify-center gap-2 whitespace-nowrap">
                                                Lanjut{" "}
                                                <ChevronRight size={18} />
                                            </span>
                                        </PrimaryButton>
                                    </div>
                                </motion.div>
                            )}

                            {/* STEP 3: TENTUKAN JADWAL */}
                            {step === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <h2 className="text-3xl font-display font-bold mb-6 text-slate-800">
                                        Tentukan Jadwal
                                    </h2>
                                    <div className="mb-8">
                                        <InputLabel
                                            value="Tanggal Reservasi"
                                            className="text-slate-600 mb-2"
                                        />
                                        <TextInput
                                            type="date"
                                            className="w-full sm:w-1/2 bg-white/60 border-slate-200 focus:border-amber-400 focus:ring-amber-400/20 rounded-xl py-3"
                                            min={
                                                new Date()
                                                    .toISOString()
                                                    .split("T")[0]
                                            }
                                            value={data.reservation_date}
                                            onChange={(e) =>
                                                setData(
                                                    "reservation_date",
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        {errors.reservation_date && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.reservation_date}
                                            </p>
                                        )}
                                    </div>

                                    <div className="mb-4">
                                        <InputLabel
                                            value="Pilih Jam Tersedia"
                                            className="text-slate-600 mb-3"
                                        />
                                        {isLoadingSlots ? (
                                            <div className="py-12 text-center text-amber-500 animate-pulse font-medium">
                                                Memeriksa ketersediaan slot...
                                            </div>
                                        ) : (
                                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                                                {availableSlots.map((slot) => (
                                                    <button
                                                        key={slot.time}
                                                        type="button"
                                                        disabled={
                                                            !slot.is_available
                                                        }
                                                        onClick={() =>
                                                            setData(
                                                                "reservation_time",
                                                                slot.time,
                                                            )
                                                        }
                                                        className={`py-3.5 rounded-xl border-2 font-mono text-sm md:text-base transition-all duration-300 ${
                                                            !slot.is_available
                                                                ? "bg-slate-100/50 border-slate-200 text-slate-400 cursor-not-allowed opacity-60"
                                                                : data.reservation_time ===
                                                                    slot.time
                                                                  ? "bg-amber-400 text-slate-900 font-bold border-amber-400 scale-[1.03] shadow-md shadow-amber-400/30"
                                                                  : "bg-white/80 border-slate-200 text-slate-600 hover:border-amber-300 hover:shadow-sm"
                                                        }`}
                                                    >
                                                        {slot.time}
                                                    </button>
                                                ))}
                                                {availableSlots.length ===
                                                    0 && (
                                                    <div className="col-span-full py-8 text-center text-slate-500 bg-white/60 rounded-2xl border border-dashed border-slate-200">
                                                        Maaf, tidak ada jadwal
                                                        tersedia pada tanggal
                                                        ini.
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    {errors.reservation_time && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.reservation_time}
                                        </p>
                                    )}

                                    <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-100">
                                        <button
                                            type="button"
                                            onClick={prevStep}
                                            className="w-full sm:w-auto flex justify-center items-center gap-2 px-6 py-3.5 rounded-xl border-2 border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-amber-500 hover:border-amber-300 font-bold transition-all"
                                        >
                                            <ChevronLeft size={18} /> Kembali
                                        </button>
                                        <PrimaryButton
                                            type="button"
                                            onClick={nextStep}
                                            disabled={!data.reservation_time}
                                            className="w-full sm:w-auto px-8 py-3.5"
                                        >
                                            <span className="flex flex-row items-center justify-center gap-2 whitespace-nowrap">
                                                Lanjut{" "}
                                                <ChevronRight size={18} />
                                            </span>
                                        </PrimaryButton>
                                    </div>
                                </motion.div>
                            )}

                            {/* STEP 4: KONFIRMASI & PEMBAYARAN */}
                            {step === 4 && (
                                <motion.div
                                    key="step4"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <h2 className="text-3xl font-display font-bold mb-6 text-slate-800">
                                        Konfirmasi & Pembayaran
                                    </h2>

                                    {errors.system && (
                                        <div className="mb-6 p-5 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-sm font-medium shadow-sm">
                                            ⚠️ Pesan Sistem: {errors.system}
                                        </div>
                                    )}

                                    {Object.keys(errors).length > 0 &&
                                        !errors.system && (
                                            <div className="mb-6 p-5 bg-amber-50 border border-amber-200 rounded-2xl text-amber-700 text-sm font-medium shadow-sm">
                                                ⚠️ Ada data yang tidak valid.
                                                Silakan cek kembali inputan Anda
                                                pada langkah sebelumnya.
                                            </div>
                                        )}

                                    <div className="mb-6 p-5 border border-slate-100 rounded-2xl bg-white/60 backdrop-blur-sm shadow-sm">
                                        <label className="block text-sm font-bold text-slate-700 mb-2">
                                            Punya Kode Voucher? (Opsional)
                                        </label>
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={data.voucher_code}
                                                onChange={(e) =>
                                                    setData(
                                                        "voucher_code",
                                                        e.target.value.toUpperCase(),
                                                    )
                                                }
                                                placeholder="Masukkan kode voucher..."
                                                className="flex-1 rounded-xl bg-white border-slate-200 text-slate-800 focus:border-amber-400 focus:ring-amber-400/20 py-3 px-4 uppercase font-mono tracking-wider"
                                            />
                                            <button
                                                type="button"
                                                onClick={handleCheckVoucher}
                                                className="px-5 py-3 bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-700 transition-colors shadow-sm"
                                            >
                                                Terapkan
                                            </button>
                                        </div>
                                        {discountData.message && (
                                            <p
                                                className={`mt-2 text-sm font-bold ${discountData.isValid ? "text-emerald-500" : "text-red-500"}`}
                                            >
                                                {discountData.message}
                                            </p>
                                        )}
                                    </div>

                                    <div className="mb-8 p-6 bg-white/80 backdrop-blur-sm rounded-[2rem] border border-slate-200 shadow-sm">
                                        <div className="flex justify-between text-slate-500 mb-2 font-medium text-sm md:text-base">
                                            <span>
                                                Layanan: {selectedService?.name}
                                            </span>
                                            <span className="text-slate-800 font-bold">
                                                Rp{" "}
                                                {selectedServicePrice.toLocaleString(
                                                    "id-ID",
                                                )}
                                            </span>
                                        </div>
                                        {discountData.isValid && (
                                            <div className="flex justify-between text-emerald-500 mb-2 font-bold text-sm md:text-base">
                                                <span>Diskon Voucher</span>
                                                <span>
                                                    - Rp{" "}
                                                    {discountData.amount.toLocaleString(
                                                        "id-ID",
                                                    )}
                                                </span>
                                            </div>
                                        )}
                                        <div className="flex justify-between text-slate-800 font-bold text-xl md:text-2xl mt-3 pt-3 border-t border-slate-200">
                                            <span>Total Pembayaran</span>
                                            <span className="text-amber-600">
                                                Rp{" "}
                                                {finalPrice > 0
                                                    ? finalPrice.toLocaleString(
                                                          "id-ID",
                                                      )
                                                    : 0}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mb-8">
                                        <label className="block text-sm font-bold text-slate-700 mb-3">
                                            Metode Pembayaran
                                        </label>
                                        <select
                                            value={data.payment_method}
                                            onChange={(e) =>
                                                setData(
                                                    "payment_method",
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full rounded-xl bg-white border-slate-200 text-slate-800 focus:border-amber-400 focus:ring-amber-400/20 py-3.5 px-5 font-medium shadow-sm"
                                        >
                                            <option value="transfer">
                                                Transfer Bank
                                            </option>
                                            <option value="qris">QRIS</option>
                                        </select>
                                    </div>

                                    <div className="mb-8">
                                        <div className="bg-amber-50 p-6 rounded-[2rem] border border-amber-100 mb-6 shadow-sm">
                                            <h3 className="text-amber-700 font-bold mb-3 flex items-center gap-2 text-sm md:text-base">
                                                <Info size={18} /> Instruksi
                                                Pembayaran
                                            </h3>
                                            {data.payment_method ===
                                            "transfer" ? (
                                                <>
                                                    <p className="text-sm text-amber-900/80 mb-2 leading-relaxed">
                                                        Transfer tepat sesuai
                                                        nominal{" "}
                                                        <strong className="text-amber-700">
                                                            Rp{" "}
                                                            {finalPrice.toLocaleString(
                                                                "id-ID",
                                                            )}
                                                        </strong>{" "}
                                                        ke rekening di bawah
                                                        ini:
                                                    </p>
                                                    <div className="bg-white p-3 rounded-xl border border-amber-200 inline-block shadow-sm">
                                                        <p className="text-lg font-mono font-bold text-slate-800">
                                                            BCA 1234567890{" "}
                                                            <br />
                                                            <span className="text-xs text-slate-500 font-sans">
                                                                a.n APA Car Wash
                                                            </span>
                                                        </p>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="flex flex-col items-start">
                                                    <p className="text-sm text-amber-900/80 mb-4 leading-relaxed">
                                                        Silakan scan barcode
                                                        QRIS di bawah ini
                                                        menggunakan aplikasi
                                                        M-Banking atau E-Wallet
                                                        Anda.
                                                    </p>
                                                    <div className="bg-white p-3 rounded-2xl shadow-sm border border-amber-200">
                                                        <img
                                                            src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=Pembayaran+CarWash"
                                                            alt="QRIS Barcode"
                                                            className="w-40 h-40 object-contain rounded-xl"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <InputLabel
                                            value="Upload Bukti Pembayaran (Wajib)"
                                            className="text-slate-700 font-bold mb-2"
                                        />
                                        <label className="mt-2 flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-slate-300 hover:border-amber-400 hover:bg-amber-50/50 rounded-[2rem] cursor-pointer bg-white/60 transition-all duration-300 group">
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <UploadCloud
                                                    className="text-slate-400 group-hover:text-amber-500 mb-3 transition-colors duration-300"
                                                    size={36}
                                                    strokeWidth={1.5}
                                                />
                                                <p className="text-sm font-medium text-slate-500 group-hover:text-amber-600 transition-colors text-center px-4">
                                                    {data.payment_proof ? (
                                                        <span className="text-amber-600 font-bold flex items-center justify-center gap-1.5">
                                                            <CheckCircle
                                                                size={16}
                                                            />{" "}
                                                            {
                                                                data
                                                                    .payment_proof
                                                                    .name
                                                            }
                                                        </span>
                                                    ) : (
                                                        "Klik untuk upload gambar bukti (Max 2MB)"
                                                    )}
                                                </p>
                                            </div>
                                            <input
                                                type="file"
                                                className="hidden"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                            />
                                        </label>
                                        {errors.payment_proof && (
                                            <p className="text-red-500 text-sm mt-2 font-medium">
                                                {errors.payment_proof}
                                            </p>
                                        )}
                                    </div>

                                    <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-100">
                                        <button
                                            type="button"
                                            onClick={prevStep}
                                            className="w-full sm:w-auto flex justify-center items-center gap-2 px-6 py-3.5 rounded-xl border-2 border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-amber-500 hover:border-amber-300 font-bold transition-all order-2 sm:order-1"
                                        >
                                            <ChevronLeft size={18} /> Kembali
                                        </button>
                                        <div className="w-full sm:w-auto flex flex-col items-center sm:items-end order-1 sm:order-2">
                                            {isSubmitDisabled && (
                                                <span className="text-xs font-bold text-amber-500 mb-1.5 text-center sm:text-right">
                                                    * Upload bukti pembayaran
                                                    terlebih dahulu
                                                </span>
                                            )}
                                            <PrimaryButton
                                                type="submit"
                                                className="w-full sm:w-auto justify-center px-10 py-3.5"
                                                disabled={isSubmitDisabled}
                                            >
                                                <span className="flex flex-row items-center justify-center gap-2 whitespace-nowrap">
                                                    Konfirmasi Pesanan
                                                </span>
                                            </PrimaryButton>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}
