import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    PlusCircle,
    Search,
    AlertTriangle,
    CheckCircle,
    Clock,
    ArrowRight,
    TrendingUp,
    MapPin,
    MessageSquare,
    ShieldAlert,
    BarChart3,
    Users,
    Zap
} from 'lucide-react';
import { Line } from 'react-chartjs-2';
import api from '../api';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const Home = () => {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserComplaints = async () => {
            try {
                const { data } = await api.get('/complaints/my');
                setComplaints(data);
            } catch (error) {
                console.error('Sequence Error:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchUserComplaints();
    }, []);

    const stats = [
        { label: 'Live Submissions', value: complaints.length, icon: MessageSquare, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Resolving', value: complaints.filter(c => c.status === 'in-progress').length, icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50' },
        { label: 'Completed', value: complaints.filter(c => c.status === 'resolved').length, icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-50' },
        { label: 'Critical Node', value: complaints.filter(c => c.urgency === 'high').length, icon: AlertTriangle, color: 'text-rose-500', bg: 'bg-rose-50' },
    ];

    const chartData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
            {
                label: 'Resolution Rate (%)',
                data: [65, 78, 72, 85, 92, 88, 95],
                fill: true,
                backgroundColor: 'rgba(14, 165, 233, 0.1)',
                borderColor: '#0ea5e9',
                borderWidth: 3,
                pointBackgroundColor: '#fff',
                pointBorderWidth: 2,
                tension: 0.4,
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: '#1e293b',
                padding: 12,
                titleFont: { size: 14, weight: 'bold' },
                bodyFont: { size: 13 },
                usePointStyle: true,
            }
        },
        scales: {
            y: { display: false },
            x: { grid: { display: false }, border: { display: false } }
        }
    };

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* Hero Welcome */}
            <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 px-8 py-16 lg:p-20 text-white shadow-2xl">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-600/20 to-transparent"></div>
                <div className="absolute -right-20 -top-20 w-80 h-80 bg-primary-600/30 rounded-full blur-[120px]"></div>
                <div className="relative z-10 max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/10 mb-6 group cursor-default">
                        <Zap size={16} className="text-secondary-400 group-hover:scale-125 transition-transform" />
                        <span className="text-xs font-bold tracking-widest uppercase">System Optimal v2.0</span>
                    </div>
                    <h1 className="text-4xl lg:text-6xl font-extrabold font-display leading-[1.1] mb-6">
                        Your Gateway to a <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400 font-black italic">
                            Smarter City.
                        </span>
                    </h1>
                    <p className="text-lg text-slate-300 mb-10 max-w-lg leading-relaxed font-medium">
                        Securely report incidents, monitor city infrastructure, and track resolution sequences in real-time. Direct communication with municipal authorities.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link to="/submit" className="btn-primary">
                            <PlusCircle size={20} />
                            Initiate New Report
                        </Link>
                        <Link to="/track" className="btn-secondary !bg-white/10 !border-white/10 !text-white hover:!bg-white/20">
                            <Search size={20} />
                            Access tracking Vault
                        </Link>
                    </div>
                </div>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="card-premium p-8 group relative overflow-hidden">
                        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-slate-50 rounded-full transition-transform group-hover:scale-150"></div>
                        <div className="relative z-10">
                            <div className={`${stat.bg} ${stat.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm`}>
                                <stat.icon size={26} />
                            </div>
                            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">{stat.label}</p>
                            <h3 className="text-3xl font-black text-slate-900">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Reports */}
                <div className="lg:col-span-2 card-premium p-8 lg:p-10 flex flex-col">
                    <div className="flex justify-between items-center mb-10">
                        <div>
                            <h2 className="text-2xl font-black text-slate-900 font-display">Recent Operations</h2>
                            <p className="text-slate-500 text-sm font-semibold">Live feed of your reported sequences</p>
                        </div>
                        <Link to="/track" className="text-primary-600 font-bold text-sm flex items-center gap-1 hover:underline">
                            View All Vault <ArrowRight size={16} />
                        </Link>
                    </div>

                    <div className="space-y-4 flex-1">
                        {loading ? (
                            [1, 2, 3].map(i => (
                                <div key={i} className="h-20 bg-slate-50 rounded-3xl shimmer"></div>
                            ))
                        ) : complaints.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 bg-slate-50 rounded-[2.5rem] border border-dashed border-slate-200">
                                <MessageSquare size={48} className="text-slate-200 mb-4" />
                                <p className="text-slate-400 font-bold uppercase tracking-widest text-sm text-center">No Data in Local Vault</p>
                            </div>
                        ) : (
                            complaints.slice(0, 4).map((c) => (
                                <Link
                                    key={c._id}
                                    to={`/track?id=${c.complaintId}`}
                                    className="flex items-center justify-between p-5 bg-white border border-slate-100 rounded-[1.5rem] hover:shadow-xl hover:border-primary-100 transition-all group"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors">
                                            <MapPin size={22} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-900 group-hover:text-primary-600 transition-colors line-clamp-1">{c.title}</p>
                                            <p className="text-xs font-bold text-slate-400 tracking-wider">ID: #{c.complaintId}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="hidden sm:block text-right">
                                            <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${c.status === 'resolved' ? 'text-green-500' :
                                                    c.status === 'in-progress' ? 'text-amber-500' : 'text-slate-400'
                                                }`}>
                                                {c.status}
                                            </p>
                                            <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                <div className={`h-full ${c.status === 'resolved' ? 'w-full bg-green-500' :
                                                        c.status === 'in-progress' ? 'w-1/2 bg-amber-500' : 'w-1/4 bg-slate-300'
                                                    }`}></div>
                                            </div>
                                        </div>
                                        <ChevronRight className="text-slate-300 group-hover:text-primary-500 group-hover:translate-x-1 transition-all" size={20} />
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                </div>

                {/* City Analytics Widget */}
                <div className="card-premium p-8 lg:p-10 bg-gradient-to-br from-primary-600 to-primary-800 border-none text-white relative overflow-hidden group">
                    <div className="absolute -right-20 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="relative z-10 h-full flex flex-col">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                                <TrendingUp size={22} />
                            </div>
                            <h2 className="text-xl font-bold font-display leading-tight">Infrastructure Efficiency</h2>
                        </div>

                        <div className="flex-1 min-h-[220px]">
                            <Line data={chartData} options={chartOptions} />
                        </div>

                        <div className="mt-8 pt-8 border-t border-white/10">
                            <div className="flex justify-between items-center px-2">
                                <div className="text-center">
                                    <p className="text-[10px] uppercase font-bold text-white/60 tracking-widest mb-1">Density</p>
                                    <p className="text-2xl font-black italic tracking-tighter">0.82</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-[10px] uppercase font-bold text-white/60 tracking-widest mb-1">Response</p>
                                    <p className="text-2xl font-black italic tracking-tighter">94%</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-[10px] uppercase font-bold text-white/60 tracking-widest mb-1">Rating</p>
                                    <p className="text-2xl font-black italic tracking-tighter">A+</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Featured Service Grid */}
            <div className="grid md:grid-cols-3 gap-6">
                {[
                    { icon: ShieldAlert, title: 'Rapid Response', desc: 'Direct emergency link to municipal safety units.', color: 'from-orange-500 to-red-500' },
                    { icon: BarChart3, title: 'Data Integrity', desc: 'Verified status updates through decentralized tracking.', color: 'from-blue-500 to-indigo-500' },
                    { icon: Users, title: 'Citizen Voice', desc: 'Direct democratic engagement in city prioritization.', color: 'from-emerald-500 to-teal-500' }
                ].map((tool, i) => (
                    <div key={i} className="card-premium p-8 group overflow-hidden">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tool.color} flex items-center justify-center text-white mb-6 shadow-lg shadow-black/10 transition-transform group-hover:rotate-6`}>
                            <tool.icon size={24} />
                        </div>
                        <h3 className="text-xl font-black text-slate-800 mb-3 tracking-tight">{tool.title}</h3>
                        <p className="text-sm text-slate-500 font-semibold leading-relaxed mb-6">{tool.desc}</p>
                        <button className="text-xs font-black uppercase text-slate-400 group-hover:text-primary-600 tracking-[0.2em] flex items-center gap-2 transition-colors">
                            Explore Hub <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-all" />
                        </button>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default Home;
