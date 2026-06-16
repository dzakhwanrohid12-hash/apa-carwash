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
                        placeholder="*******"
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
                {/* Garis pemisah */}
<div className="flex items-center my-6">
    <div className="flex-1 border-t border-gray-200"></div>
    <span className="px-4 text-sm text-gray-500 bg-[#FAFBFC]">Atau</span>
    <div className="flex-1 border-t border-gray-200"></div>
</div>

{/* Tombol Google */}
<a
    href={route('auth.google')}
    className="w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-white border border-gray-200 text-gray-700 font-bold rounded-2xl hover:bg-gray-50 hover:shadow-sm transition-all duration-300 active:scale-95"
>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-6 h-6">
        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
    Lanjutkan dengan Google
</a>
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
