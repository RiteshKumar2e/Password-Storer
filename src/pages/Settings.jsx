import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { 
  Shield, Bell, Palette, Lock, Eye, 
  ChevronRight, Sparkles, Monitor, Smartphone,
  Database, Globe, Users, MessageCircle
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
      title: 'Import & Export',
      desc: 'Move your data securely between different password managers.',
      icon: <Database size={24} />,
      color: 'bg-orange-50 text-orange-600'
    },
    {
      title: 'Browser Extension',
      desc: 'Integrate SecureVault directly into your web browser for autofill.',
      icon: <Globe size={24} />,
      color: 'bg-sky-50 text-sky-600'
    },
    {
      title: 'Emergency Access',
      desc: 'Designate trusted contacts who can access your vault if needed.',
      icon: <Users size={24} />,
      color: 'bg-red-50 text-red-600'
    },
    {
      title: 'Privacy',
      desc: 'Control what data is visible and manage local activity logs.',
      icon: <Eye size={24} />,
      color: 'bg-emerald-50 text-emerald-600'
    },
    {
      title: 'Two-Factor Auth',
      desc: 'Add an extra layer of security with mobile authenticator apps.',
      icon: <Smartphone size={24} />,
      color: 'bg-yellow-50 text-yellow-600'
    },
    {
      title: 'Help & Support',
      desc: 'Access documentation, tutorials, and contact our support team.',
      icon: <MessageCircle size={24} />,
      color: 'bg-slate-50 text-slate-600'
    }
  ];

  return (
    <div className="min-h-screen bg-paper flex text-ink font-sans">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <main className="flex-1 flex flex-col min-w-0 border-l-2 border-ink">
        <Navbar setIsSidebarOpen={setIsSidebarOpen} searchTerm="" setSearchTerm={() => {}} />

        <div className="p-6 md:p-10 max-w-4xl mx-auto w-full">
          <div className="mb-10">
            <h1 className="text-4xl font-black mb-1 tracking-tighter uppercase italic">Settings</h1>
            <p className="text-ink/60 font-serif italic text-lg">"Configuring the archival protocols and vault behaviors."</p>
          </div>

          <div className="space-y-6">
            {sections.map((section, i) => (
              <motion.div 
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white p-6 border-2 border-ink shadow-[4px_4px_0px_0px_#121212] group flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_0px_#121212] transition-all cursor-default"
              >
                <div className="flex items-center gap-6">
                  <div className={`p-4 ${i % 3 === 0 ? 'bg-neo-yellow' : i % 3 === 1 ? 'bg-neo-blue text-white' : 'bg-neo-green'} border-2 border-ink shadow-[2px_2px_0px_#121212] group-hover:translate-x-[-1px] group-hover:translate-y-[-1px] transition-transform`}>
                    {React.cloneElement(section.icon, { size: 24, className: "stroke-[2.5px]" })}
                  </div>
                  <div>
                    <h3 className="text-xl font-black mb-1 tracking-tighter uppercase italic">{section.title}</h3>
                    <p className="text-ink/60 font-serif italic text-base leading-snug">"{section.desc}"</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 w-full md:w-auto justify-end">
                  <span className="px-4 py-1 bg-ink text-white border-2 border-ink text-[9px] font-black uppercase tracking-widest shadow-[2px_2px_0px_#121212]">
                    Restricted Access
                  </span>
                  <ChevronRight size={18} className="text-ink/20 group-hover:text-ink transition-colors stroke-[2.5px]" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Sync Promo */}
          <div className="mt-12 bg-neo-yellow border-2 border-ink p-8 shadow-[6px_6px_0px_0px_#121212] relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-700 pointer-events-none">
              <Monitor size={120} className="stroke-[2.5px]" />
            </div>
            <div className="relative z-10">
              <div className="flex gap-2 mb-4">
                <Monitor size={20} className="stroke-[2.5px]" />
                <ChevronRight size={20} className="text-ink/30 stroke-[2.5px]" />
                <Smartphone size={20} className="stroke-[2.5px]" />
              </div>
              <h3 className="text-2xl font-black mb-2 tracking-tighter uppercase italic">Cross-Device Manuscript Sync</h3>
              <p className="text-ink font-serif italic text-lg max-w-lg leading-snug">
                "We are finalizing a peer-to-peer cryptographic sync system that preserves your archival local-first sovereignty while bridging multiple devices."
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>

  );
};

export default Settings;
