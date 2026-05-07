import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { 
  Shield, Bell, Palette, Lock, Eye, 
  ChevronRight, Sparkles, Monitor, Smartphone
} from 'lucide-react';
import { motion } from 'framer-motion';

const Settings = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const sections = [
    {
      title: 'Security',
      desc: 'Auto-logout, encryption settings, and master key management.',
      icon: <Shield size={24} />,
      color: 'bg-blue-50 text-blue-600'
    },
    {
      title: 'Notifications',
      desc: 'Manage alerts for password expiration and security breaches.',
      icon: <Bell size={24} />,
      color: 'bg-purple-50 text-purple-600'
    },
    {
      title: 'Appearance',
      desc: 'Customize dashboard layout and interface density.',
      icon: <Palette size={24} />,
      color: 'bg-pink-50 text-pink-600'
    },
    {
      title: 'Privacy',
      desc: 'Control what data is visible and manage local storage.',
      icon: <Eye size={24} />,
      color: 'bg-emerald-50 text-emerald-600'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex text-slate-900">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <main className="flex-1 flex flex-col min-w-0">
        <Navbar setIsSidebarOpen={setIsSidebarOpen} searchTerm="" setSearchTerm={() => {}} />

        <div className="p-8 md:p-12 max-w-4xl mx-auto w-full">
          <div className="mb-12">
            <h1 className="text-4xl font-black mb-2 tracking-tight">Settings</h1>
            <p className="text-slate-500 font-medium">Configure your SecureVault preferences.</p>
          </div>

          <div className="space-y-6">
            {sections.map((section, i) => (
              <motion.div 
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:border-primary-500 transition-all group relative overflow-hidden"
              >
                <div className="flex items-center justify-between gap-6">
                  <div className="flex items-center gap-6">
                    <div className={`p-4 ${section.color} rounded-2xl group-hover:scale-110 transition-transform`}>
                      {section.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-black mb-1 tracking-tight">{section.title}</h3>
                      <p className="text-slate-500 text-sm font-medium">{section.desc}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="px-4 py-1.5 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest">
                      Coming Soon
                    </span>
                    <ChevronRight size={20} className="text-slate-300 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Device Sync Promo */}
          <div className="mt-12 bg-primary-600 rounded-[3rem] p-10 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:rotate-12 transition-transform duration-700">
              <Sparkles size={140} />
            </div>
            <div className="relative z-10">
              <div className="flex gap-2 mb-6">
                <Monitor size={24} />
                <ChevronRight size={24} className="text-primary-300" />
                <Smartphone size={24} />
              </div>
              <h3 className="text-3xl font-black mb-3 tracking-tight">Cross-Device Syncing</h3>
              <p className="text-primary-100 max-w-md font-medium leading-relaxed">
                We're working on a peer-to-peer encrypted sync system that keeps your data local while sharing it across your devices.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
