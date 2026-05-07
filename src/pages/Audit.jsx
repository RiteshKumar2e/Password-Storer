import React, { useMemo } from 'react';
import { useVault } from '../context/VaultContext';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { 
  ShieldAlert, ShieldCheck, AlertTriangle, ChevronRight, 
  RefreshCw, Lock, Zap, Shield
} from 'lucide-react';
import { motion } from 'framer-motion';

const Audit = () => {
  const { passwords } = useVault();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const auditResults = useMemo(() => {
    const results = {
      weak: [],
      reused: {},
      reusedList: [],
      score: 100,
      total: passwords.length
    };

    if (passwords.length === 0) return results;

    const seenPasswords = new Map();

    passwords.forEach(p => {
      // Check for weak (less than 10 chars)
      if (p.password.length < 10) {
        results.weak.push(p);
      }

      // Check for reused
      if (seenPasswords.has(p.password)) {
        const firstEntry = seenPasswords.get(p.password);
        if (!results.reused[p.password]) {
          results.reused[p.password] = [firstEntry];
        }
        results.reused[p.password].push(p);
      } else {
        seenPasswords.set(p.password, p);
      }
    });

    // Flatten reused
    Object.values(results.reused).forEach(list => {
      results.reusedList.push(...list);
    });

    // Calculate score
    const weakPenalty = (results.weak.length / passwords.length) * 50;
    const reusedPenalty = (results.reusedList.length / passwords.length) * 50;
    results.score = Math.max(0, Math.round(100 - weakPenalty - reusedPenalty));

    return results;
  }, [passwords]);

  return (
    <div className="min-h-screen bg-slate-50 flex text-slate-900">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <main className="flex-1 flex flex-col min-w-0">
        <Navbar setIsSidebarOpen={setIsSidebarOpen} searchTerm="" setSearchTerm={() => {}} />

        <div className="p-8 md:p-12 max-w-7xl mx-auto w-full">
          <div className="mb-12">
            <h1 className="text-4xl font-black mb-2 tracking-tight">Security Audit</h1>
            <p className="text-slate-500 font-medium">Identify vulnerabilities and strengthen your vault.</p>
          </div>

          {/* Security Score Header */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-10">
              <div className="relative">
                <svg className="w-48 h-48">
                  <circle
                    className="text-slate-100"
                    strokeWidth="12"
                    stroke="currentColor"
                    fill="transparent"
                    r="80"
                    cx="96"
                    cy="96"
                  />
                  <circle
                    className={auditResults.score > 80 ? "text-green-500" : auditResults.score > 50 ? "text-amber-500" : "text-red-500"}
                    strokeWidth="12"
                    strokeDasharray={2 * Math.PI * 80}
                    strokeDashoffset={2 * Math.PI * 80 * (1 - auditResults.score / 100)}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="80"
                    cx="96"
                    cy="96"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-5xl font-black">{auditResults.score}%</span>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Health Score</span>
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-black mb-4 tracking-tight">
                  {auditResults.score === 100 ? "Your Vault is Rock Solid!" : 
                   auditResults.score > 80 ? "Great Security, with room to improve." :
                   auditResults.score > 50 ? "Moderate Risks detected." : "Critical Security Risks Found!"}
                </h3>
                <p className="text-slate-500 mb-6 font-medium leading-relaxed">
                  We've scanned your {passwords.length} passwords. 
                  {auditResults.weak.length > 0 ? ` Found ${auditResults.weak.length} weak entries.` : " No weak passwords found."}
                  {auditResults.reusedList.length > 0 ? ` Found ${auditResults.reusedList.length} reused passwords.` : " No reused passwords detected."}
                </p>
                <button className="px-8 py-3 bg-slate-900 text-white rounded-2xl font-black hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10">
                  Fix Vulnerabilities
                </button>
              </div>
            </div>

            <div className="bg-slate-900 p-10 rounded-[3rem] text-white flex flex-col justify-between relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-110 transition-transform duration-700">
                  <Shield size={120} />
               </div>
               <div>
                  <div className="bg-white/10 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
                    <Zap className="text-primary-400" size={24} />
                  </div>
                  <h4 className="text-xl font-black mb-2">Vault Tips</h4>
                  <p className="text-slate-400 text-sm font-medium leading-relaxed">
                    Always use unique passwords for every site. Enable 2FA on your most sensitive accounts.
                  </p>
               </div>
               <div className="mt-8">
                  <div className="flex items-center gap-2 text-primary-400 font-black text-xs uppercase tracking-widest cursor-pointer hover:translate-x-1 transition-all">
                    View Security Guide <ChevronRight size={14} />
                  </div>
               </div>
            </div>
          </div>

          {/* Audit Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Weak Passwords */}
            <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
                    <AlertTriangle size={20} />
                  </div>
                  <h3 className="text-xl font-black tracking-tight text-slate-900">Weak Passwords</h3>
                </div>
                <span className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-[10px] font-black uppercase">
                  {auditResults.weak.length} Found
                </span>
              </div>
              
              <div className="space-y-4">
                {auditResults.weak.length > 0 ? auditResults.weak.map(p => (
                  <div key={p.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-transparent hover:border-amber-100 transition-all group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                        <Lock size={16} className="text-slate-400" />
                      </div>
                      <div>
                        <p className="font-black text-slate-900 text-sm">{p.name}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{p.password.length} Characters</p>
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
                  </div>
                )) : (
                  <div className="py-12 text-center">
                    <ShieldCheck className="mx-auto text-green-500 mb-4" size={40} />
                    <p className="text-slate-400 font-medium">All passwords are sufficiently long!</p>
                  </div>
                )}
              </div>
            </div>

            {/* Reused Passwords */}
            <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-red-50 text-red-600 rounded-xl">
                    <ShieldAlert size={20} />
                  </div>
                  <h3 className="text-xl font-black tracking-tight text-slate-900">Password Reuse</h3>
                </div>
                <span className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-[10px] font-black uppercase">
                  {auditResults.reusedList.length} Found
                </span>
              </div>
              
              <div className="space-y-4">
                {auditResults.reusedList.length > 0 ? auditResults.reusedList.map(p => (
                  <div key={p.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-transparent hover:border-red-100 transition-all group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                        <RefreshCw size={16} className="text-slate-400" />
                      </div>
                      <div>
                        <p className="font-black text-slate-900 text-sm">{p.name}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Reused Password</p>
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
                  </div>
                )) : (
                  <div className="py-12 text-center">
                    <ShieldCheck className="mx-auto text-green-500 mb-4" size={40} />
                    <p className="text-slate-400 font-medium">No reused passwords detected!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Audit;
