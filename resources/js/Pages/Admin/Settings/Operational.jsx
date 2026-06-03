import MainLayout from "@/Layouts/MainLayout";
import { Head, useForm } from "@inertiajs/react";
import { motion } from "framer-motion";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { Save, Clock, Info } from "lucide-react";

export default function OperationalSettings({ settings }) {
    const { data, setData, put, processing, errors } = useForm({
        open_time: settings?.open_time || "07:30",
        close_time: settings?.close_time || "18:00",
        slot_duration_minutes: settings?.slot_duration_minutes || "60",
    });

    const submit = (e) => {
        e.preventDefault();
        put(route("admin.settings.operational.update"));
    };

    return (
        <MainLayout>
            <Head title="Pengaturan Operasional" />

            {/* Background Ornaments */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
                <div className="absolute left-[-10%] top-[10%] w-[500px] h-[500px] rounded-full bg-amber-400/10 blur-[120px]" />
                <div className="absolute right-[-10%] bottom-[10%] w-[600px] h-[600px] rounded-full bg-sky-300/10 blur-[120px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
            >
                <h1 className="text-3xl md:text-4xl font-display font-bold text-slate-800 mb-2">
                    Jam <span className="text-amber-500">Operasional</span>
                </h1>
                <p className="text-slate-500 font-medium">
                    Atur jam buka kedai dan durasi pembagian slot reservasi
                    untuk pelanggan.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Form Settings */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="md:col-span-2 bg-white p-6 md:p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden h-fit"
                >
                    {/* Inner Ornament */}
                    <div className="absolute top-0 left-0 w-40 h-40 bg-amber-400/10 blur-3xl rounded-full pointer-events-none" />

                    <form onSubmit={submit} className="space-y-6 relative z-10">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <InputLabel
                                    value="Jam Buka"
                                    className="text-slate-700 mb-2"
                                />
                                <TextInput
                                    type="time"
                                    className="w-full bg-slate-50 border-slate-200 focus:border-amber-400 focus:ring-amber-400/20 rounded-xl py-3.5 font-mono text-lg text-slate-800"
                                    value={data.open_time}
                                    onChange={(e) =>
                                        setData("open_time", e.target.value)
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.open_time}
                                    className="mt-2 text-red-500"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    value="Jam Tutup (Tutup Order)"
                                    className="text-slate-700 mb-2"
                                />
                                <TextInput
                                    type="time"
                                    className="w-full bg-slate-50 border-slate-200 focus:border-amber-400 focus:ring-amber-400/20 rounded-xl py-3.5 font-mono text-lg text-slate-800"
                                    value={data.close_time}
                                    onChange={(e) =>
                                        setData("close_time", e.target.value)
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.close_time}
                                    className="mt-2 text-red-500"
                                />
                            </div>

                            <div className="sm:col-span-2">
                                <InputLabel
                                    value="Durasi Per Slot Reservasi"
                                    className="text-slate-700 mb-2"
                                />
                                <div className="relative">
                                    <TextInput
                                        type="number"
                                        className="w-full bg-slate-50 border-slate-200 focus:border-amber-400 focus:ring-amber-400/20 rounded-xl py-3.5 font-mono text-lg text-slate-800"
                                        value={data.slot_duration_minutes}
                                        onChange={(e) =>
                                            setData(
                                                "slot_duration_minutes",
                                                e.target.value,
                                            )
                                        }
                                        required
                                    />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold bg-slate-100 px-3 py-1 rounded-md">
                                        Menit
                                    </span>
                                </div>
                                <InputError
                                    message={errors.slot_duration_minutes}
                                    className="mt-2 text-red-500"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end pt-6 border-t border-slate-100 mt-8">
                            <PrimaryButton
                                disabled={processing}
                                className="px-8 py-3.5"
                            >
                                <span className="flex flex-row items-center justify-center gap-2 whitespace-nowrap">
                                    <Save size={18} /> Simpan Pengaturan
                                </span>
                            </PrimaryButton>
                        </div>
                    </form>
                </motion.div>

                {/* Info Card Panel */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200/50 p-6 md:p-8 rounded-[2rem] h-fit shadow-lg shadow-amber-500/5 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/20 blur-2xl rounded-full pointer-events-none" />

                    <div className="flex items-center gap-3 text-amber-600 mb-6 relative z-10">
                        <div className="p-2.5 bg-amber-100 rounded-xl">
                            <Info size={24} />
                        </div>
                        <h3 className="font-bold text-xl font-display text-slate-800">
                            Cara Kerja Slot
                        </h3>
                    </div>

                    <ul className="space-y-4 text-[15px] text-slate-600 leading-relaxed relative z-10">
                        <li className="flex gap-3">
                            <Clock
                                size={18}
                                className="shrink-0 mt-0.5 text-amber-500"
                            />
                            <span>
                                Sistem akan membagi otomatis rentang waktu dari{" "}
                                <strong className="text-slate-800">
                                    Jam Buka
                                </strong>{" "}
                                hingga{" "}
                                <strong className="text-slate-800">
                                    Jam Tutup
                                </strong>{" "}
                                berdasarkan{" "}
                                <strong className="text-slate-800">
                                    Durasi Slot
                                </strong>
                                .
                            </span>
                        </li>
                        <li className="flex gap-3">
                            <Clock
                                size={18}
                                className="shrink-0 mt-0.5 text-amber-500"
                            />
                            <span>
                                <strong className="text-slate-800 block mb-1">
                                    Contoh Simulasi:
                                </strong>
                                Buka 07:30, Durasi 60 menit. Maka pilihan
                                pelanggan di form adalah 07:30, 08:30, 09:30,
                                dst.
                            </span>
                        </li>
                        <li className="flex gap-3">
                            <Clock
                                size={18}
                                className="shrink-0 mt-0.5 text-amber-500"
                            />
                            <span>
                                Jika jadwal sudah terlewat (berlalu) di hari
                                ini, slot tersebut akan{" "}
                                <strong className="text-slate-800">
                                    disembunyikan secara otomatis
                                </strong>{" "}
                                dari pelanggan.
                            </span>
                        </li>
                    </ul>
                </motion.div>
            </div>
        </MainLayout>
    );
}
