import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, Home } from 'lucide-react';
import { motion } from 'framer-motion';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <div className="bg-red-100 dark:bg-red-900/30 p-8 rounded-[3rem] mb-8 inline-block">
          <ShieldAlert size={80} className="text-red-500 mx-auto" />
        </div>
        
        <h1 className="text-6xl font-black mb-4">404</h1>
        <h2 className="text-3xl font-bold mb-6">Vault Section Not Found</h2>
        <p className="text-slate-500 max-w-md mx-auto mb-10 text-lg">
          The page you're looking for doesn't exist or has been moved. 
          Make sure you're in the right secure zone.
        </p>

        <Link 
          to="/" 
          className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 text-white rounded-2xl font-bold text-lg hover:bg-primary-700 transition-all shadow-xl shadow-primary-500/25"
        >
          <Home size={20} />
          Back to Safety
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
