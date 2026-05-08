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
          className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative bg-white w-full max-w-xl border-2 border-ink shadow-[8px_8px_0px_0px_#121212] overflow-hidden"
        >
          <div className="p-8 relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-neo-yellow border-b-2 border-ink"></div>
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-2xl font-black tracking-tighter text-ink uppercase italic">{editingPassword ? 'Amend Ledger Entry' : 'New Archive Record'}</h2>
                <p className="text-ink/50 font-serif italic text-base mt-1">"Recording cryptographic data into local storage."</p>
              </div>
              <button 
                onClick={onClose}
                className="p-3 bg-white border-2 border-ink hover:bg-neo-red hover:text-white transition-all shadow-[2px_2px_0px_#121212] active:shadow-none active:translate-x-[1px] active:translate-y-[1px]"
              >
                <X size={20} className="stroke-[2.5px]" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-ink uppercase tracking-[0.2em]">Repository Name</label>
                  <div className="relative">
                    <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-ink w-5 h-5 stroke-[2.5px]" />
                    <input 
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full pl-12 pr-4 py-3 bg-paper border-2 border-ink shadow-[2px_2px_0px_#121212] focus:shadow-[4px_4px_0px_#FFD93D] outline-none transition-all font-black text-xs text-ink placeholder:text-ink/30 uppercase tracking-widest"
                      placeholder="E.G. MAIN VAULT"
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
                      className="w-full pl-12 pr-4 py-3 bg-paper border-2 border-ink shadow-[2px_2px_0px_#121212] focus:shadow-[4px_4px_0px_#FFD93D] outline-none transition-all font-black text-xs text-ink placeholder:text-ink/30 uppercase tracking-widest"
                      placeholder="DOMAIN.COM"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-ink uppercase tracking-[0.2em]">Alias / Credential</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-ink w-5 h-5 stroke-[2.5px]" />
                  <input 
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                    className="w-full pl-12 pr-4 py-3 bg-paper border-2 border-ink shadow-[2px_2px_0px_#121212] focus:shadow-[4px_4px_0px_#FFD93D] outline-none transition-all font-black text-xs text-ink placeholder:text-ink/30 uppercase tracking-widest"
                    placeholder="ENTER IDENTITY"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-ink uppercase tracking-[0.2em]">Secret Cipher</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-ink w-5 h-5 stroke-[2.5px]" />
                  <input 
                    type="text"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full pl-12 pr-16 py-3 bg-paper border-2 border-ink shadow-[2px_2px_0px_#121212] focus:shadow-[4px_4px_0px_#FFD93D] outline-none transition-all font-black text-xs text-ink placeholder:text-ink/30 tracking-[0.2em]"
                    placeholder="SECRET KEY"
                    required
                  />
                  <button 
                    type="button"
                    onClick={handleGenerate}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 bg-neo-yellow border-2 border-ink hover:bg-neo-blue hover:text-white transition-all shadow-[1px_1px_0px_#121212]"
                    title="Forge Strong Cipher"
                  >
                    <Zap size={18} className="stroke-[2.5px]" />
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-ink uppercase tracking-[0.2em]">Marginalia (Notes)</label>
                <div className="relative">
                  <FileText className="absolute left-4 top-4 text-ink w-5 h-5 stroke-[2.5px]" />
                  <textarea 
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    className="w-full pl-12 pr-4 py-3 bg-paper border-2 border-ink shadow-[2px_2px_0px_#121212] focus:shadow-[4px_4px_0px_#FFD93D] outline-none transition-all font-serif italic text-base text-ink placeholder:text-ink/30 min-h-[100px]"
                    placeholder="Additional records or context..."
                  />
                </div>
              </div>

              <div className="pt-4 flex gap-4">
                <button 
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-4 bg-white border-2 border-ink text-ink font-black uppercase text-sm tracking-widest hover:bg-paper transition-all shadow-[4px_4px_0px_#121212] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#121212]"
                >
                  Discard
                </button>
                <button 
                  type="submit"
                  className="flex-[2] py-4 bg-neo-green text-ink border-2 border-ink font-black text-lg uppercase tracking-widest hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all shadow-[6px_6px_0px_#121212] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#121212]"
                >
                  {editingPassword ? 'Amend Record' : 'Seal into Ledger'}
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
