import React from 'react';
import { Search, Menu, User, Bell, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ setIsSidebarOpen, searchTerm, setSearchTerm }) => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-30 nav-blur px-8 py-4 flex items-center justify-between bg-white/80 backdrop-blur-xl border-b border-slate-100">
      <div className="flex items-center gap-4 flex-1">
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="lg:hidden p-3 hover:bg-slate-50 rounded-2xl text-slate-500 transition-all"
        >
          <Menu size={24} />
        </button>

        <div className="relative max-w-md w-full group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-600 transition-colors" size={18} />
          <input 
            type="text"
            placeholder="Search your vault..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-14 pr-6 py-3.5 bg-slate-50 border border-transparent rounded-2xl focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/5 outline-none transition-all font-medium text-slate-900 placeholder:text-slate-400"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden md:flex flex-col items-end">
          <span className="text-sm font-black text-slate-900">Vault Session</span>
          <span className="text-[10px] font-black text-primary-600 uppercase tracking-widest flex items-center gap-1">
            <Shield size={10} />
            Master Key Active
          </span>
        </div>
        
        <div className="flex items-center gap-3 pl-4 border-l border-slate-100">
          <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-black text-lg shadow-xl shadow-slate-900/10">
            {user?.username?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-black text-slate-900">{user?.username || 'User'}</p>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Local Mode</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
