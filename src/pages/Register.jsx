import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield, Lock, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import '../styles/Auth.css';

const Register = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    if (password.length < 8) {
      toast.error('Master password must be at least 8 characters.');
      return;
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }
    
    if (register(password)) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 auth-container">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-100/40 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-100/40 blur-[100px] rounded-full"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-[2.5rem] p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-slate-200/50 relative auth-card"
      >
        <div className="flex justify-center mb-10">
          <div className="bg-primary-600 p-4 rounded-3xl shadow-xl shadow-primary-500/20">
            <Shield className="text-white w-8 h-8" />
          </div>
        </div>

        <h2 className="text-3xl font-black text-center mb-3 tracking-tight text-slate-900">Create Vault</h2>
        <p className="text-slate-500 text-center mb-10 font-medium">
          Set your master password to get started.
        </p>

        <form onSubmit={handleRegister} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black ml-1 text-slate-400 uppercase tracking-widest">Master Password</label>
            <div className="relative">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 input-icon" />
              <input 
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-14 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary-500 outline-none transition-all font-medium text-slate-900 placeholder:text-slate-400"
                placeholder="Choose a strong key"
                required
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black ml-1 text-slate-400 uppercase tracking-widest">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 input-icon" />
              <input 
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-14 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary-500 outline-none transition-all font-medium text-slate-900 placeholder:text-slate-400"
                placeholder="Repeat your key"
                required
              />
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-100 p-5 rounded-2xl">
            <p className="text-xs text-amber-700 leading-relaxed font-bold">
              ⚠️ If you lose this password, your vault is locked forever. We do not store any recovery data.
            </p>
          </div>

          <button 
            type="submit"
            className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-lg hover:bg-slate-800 transition-all shadow-2xl shadow-slate-900/20 active:scale-[0.98]"
          >
            Create Account
          </button>
        </form>

        <p className="mt-10 text-center text-slate-500 font-medium">
          Already have a vault? <Link to="/login" className="text-primary-600 font-black hover:underline">Login</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
