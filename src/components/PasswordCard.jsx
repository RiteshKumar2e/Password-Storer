import React, { useState } from 'react';
import { 
  Copy, ExternalLink, Eye, EyeOff, MoreVertical, 
  Edit2, Trash2, Globe, Lock, ShieldCheck
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
      className="bg-white rounded-[2.5rem] border border-slate-100 p-8 hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.08)] transition-all group password-card-glow"
    >
      <div className="flex justify-between items-start mb-8">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 shadow-sm group-hover:bg-primary-50 transition-all overflow-hidden">
            {password.url ? (
              <img 
                src={`https://www.google.com/s2/favicons?domain=${password.url}&sz=128`} 
                alt="icon"
                className="w-10 h-10 rounded-xl object-contain"
                onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
              />
            ) : null}
            <Globe className="text-slate-300 hidden" size={28} />
          </div>
          <div>
            <h3 className="font-black text-xl text-slate-900 tracking-tight truncate max-w-[140px]">{password.name}</h3>
            <div className="flex items-center gap-1.5 text-slate-400 text-xs font-bold">
              <span className="truncate max-w-[100px]">{password.url || 'No URL'}</span>
              {password.url && <ExternalLink size={12} className="cursor-pointer hover:text-primary-600 transition-colors" onClick={() => window.open(password.url.startsWith('http') ? password.url : `https://${password.url}`, '_blank')} />}
            </div>
          </div>
        </div>
        
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={() => onEdit(password)}
            className="p-2.5 hover:bg-slate-50 rounded-xl text-slate-400 hover:text-primary-600 transition-all"
          >
            <Edit2 size={18} />
          </button>
          <button 
            onClick={() => {
              if (window.confirm('Delete this entry permanently?')) {
                onDelete(password.id);
              }
            }}
            className="p-2.5 hover:bg-red-50 rounded-xl text-slate-400 hover:text-red-500 transition-all"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-slate-300 uppercase tracking-widest ml-1">Username</label>
          <div className="flex items-center justify-between group/field px-4 py-3 bg-slate-50 rounded-2xl border border-transparent hover:border-slate-200 transition-all">
            <p className="font-bold text-slate-700 truncate flex-1">{password.username}</p>
            <button 
              onClick={() => copyToClipboard(password.username, 'Username')}
              className="p-1.5 text-slate-300 hover:text-primary-600 opacity-0 group-hover/field:opacity-100 transition-all"
            >
              <Copy size={16} />
            </button>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-slate-300 uppercase tracking-widest ml-1">Password</label>
          <div className="flex items-center justify-between group/field px-4 py-3 bg-slate-50 rounded-2xl border border-transparent hover:border-slate-200 transition-all">
            <div className="flex items-center gap-3 flex-1">
              <p className="font-mono font-black tracking-widest text-slate-900">
                {showPassword ? password.password : '••••••••••••'}
              </p>
              <button 
                onClick={() => setShowPassword(!showPassword)}
                className="text-slate-300 hover:text-slate-600 transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <button 
              onClick={() => copyToClipboard(password.password, 'Password')}
              className="p-1.5 text-slate-300 hover:text-primary-600 opacity-0 group-hover/field:opacity-100 transition-all"
            >
              <Copy size={16} />
            </button>
          </div>
          <div className="h-1.5 w-full bg-slate-100 rounded-full mt-3 overflow-hidden">
             <div className={`h-full transition-all duration-700 ${getStrengthColor(password.password)}`} style={{ width: `${Math.min(password.password.length * 8, 100)}%` }}></div>
          </div>
        </div>
      </div>

      {password.notes && (
        <div className="mt-8 pt-6 border-t border-slate-50">
          <p className="text-xs text-slate-400 font-medium leading-relaxed italic">"{password.notes}"</p>
        </div>
      )}
    </motion.div>
  );
};

export default PasswordCard;
