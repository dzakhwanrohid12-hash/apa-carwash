import MainLayout from "@/Layouts/MainLayout";
import { Head, useForm } from "@inertiajs/react";
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

            <div className="mb-8">
                <h1 className="text-3xl font-display font-bold text-neutral-50">
                    Jam Operasional
                </h1>
                <p className="text-neutral-400">
                    Atur jam buka kedai dan durasi slot reservasi untuk
                    pelanggan.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 bg-secondary-800 p-6 md:p-8 rounded-2xl border border-tertiary-800/50 shadow-lg">
                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <InputLabel value="Jam Buka" />
                                <TextInput
                                    type="time"
                                    className="w-full mt-1 font-mono"
                                    value={data.open_time}
                                    onChange={(e) =>
                                        setData("open_time", e.target.value)
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.open_time}
                                    className="mt-2 text-red-400"
                                />
                            </div>
                            <div>
                                <InputLabel value="Jam Tutup (Tutup Order)" />
                                <TextInput
                                    type="time"
                                    className="w-full mt-1 font-mono"
                                    value={data.close_time}
                                    onChange={(e) =>
                                        setData("close_time", e.target.value)
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.close_time}
                                    className="mt-2 text-red-400"
                                />
                            </div>
                            <div className="sm:col-span-2">
                                <InputLabel value="Durasi Per Slot Reservasi (Menit)" />
                                <TextInput
                                    type="number"
                                    className="w-full mt-1 font-mono"
                                    value={data.slot_duration_minutes}
                                    onChange={(e) =>
                                        setData(
                                            "slot_duration_minutes",
                                            e.target.value,
                                        )
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.slot_duration_minutes}
                                    className="mt-2 text-red-400"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end pt-6 border-t border-tertiary-800/50">
                            <PrimaryButton
                                disabled={processing}
                                className="gap-2"
                            >
                                <Save size={18} /> Simpan Pengaturan
                            </PrimaryButton>
                        </div>
                    </form>
                </div>

                {/* Info Card Panel */}
                <div className="bg-primary-300/10 border border-primary-300/20 p-6 rounded-2xl h-fit">
                    <div className="flex items-center gap-2 text-primary-300 mb-4">
                        <Info size={24} />
                        <h3 className="font-bold text-lg font-display">
                            Cara Kerja Slot
                        </h3>
                    </div>
                    <ul className="space-y-3 text-sm text-neutral-300">
                        <li className="flex gap-2">
                            <Clock
                                size={16}
                                className="shrink-0 mt-0.5 text-primary-400"
                            />
                            <span>
                                Sistem akan membagi rentang dari{" "}
                                <strong>Jam Buka</strong> hingga{" "}
                                <strong>Jam Tutup</strong> berdasarkan{" "}
                                <strong>Durasi Slot</strong>.
                            </span>
                        </li>
                        <li className="flex gap-2">
                            <Clock
                                size={16}
                                className="shrink-0 mt-0.5 text-primary-400"
                            />
                            <span>
                                Misal: Buka 07:30, Durasi 60 menit. Maka pilihan
                                pelanggan di form adalah 07:30, 08:30, 09:30,
                                dst.
                            </span>
                        </li>
                        <li className="flex gap-2">
                            <Clock
                                size={16}
                                className="shrink-0 mt-0.5 text-primary-400"
                            />
                            <span>
                                Jika jadwal sudah terlewat di hari ini, slot
                                tersebut akan disembunyikan secara otomatis.
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </MainLayout>
    );
}
