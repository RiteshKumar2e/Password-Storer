import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, User, Shield, LogOut, X, Settings, ShieldAlert } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
    { name: 'Security Audit', icon: <ShieldAlert size={20} />, path: '/audit' },
    { name: 'Settings', icon: <Settings size={20} />, path: '/settings' },
    { name: 'Profile', icon: <User size={20} />, path: '/profile' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <aside className={`fixed inset-y-0 left-0 w-64 bg-paper border-r-2 border-ink z-50 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static transition-transform duration-300 ease-in-out flex flex-col`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-2">
              <div className="bg-neo-yellow p-2 border-2 border-ink shadow-[2px_2px_0px_#121212]">
                <Shield className="text-ink w-5 h-5 stroke-[2.5px]" />
              </div>
              <span className="text-xl font-black tracking-tighter text-ink uppercase">SecureVault</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="lg:hidden text-ink hover:scale-110 transition-transform">
              <X size={24} className="stroke-[2.5px]" />
            </button>
          </div>

          <nav className="space-y-3">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 border-2 border-ink font-black uppercase text-sm tracking-wider transition-all shadow-[2px_2px_0px_#121212] ${isActive
                    ? 'bg-neo-blue text-white translate-x-[-1px] translate-y-[-1px] shadow-[4px_4px_0px_#121212]'
                    : 'bg-white text-ink hover:bg-neo-yellow'
                  }`
                }
              >
                {React.cloneElement(item.icon, { className: "stroke-[2.5px]" })}
                {item.name}
              </NavLink>
            ))}
          </nav>

          <div className="mt-8 pt-6 border-t-2 border-ink">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 w-full bg-neo-red/10 border-2 border-ink text-neo-red font-black uppercase text-sm tracking-widest hover:bg-neo-red hover:text-white transition-all shadow-[2px_2px_0px_#121212] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[0px_0px_0px_#121212] group"
            >
              <LogOut size={18} className="group-hover:-translate-x-1 transition-transform stroke-[2.5px]" />
              Exit Archives
            </button>
          </div>
        </div>
      </aside>


    </>
  );
};

export default Sidebar;
