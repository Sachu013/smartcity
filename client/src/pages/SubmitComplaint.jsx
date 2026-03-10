import React, { useState } from 'react';
import {
    PlusCircle,
    MapPin,
    Type,
    FileText,
    Image as ImageIcon,
    CheckCircle,
    ArrowRight,
    ShieldAlert,
    HelpCircle,
    Sparkles,
    ChevronRight,
    Copy,
    Check
} from 'lucide-react';
import api from '../api';

const SubmitComplaint = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'Road',
        location: '',
        imageUrl: ''
    });
    const [loading, setLoading] = useState(false);
    const [submittedId, setSubmittedId] = useState(null);
    const [copied, setCopied] = useState(false);

    const categories = [
        { name: 'Garbage', icon: '🗑️' },
        { name: 'Road Damage', icon: '🛣️' },
        { name: 'Water Leakage', icon: '💧' },
        { name: 'Electricity', icon: '⚡' },
        { name: 'Street Light', icon: '💡' },
        { name: 'Other', icon: '📁' }
    ];

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await api.post('/complaints', formData);
            setSubmittedId(data.complaintId);
        } catch (error) {
            alert('Transmission Error: Deployment failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(submittedId);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (submittedId) {
        return (
            <div className="max-w-2xl mx-auto py-12 animate-in zoom-in duration-500">
                <div className="card-premium p-10 flex flex-col items-center text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                    <div className="w-24 h-24 bg-green-100 text-green-600 rounded-[2rem] flex items-center justify-center mb-8 shadow-lg shadow-green-200 animate-bounce">
                        <CheckCircle size={48} />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 font-display mb-4 tracking-tight">Report Initialized Successfully</h2>
                    <p className="text-slate-500 font-semibold mb-10 max-w-md leading-relaxed">
                        Your grievance has been encrypted and securely transmitted to the municipal command center. Use the ID below to track resolution progress.
                    </p>

                    <div className="w-full bg-slate-50 border border-slate-100 rounded-[2rem] p-8 mb-10 group relative">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2">Unique Tracking Identifier</p>
                        <div className="flex items-center justify-center gap-4">
                            <span className="text-4xl font-black text-primary-600 font-display tracking-tighter shimmer rounded-lg">{submittedId}</span>
                            <button
                                onClick={copyToClipboard}
                                className="p-3 text-slate-400 hover:text-primary-600 hover:bg-white rounded-xl transition-all shadow-sm"
                            >
                                {copied ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 w-full">
                        <button
                            onClick={() => setSubmittedId(null)}
                            className="btn-secondary flex-1 h-[60px]"
                        >
                            Draft Another Report
                        </button>
                        <a
                            href={`/track?id=${submittedId}`}
                            className="btn-primary flex-1 h-[60px]"
                        >
                            Access Tracking Vault
                            <ChevronRight size={20} />
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="grid lg:grid-cols-5 gap-10 items-start animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* Informative Sidebar */}
            <div className="lg:col-span-2 space-y-6">
                <div className="card-premium p-8 bg-gradient-to-br from-primary-600 to-primary-700 text-white border-none relative overflow-hidden">
                    <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6">
                            <ShieldAlert size={24} />
                        </div>
                        <h3 className="text-2xl font-black font-display mb-3 tracking-tight">Citizen Reporting Intelligence</h3>
                        <p className="text-primary-100 font-medium leading-relaxed mb-6 opacity-80">
                            Our AI-assisted platform automatically categorizes your reports and routes them to the highest priority response team within seconds.
                        </p>
                        <div className="space-y-3">
                            {['256-bit AES Encryption', 'Automatic Geolocation Tagging', 'Priority Node Routing'].map((t, i) => (
                                <div key={i} className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider">
                                    <div className="w-1.5 h-1.5 rounded-full bg-secondary-400"></div>
                                    {t}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="card-premium p-8">
                    <h4 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
                        <HelpCircle size={20} className="text-primary-500" />
                        Submission Guide
                    </h4>
                    <div className="space-y-6">
                        {[
                            { step: '01', title: 'Incident Title', desc: 'Clear, concise description of the observed civic anomaly.' },
                            { step: '02', title: 'Geo-Location', desc: 'Precise coordinates or physical address of the event.' },
                            { step: '03', title: 'Media Evidence', desc: 'Visual verification of the incident for faster processing.' }
                        ].map((item, i) => (
                            <div key={i} className="flex gap-4 group">
                                <span className="text-3xl font-black text-slate-100 group-hover:text-primary-50 transition-colors leading-none">{item.step}</span>
                                <div>
                                    <p className="font-bold text-slate-800 text-sm mb-1">{item.title}</p>
                                    <p className="text-xs text-slate-400 font-semibold leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Form */}
            <div className="lg:col-span-3 card-premium p-8 lg:p-12 relative overflow-hidden">
                <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                <Type size={14} className="text-primary-500" />
                                Incident Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                className="input-field"
                                placeholder="Ex: Main Road Maintenance Required"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                <Sparkles size={14} className="text-secondary-500" />
                                System Category
                            </label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                className="input-field appearance-none cursor-pointer"
                            >
                                {categories.map((cat) => (
                                    <option key={cat.name} value={cat.name}>
                                        {cat.icon} {cat.name} Tier
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <FileText size={14} className="text-primary-500" />
                            Incident Narrative
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            className="input-field min-h-[140px] py-4"
                            placeholder="Provide a detailed log of the observed issue..."
                            required
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                <MapPin size={14} className="text-primary-500" />
                                Geo-Location Coordinates
                            </label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleInputChange}
                                className="input-field"
                                placeholder="Ex: Sector 4, Civic Center Block A"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                <ImageIcon size={14} className="text-secondary-500" />
                                Evidence Payload (URL)
                            </label>
                            <input
                                type="text"
                                name="imageUrl"
                                value={formData.imageUrl}
                                onChange={handleInputChange}
                                className="input-field"
                                placeholder="https://evidence-storage.com/img.jpg"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full h-16 btn-primary group/btn !rounded-[2rem]"
                    >
                        {loading ? (
                            <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            <>
                                Confirm Transmission
                                <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>

                {/* Shimmer on bottom */}
                {loading && <div className="absolute bottom-0 left-0 w-full h-1 shimmer"></div>}
            </div>
        </div>
    );
};

export default SubmitComplaint;
