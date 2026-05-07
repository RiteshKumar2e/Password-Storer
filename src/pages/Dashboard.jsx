import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useVault } from '../context/VaultContext';
import { 
  Plus, Search, Shield, LayoutDashboard, User, Settings, 
  LogOut, Menu, X, PlusCircle, Trash2, Edit2, Copy, 
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
    <div className="min-h-screen bg-slate-50 flex text-slate-900">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <main className="flex-1 flex flex-col min-w-0">
        {/* Navbar */}
        <Navbar setIsSidebarOpen={setIsSidebarOpen} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {/* Dashboard Content */}
        <div className="p-8 md:p-12 max-w-7xl mx-auto w-full">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h1 className="text-4xl font-black mb-2 tracking-tight">My Vault</h1>
              <p className="text-slate-500 font-medium">Manage your secure digital identity.</p>
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black hover:bg-slate-800 transition-all shadow-2xl shadow-slate-900/10 active:scale-[0.98]"
            >
              <PlusCircle size={20} />
              Add New Password
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { label: 'Total Passwords', value: passwords.length, icon: <Key />, color: 'blue' },
              { label: 'Security Score', value: '94%', icon: <Shield />, color: 'green' },
              { label: 'Vault Status', value: 'Encrypted', icon: <PlusCircle />, color: 'purple' }
            ].map((stat, i) => (
              <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm stat-card-inner group hover:border-primary-500 transition-all cursor-default">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-4 bg-slate-50 text-slate-400 group-hover:bg-primary-600 group-hover:text-white rounded-2xl transition-all`}>
                    {stat.icon}
                  </div>
                  <span className="text-slate-400 font-black uppercase text-[10px] tracking-widest">{stat.label}</span>
                </div>
                <p className="text-5xl font-black tracking-tight">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* List Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between px-2 mb-6">
              <h2 className="text-2xl font-black tracking-tight">Password Collection</h2>
              <div className="px-4 py-1.5 bg-slate-100 rounded-full text-xs font-black text-slate-500 uppercase tracking-widest">
                {filteredPasswords.length} Entries
              </div>
            </div>

            {isLoading ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
              </div>
            ) : filteredPasswords.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
              <div className="bg-white border border-slate-100 rounded-[3rem] p-24 text-center shadow-sm">
                <div className="bg-slate-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
                   <Search className="text-slate-300 w-10 h-10" />
                </div>
                <h3 className="text-3xl font-black mb-3 tracking-tight">Vault is empty</h3>
                <p className="text-slate-500 max-w-sm mx-auto mb-10 font-medium">
                  {searchTerm ? `No results for "${searchTerm}"` : "You haven't added any passwords yet. Start securing your accounts today."}
                </p>
                {!searchTerm && (
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="px-10 py-4 bg-primary-600 text-white rounded-2xl font-black hover:bg-primary-700 transition-all shadow-2xl shadow-primary-500/20"
                  >
                    Create Your First Entry
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
