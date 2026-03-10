import React, { useState, useEffect } from 'react';
import api from '../api';
import {
    Search,
    MapPin,
    Calendar,
    Building2,
    CheckCircle2,
    Clock,
    AlertTriangle,
    Loader2,
    ChevronRight
} from 'lucide-react';

const TrackComplaint = () => {
    const [complaintId, setComplaintId] = useState('');
    const [complaint, setComplaint] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const statuses = [
        'Submitted',
        'Under Review',
        'Assigned to Department',
        'In Progress',
        'Resolved',
    ];

    const getStatusIndex = (status) => statuses.indexOf(status);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!complaintId) return;

        setLoading(true);
        setError('');
        setComplaint(null);

        try {
            const { data } = await api.get(`/complaints/track/${complaintId}`);
            setComplaint(data);
        } catch (err) {
            setError(err.response?.data?.message || 'Complaint not found');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900">Track Your Complaint</h1>
                <p className="text-slate-500 mt-2">Enter your unique Complaint ID to check the real-time status.</p>
            </div>

            <div className="bg-white rounded-3xl p-4 shadow-xl shadow-slate-200 border border-slate-100 mb-8 flex gap-2">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
                    <input
                        type="text"
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary-500 transition-all text-lg font-mono"
                        placeholder="Enter ID (e.g., CMP12345678)"
                        value={complaintId}
                        onChange={(e) => setComplaintId(e.target.value.toUpperCase())}
                    />
                </div>
                <button
                    onClick={handleSearch}
                    disabled={loading}
                    className="btn-primary px-8 flex items-center gap-2"
                >
                    {loading ? <Loader2 className="animate-spin" size={24} /> : <Search size={24} />}
                    <span className="hidden sm:inline">Track</span>
                </button>
            </div>

            {error && (
                <div className="bg-red-50 text-red-500 p-6 rounded-3xl text-center border border-red-100 mb-8">
                    <p className="font-bold mb-1 text-lg">Oops! Something's wrong.</p>
                    <p>{error}</p>
                </div>
            )}

            {complaint && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {/* Status Progress Bar */}
                    <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200 border border-slate-100">
                        <div className="flex justify-between items-center mb-10">
                            <h2 className="text-xl font-bold text-slate-800">Current Status</h2>
                            <span className="px-4 py-1.5 bg-primary-100 text-primary-700 rounded-full text-sm font-bold">
                                {complaint.status}
                            </span>
                        </div>

                        <div className="relative flex justify-between items-start mb-14">
                            {/* Progress Line */}
                            <div className="absolute top-5 left-0 w-full h-1 bg-slate-100 -z-10"></div>
                            <div
                                className="absolute top-5 left-0 h-1 bg-primary-500 -z-10 transition-all duration-1000"
                                style={{ width: `${(getStatusIndex(complaint.status) / (statuses.length - 1)) * 100}%` }}
                            ></div>

                            {statuses.map((status, index) => {
                                const isActive = getStatusIndex(complaint.status) >= index;
                                return (
                                    <div key={status} className="flex flex-col items-center gap-3 max-w-[80px]">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${isActive ? 'bg-primary-600 text-white shadow-lg shadow-primary-200 ring-4 ring-primary-50' : 'bg-slate-100 text-slate-400'
                                            }`}>
                                            {index + 1 === statuses.length ? <CheckCircle2 size={20} /> : index + 1}
                                        </div>
                                        <span className={`text-[10px] sm:text-xs font-bold text-center leading-tight ${isActive ? 'text-primary-600' : 'text-slate-400'
                                            }`}>
                                            {status}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-100">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400">
                                    <Building2 size={24} />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">Assigned Department</p>
                                    <p className="text-slate-900 font-semibold">{complaint.assignedDepartment || 'Pending Assignment'}</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400">
                                    <AlertTriangle size={24} />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">Priority Level</p>
                                    <span className={`px-3 py-1 rounded-lg text-xs font-bold ${complaint.urgency === 'Urgent' ? 'bg-red-100 text-red-600' :
                                            complaint.urgency === 'High' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'
                                        }`}>
                                        {complaint.urgency}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Details Card */}
                    <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200 border border-slate-100">
                        <h3 className="text-xl font-bold text-slate-800 mb-6 font-primary">Complaint Details</h3>
                        <div className="flex flex-col md:flex-row gap-8">
                            {complaint.imageUrl && (
                                <div className="w-full md:w-64 h-48 md:h-auto rounded-2xl overflow-hidden bg-slate-100 shrink-0">
                                    <img src={complaint.imageUrl} alt="Evidence" className="w-full h-full object-cover" />
                                </div>
                            )}
                            <div className="space-y-4 flex-1">
                                <div>
                                    <h4 className="text-2xl font-bold text-slate-900 mb-2">{complaint.title}</h4>
                                    <p className="text-slate-600 leading-relaxed">{complaint.description}</p>
                                </div>
                                <div className="flex flex-wrap gap-4 pt-4">
                                    <div className="flex items-center gap-2 text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                                        <MapPin size={16} />
                                        <span className="text-sm">{complaint.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                                        <Calendar size={16} />
                                        <span className="text-sm">{new Date(complaint.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TrackComplaint;
