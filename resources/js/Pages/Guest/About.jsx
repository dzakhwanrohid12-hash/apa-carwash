import GuestLayout from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";

export default function About() {
    return (
        <GuestLayout>
            <Head title="Tentang Kami" />

            <div className="max-w-4xl mx-auto px-4 py-20 text-center">
                <h1 className="text-4xl font-display font-bold text-neutral-50 mb-8">
                    Tentang APA Car Wash
                </h1>
                <div className="bg-secondary-800 p-8 md:p-12 rounded-3xl border border-tertiary-800/50 shadow-lg text-neutral-300 leading-relaxed space-y-6">
                    <p className="text-lg">
                        Berdiri sejak tahun 2024,{" "}
                        <strong className="text-primary-300">
                            APA Car Wash
                        </strong>{" "}
                        hadir untuk memberikan pengalaman pencucian kendaraan
                        dan karpet yang revolusioner di Pekanbaru.
                    </p>
                    <p>
                        Kami memadukan standar industri cuci premium dengan
                        teknologi reservasi online secara real-time. Anda tidak
                        perlu lagi membuang waktu mengantre berjam-jam; cukup
                        pilih jadwal Anda dari rumah, serahkan kendaraan Anda,
                        dan pantau progresnya langsung dari *smartphone*.
                    </p>
                    <p>
                        Dengan tim yang terlatih dan bahan pembersih berkualitas
                        tinggi, kami menjanjikan efisiensi di setiap tetes air
                        yang kami gunakan.
                    </p>
                </div>
            </div>
        </GuestLayout>
    );
}
