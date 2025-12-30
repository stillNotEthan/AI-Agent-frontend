import { Bell, Lock, User, Palette, Globe, ChevronRight } from "lucide-react";

export default function SettingsPage() {
    return (
        <div className="h-[calc(100vh)] w-full bg-black relative overflow-hidden flex flex-col">
            {/* Ambient Background */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-violet-900/20 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-fuchsia-900/20 rounded-full blur-[120px] animate-pulse delay-1000"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 p-8 flex-1 overflow-y-auto max-w-4xl mx-auto w-full">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
                    <p className="text-zinc-400">Manage your account preferences and workspace settings.</p>
                </div>

                <div className="space-y-6">
                    {/* Account Section */}
                    <div className="rounded-2xl bg-zinc-950/50 border border-white/5 backdrop-blur-sm overflow-hidden">
                        <div className="p-6 border-b border-white/5">
                            <h2 className="text-lg font-medium text-white flex items-center gap-2">
                                <User className="h-5 w-5 text-violet-500" />
                                Account
                            </h2>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="flex items-center justify-between group cursor-pointer">
                                <div>
                                    <h3 className="text-zinc-200 font-medium group-hover:text-white transition-colors">Profile Information</h3>
                                    <p className="text-sm text-zinc-500">Update your name, email, and avatar.</p>
                                </div>
                                <ChevronRight className="h-5 w-5 text-zinc-600 group-hover:text-white transition-colors" />
                            </div>
                            <div className="flex items-center justify-between group cursor-pointer">
                                <div>
                                    <h3 className="text-zinc-200 font-medium group-hover:text-white transition-colors">Security</h3>
                                    <p className="text-sm text-zinc-500">Change password and enable 2FA.</p>
                                </div>
                                <ChevronRight className="h-5 w-5 text-zinc-600 group-hover:text-white transition-colors" />
                            </div>
                        </div>
                    </div>

                    {/* Preferences Section */}
                    <div className="rounded-2xl bg-zinc-950/50 border border-white/5 backdrop-blur-sm overflow-hidden">
                        <div className="p-6 border-b border-white/5">
                            <h2 className="text-lg font-medium text-white flex items-center gap-2">
                                <Palette className="h-5 w-5 text-fuchsia-500" />
                                Preferences
                            </h2>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-zinc-200 font-medium">Appearance</h3>
                                    <p className="text-sm text-zinc-500">Customize the look and feel.</p>
                                </div>
                                <div className="flex items-center gap-2 bg-zinc-900 p-1 rounded-lg border border-white/10">
                                    <button className="px-3 py-1 rounded-md bg-zinc-800 text-white text-xs font-medium shadow-sm">Dark</button>
                                    <button className="px-3 py-1 rounded-md text-zinc-500 text-xs font-medium hover:text-white transition-colors">Light</button>
                                    <button className="px-3 py-1 rounded-md text-zinc-500 text-xs font-medium hover:text-white transition-colors">System</button>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-zinc-200 font-medium">Language</h3>
                                    <p className="text-sm text-zinc-500">Select your preferred language.</p>
                                </div>
                                <div className="flex items-center gap-2 text-zinc-400 text-sm">
                                    <Globe className="h-4 w-4" />
                                    English (US)
                                    <ChevronRight className="h-4 w-4" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Notifications Section */}
                    <div className="rounded-2xl bg-zinc-950/50 border border-white/5 backdrop-blur-sm overflow-hidden">
                        <div className="p-6 border-b border-white/5">
                            <h2 className="text-lg font-medium text-white flex items-center gap-2">
                                <Bell className="h-5 w-5 text-sky-500" />
                                Notifications
                            </h2>
                        </div>
                        <div className="p-6 space-y-4">
                            {[
                                "Email notifications for new messages",
                                "Push notifications for mentions",
                                "Weekly digest reports"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between">
                                    <span className="text-zinc-300">{item}</span>
                                    <div className={`w-11 h-6 rounded-full relative cursor-pointer transition-colors ${i === 0 ? "bg-violet-600" : "bg-zinc-700"}`}>
                                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${i === 0 ? "left-6" : "left-1"}`} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}