import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield, Lock, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import '../styles/Auth.css';

const Login = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (login(password)) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 auth-container">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary-100/40 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-100/40 blur-[100px] rounded-full"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white rounded-[2.5rem] p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-slate-200/50 relative auth-card"
      >
        <div className="flex justify-center mb-10">
          <div className="bg-primary-600 p-4 rounded-3xl shadow-xl shadow-primary-500/20">
            <Shield className="text-white w-8 h-8" />
          </div>
        </div>

        <h2 className="text-3xl font-black text-center mb-3 tracking-tight text-slate-900">Welcome Back</h2>
        <p className="text-slate-500 text-center mb-10 font-medium">
          Enter your master password to unlock.
        </p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black ml-1 text-slate-400 uppercase tracking-widest">Master Password</label>
            <div className="relative">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 input-icon" />
              <input 
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-14 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary-500 outline-none transition-all font-medium text-slate-900 placeholder:text-slate-400"
                placeholder="Enter your key"
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

          <button 
            type="submit"
            className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-lg hover:bg-slate-800 transition-all shadow-2xl shadow-slate-900/20 active:scale-[0.98]"
          >
            Unlock Vault
          </button>
        </form>

        <div className="mt-10 pt-10 border-t border-slate-100 text-center">
          <p className="text-slate-500 font-medium">
            New here? <Link to="/register" className="text-primary-600 font-black hover:underline">Create a vault</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
