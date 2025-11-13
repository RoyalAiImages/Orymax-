import React from 'react';
import { GoogleIcon, GitHubIcon, UserIcon } from './icons/Icons';

interface Account {
  name: string;
  email: string;
}

const mockAccounts: Account[] = [
  { name: 'Royal Gamer', email: 'royalgamer9291@gmail.com' },
  { name: 'Bharat Rajput', email: 'bharat.rajput.demo@gmail.com' },
  { name: 'Sameer Khan', email: 'sameerkhan44287@gmail.com' },
  { name: 'Past Crypt', email: 'pastcrypt1@gmail.com' },
  { name: 'Toxic Royal', email: 'toxicroyal92@gmail.com' },
];

const avatarColors = [
    'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-indigo-500', 'bg-purple-500', 'bg-pink-500'
];

interface AccountChooserPopupProps {
  provider: 'google' | 'github';
  onClose: () => void;
  onSuccess: (name: string, email: string) => void;
}

const AccountChooserPopup: React.FC<AccountChooserPopupProps> = ({ provider, onClose, onSuccess }) => {
  
  const details = {
      google: { name: 'Google', icon: <GoogleIcon /> },
      github: { name: 'GitHub', icon: <GitHubIcon /> }
  }[provider];

  return (
    <div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-sm bg-dark-surface rounded-2xl shadow-2xl border border-gray-800 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-800">
            <div className="flex items-center gap-3 mb-4">
                {details.icon}
                <h2 className="text-xl font-semibold text-dark-primary">
                    Sign in with {details.name}
                </h2>
            </div>
            <h3 className="text-2xl font-bold text-dark-primary">Choose an account</h3>
            <p className="text-sm text-gray-400 mt-1">to continue to <span className="font-bold text-white">Orymax</span></p>
        </div>
        <div className="flex-grow overflow-y-auto p-2">
            <ul className="space-y-1">
                {mockAccounts.map((account, index) => (
                    <li key={account.email}>
                        <button 
                            onClick={() => onSuccess(account.name, account.email)}
                            className="w-full flex items-center gap-4 text-left p-4 rounded-lg hover:bg-gray-800 transition-colors"
                        >
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0 ${avatarColors[index % avatarColors.length]}`}>
                                {account.name.charAt(0)}
                            </div>
                            <div className="truncate">
                                <p className="font-semibold text-dark-primary truncate">{account.name}</p>
                                <p className="text-sm text-gray-400 truncate">{account.email}</p>
                            </div>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
      </div>
    </div>
  );
};
export default AccountChooserPopup;