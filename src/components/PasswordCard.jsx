import React, { useState } from 'react';
import { 
  Copy, ExternalLink, Eye, EyeOff, MoreVertical, 
  Pencil, Trash2, Globe, Lock, ShieldCheck
} from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const PasswordCard = ({ password, onEdit, onDelete }) => {
  const [showPassword, setShowPassword] = useState(false);

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    toast.success(`${type} copied to clipboard!`);
  };

  const getStrengthColor = (pwd) => {
    const length = pwd.length;
    if (length > 12) return 'bg-green-500';
    if (length > 8) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-white border-2 border-ink p-5 shadow-[3px_3px_0px_0px_#121212] group password-card-glow transition-all"
    >
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-paper border-2 border-ink flex items-center justify-center shadow-[2px_2px_0px_#121212] overflow-hidden">
            {password.url ? (
              <img 
                src={`https://www.google.com/s2/favicons?domain=${password.url}&sz=128`} 
                alt="icon"
                className="w-8 h-8 object-contain grayscale group-hover:grayscale-0 transition-all"
                onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
              />
            ) : null}
            <Globe className="text-ink hidden" size={20} />
          </div>
          <div>
            <h3 className="font-black text-lg text-ink uppercase tracking-tighter truncate max-w-[120px] leading-tight">{password.name}</h3>
            <div className="flex items-center gap-1 text-ink/40 text-[9px] font-black uppercase tracking-widest">
              <span className="truncate max-w-[80px]">{password.url || 'No URL'}</span>
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
              if (window.confirm('Erase this record from the ledger?')) {
                onDelete(password.id);
              }
            }}
            className="p-1.5 bg-white border-2 border-ink hover:bg-neo-red transition-all shadow-[1px_1px_0px_#121212] active:shadow-none active:translate-x-[1px] active:translate-y-[1px]"
          >
            <Trash2 size={14} className="text-ink stroke-[2.5px]" />
          </button>
        </div>
      </div>

      <div className="space-y-5">
        <div className="space-y-1">
          <label className="text-[9px] font-black text-ink uppercase tracking-[0.2em]">Archived Username</label>
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
          <label className="text-[9px] font-black text-ink uppercase tracking-[0.2em]">Encrypted Cipher</label>
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
        <div className="mt-6 pt-4 border-t-2 border-ink border-dashed">
          <p className="text-xs text-ink font-serif italic leading-snug">"{password.notes}"</p>
        </div>
      )}
    </motion.div>


  );
};

export default PasswordCard;
