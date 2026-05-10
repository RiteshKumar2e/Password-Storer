import React, { useState } from 'react';
import { 
  Copy, ExternalLink, Eye, EyeOff, MoreVertical, 
  Pencil, Trash2, Globe, Lock, ShieldCheck, Shield
} from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const PasswordCard = ({ password, onEdit, onDelete }) => {
  const [showPassword, setShowPassword] = useState(false);

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    toast.success(`${type} copied to clipboard!`);
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4, rotate: -0.5 }}
      className="group relative"
    >
      {/* Decorative Tape Effect */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-neo-yellow/40 backdrop-blur-sm border-x border-ink/20 rotate-[-2deg] z-20 pointer-events-none" />

      <div className="bg-white border-2 border-ink p-3 sm:p-5 shadow-[4px_4px_0px_0px_#121212] transition-all flex flex-col h-full relative overflow-hidden">
        {/* Background Paper Texture */}
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/notebook.png')]" />

        <div className="flex justify-between items-start mb-6 relative z-10">
          <div className="flex items-center gap-3">
            <div className="bg-neo-blue p-2 border-2 border-ink shadow-[2px_2px_0px_#121212] group-hover:bg-neo-yellow transition-colors">
              <Shield className="text-ink w-4 h-4 stroke-[2.5px]" />
            </div>
            <div>
              <p className="text-[8px] font-black uppercase tracking-[0.3em] text-ink/30 mb-0.5">Record {password.id.slice(-4)}</p>
              <h3 className="text-lg sm:text-xl font-black tracking-tighter uppercase italic truncate max-w-[150px]">{password.name}</h3>
              <div className="flex items-center gap-1 text-ink/40 text-[9px] font-black uppercase tracking-widest mt-0.5">
                <span className="truncate max-w-[100px]">{password.url || 'No URL provided'}</span>
                {password.url && <ExternalLink size={10} className="cursor-pointer hover:text-neo-blue transition-colors stroke-[2.5px]" onClick={() => window.open(password.url.startsWith('http') ? password.url : `https://${password.url}`, '_blank')} />}
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={() => onEdit(password)}
              className="p-1.5 bg-white border-2 border-ink hover:bg-neo-yellow transition-all shadow-[1px_1px_0px_#121212] active:shadow-none active:translate-x-[1px] active:translate-y-[1px]"
            >
              <Pencil size={14} className="text-ink stroke-[2.5px]" />
            </button>
            <button 
              onClick={() => {
                if (window.confirm('Delete this password permanently?')) {
                  onDelete(password.id);
                }
              }}
              className="p-1.5 bg-white border-2 border-ink hover:bg-neo-red transition-all shadow-[1px_1px_0px_#121212] active:shadow-none active:translate-x-[1px] active:translate-y-[1px]"
            >
              <Trash2 size={14} className="text-ink stroke-[2.5px]" />
            </button>
          </div>
        </div>

        <div className="space-y-5 relative z-10">
          <div className="space-y-1">
            <label className="text-[9px] font-black text-ink uppercase tracking-[0.2em]">Username</label>
            <div className="flex items-center justify-between group/field px-3 py-2 bg-paper border-2 border-ink shadow-[2px_2px_0px_#121212]">
              <p className="font-black text-ink truncate flex-1 uppercase tracking-wider text-xs">{password.username}</p>
              <button 
                onClick={() => copyToClipboard(password.username, 'Username')}
                className="p-1 text-ink/30 hover:text-neo-blue transition-all"
              >
                <Copy size={14} className="stroke-[2.5px]" />
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[9px] font-black text-ink uppercase tracking-[0.2em]">Password</label>
            <div className="flex items-center justify-between group/field px-3 py-2 bg-paper border-2 border-ink shadow-[2px_2px_0px_#121212]">
              <div className="flex items-center gap-3 flex-1">
                <p className="font-black tracking-[0.2em] text-ink text-xs">
                  {showPassword ? password.password : '••••••••••••'}
                </p>
                <button 
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-ink/30 hover:text-ink transition-colors"
                >
                  {showPassword ? <EyeOff size={16} className="stroke-[2.5px]" /> : <Eye size={16} className="stroke-[2.5px]" />}
                </button>
              </div>
              <button 
                onClick={() => copyToClipboard(password.password, 'Password')}
                className="p-1 text-ink/30 hover:text-neo-blue transition-all"
              >
                <Copy size={14} className="stroke-[2.5px]" />
              </button>
            </div>
            <div className="h-2 w-full bg-paper border-2 border-ink mt-3 overflow-hidden p-0.5 shadow-[1px_1px_0px_#121212]">
               <div className={`h-full transition-all duration-700 border-r border-ink ${password.password.length > 12 ? 'bg-neo-green' : password.password.length > 8 ? 'bg-neo-yellow' : 'bg-neo-red'}`} style={{ width: `${Math.min(password.password.length * 8, 100)}%` }}></div>
            </div>
          </div>
        </div>

        {password.notes && (
          <div className="mt-6 pt-4 border-t-2 border-ink border-dashed relative z-10">
            <p className="text-xs text-ink font-serif italic leading-snug">"{password.notes}"</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default PasswordCard;
