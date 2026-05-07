import { useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';

const useAutoLogout = (timeoutMs = 5 * 60 * 1000) => { // 5 minutes default
  const { logout, user } = useAuth();
  const timerRef = useRef(null);

  const resetTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (user) {
      timerRef.current = setTimeout(() => {
        logout();
        window.location.href = '/login';
      }, timeoutMs);
    }
  };

  useEffect(() => {
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    
    if (user) {
      resetTimer();
      events.forEach(event => window.addEventListener(event, resetTimer));
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      events.forEach(event => window.removeEventListener(event, resetTimer));
    };
  }, [user]);

  return null;
};

export default useAutoLogout;
