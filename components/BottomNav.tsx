import React from 'react';
import { Page, User } from '../types';
import { navItems } from './constants';
import Tooltip from './Tooltip';

interface BottomNavProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
  user: User | null;
}

const BottomNav: React.FC<BottomNavProps> = ({ activePage, setActivePage, user }) => {
  const displayedNavItems = user?.isAdmin 
    ? navItems
    : navItems.filter(item => item.page !== Page.ADMIN);

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-light-surface/80 dark:bg-dark-surface/80 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 flex justify-around items-center sm:hidden z-40">
      {displayedNavItems.map(item => (
        <Tooltip key={item.page} text={item.page} position="top">
          <button
            onClick={() => setActivePage(item.page)}
            className={`flex flex-col items-center justify-center w-full h-full transition-colors rounded-lg mx-1 p-1 ${
              activePage === item.page
                ? 'text-light-primary dark:text-dark-primary'
                : 'text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-800'
            }`}
            aria-label={item.page}
            aria-current={activePage === item.page ? 'page' : undefined}
          >
            <item.icon className="w-6 h-6" />
            <span className="text-xs font-medium mt-1">{item.page}</span>
          </button>
        </Tooltip>
      ))}
    </nav>
  );
};

export default BottomNav;
