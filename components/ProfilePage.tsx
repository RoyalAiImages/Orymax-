import React, { useState } from 'react';
import { User } from '../types';

interface ProfilePageProps {
  user: User;
  onUpdateProfile: (details: { name: string }) => string | void;
  onChangePassword: (passwords: { current: string; new: string }) => string;
  onDeleteAccount: () => void;
}

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-light-surface dark:bg-dark-surface p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800/50">
        <h3 className="text-xl font-bold mb-4 text-light-primary dark:text-dark-primary">{title}</h3>
        {children}
    </div>
);

const ProfilePage: React.FC<ProfilePageProps> = ({ user, onUpdateProfile, onChangePassword, onDeleteAccount }) => {
    const [name, setName] = useState(user.name);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

    const handleProfileUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim() === '') {
            setFeedback({ type: 'error', message: 'Name cannot be empty.' });
            return;
        }
        const result = onUpdateProfile({ name });
        if (result) {
            setFeedback({ type: 'success', message: result });
        }
        setTimeout(() => setFeedback(null), 3000);
    };

    const handlePasswordChange = (e: React.FormEvent) => {
        e.preventDefault();
        setFeedback(null);
        if (!currentPassword || !newPassword || !confirmNewPassword) {
            setFeedback({ type: 'error', message: 'Please fill all password fields.' });
            return;
        }
        if (newPassword.length < 8) {
            setFeedback({ type: 'error', message: 'New password must be at least 8 characters long.' });
            return;
        }
        if (newPassword !== confirmNewPassword) {
            setFeedback({ type: 'error', message: 'New passwords do not match.' });
            return;
        }
        const result = onChangePassword({ current: currentPassword, new: newPassword });
        if (result.includes('successfully')) {
            setFeedback({ type: 'success', message: result });
            setCurrentPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
        } else {
            setFeedback({ type: 'error', message: result });
        }
        setTimeout(() => setFeedback(null), 4000);
    };

    const handleDeleteAccount = () => {
        if (window.confirm('Are you sure you want to delete your account? This action is permanent and cannot be undone.')) {
            onDeleteAccount();
        }
    };
    
    return (
        <div className="max-w-4xl mx-auto animate-fadeIn space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-light-primary dark:text-dark-primary">Your Profile</h1>
                <p className="text-gray-500 dark:text-gray-400">Manage your account settings and personal information.</p>
            </div>
            
            {feedback && (
                 <div className={`p-4 rounded-lg text-center ${feedback.type === 'success' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                    {feedback.message}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-8">
                    <Section title="Profile Details">
                        <form onSubmit={handleProfileUpdate} className="space-y-4">
                             <div>
                                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Full Name</label>
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2 bg-light-bg dark:bg-dark-bg rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-light-primary/50 dark:focus:ring-dark-primary/50 outline-none transition-colors" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Email Address</label>
                                <input type="email" value={user.email} disabled className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800/50 rounded-lg border border-gray-300 dark:border-gray-700 cursor-not-allowed" />
                            </div>
                            <button type="submit" className="px-5 py-2 text-sm font-semibold bg-light-primary text-light-bg dark:bg-dark-primary dark:text-dark-bg rounded-full hover:bg-opacity-90 transition-all">Save Changes</button>
                        </form>
                    </Section>

                    {user.password && (
                        <Section title="Change Password">
                             <form onSubmit={handlePasswordChange} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Current Password</label>
                                    <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="w-full px-4 py-2 bg-light-bg dark:bg-dark-bg rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-light-primary/50 dark:focus:ring-dark-primary/50 outline-none transition-colors" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">New Password</label>
                                    <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full px-4 py-2 bg-light-bg dark:bg-dark-bg rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-light-primary/50 dark:focus:ring-dark-primary/50 outline-none transition-colors" />
                                </div>
                                 <div>
                                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Confirm New Password</label>
                                    <input type="password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} className="w-full px-4 py-2 bg-light-bg dark:bg-dark-bg rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-light-primary/50 dark:focus:ring-dark-primary/50 outline-none transition-colors" />
                                </div>
                                <button type="submit" className="px-5 py-2 text-sm font-semibold bg-light-primary text-light-bg dark:bg-dark-primary dark:text-dark-bg rounded-full hover:bg-opacity-90 transition-all">Change Password</button>
                            </form>
                        </Section>
                    )}

                    <Section title="Danger Zone">
                        <p className="text-gray-600 dark:text-gray-400 mb-4">Deleting your account will permanently remove all your data, including your generation history. This action cannot be undone.</p>
                        <button onClick={handleDeleteAccount} className="px-5 py-2 text-sm font-semibold bg-red-600 text-white rounded-full hover:bg-red-700 transition-all">Delete My Account</button>
                    </Section>
                </div>
                <div className="md:col-span-1">
                     <Section title="Account Stats">
                        <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                            <li className="flex justify-between"><span>Credits Remaining:</span><span className="font-semibold text-light-primary dark:text-dark-primary">{user.isAdmin ? '∞' : user.credits}</span></li>
                            <li className="flex justify-between"><span>Images Generated:</span><span className="font-semibold text-light-primary dark:text-dark-primary">{user.history?.length || 0}</span></li>
                             <li className="flex justify-between"><span>Member Since:</span><span className="font-semibold text-light-primary dark:text-dark-primary">{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</span></li>
                        </ul>
                    </Section>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;