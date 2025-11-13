import React from 'react';
import { CompassIcon, LibraryIcon, HomeIcon } from './icons/Icons';

interface PlaceholderPageProps {
  title: string;
  message: string;
}

const pageIcons: { [key: string]: React.ReactNode } = {
  'Explore': <CompassIcon className="w-16 h-16" />,
  'Library': <LibraryIcon className="w-16 h-16" />,
  'Home': <HomeIcon className="w-16 h-16" />,
};

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title, message }) => {
  const icon = pageIcons[title] || null;

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-10rem)] text-center animate-fadeIn">
      <div className="p-6 bg-light-surface dark:bg-dark-surface rounded-full mb-6 text-light-primary dark:text-dark-primary">
        {icon}
      </div>
      <h1 className="text-4xl font-bold mb-2 text-light-primary dark:text-dark-primary">{title}</h1>
      <p className="text-lg text-gray-500 dark:text-gray-400">{message}</p>
      <p className="text-sm text-gray-400 dark:text-gray-500 mt-4">(Coming Soon)</p>
    </div>
  );
};

export default PlaceholderPage;