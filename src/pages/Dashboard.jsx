import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useVault } from '../context/VaultContext';
import { 
  Plus, Search, Shield, LayoutDashboard, User, Settings, 
  LogOut, Menu, X, PlusCircle, Trash2, Pencil, Copy, 
  ExternalLink, Eye, EyeOff, Key
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import AddPasswordModal from '../components/AddPasswordModal';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import PasswordCard from '../components/PasswordCard';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const { passwords, deletePassword, isLoading } = useVault();
  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPassword, setEditingPassword] = useState(null);

  const filteredPasswords = passwords.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (password) => {
    setEditingPassword(password);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingPassword(null);
  };

  return (
    <div className="min-h-screen bg-paper flex text-ink font-sans">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <main className="flex-1 flex flex-col min-w-0 bg-paper relative">
        {/* Navbar */}
        <Navbar setIsSidebarOpen={setIsSidebarOpen} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        
        {/* Book Gutter Shadow (Desktop) */}
        <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/5 to-transparent pointer-events-none z-10" />

        {/* Dashboard Content */}
        <div className="p-6 md:p-10 max-w-7xl mx-auto w-full relative">
          <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end border-b-2 border-ink pb-4 gap-4">
            <div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 mb-1">
                <span className="px-2 py-0.5 bg-ink text-white text-[10px] font-black uppercase tracking-widest">Section 01</span>
                <h1 className="text-3xl md:text-4xl font-black tracking-tighter uppercase italic break-words">Password Vault</h1>
              </div>
              <p className="text-ink/60 font-serif italic text-lg leading-none">"Manage and secure your digital credentials safely."</p>
            </div>
            <div className="hidden md:block text-right">
              <span className="text-[10px] font-black uppercase tracking-widest text-ink/30 block">Last Updated: 2024.IV</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-ink/30 block">Total: {passwords.length} Passwords</span>
            </div>
          </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-neo-yellow text-ink border-2 border-ink font-black uppercase tracking-wider hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all shadow-[4px_4px_0px_#121212] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#121212] mb-10 w-full md:w-auto"
            >
              <PlusCircle size={20} className="stroke-[2.5px]" />
              Add Password
            </button>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              { label: 'Total Passwords', value: passwords.length, icon: <Key />, color: 'bg-neo-blue' },
              { label: 'Security Score', value: '94%', icon: <Shield />, color: 'bg-neo-green' },
              { label: 'Vault Status', value: 'Protected', icon: <PlusCircle />, color: 'bg-neo-orange' }
            ].map((stat, i) => (
              <div key={i} className="bg-white border-2 border-ink p-6 shadow-[4px_4px_0px_0px_#121212] group hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_0px_#121212] transition-all cursor-default">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-3 ${stat.color} border-2 border-ink shadow-[2px_2px_0px_#121212]`}>
                    {React.cloneElement(stat.icon, { className: "w-5 h-5 text-ink stroke-[2.5px]" })}
                  </div>
                  <span className="text-ink font-black uppercase text-[10px] tracking-[0.2em]">{stat.label}</span>
                </div>
                <p className="text-4xl font-black tracking-tighter font-serif italic">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* List Section */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-2 mb-8 border-b-2 border-ink pb-4 gap-4">
              <h2 className="text-xl md:text-2xl font-black tracking-tighter uppercase">Password List</h2>
              <div className="px-4 py-1 bg-neo-yellow border-2 border-ink font-black text-ink uppercase text-xs tracking-widest shadow-[2px_2px_0px_#121212]">
                {filteredPasswords.length} Records
              </div>
            </div>

            {isLoading ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin h-12 w-12 border-4 border-neo-blue border-t-ink"></div>
              </div>
            ) : filteredPasswords.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode='popLayout'>
                  {filteredPasswords.map((password) => (
                    <PasswordCard 
                      key={password.id} 
                      password={password} 
                      onEdit={handleEdit}
                      onDelete={deletePassword}
                    />
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="bg-white border-2 border-ink p-16 text-center shadow-[6px_6px_0px_0px_#121212] relative">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/notebook.png')]"></div>
                <div className="bg-paper w-20 h-20 border-2 border-ink flex items-center justify-center mx-auto mb-6 shadow-[3px_3px_0px_#121212]">
                   <Search className="text-ink w-8 h-8 stroke-[2.5px]" />
                </div>
                <h3 className="text-2xl font-black mb-2 tracking-tighter uppercase">Your Vault is Empty</h3>
                <p className="text-ink/60 max-w-md mx-auto mb-8 font-serif italic text-lg">
                  {searchTerm ? `No passwords matching "${searchTerm}" found.` : "You haven't saved any passwords yet. Start by adding your first one today."}
                </p>
                {!searchTerm && (
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="px-8 py-3 bg-neo-green text-ink border-2 border-ink font-black uppercase tracking-widest hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all shadow-[4px_4px_0px_#121212]"
                  >
                    Start New Ledger
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </main>



      <AddPasswordModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        editingPassword={editingPassword}
      />
    </div>
  );
};

export default Dashboard;
