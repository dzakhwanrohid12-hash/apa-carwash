import MainLayout from "@/Layouts/MainLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import Table from "@/Components/UI/Table";
import { MessageSquare, CheckCircle } from "lucide-react";

export default function FeedbackIndex({ feedbacks }) {
    const { put, processing } = useForm();

    const markAsRead = (id) => {
        put(route("admin.feedback.read", id), { preserveScroll: true });
    };

    const columns = [
        {
            header: "Tanggal",
            render: (row) =>
                new Date(row.created_at).toLocaleDateString("id-ID"),
        },
        {
            header: "Pengirim",
            render: (row) => (
                <div>
                    <p className="font-medium text-neutral-50">{row.name}</p>
                    <p className="text-xs text-neutral-400">
                        {row.phone || row.email || "Tanpa Kontak"}
                    </p>
                </div>
            ),
        },
        {
            header: "Pesan",
            className: "w-1/2",
            render: (row) => (
                <p className="text-sm text-neutral-300 whitespace-pre-wrap">
                    {row.message}
                </p>
            ),
        },
        {
            header: "Status",
            render: (row) =>
                row.is_read ? (
                    <span className="text-xs font-bold text-neutral-500 flex items-center gap-1">
                        <CheckCircle size={14} /> Dibaca
                    </span>
                ) : (
                    <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-1 rounded">
                        Baru
                    </span>
                ),
        },
        {
            header: "Aksi",
            cellClassName: "text-right",
            render: (row) =>
                !row.is_read && (
                    <button
                        onClick={() => markAsRead(row.id)}
                        disabled={processing}
                        className="text-primary-300 hover:text-primary-400 text-sm font-medium transition-colors"
                    >
                        Tandai Dibaca
                    </button>
                ),
        },
    ];

    return (
        <MainLayout>
            <Head title="Kritik & Saran" />

            <div className="mb-8 flex items-center gap-3">
                <MessageSquare className="text-primary-300" size={32} />
                <div>
                    <h1 className="text-3xl font-display font-bold text-neutral-50">
                        Kritik & Saran
                    </h1>
                    <p className="text-neutral-400">
                        Masukan dari pelanggan via halaman kontak.
                    </p>
                </div>
            </div>

            <Table
                columns={columns}
                data={feedbacks.data}
                emptyMessage="Belum ada pesan yang masuk."
            />
        </MainLayout>
    );
}
