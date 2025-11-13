import React, { useState, useRef, useEffect } from 'react';
import { Theme, User, Page } from '../types';
import { SunIcon, MoonIcon, UserIcon, LogoutIcon } from './icons/Icons';
import CreditPurchaseModal from './CreditPurchaseModal';
import Tooltip from './Tooltip';

interface HeaderProps {
  theme: Theme;
  toggleTheme: () => void;
  user: User | null;
  onLogout: () => void;
  onLoginClick: () => void;
  isDashboard?: boolean;
  activePage?: Page;
  setActivePage?: (page: Page) => void;
}

const NavButton: React.FC<{
    onClick: () => void;
    isActive: boolean;
    children: React.ReactNode;
}> = ({ onClick, isActive, children }) => (
    <button
        onClick={onClick}
        className={`relative px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ease-out hover:-translate-y-0.5 ${
            isActive
                ? 'text-light-primary dark:text-dark-primary'
                : 'text-gray-500 hover:text-light-primary dark:hover:text-dark-primary'
        }`}
    >
        {children}
        {isActive && (
            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-light-primary dark:bg-dark-primary rounded-full"></span>
        )}
    </button>
);


const Header: React.FC<HeaderProps> = ({ theme, toggleTheme, user, onLogout, onLoginClick, isDashboard = false, activePage, setActivePage }) => {
  const [isCreditModalOpen, setIsCreditModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsDropdownOpen(false);
        }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  
  return (
    <>
      <header className={`sticky top-0 z-50 bg-light-bg/80 dark:bg-dark-bg/80 backdrop-blur-md ${isDashboard ? 'border-b border-gray-200 dark:border-gray-800' : ''}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
                <div className="flex-shrink-0">
                    <button 
                      onClick={() => isDashboard && setActivePage && setActivePage(Page.HOME)}
                      className="text-2xl font-extrabold text-light-primary dark:text-dark-primary tracking-tight transition-transform duration-200 hover:scale-105"
                      aria-label="Orymax Home"
                    >
                      Orymax
                    </button>
                </div>
                 {isDashboard && setActivePage && user && (
                   <nav className="hidden sm:flex items-center space-x-1">
                     <NavButton onClick={() => setActivePage(Page.CREATE)} isActive={activePage === Page.CREATE}>Generator</NavButton>
                     <NavButton onClick={() => setActivePage(Page.CHAT)} isActive={activePage === Page.CHAT}>Chat</NavButton>
                     <NavButton onClick={() => setIsCreditModalOpen(true)} isActive={false}>Credits</NavButton>
                     {user.isAdmin && <NavButton onClick={() => setActivePage(Page.ADMIN)} isActive={activePage === Page.ADMIN}>Admin</NavButton>}
                     <NavButton onClick={() => setActivePage(Page.FAQ)} isActive={activePage === Page.FAQ}>FAQ</NavButton>
                     <NavButton onClick={() => setActivePage(Page.CONTACT)} isActive={activePage === Page.CONTACT}>Contact</NavButton>
                   </nav>
                 )}
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Tooltip text="Toggle Theme" position="bottom">
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full text-light-text dark:text-dark-text hover:bg-gray-200 dark:hover:bg-gray-800 transition-all duration-200 hover:scale-110"
                  aria-label="Toggle theme"
                >
                  {theme === Theme.LIGHT ? <MoonIcon /> : <SunIcon />}
                </button>
              </Tooltip>
              
              {user ? (
                <div className="relative" ref={dropdownRef}>
                    <Tooltip text="Account" position="bottom">
                      <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center space-x-2 text-sm font-medium p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-all duration-200 hover:scale-105" aria-label="Account menu">
                          <UserIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                          <span className="text-light-primary dark:text-dark-primary hidden sm:inline">{user.name} ({user.isAdmin ? '∞' : user.credits} credits)</span>
                      </button>
                    </Tooltip>
                    {isDropdownOpen && (
                         <div className="absolute right-0 mt-2 w-48 bg-light-surface dark:bg-dark-surface rounded-md shadow-lg py-1 border border-gray-200 dark:border-gray-800 animate-fadeIn">
                            {setActivePage && (
                                <button
                                    onClick={() => {
                                        setActivePage(Page.PROFILE);
                                        setIsDropdownOpen(false);
                                    }}
                                    className="w-full text-left px-4 py-2 text-sm text-light-text dark:text-dark-text hover:bg-gray-100 dark:hover:bg-gray-800"
                                >
                                    Profile
                                </button>
                            )}
                            <button
                                onClick={() => {
                                    onLogout();
                                    setIsDropdownOpen(false);
                                }}
                                className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
              ) : (
                <button
                  onClick={onLoginClick}
                  className="px-4 py-2 text-sm font-medium bg-light-primary text-light-bg dark:bg-dark-primary dark:text-dark-bg rounded-full hover:bg-opacity-90 transition-all duration-200 hover:scale-105"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </header>
      <CreditPurchaseModal 
        isOpen={isCreditModalOpen}
        onClose={() => setIsCreditModalOpen(false)}
        user={user}
      />
    </>
  );
};

export default Header;
