# Password Storer

A secure, user-friendly password management application built with React and Vite. Store, manage, and audit your passwords with encrypted storage and advanced security features.

## 🌟 Features

- **User Authentication**: Secure login and registration system
- **Password Vault**: Store and organize passwords securely
- **Encryption**: End-to-end encryption for stored passwords
- **Audit Trail**: Complete audit logs for security tracking
- **Auto Logout**: Automatic session timeout for security
- **User Profile**: Manage your account settings
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Tech Stack

- **Frontend**: React 18+ with Vite
- **State Management**: Context API
- **Security**: Encryption utilities for password protection
- **Build Tool**: Vite with HMR
- **Linting**: ESLint

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

## 🚀 Getting Started

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Password\ Storer
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will open at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AddPasswordModal.jsx
│   ├── Navbar.jsx
│   ├── PasswordCard.jsx
│   └── Sidebar.jsx
├── context/            # React Context for state management
│   ├── AuthContext.jsx
│   └── VaultContext.jsx
├── hooks/              # Custom React hooks
│   └── useAutoLogout.js
├── pages/              # Application pages
│   ├── Audit.jsx
│   ├── Dashboard.jsx
│   ├── Landing.jsx
│   ├── Login.jsx
│   ├── NotFound.jsx
│   ├── Profile.jsx
│   └── Register.jsx
├── styles/             # CSS stylesheets
├── utils/              # Utility functions
│   └── crypto.js       # Encryption utilities
└── App.jsx
```

## 🔐 Security Features

- Password encryption using cryptographic utilities
- Session-based authentication
- Automatic logout on inactivity
- Audit logging for all password operations
- Secure password storage

## 📖 Usage

1. **Create Account**: Register with your email and password
2. **Login**: Access your secure vault
3. **Add Passwords**: Store passwords for your accounts
4. **View Audit**: Track all password access and changes
5. **Manage Profile**: Update your account settings

## 🔗 Available Scripts

- `npm run dev` - Start development server with HMR
- `npm run build` - Create optimized production build
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

## 📝 License

This project is open source and available under the MIT License.

## 💡 Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

---

**Note**: Keep your master password safe. If you forget it, your encrypted passwords cannot be recovered.
