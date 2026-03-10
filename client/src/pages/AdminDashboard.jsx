import React, { useState, useEffect } from 'react';
import api from '../api';
import {
    BarChart3,
    Clock,
    CheckCircle2,
    AlertCircle,
    ArrowUpRight,
    Filter,
    MoreVertical,
    Loader2,
    Trash2,
    ExternalLink
} from 'lucide-react';
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
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const AdminDashboard = () => {
    const [metrics, setMetrics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [recentComplaints, setRecentComplaints] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [metricsRes, complaintsRes] = await Promise.all([
                api.get('/admin/metrics'),
                api.get('/admin/complaints')
            ]);
            setMetrics(metricsRes.data);
            setRecentComplaints(complaintsRes.data.slice(0, 5));
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center h-[60vh]">
            <Loader2 className="animate-spin text-primary-600" size={48} />
        </div>
    );

    const stats = [
        { label: 'Total Grievances', value: metrics?.total, icon: BarChart3, color: 'text-primary-600', bg: 'bg-primary-50' },
        { label: 'Pending Action', value: metrics?.pending, icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50' },
        { label: 'Resolved Issues', value: metrics?.resolved, icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
    ];

    const chartData = {
        labels: metrics?.categoryStats.map(s => s._id),
        datasets: [{
            label: 'Complaints by Category',
            data: metrics?.categoryStats.map(s => s.count),
            backgroundColor: [
                'rgba(14, 165, 233, 0.8)',
                'rgba(16, 185, 129, 0.8)',
                'rgba(245, 158, 11, 0.8)',
                'rgba(239, 68, 68, 0.8)',
                'rgba(107, 114, 128, 0.8)',
            ],
            borderRadius: 12,
        }]
    };

    return (
        <div className="space-y-8 pb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 font-primary italic">Municipal Dashboard</h1>
                    <p className="text-slate-500 mt-1 uppercase text-xs font-bold tracking-widest">Real-time Public Grievance Analytics</p>
                </div>
                <button onClick={fetchData} className="btn-secondary flex items-center gap-2">
                    Refresh Data <ArrowUpRight size={18} />
                </button>
            </div>

            {/* Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200 border border-slate-100 flex items-center gap-6">
                        <div className={`${stat.bg} ${stat.color} w-16 h-16 rounded-2xl flex items-center justify-center shrink-0`}>
                            <stat.icon size={32} />
                        </div>
                        <div>
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-1">{stat.label}</p>
                            <p className="text-4xl font-bold text-slate-900 tracking-tighter">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Chart */}
                <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200 border border-slate-100">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-bold text-slate-800">Category Distribution</h3>
                        <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                            <Filter size={20} />
                        </div>
                    </div>
                    <div className="h-64">
                        <Bar
                            data={chartData}
                            options={{
                                maintainAspectRatio: false,
                                plugins: { legend: { display: false } },
                                scales: { y: { beginAtZero: true, grid: { display: false } }, x: { grid: { display: false } } }
                            }}
                        />
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200 border border-slate-100">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-bold text-slate-800">Recent Complaints</h3>
                        <button className="text-primary-600 font-bold text-sm hover:underline">View All</button>
                    </div>
                    <div className="space-y-4">
                        {recentComplaints.map((c) => (
                            <div key={c._id} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100/50 hover:bg-slate-100/50 transition-colors">
                                <div className="w-12 h-12 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 overflow-hidden">
                                    {c.imageUrl ? <img src={c.imageUrl} className="w-full h-full object-cover" /> : <AlertCircle size={20} />}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-bold text-slate-900 truncate">{c.title}</p>
                                    <p className="text-xs text-slate-500">{c.category} • {new Date(c.createdAt).toLocaleDateString()}</p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${c.status === 'Resolved' ? 'bg-green-100 text-green-600' : 'bg-primary-100 text-primary-600'
                                    }`}>
                                    {c.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
