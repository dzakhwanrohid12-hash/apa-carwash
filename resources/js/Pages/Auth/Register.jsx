import { useEffect } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import AuthLayout from "@/Layouts/AuthLayout";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        phone: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => reset("password", "password_confirmation");
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route("register"));
    };

    return (
        <AuthLayout
            title="Buat Akun Baru"
            subtitle="Mulai reservasi kendaraan dengan lebih cepat dan nyaman."
        >
            <Head title="Register" />
            <form onSubmit={submit} className="space-y-5">
                <div>
                    <InputLabel value="Nama Lengkap" />
                    <TextInput
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        required
                    />
                    <InputError message={errors.name} />
                </div>
                <div>
                    <InputLabel value="Alamat Email" />
                    <TextInput
                        type="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        required
                    />
                    <InputError message={errors.email} />
                </div>
                <div>
                    <InputLabel value="No. WhatsApp" />
                    <TextInput
                        placeholder="08xxxxxxxxxx"
                        value={data.phone}
                        onChange={(e) => setData("phone", e.target.value)}
                        required
                    />
                    <InputError message={errors.phone} />
                </div>
                <div className="grid lg:grid-cols-2 gap-4">
                    <div>
                        <InputLabel value="Password" />
                        <TextInput
                            type="password"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            required
                        />
                        <InputError message={errors.password} />
                    </div>
                    <div>
                        <InputLabel value="Konfirmasi" />
                        <TextInput
                            type="password"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                            required
                        />
                        <InputError message={errors.password_confirmation} />
                    </div>
                </div>
                <PrimaryButton disabled={processing}>
                    Daftar Sekarang
                </PrimaryButton>
                <p className="pt-3 text-center text-sm text-slate-500">
                    Sudah punya akun?
                    <Link
                        href={route("login")}
                        className="ml-2 font-semibold text-[#F2C94C]"
                    >
                        Masuk
                    </Link>
                </p>
            </form>
        </AuthLayout>
    );
}
