import { useForm } from "@inertiajs/react";
import { UserPlus, CheckCircle, ArrowRight } from "lucide-react";

export default function QueueCard({ transaction, employees }) {
    const { put, data, setData, processing } = useForm({
        employee_id: transaction.employee_id || "",
        status: "selesai",
    });

    const handleAssign = () => {
        put(route("cashier.queue.assign", transaction.id));
    };

    const handleComplete = () => {
        put(route("cashier.queue.status", transaction.id));
    };

    return (
        <div className="relative overflow-hidden rounded-[30px] bg-white border border-secondary-100 shadow-soft p-7">
            <div className="absolute right-[-70px] top-[-70px] w-[180px] h-[180px] rounded-full bg-primary-300/[0.08]" />
            <div className="relative">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="font-mono text-sm text-text-muted">
                            {transaction.transaction_code}
                        </div>
                        <h3 className="mt-3 font-display text-[28px] font-bold text-secondary-700">
                            {transaction.vehicle_plate || "Walk-in"}
                        </h3>
                        <div className="mt-2 text-text-muted">
                            {transaction.service?.name}
                        </div>
                    </div>
                    <div
                        className={`px-4 py-2 rounded-full text-xs font-semibold ${
                            transaction.status === "menunggu"
                                ? "bg-primary-50 text-primary-400"
                                : "bg-secondary-50 text-secondary-500"
                        }`}
                    >
                        {transaction.status}
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-secondary-100">
                    {transaction.status === "menunggu" ? (
                        <div className="flex gap-3">
                            <select
                                value={data.employee_id}
                                onChange={(e) =>
                                    setData("employee_id", e.target.value)
                                }
                                className="flex-1 rounded-[18px] border border-secondary-100 bg-surface text-secondary-700 focus:border-secondary-500 focus:ring-0"
                            >
                                <option value="">Pilih Karyawan</option>

                                {employees.map((emp) => (
                                    <option key={emp.id} value={emp.id}>
                                        {emp.name}
                                    </option>
                                ))}
                            </select>

                            <button
                                onClick={handleAssign}
                                disabled={!data.employee_id || processing}
                                className="w-[56px] rounded-[18px] bg-secondary-500 text-white flex items-center justify-center hover:bg-secondary-600 disabled:opacity-50"
                            >
                                <UserPlus size={20} />
                            </button>
                        </div>
                    ) : (
                        <div className="flex justify-between items-center">
                            <div className="text-sm font-medium text-secondary-500">
                                Dikerjakan oleh: {transaction.employee?.name}
                            </div>

                            <button
                                onClick={handleComplete}
                                disabled={processing}
                                className="h-[48px] px-5 rounded-[16px] bg-primary-300 text-secondary-700 font-semibold flex items-center gap-2 hover:bg-primary-400"
                            >
                                <CheckCircle size={18} />
                                Selesai
                                <ArrowRight size={16} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
