import React, { useState, useEffect } from 'react';
import { X, Globe, User, Lock, FileText, Zap, Key, PlusCircle, Paperclip } from 'lucide-react';
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
          className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-lg bg-paper border-[3px] border-ink shadow-[12px_12px_0px_0px_#121212] overflow-hidden"
        >
          {/* Close Button - Absolute Top Right */}
          <button 
            onClick={onClose}
            className="absolute top-0 right-0 w-12 h-12 flex items-center justify-center bg-white border-l-[3px] border-b-[3px] border-ink hover:bg-neo-red hover:text-white transition-all z-30 group"
          >
            <X size={20} className="group-hover:rotate-90 transition-transform stroke-[3px]" />
          </button>

          <div className="p-10 relative bg-[url('/grid.png')] bg-repeat">
            <div className="flex justify-between items-start mb-10 border-b-[3px] border-ink pb-6">
              <div className="flex items-center gap-5">
                <div className="bg-neo-yellow p-4 border-[3px] border-ink shadow-[4px_4px_0px_#121212]">
                  <PlusCircle className="text-ink w-7 h-7 stroke-[3px]" />
                </div>
                <div>
                  <h2 className="text-3xl font-black tracking-tighter text-ink italic">{editingPassword ? 'Update Password' : 'Add New Password'}</h2>
                  <p className="text-ink/50 font-serif italic text-sm mt-1">Secure Entry v1.4</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-ink uppercase tracking-[0.2em]">Site Name</label>
                  <div className="relative">
                    <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-ink w-5 h-5 stroke-[2.5px]" />
                    <input 
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full pl-12 pr-4 py-3 bg-paper border-[3px] border-ink shadow-[4px_4px_0px_#121212] focus:shadow-[6px_6px_0px_#FFD93D] outline-none transition-all font-black text-xs text-ink placeholder:text-ink/30"
                      placeholder="E.G. GOOGLE"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-ink uppercase tracking-[0.2em]">Source URL</label>
                  <div className="relative">
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-ink w-5 h-5 stroke-[2.5px]" />
                    <input 
                      type="text"
                      value={formData.url}
                      onChange={(e) => setFormData({...formData, url: e.target.value})}
                      className="w-full pl-12 pr-4 py-3 bg-paper border-[3px] border-ink shadow-[4px_4px_0px_#121212] focus:shadow-[6px_6px_0px_#FFD93D] outline-none transition-all font-black text-xs text-ink placeholder:text-ink/30"
                      placeholder="google.com"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-ink uppercase tracking-[0.2em]">Username</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-ink w-5 h-5 stroke-[2.5px]" />
                  <input 
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                    className="w-full pl-12 pr-4 py-3 bg-paper border-[3px] border-ink shadow-[4px_4px_0px_#121212] focus:shadow-[6px_6px_0px_#FFD93D] outline-none transition-all font-black text-xs text-ink placeholder:text-ink/30"
                    placeholder="yourname@email.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-ink uppercase tracking-[0.2em]">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-ink w-5 h-5 stroke-[2.5px]" />
                  <input 
                    type="text"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full pl-12 pr-16 py-3 bg-paper border-[3px] border-ink shadow-[4px_4px_0px_#121212] focus:shadow-[6px_6px_0px_#FFD93D] outline-none transition-all font-black text-xs text-ink placeholder:text-ink/30 tracking-[0.2em]"
                    placeholder="Password"
                    required
                  />
                  <button 
                    type="button"
                    onClick={handleGenerate}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 bg-neo-yellow border-[3px] border-ink hover:bg-neo-blue hover:text-white transition-all shadow-[2px_2px_0px_#121212]"
                    title="Generate Strong Password"
                  >
                    <Zap size={18} className="stroke-[2.5px]" />
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-ink uppercase tracking-[0.2em]">Notes</label>
                <div className="relative">
                  <FileText className="absolute left-4 top-4 text-ink w-5 h-5 stroke-[2.5px]" />
                  <textarea 
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    className="w-full pl-12 pr-4 py-3 bg-paper border-[3px] border-ink shadow-[4px_4px_0px_#121212] focus:shadow-[6px_6px_0px_#FFD93D] outline-none transition-all font-serif italic text-base text-ink placeholder:text-ink/30 min-h-[100px]"
                    placeholder="Additional details..."
                  />
                </div>
              </div>

              <div className="pt-4 flex gap-4">
                <button 
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-4 bg-white border-[3px] border-ink text-ink font-black uppercase text-sm tracking-widest hover:bg-paper transition-all shadow-[4px_4px_0px_#121212] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#121212]"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-[2] py-4 bg-neo-green text-ink border-[3px] border-ink font-black text-lg uppercase tracking-widest hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all shadow-[6px_6px_0px_#121212] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#121212]"
                >
                  {editingPassword ? 'Update' : 'Save Password'}
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
