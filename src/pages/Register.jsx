import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield, Lock, Eye, EyeOff, CheckCircle2, ArrowLeft } from 'lucide-react';
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
    <div className="min-h-screen bg-paper flex items-center justify-center p-6 auth-container relative">
      <Link 
        to="/" 
        className="absolute top-8 left-8 flex items-center gap-2 px-5 py-2 bg-white border-2 border-ink font-black text-ink uppercase text-[10px] tracking-widest hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all shadow-[3px_3px_0px_#121212] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#121212] z-50 group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform stroke-[2.5px]" />
        Home
      </Link>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-sm w-full bg-white border-2 border-ink p-10 shadow-[8px_8px_0px_0px_#121212] relative auth-card"
      >
        <div className="flex justify-center mb-10">
          <div className="bg-neo-blue p-4 border-2 border-ink shadow-[3px_3px_0px_#121212]">
            <Shield className="text-ink w-8 h-8 stroke-[2.5px]" />
          </div>
        </div>

        <h2 className="text-3xl font-black text-center mb-2 tracking-tighter text-ink uppercase italic">Create Account</h2>
        <p className="text-ink/60 text-center mb-10 font-serif italic text-base border-b-2 border-ink/10 pb-3">
          "Setup your secure master password."
        </p>

        <form onSubmit={handleRegister} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black ml-1 text-ink uppercase tracking-[0.2em]">Master Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-ink w-5 h-5 stroke-[2.5px]" />
              <input 
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-12 py-4 bg-paper border-2 border-ink focus:shadow-[4px_4px_0px_#FFD93D] outline-none transition-all font-black text-xs text-ink placeholder:text-ink/30"
                placeholder="MIN. 8 CHARACTERS"
                required
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-ink hover:text-neo-blue transition-colors"
              >
                {showPassword ? <EyeOff size={20} className="stroke-[2.5px]" /> : <Eye size={20} className="stroke-[2.5px]" />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black ml-1 text-ink uppercase tracking-[0.2em]">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-ink w-5 h-5 stroke-[2.5px]" />
              <input 
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-paper border-2 border-ink focus:shadow-[4px_4px_0px_#FFD93D] outline-none transition-all font-black text-xs text-ink placeholder:text-ink/30"
                placeholder="REPEAT PASSWORD"
                required
              />
            </div>
          </div>

          <div className="bg-neo-red/10 border-2 border-ink p-4 shadow-[3px_3px_0px_#121212]">
            <p className="text-[10px] text-ink leading-tight font-black uppercase tracking-tight">
              ⚠️ Warning: If you lose this password, your data cannot be recovered.
            </p>
          </div>

          <button 
            type="submit"
            className="w-full py-4 bg-neo-green text-ink border-2 border-ink font-black text-lg uppercase tracking-widest hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all shadow-[4px_4px_0px_#121212] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#121212]"
          >
            Create My Account
          </button>
        </form>

        <p className="mt-10 text-center text-ink font-serif italic text-base">
          Already have an account? <Link to="/login" className="text-neo-blue font-black uppercase hover:underline underline-offset-4 decoration-2 not-italic">Login</Link>
        </p>
      </motion.div>
    </div>


  );
};

export default Register;
