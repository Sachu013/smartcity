import React from 'react';
import { Link } from 'react-router-dom';
import {
    PlusCircle,
    Search,
    CheckCircle2,
    Clock,
    AlertCircle,
    ArrowRight,
    ShieldCheck,
    Zap,
    PhoneCall
} from 'lucide-react';

const Home = () => {
    const stats = [
        { label: 'Solved Issues', value: '1,240+', icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-100' },
        { label: 'Avg. Resolution', value: '48 Hours', icon: Zap, color: 'text-primary-600', bg: 'bg-primary-100' },
        { label: 'Satisfaction', value: '98%', icon: ShieldCheck, color: 'text-blue-600', bg: 'bg-blue-100' },
    ];

    const features = [
        { title: 'Easy Reporting', desc: 'Report issues with photos and locations in seconds.', icon: PlusCircle },
        { title: 'AI Categorization', desc: 'Our smart system routes complaints automatically.', icon: Zap },
        { title: 'Real-time Tracking', desc: 'Stay updated on every step of the resolution.', icon: Search },
    ];

    return (
        <div className="space-y-12 pb-12">
            {/* Hero Section */}
            <section className="relative overflow-hidden rounded-[2rem] bg-slate-900 text-white p-8 lg:p-12 shadow-2xl">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-primary-600/10 blur-[100px] -z-0"></div>
                <div className="relative z-10 max-w-2xl">
                    <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                        Building a <span className="text-primary-400">Smater, Cleaner</span> City Together.
                    </h1>
                    <p className="text-slate-400 text-lg mb-10 leading-relaxed">
                        Report civic issues, track progress, and help our municipal team resolve
                        grievances efficiently. Your voice matters in making our city better.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link to="/submit" className="btn-primary py-4 px-8 text-lg flex items-center justify-center gap-2">
                            Report an Issue <ArrowRight size={20} />
                        </Link>
                        <Link to="/track" className="btn-secondary py-4 px-8 text-lg border-slate-700 bg-slate-800 text-white hover:bg-slate-700 transition-colors flex items-center justify-center gap-2">
                            Track Status <Search size={20} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200 border border-slate-100 card-hover">
                        <div className={`${stat.bg} ${stat.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-6`}>
                            <stat.icon size={28} />
                        </div>
                        <p className="text-slate-500 font-bold uppercase tracking-wider text-sm mb-1">{stat.label}</p>
                        <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Features Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {features.map((feature, i) => (
                    <div key={i} className="flex gap-6 p-4">
                        <div className="shrink-0 w-12 h-12 rounded-xl bg-white shadow-lg flex items-center justify-center text-primary-600 border border-slate-100">
                            <feature.icon size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                            <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Categories Guide */}
            <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl shadow-slate-200 border border-slate-100">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-2xl flex items-center justify-center shrink-0">
                        <AlertCircle size={24} />
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-slate-900">Issue Categories</h2>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {['Road & Infrastructure', 'Water & Sewage', 'Garbage & Waste', 'Power & Lighting'].map(cat => (
                        <div key={cat} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 border-dashed text-center hover:border-solid hover:border-primary-300 hover:bg-primary-50 transition-all cursor-default">
                            <p className="font-bold text-slate-700">{cat}</p>
                            <p className="text-xs text-slate-400 mt-1 uppercase font-bold">Priority Dept</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-primary-600 rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-primary-200">
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
                        <PhoneCall size={32} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold">Emergency Helplines</h3>
                        <p className="text-primary-100">Available 24/7 for life-threatening situations.</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="text-center px-6 py-3 bg-white/10 rounded-2xl backdrop-blur border border-white/20">
                        <p className="text-xs font-bold uppercase opacity-60">Control Room</p>
                        <p className="text-xl font-bold">100 / 112</p>
                    </div>
                    <div className="text-center px-6 py-3 bg-white/10 rounded-2xl backdrop-blur border border-white/20">
                        <p className="text-xs font-bold uppercase opacity-60">Fire Station</p>
                        <p className="text-xl font-bold">101</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
