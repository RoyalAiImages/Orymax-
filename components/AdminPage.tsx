import React, { useState, useEffect, useMemo } from 'react';
import { User } from '../types';
import { DashboardIcon, UserIcon, CreditCardIcon, ClockIcon, DiamondIcon, TrashIcon, ChevronUpIcon, ChevronDownIcon } from './icons/Icons';
import PlaceholderPage from './PlaceholderPage';


type AdminView = 'dashboard' | 'users' | 'payments';

interface AdminPageProps {
    user: User;
}

const StatCard: React.FC<{ icon: React.ReactNode; title: string; value: string; }> = ({ icon, title, value }) => (
    <div className="bg-light-surface dark:bg-dark-surface p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800/50 flex items-center space-x-4">
        <div className="p-4 bg-gray-200 dark:bg-gray-800 rounded-full text-indigo-500 dark:text-indigo-400">
            {icon}
        </div>
        <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
            <p className="text-2xl font-bold text-light-primary dark:text-dark-primary">{value}</p>
        </div>
    </div>
);

const NavItem: React.FC<{icon: React.ReactNode; label: string; active: boolean; onClick: () => void;}> = ({ icon, label, active, onClick }) => (
    <button onClick={onClick} className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${active ? 'bg-gray-200 dark:bg-gray-800 text-light-primary dark:text-dark-primary' : 'hover:bg-gray-200/50 dark:hover:bg-gray-800/50 text-gray-600 dark:text-gray-400'}`}>
        {React.cloneElement(icon as React.ReactElement, { className: 'w-5 h-5' })}
        <span>{label}</span>
    </button>
);

const AdminSideNav: React.FC<{activeView: AdminView; setView: (view: AdminView) => void}> = ({ activeView, setView }) => (
    <aside className="w-64 bg-light-surface dark:bg-dark-surface p-4 rounded-2xl flex-shrink-0 self-start">
        <h2 className="text-lg font-semibold mb-4 px-2 text-light-primary dark:text-dark-primary">Admin Panel</h2>
        <nav className="space-y-1">
            <NavItem icon={<DashboardIcon />} label="Dashboard" active={activeView === 'dashboard'} onClick={() => setView('dashboard')} />
            <NavItem icon={<UserIcon />} label="Users" active={activeView === 'users'} onClick={() => setView('users')} />
            <NavItem icon={<CreditCardIcon />} label="Payments" active={activeView === 'payments'} onClick={() => setView('payments')} />
        </nav>
    </aside>
);

const AdminDashboardView: React.FC = () => {
    const [totalUsers, setTotalUsers] = useState(0);

    useEffect(() => {
        const storedUsers: User[] = JSON.parse(localStorage.getItem('allUsers') || '[]');
        setTotalUsers(storedUsers.length + 1); // +1 for the admin user
    }, []);

    return (
        <div>
            <h1 className="text-3xl font-bold text-light-primary dark:text-dark-primary mb-6">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <StatCard icon={<UserIcon />} title="Total Users" value={totalUsers.toLocaleString()} />
                <StatCard icon={<ClockIcon />} title="Pending Payments" value="1" />
                <StatCard icon={<DiamondIcon />} title="Total Credits Distributed" value="15" />
            </div>
             <div className="bg-light-surface dark:bg-dark-surface p-6 rounded-2xl border border-gray-200 dark:border-gray-800/50">
                <h2 className="text-xl font-bold mb-2 text-light-primary dark:text-dark-primary">Welcome, Admin!</h2>
                <p className="text-gray-600 dark:text-gray-400">From this dashboard, you can manage users and approve or reject payment requests. Use the navigation on the left to get started.</p>
            </div>
        </div>
    );
};

const AdminUsersView: React.FC<{adminUser: User}> = ({ adminUser }) => {
    const [allUsers, setAllUsers] = useState<User[]>([]);
    const [creditInputs, setCreditInputs] = useState<{ [email: string]: string }>({});
    const [sortConfig, setSortConfig] = useState<{ key: keyof User; direction: 'ascending' | 'descending' } | null>({ key: 'createdAt', direction: 'descending' });


     const fetchUsers = () => {
        try {
            const storedUsers: User[] = JSON.parse(localStorage.getItem('allUsers') || '[]');
            setAllUsers(storedUsers.filter(u => u.email.toLowerCase() !== adminUser.email.toLowerCase()));
        } catch (error) {
            console.error("Failed to parse user data from localStorage", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const sortedUsers = useMemo(() => {
        let sortableUsers = [...allUsers];
        if (sortConfig) {
            sortableUsers.sort((a, b) => {
                const aVal = a[sortConfig.key];
                const bVal = b[sortConfig.key];

                if (aVal === undefined || aVal === null) return 1;
                if (bVal === undefined || bVal === null) return -1;

                if (aVal < bVal) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (aVal > bVal) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableUsers;
    }, [allUsers, sortConfig]);

    const requestSort = (key: keyof User) => {
        let direction: 'ascending' | 'descending' = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const handleCreditInputChange = (email: string, value: string) => {
        const numericValue = value.replace(/[^0-9]/g, '');
        setCreditInputs(prev => ({ ...prev, [email]: numericValue }));
    };

    const handleUpdateCredits = (email: string, operation: 'add' | 'remove') => {
        const amount = parseInt(creditInputs[email] || '0', 10);
        if (amount <= 0) return;

        const storedUsers: User[] = JSON.parse(localStorage.getItem('allUsers') || '[]');
        const updatedUsers = storedUsers.map(u => {
            if (u.email.toLowerCase() === email.toLowerCase()) {
                const currentCredits = u.credits || 0;
                const newCredits = operation === 'add'
                    ? currentCredits + amount
                    : Math.max(0, currentCredits - amount);
                return { ...u, credits: newCredits };
            }
            return u;
        });

        localStorage.setItem('allUsers', JSON.stringify(updatedUsers));
        fetchUsers();
        setCreditInputs(prev => ({...prev, [email]: ''}));
    };

    const handleDeleteUser = (email: string) => {
        if (window.confirm(`Are you sure you want to delete the user "${email}"? This action cannot be undone.`)) {
            const storedUsers: User[] = JSON.parse(localStorage.getItem('allUsers') || '[]');
            const updatedUsers = storedUsers.filter(u => u.email.toLowerCase() !== email.toLowerCase());
            localStorage.setItem('allUsers', JSON.stringify(updatedUsers));
            fetchUsers();
        }
    };

    const SortButton: React.FC<{
        columnKey: keyof User;
        label: string;
    }> = ({ columnKey, label }) => {
        const isActive = sortConfig?.key === columnKey;
        const isAscending = sortConfig?.direction === 'ascending';

        return (
            <button
                onClick={() => requestSort(columnKey)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                    isActive
                        ? 'bg-gray-300 dark:bg-gray-700 text-light-primary dark:text-dark-primary'
                        : 'bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}
            >
                {label}
                {isActive && (
                    isAscending
                        ? <ChevronUpIcon className="w-3 h-3" />
                        : <ChevronDownIcon className="w-3 h-3" />
                )}
            </button>
        );
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-light-primary dark:text-dark-primary mb-6">Manage Users</h1>
            <div className="mb-4 p-3 bg-light-surface dark:bg-dark-surface rounded-lg flex items-center gap-2 sm:gap-4 flex-wrap">
                <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">Sort by:</span>
                <SortButton columnKey="name" label="Name" />
                <SortButton columnKey="email" label="Email" />
                <SortButton columnKey="credits" label="Credits" />
                <SortButton columnKey="createdAt" label="Member Since" />
            </div>

            <div className="space-y-4">
                {sortedUsers.length > 0 ? sortedUsers.map(user => (
                    <div key={user.email} className="bg-light-surface dark:bg-dark-surface p-4 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex-1 min-w-0">
                            <p className="font-bold text-light-primary dark:text-dark-primary truncate">{user.name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Credits: <span className="font-semibold text-light-primary dark:text-dark-primary">{user.credits}</span></p>
                             <p className="text-sm text-gray-500 dark:text-gray-400">Member Since: <span className="font-semibold text-light-primary dark:text-dark-primary">{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</span></p>
                        </div>
                        <div className="flex items-center gap-2 flex-wrap justify-start sm:justify-end w-full sm:w-auto">
                            <input
                                type="text"
                                pattern="\d*"
                                placeholder="Amount"
                                value={creditInputs[user.email] || ''}
                                onChange={e => handleCreditInputChange(user.email, e.target.value)}
                                className="w-24 px-2 py-1.5 text-sm bg-light-bg dark:bg-dark-bg rounded-md border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-light-primary/50 dark:focus:ring-dark-primary/50 outline-none transition-all"
                                aria-label={`Credits for ${user.name}`}
                            />
                            <button onClick={() => handleUpdateCredits(user.email, 'add')} className="px-3 py-1.5 text-xs font-medium text-white bg-green-600 rounded-full hover:bg-green-700 transition-colors">Add</button>
                            <button onClick={() => handleUpdateCredits(user.email, 'remove')} className="px-3 py-1.5 text-xs font-medium text-white bg-yellow-600 rounded-full hover:bg-yellow-700 transition-colors">Remove</button>
                            <button onClick={() => handleDeleteUser(user.email)} className="p-2 text-white bg-red-600 rounded-full hover:bg-red-700 transition-colors" aria-label={`Delete ${user.name}`}>
                                <TrashIcon className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                )) : (
                    <div className="bg-light-surface dark:bg-dark-surface p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800/50">
                        <p className="text-gray-500 dark:text-gray-400 text-center">
                            No other users found to manage.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

const AdminPage: React.FC<AdminPageProps> = ({ user: adminUser }) => {
    const [activeView, setActiveView] = useState<AdminView>('dashboard');

    const renderContent = () => {
        switch (activeView) {
            case 'dashboard':
                return <AdminDashboardView />;
            case 'users':
                return <AdminUsersView adminUser={adminUser} />;
            case 'payments':
                return <PlaceholderPage title="Payments" message="Manage user payments and subscriptions." />;
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col md:flex-row gap-8 animate-fadeIn">
            <AdminSideNav activeView={activeView} setView={setActiveView} />
            <main className="flex-1">
                {renderContent()}
            </main>
        </div>
    );
};

export default AdminPage;