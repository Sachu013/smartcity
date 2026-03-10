import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    LayoutDashboard,
    PlusCircle,
    Search,
    LogOut,
    User,
    Menu,
    X,
    FileText,
    Home
} from 'lucide-react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const { userInfo, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const citizenLinks = [
        { name: 'Home', path: '/', icon: Home },
        { name: 'Report Issue', path: '/submit', icon: PlusCircle },
        { name: 'Track Complaint', path: '/track', icon: Search },
    ];

    const adminLinks = [
        { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
        { name: 'Manage Complaints', path: '/admin/manage', icon: FileText },
    ];

    const links = userInfo?.role === 'admin' ? adminLinks : citizenLinks;

    return (
        <>
            {/* Mobile Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
                    onClick={toggleSidebar}
                />
            )}

            <aside className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-slate-200 z-50 transition-transform duration-300 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-6">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">S</span>
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                            SmartCity
                        </span>
                    </Link>
                </div>

                <nav className="mt-6 px-4 space-y-2">
                    {links.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${location.pathname === link.path
                                    ? 'bg-primary-50 text-primary-600 font-semibold shadow-sm shadow-primary-100'
                                    : 'text-slate-600 hover:bg-slate-50'
                                }`}
                            onClick={() => toggleSidebar()}
                        >
                            <link.icon size={20} />
                            {link.name}
                        </Link>
                    ))}
                </nav>

                <div className="absolute bottom-8 left-0 w-full px-4">
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                                <User size={20} />
                            </div>
                            <div className="overflow-hidden">
                                <p className="font-semibold truncate">{userInfo?.name || 'Guest'}</p>
                                <p className="text-xs text-slate-500 capitalize">{userInfo?.role || 'Visitor'}</p>
                            </div>
                        </div>
                    </div>
                    {userInfo && (
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all font-semibold"
                        >
                            <LogOut size={20} />
                            Logout
                        </button>
                    )}
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
