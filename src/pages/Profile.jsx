import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useVault } from '../context/VaultContext';
import { 
  Shield, User, Database, LogOut, ChevronRight, 
  Trash2, ShieldCheck, Key, Lock, Pencil
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { motion, AnimatePresence } from 'framer-motion';

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout, updateUsername } = useAuth();
  const { passwords } = useVault();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [newUsername, setNewUsername] = React.useState(user?.username || '');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    if (newUsername.trim()) {
      updateUsername(newUsername.trim());
      setIsEditModalOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-paper flex text-ink font-sans">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <main className="flex-1 flex flex-col min-w-0 bg-paper relative">
        <Navbar setIsSidebarOpen={setIsSidebarOpen} searchTerm="" setSearchTerm={() => {}} />
        
        {/* Book Gutter Shadow */}
        <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/5 to-transparent pointer-events-none z-10" />

        <div className="p-3 sm:p-6 md:p-10 max-w-4xl mx-auto w-full relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="mb-6 sm:mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b-4 border-ink pb-6 sm:pb-8 relative">
            {/* Secure Badge */}
            <div className="absolute -top-4 -right-4 border-4 border-neo-green px-4 py-2 rotate-[15deg] opacity-20 pointer-events-none hidden md:block">
              <span className="text-2xl font-black text-neo-green uppercase tracking-widest">Secure</span>
            </div>

            <div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 mb-1">
                <span className="px-2 py-0.5 bg-ink text-white text-[10px] font-black uppercase tracking-widest">User ID: {user?.id?.slice(0,8) || '0000'}</span>
                <h1 className="text-3xl md:text-4xl font-black tracking-tighter uppercase italic break-words">Account Profile</h1>
              </div>
              <p className="text-ink/60 font-serif italic text-lg leading-none">"View and manage your account details and security metrics."</p>
            </div>
            <button 
              onClick={() => setIsEditModalOpen(true)}
              className="px-6 py-3 bg-white border-2 border-ink font-black uppercase text-xs tracking-widest hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all shadow-[4px_4px_0px_#121212] flex items-center justify-center gap-2 w-full md:w-auto mt-4 md:mt-0"
            >
              <Pencil size={16} className="text-ink stroke-[2.5px]" />
              Edit Profile
            </button>
            </div>
          </motion.div>

          <div className="space-y-10">
            {/* Profile Header */}
            <div className="bg-white border-2 border-ink p-8 shadow-[6px_6px_0px_0px_#121212] flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 opacity-5 pointer-events-none p-8">
                <Shield size={100} />
              </div>
              <div className="relative group cursor-pointer" onClick={() => setIsEditModalOpen(true)}>
                <div className="w-24 h-24 bg-neo-yellow border-2 border-ink flex items-center justify-center shadow-[3px_3px_0px_#121212] group-hover:translate-x-[-1px] group-hover:translate-y-[-1px] transition-all">
                   <User className="w-12 h-12 text-ink stroke-[2.5px]" />
                </div>
              </div>
              <div className="text-center md:text-left flex-1">
                <h2 className="text-2xl font-black mb-2 tracking-tighter uppercase italic">{user?.username || 'Local Account'}</h2>
                <p className="font-mono bg-paper border border-ink px-2 py-0.5 inline-block text-ink/40 text-[10px] mb-6 tracking-widest uppercase">
                  Account ID: {user?.id}
                </p>
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <span className="px-4 py-1.5 bg-neo-green text-ink border-2 border-ink font-black uppercase text-[10px] tracking-widest shadow-[2px_2px_0px_#121212]">
                    Status: Active
                  </span>
                  <span className="px-4 py-1.5 bg-neo-blue text-white border-2 border-ink font-black uppercase text-[10px] tracking-widest shadow-[2px_2px_0px_#121212]">
                    AES-256-GCM Locked
                  </span>
                </div>
              </div>
              <button 
                onClick={handleLogout}
                className="px-6 py-3 bg-white border-2 border-ink text-ink font-black uppercase text-xs tracking-widest hover:bg-neo-red hover:text-white transition-all shadow-[4px_4px_0px_#121212] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#121212] w-full md:w-auto mt-6 md:mt-0"
              >
                Logout
              </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white border-2 border-ink p-8 shadow-[4px_4px_0px_0px_#121212] group">
                <div className="flex items-center gap-4 mb-8 border-b-2 border-ink pb-4">
                  <div className="p-3 bg-neo-orange border-2 border-ink shadow-[2px_2px_0px_#121212]">
                    <Database size={20} className="text-ink stroke-[2.5px]" />
                  </div>
                  <h3 className="text-xl font-black tracking-tighter uppercase italic">Ledger Metadata</h3>
                </div>
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-ink font-black text-[10px] uppercase tracking-[0.2em]">Archived Pages</span>
                    <span className="font-black text-2xl font-serif italic">{passwords.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-ink font-black text-[10px] uppercase tracking-[0.2em]">Archive Status</span>
                    <span className="font-black text-2xl font-serif italic text-neo-green">ENCRYPTED</span>
                  </div>
                  <div className="pt-2">
                    <div className="h-4 w-full bg-paper border-2 border-ink shadow-[2px_2px_0px_#121212] overflow-hidden p-0.5">
                      <div className="h-full bg-neo-blue border-r border-ink" style={{ width: '15%' }}></div>
                    </div>
                    <div className="flex justify-between mt-4">
                      <p className="text-[9px] text-ink font-black uppercase tracking-[0.2em]">Storage Footprint</p>
                      <p className="text-[9px] text-neo-blue font-black uppercase tracking-[0.2em]">15% OCCUPIED</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border-2 border-ink p-8 shadow-[4px_4px_0px_0px_#121212] group">
                <div className="flex items-center gap-4 mb-8 border-b-2 border-ink pb-4">
                  <div className="p-3 bg-neo-green border-2 border-ink shadow-[2px_2px_0px_#121212]">
                    <Shield size={20} className="text-ink stroke-[2.5px]" />
                  </div>
                  <h3 className="text-xl font-black tracking-tighter uppercase italic">Security Audit</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-paper border-2 border-ink shadow-[2px_2px_0px_#121212]">
                    <div className="w-3 h-3 bg-neo-green border border-ink shadow-[1px_1px_0px_#121212]"></div>
                    <span className="text-xs font-black text-ink uppercase tracking-wider">Master Hash Verified</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-paper border-2 border-ink shadow-[2px_2px_0px_#121212]">
                    <div className="w-3 h-3 bg-neo-green border border-ink shadow-[1px_1px_0px_#121212]"></div>
                    <span className="text-xs font-black text-ink uppercase tracking-wider">Isolated Repository</span>
                  </div>
                  <button className="w-full mt-4 py-4 bg-ink text-white border-2 border-ink font-black uppercase text-xs tracking-widest hover:bg-neo-blue transition-all shadow-[4px_4px_0px_#121212] flex items-center justify-center gap-2 active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#121212]">
                    Analyze Vault <ChevronRight size={18} className="stroke-[2.5px]" />
                  </button>
                </div>
              </div>
            </div>


          </div>
        </div>
      </main>
      <AnimatePresence>
        {isEditModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditModalOpen(false)}
              className="fixed inset-0 bg-ink/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-md border-2 border-ink p-8 shadow-[10px_10px_0px_0px_#121212]"
            >
              <h3 className="text-2xl font-black mb-2 tracking-tighter uppercase italic">Amend Identity</h3>
              <p className="text-ink/60 font-serif italic text-base mb-8">"Update your archival display name."</p>
              
              <form onSubmit={handleUpdateProfile} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-ink uppercase tracking-[0.2em] ml-1">New Alias</label>
                  <input 
                    type="text"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    className="w-full px-6 py-4 bg-paper border-2 border-ink shadow-[3px_3px_0px_#121212] focus:shadow-[6px_6px_0px_#FFD93D] outline-none transition-all font-black text-xs text-ink uppercase tracking-widest"
                    placeholder="Enter Alias"
                    autoFocus
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button 
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="flex-1 py-4 bg-white border-2 border-ink text-ink font-black uppercase text-xs tracking-widest hover:bg-paper transition-all"
                  >
                    Abort
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 py-4 bg-neo-yellow border-2 border-ink text-ink font-black uppercase text-xs tracking-widest hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all shadow-[4px_4px_0px_#121212]"
                  >
                    Confirm Change
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>


  );
};

export default Profile;
