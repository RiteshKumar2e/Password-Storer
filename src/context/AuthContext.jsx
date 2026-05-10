import React, { createContext, useContext, useState, useEffect } from 'react';
import { hashPassword } from '../utils/crypto';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [masterKey, setMasterKey] = useState(null); // The actual master password entered by user, kept in memory

  useEffect(() => {
    const storedUser = localStorage.getItem('securevault_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsInitialized(true);
  }, []);

  const register = (masterPassword, username = 'User') => {
    const userId = 'user_' + Math.random().toString(36).substr(2, 9);
    const masterHash = hashPassword(masterPassword);
    const newUser = { id: userId, masterHash, username: username };
    localStorage.setItem('securevault_user', JSON.stringify(newUser));
    // Initialize empty vault
    localStorage.setItem('securevault_vault', '');
    setUser(newUser);
    setMasterKey(masterPassword);
    toast.success('Account created successfully!');
    return true;
  };

  const updateUsername = (newUsername) => {
    const updatedUser = { ...user, username: newUsername };
    localStorage.setItem('securevault_user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    toast.success('Username updated!');
  };

  const login = (masterPassword) => {
    const storedUser = JSON.parse(localStorage.getItem('securevault_user'));
    if (!storedUser) {
      toast.error('No account found. Please register.');
      return false;
    }

    const currentHash = hashPassword(masterPassword);
    if (currentHash === storedUser.masterHash) {
      setUser(storedUser);
      setMasterKey(masterPassword);
      toast.success('Login successful!');
      return true;
    } else {
      toast.error('Invalid master password.');
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setMasterKey(null);
    toast.success('Logged out.');
  };

  return (
    <AuthContext.Provider value={{ user, masterKey, login, register, logout, updateUsername, isInitialized }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
