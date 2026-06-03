import MainLayout from "@/Layouts/MainLayout";
import { Head, useForm } from "@inertiajs/react";
import Table from "@/Components/UI/Table";
import {
    MessageSquare,
    CheckCircle,
    Calendar,
    Check,
    Mail,
} from "lucide-react";
import { motion } from "framer-motion";

export default function FeedbackIndex({ feedbacks }) {
    const { put, processing } = useForm();

    const markAsRead = (id) => {
        put(route("admin.feedback.read", id), { preserveScroll: true });
    };

    const columns = [
        {
            header: "Tanggal",
            render: (row) => (
                <div className="flex items-center gap-2 text-slate-600 font-medium whitespace-nowrap">
                    <Calendar size={14} className="text-amber-500" />
                    {new Date(row.created_at).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </div>
            ),
        },
        {
            header: "Pengirim",
            render: (row) => (
                <div>
                    <p className="font-bold text-slate-800">{row.name}</p>
                    <p className="inline-block px-2 py-0.5 mt-1 text-xs font-mono font-medium bg-slate-100 border border-slate-200 text-slate-500 rounded-md">
                        {row.phone || row.email || "Tanpa Kontak"}
                    </p>
                </div>
            ),
        },
        {
            header: "Isi Pesan",
            className: "w-2/5",
            render: (row) => (
                <p className="text-sm text-slate-600 whitespace-pre-wrap leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                    {row.message}
                </p>
            ),
        },
        {
            header: "Status",
            render: (row) =>
                row.is_read ? (
                    <span className="inline-flex items-center gap-1.5 text-slate-500 text-xs font-bold bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-xl uppercase tracking-wider">
                        <CheckCircle size={14} /> Dibaca
                    </span>
                ) : (
                    <span className="inline-flex items-center gap-1.5 text-amber-600 text-xs font-bold bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl uppercase tracking-wider shadow-sm animate-pulse">
                        <Mail size={14} /> Baru
                    </span>
                ),
        },
        {
            header: "Aksi",
            cellClassName: "text-right",
            render: (row) =>
                !row.is_read ? (
                    <button
                        onClick={() => markAsRead(row.id)}
                        disabled={processing}
                        className="inline-flex items-center gap-2 text-slate-500 hover:text-amber-600 bg-white hover:bg-amber-50 border border-slate-200 hover:border-amber-300 px-4 py-2 rounded-xl transition-all duration-300 shadow-sm font-bold text-xs whitespace-nowrap disabled:opacity-50"
                    >
                        <Check size={16} /> Tandai Dibaca
                    </button>
                ) : (
                    <span className="text-slate-400 text-xs font-medium italic px-4">
                        Selesai
                    </span>
                ),
        },
    ];

    return (
        <MainLayout>
            <Head title="Kritik & Saran" />

            {/* Background Ornaments */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
                <div className="absolute left-[-10%] top-[10%] w-[500px] h-[500px] rounded-full bg-amber-400/10 blur-[120px]" />
                <div className="absolute right-[-10%] bottom-[10%] w-[600px] h-[600px] rounded-full bg-sky-300/10 blur-[120px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8 flex items-center gap-4"
            >
                <div className="p-3.5 bg-amber-50 border border-amber-100 rounded-2xl text-amber-500 shadow-sm">
                    <MessageSquare size={28} />
                </div>
                <div>
                    <h1 className="text-3xl md:text-4xl font-display font-bold text-slate-800 mb-1">
                        Kritik & <span className="text-amber-500">Saran</span>
                    </h1>
                    <p className="text-slate-500 font-medium">
                        Pantau masukan dari pelanggan yang dikirimkan melalui
                        halaman kontak.
                    </p>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden"
            >
                <Table
                    columns={columns}
                    data={feedbacks.data}
                    emptyMessage="Belum ada kritik dan saran yang masuk dari pelanggan."
                />
            </motion.div>
        </MainLayout>
    );
}
