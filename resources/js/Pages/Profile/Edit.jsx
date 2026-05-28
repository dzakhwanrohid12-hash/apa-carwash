import GuestLayout from "@/Layouts/GuestLayout";
import MainLayout from "@/Layouts/MainLayout";
import { Head, usePage } from "@inertiajs/react";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";

export default function Edit({ mustVerifyEmail, status }) {
    // Ambil data auth untuk cek role
    const { auth } = usePage().props;
    const role = auth.user?.role;

    // Tentukan Layout secara dinamis
    // Admin dan Kasir pakai MainLayout (Dashboard), Pelanggan pakai GuestLayout
    const Layout =
        role === "admin" || role === "kasir" ? MainLayout : GuestLayout;

    return (
        <Layout>
            <Head title="Pengaturan Profil" />

            <div className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                <div className="mb-6">
                    <h1 className="text-3xl font-display font-bold text-neutral-50">
                        Pengaturan Akun
                    </h1>
                    <p className="text-neutral-400">
                        Perbarui informasi profil dan keamanan kata sandi Anda.
                    </p>
                </div>

                {/* Form Informasi Profil */}
                <div className="p-4 sm:p-8 bg-secondary-800 border border-tertiary-800/50 shadow sm:rounded-2xl">
                    <div className="max-w-xl">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                        />
                    </div>
                </div>

                {/* Form Ubah Password */}
                <div className="p-4 sm:p-8 bg-secondary-800 border border-tertiary-800/50 shadow sm:rounded-2xl">
                    <div className="max-w-xl">
                        <UpdatePasswordForm />
                    </div>
                </div>

                {/* Form Hapus Akun */}
                <div className="p-4 sm:p-8 bg-secondary-800 border border-red-500/20 shadow sm:rounded-2xl">
                    <div className="max-w-xl">
                        <DeleteUserForm />
                    </div>
                </div>
            </div>
        </Layout>
    );
}
