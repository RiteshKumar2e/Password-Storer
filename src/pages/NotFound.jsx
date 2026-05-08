import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, Home } from 'lucide-react';
import { motion } from 'framer-motion';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-paper flex flex-col items-center justify-center p-6 text-center font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="bg-neo-red/10 p-10 border-2 border-ink shadow-[6px_6px_0px_#121212] mb-10 inline-block">
          <ShieldAlert size={80} className="text-neo-red mx-auto stroke-[2.5px]" />
        </div>
        
        <h1 className="text-8xl font-black mb-2 tracking-tighter uppercase italic">404</h1>
        <h2 className="text-3xl font-black mb-8 uppercase tracking-tight italic">Uncharted Archives</h2>
        <p className="text-ink/60 max-w-md mx-auto mb-12 font-serif italic text-xl leading-relaxed">
          "The manuscript you seek has not been cataloged in our local archives. It may be lost to time or moved to a restricted wing."
        </p>

        <Link 
          to="/" 
          className="inline-flex items-center gap-3 px-10 py-4 bg-neo-blue text-white border-2 border-ink font-black text-lg uppercase tracking-widest hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all shadow-[6px_6px_0px_#121212] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#121212]"
        >
          <Home size={22} className="stroke-[2.5px]" />
          Return to Registry
        </Link>
      </motion.div>
    </div>

  );
};

export default NotFound;
