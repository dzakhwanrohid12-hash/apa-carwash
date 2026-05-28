import { useEffect } from "react";
import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import AuthLayout from "@/Layouts/AuthLayout";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    useEffect(() => () => reset("password"), []);

    const submit = (e) => {
        e.preventDefault();
        post(route("login"));
    };

    return (
        <AuthLayout
            title="Selamat Datang"
            subtitle="Masuk untuk menikmati reservasi kendaraan yang lebih nyaman."
        >
            <Head title="Login" />
            {status && (
                <div className="mb-6 rounded-[18px] bg-[#F8FFFD] border border-[#14B8A6]/15 px-5 py-4 text-[#14B8A6]">
                    {status}
                </div>
            )}
            <form onSubmit={submit} className="space-y-5">
                <div>
                    <InputLabel value="Alamat Email" />
                    <TextInput
                        type="email"
                        isFocused
                        value={data.email}
                        placeholder="nama@email.com"
                        onChange={(e) => setData("email", e.target.value)}
                    />
                    <InputError message={errors.email} />
                </div>
                <div>
                    <InputLabel value="Password" />
                    <TextInput
                        type="password"
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                    />
                    <InputError message={errors.password} />
                </div>
                <div className="flex justify-between">
                    <label className="flex gap-3">
                        <Checkbox
                            checked={data.remember}
                            onChange={(e) =>
                                setData("remember", e.target.checked)
                            }
                        />
                        <span className="text-sm text-slate-500">
                            Ingat Saya
                        </span>
                    </label>
                    {canResetPassword && (
                        <Link
                            href={route("password.request")}
                            className="text-sm font-semibold text-[#F2C94C]"
                        >
                            Lupa password?
                        </Link>
                    )}
                </div>
                <PrimaryButton disabled={processing}>
                    Masuk ke Akun
                </PrimaryButton>
                <p className="text-center text-sm text-slate-500">
                    Belum punya akun?
                    <Link
                        href={route("register")}
                        className="ml-2 font-semibold text-[#F2C94C]"
                    >
                        Daftar sekarang
                    </Link>
                </p>
            </form>
        </AuthLayout>
    );
}
