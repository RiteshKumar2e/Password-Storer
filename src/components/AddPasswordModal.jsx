import React, { useState, useEffect } from 'react';
import { X, Globe, User, Lock, FileText, Zap, Key } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVault } from '../context/VaultContext';
import { generateStrongPassword } from '../utils/crypto';
import toast from 'react-hot-toast';

const AddPasswordModal = ({ isOpen, onClose, editingPassword }) => {
  const { addPassword, updatePassword } = useVault();
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    username: '',
    password: '',
    notes: ''
  });

  useEffect(() => {
    if (editingPassword) {
      setFormData({
        name: editingPassword.name,
        url: editingPassword.url,
        username: editingPassword.username,
        password: editingPassword.password,
        notes: editingPassword.notes || ''
      });
    } else {
      setFormData({
        name: '',
        url: '',
        username: '',
        password: '',
        notes: ''
      });
    }
  }, [editingPassword, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingPassword) {
      updatePassword(editingPassword.id, formData);
    } else {
      addPassword(formData);
    }
    onClose();
  };

  const handleGenerate = () => {
    const pwd = generateStrongPassword(16);
    setFormData({ ...formData, password: pwd });
    toast.success('Generated strong password!');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative bg-white w-full max-w-xl rounded-[3rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] border border-slate-100 overflow-hidden"
        >
          <div className="p-10">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h2 className="text-3xl font-black tracking-tight text-slate-900">{editingPassword ? 'Edit Entry' : 'Add New Item'}</h2>
                <p className="text-slate-500 font-medium">All sensitive fields are encrypted locally.</p>
              </div>
              <button 
                onClick={onClose}
                className="p-4 hover:bg-slate-50 rounded-2xl text-slate-400 transition-all"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Website Name</label>
                  <div className="relative">
                    <Key className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input 
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full pl-14 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary-500 outline-none transition-all font-medium text-slate-900 placeholder:text-slate-400"
                      placeholder="e.g. Google"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Website URL</label>
                  <div className="relative">
                    <Globe className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input 
                      type="text"
                      value={formData.url}
                      onChange={(e) => setFormData({...formData, url: e.target.value})}
                      className="w-full pl-14 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary-500 outline-none transition-all font-medium text-slate-900 placeholder:text-slate-400"
                      placeholder="google.com"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Username / Email</label>
                <div className="relative">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input 
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                    className="w-full pl-14 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary-500 outline-none transition-all font-medium text-slate-900 placeholder:text-slate-400"
                    placeholder="Enter login id"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input 
                    type="text"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full pl-14 pr-16 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary-500 outline-none transition-all font-medium text-slate-900 placeholder:text-slate-400"
                    placeholder="Enter secret"
                    required
                  />
                  <button 
                    type="button"
                    onClick={handleGenerate}
                    className="absolute right-5 top-1/2 -translate-y-1/2 p-2 hover:bg-primary-50 text-primary-600 rounded-xl transition-all"
                    title="Generate Strong Password"
                  >
                    <Zap size={20} />
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Notes (Optional)</label>
                <div className="relative">
                  <FileText className="absolute left-5 top-5 text-slate-400 w-5 h-5" />
                  <textarea 
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    className="w-full pl-14 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary-500 outline-none transition-all font-medium text-slate-900 placeholder:text-slate-400 min-h-[120px]"
                    placeholder="Extra notes..."
                  />
                </div>
              </div>

              <div className="pt-6 flex gap-4">
                <button 
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-5 bg-slate-100 text-slate-600 rounded-2xl font-black hover:bg-slate-200 transition-all active:scale-[0.98]"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-[2] py-5 bg-primary-600 text-white rounded-2xl font-black text-lg hover:bg-primary-700 transition-all shadow-2xl shadow-primary-500/25 active:scale-[0.98]"
                >
                  {editingPassword ? 'Update Entry' : 'Securely Save'}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AddPasswordModal;
