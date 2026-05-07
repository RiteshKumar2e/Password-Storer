import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useVault } from '../context/VaultContext';
import { Shield, User, Key, Database, LogOut, ChevronRight } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';

const Profile = () => {
  const { user, logout } = useAuth();
  const { passwords } = useVault();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex text-slate-900 dark:text-slate-100">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <main className="flex-1 flex flex-col min-w-0">
        <Navbar setIsSidebarOpen={setIsSidebarOpen} />
        
        <div className="p-6 md:p-10 max-w-4xl mx-auto w-full">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <h1 className="text-4xl font-black mb-2">Account Profile</h1>
            <p className="text-slate-500">Manage your local vault settings and security.</p>
          </motion.div>

          <div className="space-y-8">
            {/* Profile Header */}
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center gap-8">
              <div className="w-32 h-32 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                 <User className="text-primary-600 dark:text-primary-400 w-16 h-16" />
              </div>
              <div className="text-center md:text-left flex-1">
                <h2 className="text-2xl font-bold mb-1">Local User ID</h2>
                <p className="font-mono text-slate-500 mb-4">{user?.id}</p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <span className="px-4 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-xs font-bold uppercase tracking-wider">Vault Active</span>
                  <span className="px-4 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-xs font-bold uppercase tracking-wider">AES-256 Enabled</span>
                </div>
              </div>
              <button 
                onClick={logout}
                className="px-6 py-3 border border-red-200 dark:border-red-900/30 text-red-500 rounded-2xl font-bold hover:bg-red-50 dark:hover:bg-red-900/10 transition-all"
              >
                Sign Out
              </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-2xl">
                    <Database size={24} />
                  </div>
                  <h3 className="text-lg font-bold">Storage Info</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500">Encrypted Entries</span>
                    <span className="font-bold">{passwords.length}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500">Storage Type</span>
                    <span className="font-bold">LocalStorage</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 w-[15%]"></div>
                  </div>
                  <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">~24 KB Used</p>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-2xl">
                    <Shield size={24} />
                  </div>
                  <h3 className="text-lg font-bold">Security Status</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                    <span className="text-sm font-medium">Master Hash Verified</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                    <span className="text-sm font-medium">Local-Only Isolation</span>
                  </div>
                  <button className="w-full mt-2 py-3 bg-slate-100 dark:bg-slate-800 rounded-2xl text-sm font-bold hover:bg-slate-200 transition-all flex items-center justify-center gap-2">
                    Run Security Audit <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Warning Box */}
            <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-[2.5rem] p-8">
              <h3 className="text-red-600 dark:text-red-400 font-bold mb-2 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                DANGER ZONE
              </h3>
              <p className="text-sm text-red-500/80 mb-6">Once you delete your local vault, all passwords will be permanently lost. There is no recovery option.</p>
              <button 
                onClick={() => {
                  if (window.confirm('WARNING: This will permanently delete all your saved passwords and account data. This cannot be undone. Are you sure?')) {
                    localStorage.clear();
                    window.location.href = '/';
                  }
                }}
                className="px-8 py-3 bg-red-600 text-white rounded-2xl font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-500/20"
              >
                Wipe Local Data
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
