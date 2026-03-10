import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    BarChart3,
    MessageSquare,
    CheckCircle,
    Clock,
    ArrowRight,
    TrendingUp,
    AlertTriangle,
    Zap,
    Activity,
    Layers,
    ChevronRight,
    Calendar,
    Filter,
    Search
} from 'lucide-react';
import { Bar, Doughnut } from 'react-chartjs-2';
import api from '../api';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const AdminDashboard = () => {
    const [metrics, setMetrics] = useState(null);
    const [recentComplaints, setRecentComplaints] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const [metricsRes, complaintsRes] = await Promise.all([
                    api.get('/admin/metrics'),
                    api.get('/admin/complaints')
                ]);
                setMetrics(metricsRes.data);
                setRecentComplaints(complaintsRes.data.slice(0, 5));
            } catch (error) {
                console.error('Critical Telemetry Failure:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchAdminData();
    }, []);

    const stats = [
        { label: 'Total Influx', value: metrics?.total || 0, icon: MessageSquare, color: 'text-primary-600', bg: 'bg-primary-50', border: 'border-primary-100' },
        { label: 'Active/Pending', value: metrics?.pending || 0, icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-100' },
        { label: 'Resolution Rate', value: metrics?.resolved || 0, icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-50', border: 'border-green-100' },
        { label: 'Urgent Alerts', value: recentComplaints.filter(c => c.urgency === 'high').length, icon: AlertTriangle, color: 'text-rose-500', bg: 'bg-rose-50', border: 'border-rose-100' },
    ];

    const categoryData = {
        labels: metrics?.categories?.map(c => c._id) || [],
        datasets: [{
            label: 'Incident Density',
            data: metrics?.categories?.map(c => c.count) || [],
            backgroundColor: [
                'rgba(14, 165, 233, 0.7)',
                'rgba(20, 184, 166, 0.7)',
                'rgba(99, 102, 241, 0.7)',
                'rgba(245, 158, 11, 0.7)',
                'rgba(239, 68, 68, 0.7)',
            ],
            borderColor: 'white',
            borderWidth: 2,
            borderRadius: 12,
            hoverOffset: 20
        }]
    };

    const doughnutOptions = {
        plugins: {
            legend: { position: 'bottom', labels: { usePointStyle: true, padding: 20, font: { weight: 'bold', size: 10 } } },
            tooltip: { backgroundColor: '#1e293b', padding: 12, bodyFont: { weight: 'bold' } }
        },
        cutout: '70%',
        maintainAspectRatio: false
    };

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* Admin Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-50 border border-primary-100 text-primary-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                        <ShieldCheck size={12} />
                        Secure Operational Node
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 font-display tracking-tight">System <span className="text-primary-600">Overview</span></h1>
                    <p className="text-slate-500 font-semibold">Consolidated telemetry from city-wide infrastructure sensors.</p>
                </div>
                <div className="flex gap-4">
                    <button className="btn-secondary">
                        <Calendar size={18} />
                        Export Logs
                    </button>
                    <Link to="/admin/manage" className="btn-primary">
                        <Filter size={18} />
                        Filter Vault
                    </Link>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className={`card-premium p-8 group relative overflow-hidden bg-white hover:border-primary-200 transition-all`}>
                        <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-slate-50 rounded-full transition-transform group-hover:scale-150"></div>
                        <div className="relative z-10 flex items-center justify-between">
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">{stat.label}</p>
                                <h3 className="text-3xl font-black text-slate-900 font-display">{stat.value}</h3>
                            </div>
                            <div className={`${stat.bg} ${stat.color} w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm`}>
                                <stat.icon size={26} />
                            </div>
                        </div>
                        <div className="mt-6 flex items-center gap-1.5">
                            <TrendingUp size={14} className="text-green-500" />
                            <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">+12.5% vs Last Week</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Incident Density Chart */}
                <div className="card-premium p-8 lg:p-10">
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <h2 className="text-xl font-black text-slate-900 font-display leading-tight">Sector Density</h2>
                            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Category Analysis</p>
                        </div>
                        <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 hover:text-primary-600 cursor-pointer transition-colors">
                            <Search size={18} />
                        </div>
                    </div>
                    <div className="h-[300px] relative">
                        <Doughnut data={categoryData} options={doughnutOptions} />
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-8">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active nodes</p>
                            <p className="text-4xl font-black text-slate-900 font-display">{metrics?.total || 0}</p>
                        </div>
                    </div>
                    <div className="mt-8 pt-8 border-t border-slate-50 space-y-4">
                        {metrics?.categories?.slice(0, 3).map((cat, i) => (
                            <div key={i} className="flex justify-between items-center group cursor-default">
                                <div className="flex items-center gap-3">
                                    <div className={`w-2 h-2 rounded-full ${['bg-primary-500', 'bg-secondary-500', 'bg-indigo-500'][i % 3]}`}></div>
                                    <span className="text-xs font-bold text-slate-600 group-hover:text-slate-900 transition-colors">{cat._id} Sector</span>
                                </div>
                                <span className="text-xs font-black text-slate-900">{((cat.count / metrics.total) * 100).toFixed(1)}%</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Influx Table */}
                <div className="lg:col-span-2 card-premium p-8 lg:p-10 flex flex-col">
                    <div className="flex justify-between items-center mb-10">
                        <div>
                            <h2 className="text-xl font-black text-slate-900 font-display leading-tight">Recent Incident Influx</h2>
                            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Live data stream</p>
                        </div>
                        <Link to="/admin/manage" className="text-primary-600 font-black text-xs uppercase tracking-[0.2em] flex items-center gap-1 hover:underline group">
                            Open Command Vault <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="flex-1 space-y-4">
                        {loading ? (
                            [1, 2, 3, 4].map(i => (
                                <div key={i} className="h-20 bg-slate-50 rounded-3xl shimmer"></div>
                            ))
                        ) : recentComplaints.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 bg-slate-50 rounded-[2.5rem] border border-dashed border-slate-100">
                                <Layers size={48} className="text-slate-200 mb-4" />
                                <p className="text-slate-400 font-bold uppercase tracking-widest text-sm text-center">Inbound stream clear</p>
                            </div>
                        ) : (
                            recentComplaints.map((c) => (
                                <Link
                                    key={c._id}
                                    to={`/admin/complaint/${c._id}`}
                                    className="flex items-center justify-between p-5 bg-white border border-slate-100 rounded-[2rem] hover:shadow-xl hover:border-primary-100 transition-all group"
                                >
                                    <div className="flex items-center gap-5">
                                        <div className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center shadow-sm ${c.urgency === 'high' ? 'bg-red-50 text-red-500' : 'bg-slate-50 text-slate-400'
                                            } group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors`}>
                                            <span className="text-[10px] font-black uppercase tracking-widest leading-none mb-1 opacity-60">Prio</span>
                                            <p className="text-sm font-black leading-none">{c.urgency === 'high' ? 'H' : c.urgency === 'medium' ? 'M' : 'L'}</p>
                                        </div>
                                        <div>
                                            <p className="font-extrabold text-slate-900 group-hover:text-primary-600 transition-colors line-clamp-1">{c.title}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">#{c.complaintId}</span>
                                                <div className="w-1 h-1 rounded-full bg-slate-200"></div>
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{c.user?.name || 'Unknown Subject'}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${c.status === 'resolved' ? 'bg-green-50 border-green-100 text-green-600' :
                                                c.status === 'in-progress' ? 'bg-amber-50 border-amber-100 text-amber-600' : 'bg-slate-50 border-slate-100 text-slate-400'
                                            }`}>
                                            {c.status}
                                        </div>
                                        <ChevronRight className="text-slate-300 group-hover:text-primary-500 group-hover:translate-x-1 transition-all" size={20} />
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default AdminDashboard;
