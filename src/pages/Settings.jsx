import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { Settings as SettingsIcon, Bell, Shield, Eye, Palette } from 'lucide-react';
import { motion } from 'framer-motion';

const Settings = () => {
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
            <h1 className="text-4xl font-black mb-2">Settings</h1>
            <p className="text-slate-500">Configure your SecureVault preferences.</p>
          </motion.div>

          <div className="space-y-6">
            {[
              { icon: <Shield />, title: 'Security', desc: 'Auto-logout, encryption settings, and master key management.' },
              { icon: <Bell />, title: 'Notifications', desc: 'Manage alerts for password expiration and security breaches.' },
              { icon: <Palette />, title: 'Appearance', desc: 'Toggle dark mode and customize dashboard layout.' },
              { icon: <Eye />, title: 'Privacy', desc: 'Control what data is visible and manage local storage.' }
            ].map((item, i) => (
              <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-6 hover:border-primary-500 transition-all cursor-not-allowed opacity-60">
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl text-slate-500">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <p className="text-slate-500 text-sm">{item.desc}</p>
                </div>
                <span className="text-[10px] font-black bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full uppercase tracking-widest text-slate-400">Coming Soon</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
