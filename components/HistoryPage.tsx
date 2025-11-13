import React from 'react';
import { HistoryItem, Page } from '../types';
import { DownloadIcon, HistoryIcon } from './icons/Icons';

const HistoryCard: React.FC<{ item: HistoryItem }> = ({ item }) => {
    const handleDownload = (e: React.MouseEvent) => {
        e.stopPropagation();
        const link = document.createElement('a');
        link.href = item.imageUrl;
        link.download = `${item.prompt.slice(0, 20).replace(/\s/g, '_') || 'history_image'}.jpeg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    
    return (
        <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg group">
            <img src={item.imageUrl} alt={item.prompt} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white text-sm font-semibold truncate">{item.prompt}</p>
                    <p className="text-gray-300 text-xs">{new Date(item.timestamp).toLocaleString()}</p>
                </div>
                <button
                    onClick={handleDownload}
                    className="absolute top-3 right-3 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-all"
                    aria-label="Download Image"
                >
                    <DownloadIcon />
                </button>
            </div>
        </div>
    );
};

interface HistoryPageProps {
  history: HistoryItem[];
  setActivePage: (page: Page) => void;
}

const HistoryPage: React.FC<HistoryPageProps> = ({ history, setActivePage }) => {
  return (
    <div className="animate-fadeIn">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-light-primary dark:text-dark-primary">
          Your History
        </h1>
        <p className="text-gray-500 dark:text-gray-400">A gallery of your past creations.</p>
      </div>
      {history.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {history.map((item) => (
            <HistoryCard key={item.timestamp} item={item} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-15rem)] text-center">
            <div className="p-6 bg-light-surface dark:bg-dark-surface rounded-full mb-6 text-light-primary dark:text-dark-primary">
                <HistoryIcon className="w-16 h-16" />
            </div>
            <h2 className="text-2xl font-bold text-light-primary dark:text-dark-primary">No History Yet</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Start creating images, and they will appear here!</p>
            <button
              onClick={() => setActivePage(Page.CREATE)}
              className="mt-6 bg-light-primary text-light-bg dark:bg-dark-primary dark:text-dark-bg font-bold py-3 px-6 rounded-full text-base hover:scale-105 transform transition-transform duration-300 shadow-lg"
            >
                Create Your First Image
            </button>
        </div>
      )}
    </div>
  );
};

export default HistoryPage;