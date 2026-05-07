import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useVault } from '../context/VaultContext';
import { 
  Shield, User, Database, LogOut, ChevronRight, 
  Trash2, ShieldCheck, Key, Lock
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';

const Profile = () => {
  const { user, logout } = useAuth();
  const { passwords } = useVault();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex text-slate-900">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <main className="flex-1 flex flex-col min-w-0">
        <Navbar setIsSidebarOpen={setIsSidebarOpen} searchTerm="" setSearchTerm={() => {}} />
        
        <div className="p-8 md:p-12 max-w-4xl mx-auto w-full">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-4xl font-black mb-2 tracking-tight">Account Profile</h1>
            <p className="text-slate-500 font-medium">Manage your secure local vault and identity.</p>
          </motion.div>

          <div className="space-y-10">
            {/* Profile Header */}
            <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-10">
              <div className="w-32 h-32 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-2xl shadow-slate-900/20">
                 <User className="w-14 h-14" />
              </div>
              <div className="text-center md:text-left flex-1">
                <h2 className="text-3xl font-black mb-2 tracking-tight">Local Vault Identity</h2>
                <p className="font-mono text-slate-400 text-sm mb-6 tracking-tight overflow-hidden text-ellipsis whitespace-nowrap max-w-xs mx-auto md:mx-0">
                  {user?.id}
                </p>
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <span className="px-5 py-2 bg-green-50 text-green-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-green-100">
                    Vault Secure
                  </span>
                  <span className="px-5 py-2 bg-primary-50 text-primary-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-primary-100">
                    AES-256-GCM
                  </span>
                </div>
              </div>
              <button 
                onClick={logout}
                className="px-8 py-4 bg-slate-50 text-slate-600 rounded-2xl font-black hover:bg-slate-100 transition-all active:scale-[0.98]"
              >
                Sign Out
              </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm group">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-4 bg-primary-50 text-primary-600 rounded-2xl group-hover:bg-primary-600 group-hover:text-white transition-all">
                    <Database size={24} />
                  </div>
                  <h3 className="text-xl font-black tracking-tight">Vault Stats</h3>
                </div>
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">Total Entries</span>
                    <span className="font-black text-xl">{passwords.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">Encryption</span>
                    <span className="font-black text-xl">Enabled</span>
                  </div>
                  <div className="pt-2">
                    <div className="h-3 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                      <div className="h-full bg-primary-600 w-[15%] rounded-full"></div>
                    </div>
                    <div className="flex justify-between mt-3">
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Storage Capacity</p>
                      <p className="text-[10px] text-primary-600 font-black uppercase tracking-widest">15% Used</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm group">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    <Shield size={24} />
                  </div>
                  <h3 className="text-xl font-black tracking-tight">Security Check</h3>
                </div>
                <div className="space-y-5">
                  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-transparent group-hover:border-slate-100 transition-all">
                    <div className="w-2.5 h-2.5 bg-green-500 rounded-full shadow-[0_0_15px_rgba(34,197,94,0.4)]"></div>
                    <span className="text-sm font-black text-slate-700">Master Hash Verified</span>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-transparent group-hover:border-slate-100 transition-all">
                    <div className="w-2.5 h-2.5 bg-green-500 rounded-full shadow-[0_0_15px_rgba(34,197,94,0.4)]"></div>
                    <span className="text-sm font-black text-slate-700">Isolated Storage</span>
                  </div>
                  <button className="w-full mt-2 py-4 bg-slate-900 text-white rounded-2xl font-black hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 flex items-center justify-center gap-2">
                    Open Dashboard <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Warning Box */}
            <div className="bg-white border-2 border-red-100 rounded-[3rem] p-10 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:scale-110 transition-transform duration-700 pointer-events-none">
                  <Trash2 size={120} className="text-red-600" />
               </div>
               <div className="relative z-10">
                  <div className="flex items-center gap-3 text-red-600 mb-4">
                    <div className="p-2 bg-red-50 rounded-xl">
                      <Shield size={20} />
                    </div>
                    <h3 className="font-black text-2xl tracking-tight uppercase">Danger Zone</h3>
                  </div>
                  <p className="text-slate-500 font-medium mb-8 max-w-lg leading-relaxed">
                    Wiping your local vault is permanent. All passwords, settings, and identity data will be destroyed instantly. This action cannot be undone.
                  </p>
                  <button 
                    onClick={() => {
                      if (window.confirm('CRITICAL WARNING: This will permanently delete all your data. Are you absolutely sure?')) {
                        localStorage.clear();
                        window.location.href = '/';
                      }
                    }}
                    className="px-10 py-5 bg-red-600 text-white rounded-2xl font-black hover:bg-red-700 transition-all shadow-2xl shadow-red-500/25 active:scale-[0.98]"
                  >
                    Delete My Vault Forever
                  </button>
               </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
