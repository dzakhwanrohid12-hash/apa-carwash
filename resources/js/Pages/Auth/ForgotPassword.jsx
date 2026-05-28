import { Head, Link, useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthLayout from "@/Layouts/AuthLayout";

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("password.email"));
    };

    return (
        <AuthLayout
            title="Lupa Password"
            subtitle="Masukkan email Anda dan kami akan mengirim tautan untuk membuat password baru."
        >
            <Head title="Forgot Password" />
            {status && (
                <div className="mb-5 rounded-2xl bg-teal-50 border border-teal-100 px-5 py-4 text-sm text-teal-700">
                    {status}
                </div>
            )}
            <form onSubmit={submit} className="space-y-6">
                <div>
                    <InputLabel htmlFor="email" value="Alamat Email" />
                    <TextInput
                        id="email"
                        type="email"
                        value={data.email}
                        autoComplete="username"
                        isFocused
                        placeholder="nama@email.com"
                        onChange={(e) => setData("email", e.target.value)}
                    />
                    <InputError message={errors.email} />
                </div>
                <PrimaryButton disabled={processing}>
                    Kirim Link Reset
                </PrimaryButton>
                <p className="text-center text-sm text-slate-500 pt-2">
                    Sudah ingat password?
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
