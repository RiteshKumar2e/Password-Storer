import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Lock, Smartphone, Zap, ChevronRight } from 'lucide-react';
import '../styles/Landing.css';

const Landing = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-x-hidden landing-hero-bg">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 nav-blur px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-primary-600 p-2 rounded-xl shadow-lg shadow-primary-500/20">
            <Shield className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-black tracking-tight text-slate-900">SecureVault</span>
        </div>
        <div className="flex gap-3">
          <Link to="/login" className="px-6 py-2 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-all">
            Login
          </Link>
          <Link to="/register" className="px-6 py-2 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 max-w-7xl mx-auto text-center relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary-100/30 blur-[120px] rounded-full -z-10 animate-pulse"></div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-black tracking-widest text-primary-600 bg-primary-50 rounded-full uppercase">
            Bank-Grade Security
          </span>
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[1.1] hero-title">
            Your Passwords, <br />
            Perfectly Safe.
          </h1>
          
          <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
            SecureVault uses local-first encryption to protect your digital identity. 
            No cloud, no compromises, just pure security.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <Link to="/register" className="group flex items-center gap-2 px-10 py-5 bg-primary-600 text-white rounded-2xl text-lg font-black hover:bg-primary-700 transition-all shadow-2xl shadow-primary-500/25 active:scale-[0.98]">
              Create Your Vault
              <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="https://github.com" target="_blank" className="flex items-center gap-2 px-10 py-5 bg-white text-slate-900 rounded-2xl text-lg font-bold hover:bg-slate-50 transition-all border border-slate-200 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              View Source
            </a>
          </div>
        </motion.div>

        {/* Floating Mockup */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-24 relative mx-auto max-w-5xl rounded-[3rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] border border-white/50 animate-float"
        >
          <div className="bg-slate-50 aspect-video p-6 flex items-center justify-center">
             <div className="w-full h-full bg-white rounded-[2rem] flex flex-col items-center justify-center border border-slate-200 shadow-inner">
                <div className="bg-primary-50 p-6 rounded-3xl mb-6">
                   <Lock className="w-16 h-16 text-primary-500" />
                </div>
                <div className="text-center">
                   <p className="text-slate-900 font-black text-2xl mb-2 tracking-tight">Encrypted Storage</p>
                   <p className="text-slate-400 font-mono text-sm uppercase tracking-widest">Protected by AES-256-GCM</p>
                </div>
             </div>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="py-32 px-6 max-w-7xl mx-auto bg-slate-50/50 rounded-[4rem] mb-20 border border-slate-100">
        <div className="grid md:grid-cols-3 gap-12">
          {[
            { icon: <Lock className="text-primary-600" />, title: "Full Privacy", desc: "Your sensitive data stays on your device. We never see it." },
            { icon: <Shield className="text-primary-600" />, title: "Military Grade", desc: "Industry-standard AES encryption keeps your keys locked tight." },
            { icon: <Zap className="text-primary-600" />, title: "Instant Access", desc: "Works fully offline with zero latency. Fast as your hardware." }
          ].map((f, i) => (
            <div key={i} className="p-10 rounded-[2.5rem] bg-white border border-slate-100 hover:border-primary-500 hover:shadow-2xl hover:shadow-primary-500/5 transition-all group feature-card">
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary-600 group-hover:text-white transition-all">
                {f.icon}
              </div>
              <h3 className="text-2xl font-black mb-4 tracking-tight">{f.title}</h3>
              <p className="text-slate-500 leading-relaxed font-medium">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="py-20 border-t border-slate-100 text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
           <Shield className="text-primary-600 w-6 h-6" />
           <span className="font-black text-xl tracking-tight">SecureVault</span>
        </div>
        <p className="text-slate-400 font-medium tracking-wide">© 2024 SecureVault. Engineered for Privacy.</p>
      </footer>
    </div>

  );
};

export default Landing;
