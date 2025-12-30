import { Activity, Users, CreditCard, DollarSign } from "lucide-react";

export default function DashboardPage() {
    return (
        <div className="h-[calc(100vh)] w-full bg-black relative overflow-hidden flex flex-col">
            {/* Ambient Background */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-violet-900/20 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-fuchsia-900/20 rounded-full blur-[120px] animate-pulse delay-1000"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 p-8 flex-1 overflow-y-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
                    <p className="text-zinc-400">Overview of your agent&apos;s performance.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {[
                        { label: "Total Revenue", value: "$45,231.89", icon: DollarSign, change: "+20.1% from last month" },
                        { label: "Subscriptions", value: "+2350", icon: Users, change: "+180.1% from last month" },
                        { label: "Sales", value: "+12,234", icon: CreditCard, change: "+19% from last month" },
                        { label: "Active Now", value: "+573", icon: Activity, change: "+201 since last hour" },
                    ].map((stat, i) => (
                        <div key={i} className="p-6 rounded-2xl bg-zinc-950/50 border border-white/5 backdrop-blur-sm hover:bg-white/5 transition-colors group">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-sm font-medium text-zinc-400">{stat.label}</span>
                                <stat.icon className="h-4 w-4 text-zinc-500 group-hover:text-white transition-colors" />
                            </div>
                            <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                            <p className="text-xs text-zinc-500">{stat.change}</p>
                        </div>
                    ))}
                </div>

                {/* Recent Activity Placeholder */}
                <div className="rounded-3xl bg-zinc-950/50 border border-white/5 backdrop-blur-sm p-6 h-96 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                    <div className="text-center relative z-10">
                        <Activity className="h-12 w-12 text-zinc-700 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-zinc-300">Activity Feed</h3>
                        <p className="text-zinc-500">No recent activity to show.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}