import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { MapPin, Phone, Mail, Send } from "lucide-react";

export default function Contact() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("feedback.store"), {
            onSuccess: () => reset(),
        });
    };

    return (
        <GuestLayout>
            <Head title="Hubungi Kami" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-display font-bold text-neutral-50 mb-4">
                        Hubungi Kami
                    </h1>
                    <p className="text-neutral-400 max-w-2xl mx-auto">
                        Ada pertanyaan, kritik, atau saran? Jangan ragu untuk
                        menghubungi tim APA Car Wash. Masukan Anda sangat
                        berarti bagi kami.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Info Kontak */}
                    <div className="space-y-8">
                        <div className="bg-secondary-800 p-6 rounded-2xl border border-tertiary-800/50 flex items-start gap-4">
                            <MapPin
                                className="text-primary-300 mt-1"
                                size={24}
                            />
                            <div>
                                <h3 className="font-bold text-lg text-neutral-50 mb-2">
                                    Lokasi Kedai
                                </h3>
                                <p className="text-neutral-400 leading-relaxed">
                                    Jl. Contoh Alamat No. 123
                                    <br />
                                    Pekanbaru, Riau, Indonesia
                                    <br />
                                    Kode Pos 28111
                                </p>
                            </div>
                        </div>
                        <div className="bg-secondary-800 p-6 rounded-2xl border border-tertiary-800/50 flex items-start gap-4">
                            <Phone
                                className="text-primary-300 mt-1"
                                size={24}
                            />
                            <div>
                                <h3 className="font-bold text-lg text-neutral-50 mb-2">
                                    WhatsApp / Telepon
                                </h3>
                                <p className="text-neutral-400">
                                    0812-3456-7890
                                    <br />
                                    0898-7654-3210
                                </p>
                            </div>
                        </div>
                        <div className="bg-secondary-800 p-6 rounded-2xl border border-tertiary-800/50 flex items-start gap-4">
                            <Mail className="text-primary-300 mt-1" size={24} />
                            <div>
                                <h3 className="font-bold text-lg text-neutral-50 mb-2">
                                    Email
                                </h3>
                                <p className="text-neutral-400">
                                    halo@apacarwash.com
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Form Feedback */}
                    <div className="bg-secondary-800/50 p-8 rounded-2xl border border-primary-300/20 backdrop-blur-sm">
                        <h3 className="font-display font-bold text-2xl text-neutral-50 mb-6">
                            Kirim Pesan
                        </h3>
                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <InputLabel value="Nama Lengkap" />
                                <TextInput
                                    className="w-full mt-1"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.name}
                                    className="mt-1 text-red-400"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <InputLabel value="Email (Opsional)" />
                                    <TextInput
                                        type="email"
                                        className="w-full mt-1"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                    />
                                </div>
                                <div>
                                    <InputLabel value="No. WhatsApp" />
                                    <TextInput
                                        className="w-full mt-1"
                                        value={data.phone}
                                        onChange={(e) =>
                                            setData("phone", e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <div>
                                <InputLabel value="Pesan / Saran" />
                                <textarea
                                    className="w-full mt-1 bg-secondary-900 border-tertiary-700 text-neutral-50 rounded-xl focus:ring-primary-300"
                                    rows="4"
                                    required
                                    value={data.message}
                                    onChange={(e) =>
                                        setData("message", e.target.value)
                                    }
                                ></textarea>
                                <InputError
                                    message={errors.message}
                                    className="mt-1 text-red-400"
                                />
                            </div>
                            <PrimaryButton
                                disabled={processing}
                                className="w-full justify-center gap-2 mt-4"
                            >
                                <Send size={18} /> Kirim Pesan
                            </PrimaryButton>
                        </form>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
