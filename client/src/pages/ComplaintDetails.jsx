import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import {
    ArrowLeft,
    MapPin,
    Calendar,
    User,
    Building2,
    AlertTriangle,
    Loader2,
    CheckCircle2,
    Save,
    Trash2,
    UserCheck
} from 'lucide-react';

const ComplaintDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [complaint, setComplaint] = useState(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    // Edit states
    const [status, setStatus] = useState('');
    const [department, setDepartment] = useState('');
    const [urgency, setUrgency] = useState('');

    useEffect(() => {
        fetchDetail();
    }, [id]);

    const fetchDetail = async () => {
        try {
            const { data } = await api.get('/admin/complaints');
            const found = data.find(c => c._id === id);
            if (found) {
                setComplaint(found);
                setStatus(found.status);
                setDepartment(found.assignedDepartment || '');
                setUrgency(found.urgency);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async () => {
        setUpdating(true);
        try {
            await api.put(`/admin/complaints/${id}`, {
                status,
                assignedDepartment: department,
                urgency
            });
            navigate('/admin/manage');
        } catch (err) {
            alert('Failed to update');
        } finally {
            setUpdating(false);
        }
    };

    if (loading) return <div className="p-20 flex justify-center"><Loader2 className="animate-spin" /></div>;
    if (!complaint) return <div className="p-20 text-center">Complaint not found</div>;

    return (
        <div className="max-w-5xl mx-auto space-y-8 pb-12">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 hover:text-primary-600 font-bold transition-colors">
                <ArrowLeft size={20} /> Back to List
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Side: Info */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200 border border-slate-100">
                        <div className="flex justify-between items-start mb-6">
                            <span className="text-xs font-mono font-bold text-primary-600 bg-primary-50 px-3 py-1 rounded-lg">ID: {complaint.complaintId}</span>
                            <span className="text-xs text-slate-400 font-bold uppercase">{new Date(complaint.createdAt).toLocaleString()}</span>
                        </div>
                        <h1 className="text-3xl font-bold text-slate-900 mb-4 font-primary">{complaint.title}</h1>
                        <p className="text-slate-600 leading-relaxed text-lg mb-8">{complaint.description}</p>

                        <div className="grid grid-cols-2 gap-4 pb-8 border-b border-slate-100">
                            <div className="flex items-center gap-3 text-slate-500">
                                <MapPin size={18} />
                                <span className="text-sm font-semibold">{complaint.location}</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-500">
                                <User size={18} />
                                <span className="text-sm font-semibold">{complaint.user?.name} ({complaint.user?.email})</span>
                            </div>
                        </div>

                        {complaint.imageUrl && (
                            <div className="mt-8 rounded-2xl overflow-hidden bg-slate-50">
                                <img src={complaint.imageUrl} alt="Issue" className="w-full max-h-[400px] object-contain" />
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Side: Actions */}
                <div className="space-y-8">
                    <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200 border border-slate-100 sticky top-24">
                        <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2 font-primary">
                            <UserCheck size={24} className="text-primary-600" /> Resolution Action
                        </h3>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-slate-400 tracking-widest">Update Status</label>
                                <select
                                    className="input-field bg-slate-50"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                >
                                    <option value="Submitted">Submitted</option>
                                    <option value="Under Review">Under Review</option>
                                    <option value="Assigned to Department">Assigned to Department</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Resolved">Resolved</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-slate-400 tracking-widest">Assigned Department</label>
                                <input
                                    type="text"
                                    className="input-field bg-slate-50"
                                    placeholder="e.g. Sanitation Dept"
                                    value={department}
                                    onChange={(e) => setDepartment(e.target.value)}
                                />
                                <p className="text-[10px] text-blue-500 font-bold mt-1 uppercase">AI Suggestion: {complaint.assignedDepartment}</p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-slate-400 tracking-widest">Priority</label>
                                <select
                                    className="input-field bg-slate-50"
                                    value={urgency}
                                    onChange={(e) => setUrgency(e.target.value)}
                                >
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                    <option value="Urgent">Urgent</option>
                                </select>
                            </div>

                            <button
                                onClick={handleUpdate}
                                disabled={updating}
                                className="btn-primary w-full py-4 flex items-center justify-center gap-2"
                            >
                                {updating ? <Loader2 className="animate-spin" /> : <Save size={20} />}
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ComplaintDetails;
