import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { encryptData, decryptData } from '../utils/crypto';
import toast from 'react-hot-toast';

const VaultContext = createContext();

export const VaultProvider = ({ children }) => {
  const { masterKey, user } = useAuth();
  const [passwords, setPasswords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadVault = useCallback(() => {
    if (!user || !masterKey) {
      setPasswords([]);
      setIsLoading(false);
      return;
    }

    const encryptedVault = localStorage.getItem('securevault_vault');
    if (!encryptedVault) {
      setPasswords([]);
      setIsLoading(false);
      return;
    }

    const decrypted = decryptData(encryptedVault, masterKey);
    if (decrypted) {
      setPasswords(decrypted);
    } else {
      toast.error('Failed to decrypt vault. Please check master password.');
    }
    setIsLoading(false);
  }, [user, masterKey]);

  useEffect(() => {
    loadVault();
  }, [loadVault]);

  const saveVault = (newPasswords) => {
    if (!masterKey) return;
    const encrypted = encryptData(newPasswords, masterKey);
    if (encrypted) {
      localStorage.setItem('securevault_vault', encrypted);
      setPasswords(newPasswords);
    }
  };

  const addPassword = (entry) => {
    const newEntry = {
      ...entry,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const updated = [...passwords, newEntry];
    saveVault(updated);
    toast.success('Password added successfully!');
  };

  const updatePassword = (id, updatedEntry) => {
    const updated = passwords.map((p) =>
      p.id === id ? { ...p, ...updatedEntry, updatedAt: new Date().toISOString() } : p
    );
    saveVault(updated);
    toast.success('Password updated!');
  };

  const deletePassword = (id) => {
    const updated = passwords.filter((p) => p.id !== id);
    saveVault(updated);
    toast.success('Password deleted.');
  };

  return (
    <VaultContext.Provider value={{ passwords, addPassword, updatePassword, deletePassword, isLoading }}>
      {children}
    </VaultContext.Provider>
  );
};

export const useVault = () => useContext(VaultContext);
