import CryptoJS from 'crypto-js';

// Encrypt data using a master password
export const encryptData = (data, masterPassword) => {
  try {
    const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), masterPassword).toString();
    return ciphertext;
  } catch (error) {
    console.error('Encryption failed:', error);
    return null;
  }
};

// Decrypt data using a master password
export const decryptData = (ciphertext, masterPassword) => {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, masterPassword);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  } catch (error) {
    console.error('Decryption failed:', error);
    return null;
  }
};

// Hash the master password for storage (not used for encryption, just to verify login)
export const hashPassword = (password) => {
  return CryptoJS.SHA256(password).toString();
};

// Generate a random strong password
export const generateStrongPassword = (length = 16) => {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
  let retVal = "";
  for (let i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
};

// Check password strength
export const checkPasswordStrength = (password) => {
  let strength = 0;
  if (password.length > 8) strength += 1;
  if (password.length > 12) strength += 1;
  if (/[A-Z]/.test(password)) strength += 1;
  if (/[0-9]/.test(password)) strength += 1;
  if (/[^A-Za-z0-9]/.test(password)) strength += 1;
  return strength; // 0-5
};
