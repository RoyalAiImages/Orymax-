import React, { useState } from 'react';
import { GoogleIcon, GitHubIcon, CloseIcon } from './icons/Icons';

interface MockOAuthPopupProps {
  provider: 'google' | 'github';
  onClose: () => void;
  onSuccess: (name: string, email: string) => void;
}

const providerDetails = {
  google: {
    name: 'Google',
    icon: <GoogleIcon />,
  },
  github: {
    name: 'GitHub',
    icon: <GitHubIcon />,
  },
};

const MockOAuthPopup: React.FC<MockOAuthPopupProps> = ({ provider, onClose, onSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const details = providerDetails[provider];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError('Please fill in both fields.');
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
        setError('Please enter a valid email.');
        return;
    }
    setError('');
    onSuccess(name, email);
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-sm bg-white/10 dark:bg-black/10 backdrop-blur-xl rounded-2xl shadow-2xl p-6 border border-white/20 dark:border-black/20 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors"
          aria-label="Close"
        >
          <CloseIcon />
        </button>
        <div className="flex items-center gap-3 mb-4">
          {details.icon}
          <h2 className="text-xl font-bold text-light-primary dark:text-dark-primary">
            Sign in with {details.name}
          </h2>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Enter your details below to simulate the sign-in process.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 bg-white/20 dark:bg-black/20 rounded-lg border border-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-white/20 dark:bg-black/20 rounded-lg border border-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
          />
          {error && <p className="text-red-500 text-xs">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-light-primary text-light-bg dark:bg-dark-primary dark:text-dark-bg rounded-lg font-semibold hover:bg-opacity-90 transition-all"
          >
            Continue as {name.split(' ')[0] || '...'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MockOAuthPopup;
