import { Search, MoreVertical, Shield, Mail, Calendar } from "lucide-react";

export default function UsersPage() {
    const users = [
        { name: "Ethan Wang", email: "ethan@example.com", role: "Admin", status: "Active", joined: "Dec 2023" },
        { name: "Sarah Chen", email: "sarah@example.com", role: "Editor", status: "Active", joined: "Jan 2024" },
        { name: "Michael Ross", email: "michael@example.com", role: "Viewer", status: "Offline", joined: "Feb 2024" },
        { name: "Jessica Liu", email: "jessica@example.com", role: "Editor", status: "Active", joined: "Mar 2024" },
        { name: "David Kim", email: "david@example.com", role: "Viewer", status: "Inactive", joined: "Mar 2024" },
    ];

    return (
        <div className="h-[calc(100vh)] w-full bg-black relative overflow-hidden flex flex-col">
            {/* Ambient Background */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-violet-900/20 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-fuchsia-900/20 rounded-full blur-[120px] animate-pulse delay-1000"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 p-8 flex-1 overflow-y-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Users</h1>
                        <p className="text-zinc-400">Manage team access and permissions.</p>
                    </div>
                    <button className="px-4 py-2 bg-white text-black font-medium rounded-lg hover:bg-zinc-200 transition-colors">
                        Add User
                    </button>
                </div>

                {/* Search Bar */}
                <div className="relative mb-8 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                    <input
                        type="text"
                        placeholder="Search users..."
                        className="w-full bg-zinc-900/50 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all"
                    />
                </div>

                {/* Users List */}
                <div className="space-y-4">
                    {users.map((user, i) => (
                        <div key={i} className="group flex items-center justify-between p-4 rounded-2xl bg-zinc-950/50 border border-white/5 backdrop-blur-sm hover:bg-white/5 transition-all">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center text-white font-bold shadow-lg shadow-violet-500/20">
                                    {user.name.split(" ").map(n => n[0]).join("")}
                                </div>
                                <div>
                                    <h3 className="text-white font-medium group-hover:text-violet-400 transition-colors">{user.name}</h3>
                                    <div className="flex items-center gap-3 text-xs text-zinc-500 mt-1">
                                        <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> {user.email}</span>
                                        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {user.joined}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5">
                                    <Shield className="h-3 w-3 text-zinc-400" />
                                    <span className="text-xs text-zinc-300">{user.role}</span>
                                </div>
                                <div className={`px-3 py-1 rounded-full text-xs font-medium border ${user.status === "Active"
                                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                    : "bg-zinc-500/10 text-zinc-400 border-zinc-500/20"
                                    }`}>
                                    {user.status}
                                </div>
                                <button className="p-2 rounded-lg hover:bg-white/10 text-zinc-500 hover:text-white transition-colors">
                                    <MoreVertical className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}