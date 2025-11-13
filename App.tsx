import React, { useState, useEffect } from 'react';
import { Theme, User, Page, HistoryItem } from './types';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import Auth from './components/Auth';
import BottomNav from './components/BottomNav';
import HomePage from './components/HomePage';
import CreatePage from './components/CreatePage';
import ChatPage from './components/ChatPage';
import ExplorePage from './components/ExplorePage';
import HistoryPage from './components/HistoryPage';
import ProfilePage from './components/ProfilePage';
import PlaceholderPage from './components/PlaceholderPage';
import AdminPage from './components/AdminPage';
import FAQPage from './components/FAQPage';
import { LightbulbIcon } from './components/icons/Icons';
import Tooltip from './components/Tooltip';

type View = 'landing' | 'auth' | 'dashboard';

interface AuthDetails {
    mode: 'signup' | 'login';
    email: string;
    name?: string;
    password?: string;
}

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedTheme = window.localStorage.getItem('theme') as Theme;
      if (storedTheme) return storedTheme;
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return Theme.DARK;
      }
    }
    return Theme.LIGHT;
  });

  const [user, setUser] = useState<User | null>(null);
  const [view, setView] = useState<View>('landing');
  const [activePage, setActivePage] = useState<Page>(Page.HOME);

  const loginUser = (userToLogin: User) => {
    let updatedUser = { ...userToLogin };

    // Weekly credit logic, skip for admin
    if (!updatedUser.isAdmin) {
        const now = Date.now();
        const oneWeek = 7 * 24 * 60 * 60 * 1000;
        const lastWeeklyCredit = updatedUser.lastWeeklyCredit || 0;

        if (now - lastWeeklyCredit > oneWeek) {
            updatedUser.credits += 25;
            updatedUser.lastWeeklyCredit = now;

            // Persist the updated user data to the allUsers list
            const allUsers: User[] = JSON.parse(localStorage.getItem('allUsers') || '[]');
            const userIndex = allUsers.findIndex(u => u.email.toLowerCase() === updatedUser.email.toLowerCase());
            if (userIndex > -1) {
                allUsers[userIndex] = updatedUser;
                localStorage.setItem('allUsers', JSON.stringify(allUsers));
            }
        }
    }

    if (!updatedUser.history) {
      updatedUser.history = [];
    }

    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setView('dashboard');
    setActivePage(updatedUser.isAdmin ? Page.ADMIN : Page.HOME);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        // Use loginUser to apply logic consistently
        loginUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT);
  };

  const handleAuth = async (details: AuthDetails): Promise<string | void> => {
    const { mode, email, name, password } = details;

    // Admin user login check
    if (email.toLowerCase() === 'onlyroyaladmin@gmail.com' && password === '@331royal.') {
        const adminUser: User = {
            name: 'Admin',
            email: email,
            credits: 9999,
            isAdmin: true,
            history: [],
            createdAt: Date.now(),
        };
        loginUser(adminUser);
        return;
    }

    const allUsers: User[] = JSON.parse(localStorage.getItem('allUsers') || '[]');
    const existingUser = allUsers.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (mode === 'login') {
        if (!existingUser) {
            return "No account found with this email. Please sign up.";
        }
        // User exists, check how they were created.
        if (!existingUser.password) {
             return "This account does not have a password set. Please sign up again.";
        }
        if (existingUser.password !== password) {
            return "Incorrect password. Please try again.";
        }
        // If we get here, email and password are correct.
        loginUser(existingUser);

    } else if (mode === 'signup') {
        if (existingUser) {
            return "An account with this email already exists. Please log in.";
        }
        if (!name) return "Full name is required to sign up.";
        if (!password) return "Password is required to sign up.";
        
        const newUser: User = { name, email, password, credits: 25, lastWeeklyCredit: Date.now(), history: [], createdAt: Date.now() };
        allUsers.push(newUser);
        localStorage.setItem('allUsers', JSON.stringify(allUsers));
        loginUser(newUser);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setView('landing');
  };
  
  const updateCredits = (cost: number) => {
    setUser(currentUser => {
        if (!currentUser) return null;

        const updatedUser = { ...currentUser, credits: currentUser.credits - cost };
        localStorage.setItem('user', JSON.stringify(updatedUser));

        const allUsers: User[] = JSON.parse(localStorage.getItem('allUsers') || '[]');
        const userIndex = allUsers.findIndex(u => u.email.toLowerCase() === updatedUser.email.toLowerCase());
        if (userIndex > -1) {
            allUsers[userIndex].credits = updatedUser.credits;
            localStorage.setItem('allUsers', JSON.stringify(allUsers));
        }

        return updatedUser;
    });
  };

  const addToHistory = (item: HistoryItem) => {
    setUser(currentUser => {
        if (!currentUser) return null;

        const updatedHistory = [item, ...(currentUser.history || [])];
        const updatedUser = { ...currentUser, history: updatedHistory };
        localStorage.setItem('user', JSON.stringify(updatedUser));

        const allUsers: User[] = JSON.parse(localStorage.getItem('allUsers') || '[]');
        const userIndex = allUsers.findIndex(u => u.email.toLowerCase() === updatedUser.email.toLowerCase());
        if (userIndex > -1) {
            allUsers[userIndex] = updatedUser;
            localStorage.setItem('allUsers', JSON.stringify(allUsers));
        }

        return updatedUser;
    });
  };

   const handleUpdateProfile = (updatedDetails: { name: string }): string | void => {
    setUser(currentUser => {
        if (!currentUser) return null;

        const updatedUser = { ...currentUser, ...updatedDetails };
        localStorage.setItem('user', JSON.stringify(updatedUser));

        const allUsers: User[] = JSON.parse(localStorage.getItem('allUsers') || '[]');
        const userIndex = allUsers.findIndex(u => u.email.toLowerCase() === updatedUser.email.toLowerCase());
        if (userIndex > -1) {
            allUsers[userIndex] = { ...allUsers[userIndex], ...updatedDetails };
            localStorage.setItem('allUsers', JSON.stringify(allUsers));
        }
        return updatedUser;
    });
    return "Profile updated successfully!";
  };

  const handleChangePassword = (passwords: { current: string; new: string }): string => {
      if (!user || !user.password) {
          return "Password cannot be changed for this account.";
      }
      if (user.password !== passwords.current) {
          return "Incorrect current password.";
      }

      setUser(currentUser => {
          if (!currentUser) return null;
          const updatedUser = { ...currentUser, password: passwords.new };
          localStorage.setItem('user', JSON.stringify(updatedUser));

          const allUsers: User[] = JSON.parse(localStorage.getItem('allUsers') || '[]');
          const userIndex = allUsers.findIndex(u => u.email.toLowerCase() === updatedUser.email.toLowerCase());
          if (userIndex > -1) {
              allUsers[userIndex].password = passwords.new;
              localStorage.setItem('allUsers', JSON.stringify(allUsers));
          }

          return updatedUser;
      });
      return "Password changed successfully!";
  };

  const handleDeleteAccount = () => {
      if (!user) return;
      
      const allUsers: User[] = JSON.parse(localStorage.getItem('allUsers') || '[]');
      const updatedUsers = allUsers.filter(u => u.email.toLowerCase() !== user.email.toLowerCase());
      localStorage.setItem('allUsers', JSON.stringify(updatedUsers));
      
      handleLogout();
  };


  const renderDashboardPage = () => {
    if (!user) return null;
    switch (activePage) {
      case Page.HOME:
        return <HomePage user={user} setActivePage={setActivePage} />;
      case Page.CREATE:
        return <CreatePage user={user} updateCredits={updateCredits} addToHistory={addToHistory} />;
      case Page.CHAT:
        return <ChatPage user={user} updateCredits={updateCredits} />;
      case Page.EXPLORE:
        return <ExplorePage />;
      case Page.HISTORY:
        return <HistoryPage history={user.history || []} setActivePage={setActivePage} />;
      case Page.PROFILE:
        return (
            <ProfilePage
                user={user}
                onUpdateProfile={handleUpdateProfile}
                onChangePassword={handleChangePassword}
                onDeleteAccount={handleDeleteAccount}
            />
        );
      case Page.LIBRARY:
         return <PlaceholderPage title="Library" message="Your saved images and assets will be stored here." />;
      case Page.ADMIN:
         return user.isAdmin ? <AdminPage user={user} /> : <HomePage user={user} setActivePage={setActivePage} />;
      case Page.FAQ:
          return <FAQPage />;
      case Page.CONTACT:
          return <PlaceholderPage title="Contact Us" message="For support, please email us at orymaxcontact@gmail.com" />;
      default:
        return <HomePage user={user} setActivePage={setActivePage} />;
    }
  };


  return (
    <div className="min-h-screen flex flex-col bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text font-sans">
      {view === 'auth' ? (
        <Auth onAuth={handleAuth} onBack={() => setView('landing')} />
      ) : (
        <>
          <Header
            theme={theme}
            toggleTheme={toggleTheme}
            user={user}
            onLogout={handleLogout}
            onLoginClick={() => setView('auth')}
            isDashboard={view === 'dashboard'}
            activePage={activePage}
            setActivePage={setActivePage}
          />
          <main className="flex-grow">
            {view === 'landing' && <LandingPage onStartGenerating={() => setView('auth')} />}
            {view === 'dashboard' && (
              <div className="flex flex-col min-h-[calc(100vh-4rem)]">
                <div className="flex-grow p-4 sm:p-6 lg:p-8 pb-20 sm:pb-8">
                  {renderDashboardPage()}
                </div>
                 <footer className="text-center py-4 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800">
                    © 2025 Orymax. All rights reserved.
                </footer>
                <div className="fixed bottom-24 sm:bottom-6 right-6 z-30">
                  <Tooltip text="Quick Tips" position="left">
                    <button className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all transform hover:scale-110 focus:outline-none" aria-label="Quick Tips">
                        <LightbulbIcon className="w-8 h-8" />
                    </button>
                  </Tooltip>
                </div>
                <BottomNav activePage={activePage} setActivePage={setActivePage} user={user} />
              </div>
            )}
          </main>
        </>
      )}
    </div>
  );
};

export default App;
