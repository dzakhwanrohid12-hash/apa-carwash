import MainLayout from "@/Layouts/MainLayout";
import { Head, router } from "@inertiajs/react";
import StatCard from "@/Components/Shared/StatCard";
import { Wallet, Activity, CalendarClock, TrendingUp } from "lucide-react";
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Area,
    AreaChart,
    Line,
} from "recharts";

export default function Dashboard({ summary, filters }) {
    const handleFilterChange = (e) => {
        router.get(
            "/admin/dashboard",
            { period: e.target.value },
            { preserveState: true },
        );
    };

    return (
        <MainLayout>
            <Head title="Dashboard Admin" />
            <div className="space-y-8">
                {/* HEADER */}
                <div className="flex flex-col lg:flex-row justify-between gap-5">
                    <div>
                        <select
                            value={filters.period}
                            onChange={handleFilterChange}
                            className="h-[52px] px-5 rounded-[18px] bg-white border border-secondary-100 shadow-soft text-secondary-700 focus:border-primary-300 focus:ring-primary-300"
                        >
                            <option value="today">Hari Ini</option>
                            <option value="week">Minggu Ini</option>
                            <option value="month">Bulan Ini</option>
                        </select>
                    </div>
                </div>

                {/* STATS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <StatCard
                        variant="primary"
                        title="Pendapatan"
                        value={new Intl.NumberFormat("id-ID").format(
                            summary.revenue,
                        )}
                        prefix="Rp "
                        subtitle="Total pemasukan"
                        icon={Wallet}
                    />
                    <StatCard
                        variant="green-dark"
                        title="Total Transaksi"
                        value={summary.transaction_count}
                        subtitle="Transaksi aktif"
                        icon={Activity}
                    />
                    <StatCard
                        variant="blue-dark"
                        title="Reservasi"
                        value={summary.pending_reservations}
                        subtitle="Perlu diproses"
                        icon={CalendarClock}
                    />
                </div>

                {/* CHART */}
                <div className="relative rounded-[30px] bg-[linear-gradient(180deg,#FFFFFF,#F8FAFC)] border border-secondary-100 shadow-[0_20px_60px_rgba(19,32,51,.06)] overflow-hidden p-8">
                    {/* Siluet */}
                    <div className="absolute right-[-140px] top-[-120px] w-[340px] h-[340px] rounded-full bg-primary-300/[0.05]" />
                    <div className="absolute left-[-120px] bottom-[-120px] w-[280px] h-[280px] rounded-full bg-secondary-50" />

                    <div className="flex justify-between items-center mb-7">
                        <div>
                            <h3 className="text-[32px] font-display text-secondary-700">
                                Tren Pendapatan
                            </h3>
                            <p className="text-text-muted">7 hari terakhir</p>
                        </div>
                        <div className="w-[58px] h-[58px] rounded-[20px] bg-[linear-gradient(180deg,#F7D86A,#F2C94C)] flex items-center justify-center shadow-[0_10px_40px_rgba(242,201,76,.18)]">
                            <TrendingUp className="text-secondary-700" />
                        </div>
                    </div>

                    <div className="h-[340px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={summary.chart_data}>
                                <defs>
                                    <linearGradient
                                        id="income"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
                                        <stop
                                            offset="0%"
                                            stopColor="#F2C94C"
                                            stopOpacity={0.28}
                                        />
                                        <stop
                                            offset="100%"
                                            stopColor="#F2C94C"
                                            stopOpacity={0}
                                        />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid
                                    vertical={false}
                                    stroke="#E5ECF3"
                                    strokeDasharray="4 8"
                                />
                                <XAxis
                                    dataKey="date"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: "#7A8FA3" }}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: "#7A8FA3" }}
                                    tickFormatter={(v) => `Rp${v / 1000}k`}
                                />
                                <Tooltip
                                    cursor={{
                                        stroke: "#F2C94C",
                                        strokeWidth: 2,
                                    }}
                                    contentStyle={{
                                        background: "#fff",
                                        border: "none",
                                        borderRadius: "20px",
                                        boxShadow:
                                            "0 20px 60px rgba(19,32,51,.10)",
                                    }}
                                    formatter={(v) => [
                                        `Rp ${new Intl.NumberFormat("id-ID").format(v)}`,
                                        "Pendapatan",
                                    ]}
                                />
                                <Area dataKey="revenue" fill="url(#income)" />
                                <Line
                                    type="natural"
                                    dataKey="revenue"
                                    stroke="#F2C94C"
                                    strokeWidth={5}
                                    dot={{ r: 0 }}
                                    activeDot={{
                                        r: 8,
                                        fill: "#18344A",
                                        stroke: "#F2C94C",
                                        strokeWidth: 4,
                                    }}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
