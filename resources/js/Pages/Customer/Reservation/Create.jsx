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
} from "lucide-react";
import axios from "axios";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import ServiceCard from "@/Components/Shared/ServiceCard";

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
        payment_method: "transfer", // Default ke transfer
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

    // PERBAIKAN: Tombol selalu didisable jika tidak ada bukti bayar
    const isSubmitDisabled = processing || !data.payment_proof;

    return (
        <GuestLayout>
            <Head title="Buat Reservasi" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
                <div className="mb-12">
                    <div className="flex justify-between relative">
                        <div className="absolute top-1/2 left-0 w-full h-1 bg-secondary-800 -z-10 -translate-y-1/2"></div>
                        <div
                            className="absolute top-1/2 left-0 h-1 bg-primary-300 -z-10 -translate-y-1/2 transition-all duration-500"
                            style={{ width: `${((step - 1) / 3) * 100}%` }}
                        ></div>

                        {[1, 2, 3, 4].map((i) => (
                            <div
                                key={i}
                                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= i ? "bg-primary-300 text-secondary-900" : "bg-secondary-800 text-neutral-400 border border-tertiary-700"}`}
                            >
                                {step > i ? <Check size={18} /> : i}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-secondary-800/30 p-6 md:p-10 rounded-3xl border border-tertiary-800/50 backdrop-blur-sm shadow-xl">
                    <form onSubmit={submit} onKeyDown={handleKeyDown}>
                        <AnimatePresence mode="wait">
                            {/* STEP 1 */}
                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                >
                                    <h2 className="text-2xl font-display font-bold mb-6 text-neutral-50">
                                        Pilih Layanan
                                    </h2>
                                    <div className="space-y-8">
                                        {Object.entries(groupedServices).map(
                                            ([
                                                categoryName,
                                                categoryServices,
                                            ]) => (
                                                <div key={categoryName}>
                                                    <h3 className="text-lg font-bold text-primary-300 mb-4 border-b border-tertiary-800/50 pb-2">
                                                        {categoryName}
                                                    </h3>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                        {categoryServices.map(
                                                            (svc) => (
                                                                <ServiceCard
                                                                    key={svc.id}
                                                                    service={
                                                                        svc
                                                                    }
                                                                    isSelected={
                                                                        data.service_id ===
                                                                        svc.id
                                                                    }
                                                                    onClick={() =>
                                                                        setData(
                                                                            "service_id",
                                                                            svc.id,
                                                                        )
                                                                    }
                                                                />
                                                            ),
                                                        )}
                                                    </div>
                                                </div>
                                            ),
                                        )}
                                    </div>
                                    <div className="mt-10 flex justify-end pt-6 border-t border-tertiary-800/50">
                                        <PrimaryButton
                                            type="button"
                                            onClick={nextStep}
                                            disabled={!data.service_id}
                                        >
                                            Lanjut{" "}
                                            <ChevronRight
                                                size={18}
                                                className="ml-1"
                                            />
                                        </PrimaryButton>
                                    </div>
                                </motion.div>
                            )}

                            {/* STEP 2 */}
                            {step === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                >
                                    <h2 className="text-2xl font-display font-bold mb-6 text-neutral-50">
                                        {isCarpet
                                            ? "Identitas Karpet"
                                            : "Detail Kendaraan"}
                                    </h2>
                                    <div className="space-y-6">
                                        {isCarpet ? (
                                            <>
                                                <div className="p-4 bg-sky-500/10 border border-sky-500/30 rounded-xl flex items-start gap-3 mb-2">
                                                    <Info
                                                        className="text-sky-400 shrink-0 mt-0.5"
                                                        size={20}
                                                    />
                                                    <div>
                                                        <p className="text-sm font-bold text-sky-400 mb-1">
                                                            Informasi
                                                            Pengeringan Karpet
                                                        </p>
                                                        <p className="text-xs text-sky-300/80 leading-relaxed">
                                                            Jadwal reservasi
                                                            yang Anda pilih
                                                            nantinya adalah
                                                            untuk{" "}
                                                            <strong>
                                                                proses pencucian
                                                                awal
                                                            </strong>
                                                            . Proses pengeringan
                                                            karpet sangat
                                                            bergantung pada
                                                            cuaca dan umumnya
                                                            memakan waktu
                                                            tambahan{" "}
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
                                                    <InputLabel value="Nama Label / Pemilik Karpet (Opsional)" />
                                                    <TextInput
                                                        className="w-full uppercase"
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
                                                    <p className="text-xs text-neutral-500 mt-2">
                                                        Kosongkan jika tidak
                                                        ada, sistem akan membuat
                                                        ID otomatis.
                                                    </p>
                                                </div>
                                                <div>
                                                    <InputLabel value="Warna / Ciri Khas Karpet (Opsional)" />
                                                    <TextInput
                                                        className="w-full"
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
                                                    <InputLabel value="Nomor Plat Kendaraan" />
                                                    <TextInput
                                                        className="w-full uppercase"
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
                                                        <p className="text-red-400 text-xs mt-1">
                                                            {
                                                                errors.vehicle_plate
                                                            }
                                                        </p>
                                                    )}
                                                </div>
                                                <div>
                                                    <InputLabel value="Deskripsi Kendaraan (Opsional)" />
                                                    <TextInput
                                                        className="w-full"
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
                                    <div className="mt-8 flex justify-between">
                                        <button
                                            type="button"
                                            onClick={prevStep}
                                            className="flex items-center text-neutral-400 hover:text-primary-300"
                                        >
                                            <ChevronLeft size={18} /> Kembali
                                        </button>
                                        <PrimaryButton
                                            type="button"
                                            onClick={nextStep}
                                            disabled={
                                                !isCarpet && !data.vehicle_plate
                                            }
                                        >
                                            Lanjut{" "}
                                            <ChevronRight
                                                size={18}
                                                className="ml-1"
                                            />
                                        </PrimaryButton>
                                    </div>
                                </motion.div>
                            )}

                            {/* STEP 3 */}
                            {step === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                >
                                    <h2 className="text-2xl font-display font-bold mb-6 text-neutral-50">
                                        Tentukan Jadwal
                                    </h2>
                                    <div className="mb-6">
                                        <InputLabel value="Tanggal Reservasi" />
                                        <TextInput
                                            type="date"
                                            className="w-full sm:w-1/2"
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
                                            <p className="text-red-400 text-xs mt-1">
                                                {errors.reservation_date}
                                            </p>
                                        )}
                                    </div>

                                    {isLoadingSlots ? (
                                        <div className="py-10 text-center text-primary-300 animate-pulse">
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
                                                    className={`py-3 rounded-xl border font-mono transition-all ${
                                                        !slot.is_available
                                                            ? "bg-secondary-900 border-tertiary-800 text-tertiary-700 cursor-not-allowed"
                                                            : data.reservation_time ===
                                                                slot.time
                                                              ? "bg-primary-300 text-secondary-950 font-bold border-primary-300 scale-105 shadow-lg"
                                                              : "bg-secondary-800 border-tertiary-700 text-neutral-300 hover:border-primary-300/50"
                                                    }`}
                                                >
                                                    {slot.time}
                                                </button>
                                            ))}
                                            {availableSlots.length === 0 && (
                                                <div className="col-span-full py-6 text-center text-red-400 text-sm">
                                                    Maaf, tidak ada jadwal
                                                    tersedia pada tanggal ini.
                                                </div>
                                            )}
                                        </div>
                                    )}
                                    {errors.reservation_time && (
                                        <p className="text-red-400 text-xs mt-1">
                                            {errors.reservation_time}
                                        </p>
                                    )}

                                    <div className="mt-8 flex justify-between">
                                        <button
                                            type="button"
                                            onClick={prevStep}
                                            className="flex items-center text-neutral-400 hover:text-primary-300"
                                        >
                                            <ChevronLeft size={18} /> Kembali
                                        </button>
                                        <PrimaryButton
                                            type="button"
                                            onClick={nextStep}
                                            disabled={!data.reservation_time}
                                        >
                                            Lanjut{" "}
                                            <ChevronRight
                                                size={18}
                                                className="ml-1"
                                            />
                                        </PrimaryButton>
                                    </div>
                                </motion.div>
                            )}

                            {/* STEP 4 */}
                            {step === 4 && (
                                <motion.div
                                    key="step4"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                >
                                    <h2 className="text-2xl font-display font-bold mb-6 text-neutral-50">
                                        Konfirmasi & Pembayaran
                                    </h2>

                                    {errors.system && (
                                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400 text-sm font-medium">
                                            ⚠️ Pesan Sistem: {errors.system}
                                        </div>
                                    )}
                                    {Object.keys(errors).length > 0 &&
                                        !errors.system && (
                                            <div className="mb-6 p-4 bg-amber-500/10 border border-amber-500/50 rounded-xl text-amber-400 text-sm font-medium">
                                                Ada data yang tidak valid
                                                (Contoh: Format gambar ditolak).
                                                Silakan cek kembali inputan
                                                Anda.
                                            </div>
                                        )}

                                    <div className="mb-6 p-5 border border-tertiary-800/80 rounded-2xl bg-secondary-900/50">
                                        <label className="block text-sm font-medium text-neutral-300 mb-2">
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
                                                className="flex-1 rounded-xl bg-secondary-950 border-tertiary-800 text-neutral-50 focus:border-primary-300 focus:ring-primary-300"
                                            />
                                            <button
                                                type="button"
                                                onClick={handleCheckVoucher}
                                                className="px-5 py-2.5 bg-primary-300 text-secondary-950 font-bold rounded-xl hover:bg-primary-400 transition-colors"
                                            >
                                                Terapkan
                                            </button>
                                        </div>
                                        {discountData.message && (
                                            <p
                                                className={`mt-2 text-sm font-medium ${discountData.isValid ? "text-emerald-400" : "text-red-400"}`}
                                            >
                                                {discountData.message}
                                            </p>
                                        )}
                                    </div>

                                    <div className="mb-6 p-5 bg-secondary-800 rounded-2xl border border-tertiary-800/50">
                                        <div className="flex justify-between text-neutral-400 mb-2">
                                            <span>
                                                Layanan: {selectedService?.name}
                                            </span>
                                            <span>
                                                Rp{" "}
                                                {selectedServicePrice.toLocaleString(
                                                    "id-ID",
                                                )}
                                            </span>
                                        </div>
                                        {discountData.isValid && (
                                            <div className="flex justify-between text-emerald-400 mb-2 font-medium">
                                                <span>Diskon Voucher</span>
                                                <span>
                                                    - Rp{" "}
                                                    {discountData.amount.toLocaleString(
                                                        "id-ID",
                                                    )}
                                                </span>
                                            </div>
                                        )}
                                        <div className="flex justify-between text-primary-300 font-bold text-xl mt-3 pt-3 border-t border-tertiary-700/50">
                                            <span>Total Pembayaran</span>
                                            <span>
                                                Rp{" "}
                                                {finalPrice > 0
                                                    ? finalPrice.toLocaleString(
                                                          "id-ID",
                                                      )
                                                    : 0}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <label className="block text-sm font-medium text-neutral-300 mb-3">
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
                                            className="w-full rounded-xl bg-secondary-900 border-tertiary-800 text-neutral-50 focus:border-primary-300 focus:ring-primary-300"
                                        >
                                            {/* PERBAIKAN: Opsi Tunai Dihapus! */}
                                            <option value="transfer">
                                                Transfer Bank
                                            </option>
                                            <option value="qris">QRIS</option>
                                        </select>
                                    </div>

                                    <div className="mb-6">
                                        <div className="bg-secondary-900 p-5 rounded-2xl mb-4 border border-primary-300/10">
                                            <h3 className="text-primary-300 font-bold mb-2">
                                                Instruksi Pembayaran
                                            </h3>
                                            {data.payment_method ===
                                            "transfer" ? (
                                                <>
                                                    <p className="text-sm text-neutral-400 mb-1">
                                                        Transfer sesuai nominal
                                                        (Rp{" "}
                                                        {finalPrice.toLocaleString(
                                                            "id-ID",
                                                        )}
                                                        ) ke rekening:
                                                    </p>
                                                    <p className="text-lg font-mono font-bold text-neutral-50">
                                                        BCA 1234567890 a.n APA
                                                        Car Wash
                                                    </p>
                                                </>
                                            ) : (
                                                <div className="flex flex-col items-center text-center">
                                                    <p className="text-sm text-neutral-400 mb-3">
                                                        Silakan lakukan scan
                                                        barcode QRIS di bawah
                                                        ini dan unggah buktinya.
                                                    </p>
                                                    <div className="bg-white p-2 rounded-xl mb-2 inline-block">
                                                        <img
                                                            src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Pembayaran+CarWash"
                                                            alt="QRIS Barcode"
                                                            className="w-32 h-32 object-contain"
                                                        />
                                                    </div>
                                                    <p className="text-xs text-primary-300 font-bold mt-1">
                                                        A.N APA Car Wash
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        <InputLabel value="Upload Bukti Pembayaran (Wajib)" />
                                        <label className="mt-2 flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-tertiary-700 hover:border-primary-300 rounded-xl cursor-pointer bg-secondary-900 transition-colors">
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <UploadCloud
                                                    className="text-primary-300 mb-2"
                                                    size={28}
                                                />
                                                <p className="text-sm text-neutral-400">
                                                    {data.payment_proof
                                                        ? data.payment_proof
                                                              .name
                                                        : "Klik untuk upload gambar (Max 2MB)"}
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
                                            <p className="text-red-400 text-xs mt-1">
                                                {errors.payment_proof}
                                            </p>
                                        )}
                                    </div>

                                    <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-tertiary-800/50">
                                        <button
                                            type="button"
                                            onClick={prevStep}
                                            className="w-full sm:w-auto flex justify-center items-center text-neutral-400 hover:text-primary-300 font-medium order-2 sm:order-1"
                                        >
                                            <ChevronLeft size={18} /> Kembali
                                        </button>
                                        <div className="w-full sm:w-auto flex flex-col items-end order-1 sm:order-2">
                                            {isSubmitDisabled && (
                                                <span className="text-xs text-amber-400 mb-2 text-right">
                                                    * Upload bukti pembayaran
                                                    untuk melanjutkan
                                                </span>
                                            )}
                                            <PrimaryButton
                                                type="submit"
                                                className="w-full sm:w-auto justify-center"
                                                disabled={isSubmitDisabled}
                                            >
                                                Konfirmasi Pesanan
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
