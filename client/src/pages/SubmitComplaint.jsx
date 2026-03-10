import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import {
    Send,
    MapPin,
    Image as ImageIcon,
    AlertCircle,
    Loader2,
    CheckCircle2
} from 'lucide-react';

const SubmitComplaint = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        imageUrl: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const { data } = await api.post('/complaints', formData);
            setSuccess(data);
            // Reset form
            setFormData({ title: '', description: '', location: '', imageUrl: '' });
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to submit complaint');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="max-w-2xl mx-auto text-center py-12 px-4">
                <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200 border border-slate-100">
                    <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                        <CheckCircle2 size={48} />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Complaint Submitted!</h2>
                    <p className="text-slate-600 mb-8 text-lg">
                        Your grievance has been successfully recorded. Please save your Complaint ID for tracking.
                    </p>
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 mb-8">
                        <p className="text-sm text-slate-500 uppercase font-bold tracking-wider mb-2">Complaint ID</p>
                        <p className="text-4xl font-mono font-bold text-primary-600 tracking-tighter">{success.complaintId}</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => navigate('/track')}
                            className="btn-primary"
                        >
                            Track Status
                        </button>
                        <button
                            onClick={() => setSuccess(null)}
                            className="btn-secondary"
                        >
                            Submit Another
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900">Report a Civic Issue</h1>
                <p className="text-slate-500 mt-2">Our AI will automatically categorize and assign your complaint to the right department.</p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200 border border-slate-100">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Complaint Title</label>
                        <input
                            type="text"
                            className="input-field"
                            placeholder="e.g., Large pothole on Main Street"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Description</label>
                        <textarea
                            className="input-field min-h-[120px]"
                            placeholder="Describe the issue in detail..."
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            required
                        ></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                <MapPin size={16} /> Location / Address
                            </label>
                            <input
                                type="text"
                                className="input-field"
                                placeholder="Sector 4, Near Clock Tower"
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                <ImageIcon size={16} /> Image URL (Optional)
                            </label>
                            <input
                                type="url"
                                className="input-field"
                                placeholder="https://example.com/image.jpg"
                                value={formData.imageUrl}
                                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-2xl flex gap-3 text-blue-600 border border-blue-100">
                        <AlertCircle className="shrink-0" size={20} />
                        <p className="text-sm">
                            <strong>Tip:</strong> Be specific in your description (e.g., use words like "leak", "power cut", "pothole") to help our AI assign it faster.
                        </p>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-500 p-4 rounded-xl text-sm font-medium border border-red-100">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary w-full flex items-center justify-center gap-2 py-4 text-lg"
                    >
                        {loading ? (
                            <Loader2 className="animate-spin" size={24} />
                        ) : (
                            <>
                                <Send size={24} />
                                Submit Grievance
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SubmitComplaint;
