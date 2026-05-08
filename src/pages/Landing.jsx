import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Lock, Smartphone, Zap, ChevronRight, ArrowRight, Database } from 'lucide-react';
import '../styles/Landing.css';

const Landing = () => {
  return (
    <div className="min-h-screen bg-paper text-ink font-sans selection:bg-neo-yellow selection:text-ink">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-paper/80 backdrop-blur-md border-b-2 border-ink px-6 py-4 flex justify-between items-center shadow-[0_2px_0px_#121212]">
        <div className="flex items-center gap-2">
          <div className="bg-neo-yellow p-2 border-2 border-ink shadow-[2px_2px_0px_#121212]">
            <Shield className="w-5 h-5 text-ink stroke-[2.5px]" />
          </div>
          <span className="text-xl font-black tracking-tighter uppercase italic">SecureVault</span>
        </div>
        <div className="flex gap-4">
          <Link to="/login" className="px-5 py-2 bg-white border-2 border-ink font-black uppercase text-xs tracking-widest hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all shadow-[2px_2px_0px_#121212] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[0px_0px_0px_#121212]">
            Login
          </Link>
          <Link to="/register" className="px-5 py-2 bg-neo-blue text-white border-2 border-ink font-black uppercase text-xs tracking-widest hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all shadow-[2px_2px_0px_#121212] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[0px_0px_0px_#121212]">
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block px-4 py-1.5 bg-neo-yellow border-2 border-ink font-black uppercase text-[10px] tracking-[0.3em] mb-6 shadow-[3px_3px_0px_#121212]">
            v2.0 Security Protocol
          </div>
          <h1 className="text-5xl md:text-7xl font-black leading-none tracking-tighter uppercase italic mb-8">
            Locked in <span className="bg-neo-blue text-white px-4 py-1 rotate-[-2deg] inline-block shadow-[4px_4px_0px_#121212]">Ink</span> & Code
          </h1>
          <p className="text-lg md:text-xl text-ink/70 font-serif italic max-w-2xl mx-auto mb-12 leading-relaxed">
            "A secure vault for your digital passwords. Local-first, private, and built for simplicity and security."
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/register" className="px-10 py-4 bg-neo-green text-ink border-2 border-ink font-black text-lg uppercase tracking-widest hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all shadow-[6px_6px_0px_#121212] flex items-center gap-3">
              Get Started <ArrowRight className="stroke-[2.5px]" />
            </Link>
            <div className="px-10 py-4 bg-white border-2 border-ink font-black text-lg uppercase tracking-widest shadow-[4px_4px_0px_#121212] flex items-center gap-3 italic">
              Local Vault
            </div>
          </div>
        </motion.div>

        {/* Floating Mockup */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-32 relative mx-auto max-w-5xl brutalist-card animate-float p-1 bg-ink"
        >
          <div className="bg-paper aspect-video p-4 md:p-12 flex items-center justify-center border-4 border-ink">
             <div className="w-full h-full bg-white border-4 border-ink flex flex-col items-center justify-center p-4 md:p-8 relative">
                <div className="absolute top-4 left-4 flex gap-2">
                  <div className="w-4 h-4 rounded-full border-2 border-ink bg-neo-red"></div>
                  <div className="w-4 h-4 rounded-full border-2 border-ink bg-neo-yellow"></div>
                  <div className="w-4 h-4 rounded-full border-2 border-ink bg-neo-green"></div>
                </div>
                <div className="bg-neo-blue/20 p-8 border-4 border-ink mb-8">
                   <Lock className="w-20 h-20 text-ink" />
                </div>
                <div className="text-center">
                   <p className="text-ink font-black text-4xl mb-4 tracking-tighter uppercase">Secure Data</p>
                   <p className="text-ink/60 font-serif italic text-lg max-w-md">"Your digital identity, safely inscribed in our local-first password vault."</p>
                </div>
             </div>
          </div>
        </motion.div>
      </header>

      {/* Features */}
      <section className="py-40 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-16">
          {[
            { icon: <Lock />, title: "Full Privacy", desc: "Your sensitive data stays on your device. We never see a single character of your ink.", color: "bg-neo-green" },
            { icon: <Shield />, title: "Hardened Vault", desc: "Industry-standard AES encryption keeps your keys locked tighter than a secret diary.", color: "bg-neo-blue" },
            { icon: <Zap />, title: "Instant Access", desc: "Works fully offline. As fast as turning a page, with zero latency or cloud lag.", color: "bg-neo-orange" }
          ].map((f, i) => (
            <div key={i} className="group feature-card flex flex-col p-0 overflow-hidden">
              <div className={`${f.color} p-10 border-b-4 border-ink flex items-center justify-center`}>
                {React.cloneElement(f.icon, { className: "w-12 h-12 text-ink stroke-[3px]" })}
              </div>
              <div className="p-10 bg-white">
                <h3 className="text-3xl font-black mb-6 tracking-tight uppercase">{f.title}</h3>
                <p className="text-ink/70 leading-relaxed font-serif text-lg">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="py-24 border-t-4 border-ink text-center bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/notebook.png')]"></div>
        <div className="flex items-center justify-center gap-3 mb-8">
           <Shield className="text-ink w-8 h-8" />
           <span className="font-black text-3xl tracking-tighter uppercase">SecureVault</span>
        </div>
        <p className="text-ink font-black tracking-widest uppercase mb-4">The Library of Privacy</p>
        <p className="text-ink/50 font-serif italic">© 2024 SecureVault. All rights reserved. Registered in the Analog Blockchain.</p>
      </footer>
    </div>


  );
};

export default Landing;
