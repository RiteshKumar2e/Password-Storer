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
    <div className="min-h-screen bg-paper flex text-ink font-sans">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <main className="flex-1 flex flex-col min-w-0 border-l-2 border-ink">
        <Navbar setIsSidebarOpen={setIsSidebarOpen} searchTerm="" setSearchTerm={() => {}} />

        <div className="p-6 md:p-10 max-w-7xl mx-auto w-full">
          <div className="mb-10">
            <h1 className="text-4xl font-black mb-1 tracking-tighter uppercase italic">Security Audit</h1>
            <p className="text-ink/60 font-serif italic text-lg">"Identifying vulnerabilities within your cryptographic archives."</p>
          </div>

          {/* Security Score Header */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
            <div className="lg:col-span-2 bg-white border-2 border-ink p-8 shadow-[6px_6px_0px_0px_#121212] flex flex-col md:flex-row items-center gap-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 opacity-[0.03] pointer-events-none p-12">
                <Shield size={200} />
              </div>
              
              <div className="relative">
                <div className="w-40 h-40 border-2 border-ink flex items-center justify-center bg-paper shadow-[4px_4px_0px_#121212]">
                   <div className="text-center">
                      <span className="text-5xl font-black tracking-tighter">{auditResults.score}%</span>
                      <p className="text-[10px] font-black text-ink uppercase tracking-widest mt-1">Health Index</p>
                   </div>
                </div>
              </div>

              <div className="flex-1 text-center md:text-left z-10">
                <h3 className="text-2xl font-black mb-4 tracking-tighter uppercase italic">
                  {auditResults.score === 100 ? "Ledger is Rock Solid" : 
                   auditResults.score > 80 ? "Slight Vulnerabilities" :
                   auditResults.score > 50 ? "Moderate Risks Detected" : "Critical Security Breach!"}
                </h3>
                <p className="text-ink/60 mb-8 font-serif italic text-lg leading-snug">
                  "The archivist has scanned {passwords.length} records. 
                  {auditResults.weak.length > 0 ? ` Found ${auditResults.weak.length} shallow ciphers.` : " All ciphers are deeply encrypted."}
                  {auditResults.reusedList.length > 0 ? ` Found ${auditResults.reusedList.length} duplicated manuscripts.` : " No duplications detected in the archives."}"
                </p>
                <button className="px-8 py-3 bg-neo-blue text-white border-2 border-ink font-black uppercase text-xs tracking-widest hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all shadow-[4px_4px_0px_#121212] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#121212]">
                  Fortify Archives
                </button>
              </div>
            </div>

            <div className="bg-ink p-8 border-2 border-ink text-white flex flex-col justify-between relative overflow-hidden group shadow-[6px_6px_0px_0px_#FFD93D]">
               <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700 pointer-events-none">
                  <Shield size={100} />
               </div>
               <div>
                  <div className="bg-neo-yellow p-3 border-2 border-white/20 inline-block mb-6 shadow-[3px_3px_0px_rgba(255,255,255,0.1)]">
                    <Zap className="text-ink stroke-[2.5px]" size={20} />
                  </div>
                  <h4 className="text-xl font-black mb-2 uppercase tracking-tighter italic">Archival Tips</h4>
                  <p className="text-white/40 font-serif italic text-base leading-snug">
                    "Always use unique manuscripts for every archive. Enable two-factor verification on critical identities."
                  </p>
               </div>
               <div className="mt-8 border-t border-white/10 pt-6">
                  <div className="flex items-center gap-2 text-neo-yellow font-black text-xs uppercase tracking-widest cursor-pointer hover:translate-x-1 transition-all">
                    Archival Guide <ChevronRight size={14} className="stroke-[2.5px]" />
                  </div>
               </div>
            </div>
          </div>

          {/* Audit Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Weak Passwords */}
            <div className="bg-white border-2 border-ink p-6 shadow-[4px_4px_0px_0px_#121212]">
              <div className="flex items-center justify-between mb-8 border-b-2 border-ink pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-neo-yellow border-2 border-ink shadow-[2px_2px_0px_#121212]">
                    <AlertTriangle size={18} className="text-ink stroke-[2.5px]" />
                  </div>
                  <h3 className="text-xl font-black tracking-tighter uppercase italic">Shallow Ciphers</h3>
                </div>
                <span className="px-3 py-1 bg-neo-yellow border-2 border-ink text-[10px] font-black uppercase tracking-widest">
                  {auditResults.weak.length} Found
                </span>
              </div>
              
              <div className="space-y-4">
                {auditResults.weak.length > 0 ? auditResults.weak.map(p => (
                  <div key={p.id} className="flex items-center justify-between p-4 bg-paper border-2 border-ink hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all group shadow-[2px_2px_0px_#121212]">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white border-2 border-ink flex items-center justify-center shadow-[1px_1px_0px_#121212]">
                        <Lock size={16} className="text-ink stroke-[2.5px]" />
                      </div>
                      <div>
                        <p className="font-black text-ink text-sm uppercase tracking-tight">{p.name}</p>
                        <p className="text-[9px] text-ink/40 font-black uppercase tracking-widest">{p.password.length} Units</p>
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-ink/30 group-hover:translate-x-1 transition-transform stroke-[2.5px]" />
                  </div>
                )) : (
                  <div className="py-12 text-center border-2 border-ink border-dashed bg-paper/50">
                    <ShieldCheck className="mx-auto text-neo-green mb-4 stroke-[2.5px]" size={40} />
                    <p className="text-ink/60 font-serif italic text-lg">"All ciphers are sufficiently hardened."</p>
                  </div>
                )}
              </div>
            </div>

            {/* Reused Passwords */}
            <div className="bg-white border-2 border-ink p-6 shadow-[4px_4px_0px_0px_#121212]">
              <div className="flex items-center justify-between mb-8 border-b-2 border-ink pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-neo-red border-2 border-ink shadow-[2px_2px_0px_#121212]">
                    <ShieldAlert size={18} className="text-white stroke-[2.5px]" />
                  </div>
                  <h3 className="text-xl font-black tracking-tighter uppercase italic">Duplications</h3>
                </div>
                <span className="px-3 py-1 bg-neo-red border-2 border-ink text-white text-[10px] font-black uppercase tracking-widest">
                  {auditResults.reusedList.length} Found
                </span>
              </div>
              
              <div className="space-y-4">
                {auditResults.reusedList.length > 0 ? auditResults.reusedList.map(p => (
                  <div key={p.id} className="flex items-center justify-between p-4 bg-paper border-2 border-ink hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all group shadow-[2px_2px_0px_#121212]">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white border-2 border-ink flex items-center justify-center shadow-[1px_1px_0px_#121212]">
                        <RefreshCw size={16} className="text-ink stroke-[2.5px]" />
                      </div>
                      <div>
                        <p className="font-black text-ink text-sm uppercase tracking-tight">{p.name}</p>
                        <p className="text-[9px] text-ink/40 font-black uppercase tracking-widest">Duplicate Record</p>
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-ink/30 group-hover:translate-x-1 transition-transform stroke-[2.5px]" />
                  </div>
                )) : (
                  <div className="py-12 text-center border-2 border-ink border-dashed bg-paper/50">
                    <ShieldCheck className="mx-auto text-neo-green mb-4 stroke-[2.5px]" size={40} />
                    <p className="text-ink/60 font-serif italic text-lg">"No duplications found in the ledger."</p>
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
