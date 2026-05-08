import React from 'react';
import { Search, Menu, User, Bell, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ setIsSidebarOpen, searchTerm, setSearchTerm }) => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-30 px-6 py-4 flex items-center justify-between bg-paper border-b-2 border-ink shadow-[0_2px_0px_#121212]">
      <div className="flex items-center gap-4 flex-1">
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="lg:hidden p-2 bg-white border-2 border-ink shadow-[2px_2px_0px_#121212] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all"
        >
          <Menu size={20} className="stroke-[2.5px]" />
        </button>

        <div className="relative max-w-lg w-full group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-ink group-focus-within:text-neo-blue transition-colors stroke-[2.5px]" size={18} />
          <input 
            type="text"
            placeholder="Browse the archives..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-14 pr-6 py-3 bg-white border-2 border-ink shadow-[2px_2px_0px_#121212] focus:shadow-[4px_4px_0px_#FFD93D] outline-none transition-all font-black text-sm text-ink placeholder:text-ink/30 uppercase tracking-widest"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden md:flex flex-col items-end">
          <span className="text-[10px] font-black text-ink uppercase tracking-widest">Active Archival</span>
          <span className="text-[9px] font-black text-neo-green uppercase tracking-[0.2em] flex items-center gap-1">
            <Shield size={10} className="stroke-[2.5px]" />
            Ledger Locked
          </span>
        </div>
        
        <div className="flex items-center gap-4 pl-6 border-l-2 border-ink">
          <div className="w-10 h-10 bg-neo-orange border-2 border-ink text-ink flex items-center justify-center font-black text-lg shadow-[2px_2px_0px_#121212]">
            {user?.username?.charAt(0).toUpperCase() || 'A'}
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-black text-ink uppercase tracking-tighter">{user?.username || 'Archivist'}</p>
            <p className="text-[9px] text-ink/40 font-black uppercase tracking-widest">Offline Repository</p>
          </div>
        </div>
      </div>
    </header>


  );
};

export default Navbar;
