import React from 'react';
import { User, HistoryItem } from '../types';
import ThumbnailGenerator from './ThumbnailGenerator';

interface ThumbnailPageProps {
  user: User;
  updateCredits: (cost: number) => void;
  addToHistory: (item: HistoryItem) => void;
}

const ThumbnailPage: React.FC<ThumbnailPageProps> = ({ user, updateCredits, addToHistory }) => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-light-primary dark:text-dark-primary">
          AI Thumbnail Maker
        </h1>
        <p className="text-gray-500 dark:text-gray-400">Generate a 4K quality thumbnail in just one prompt.</p>
      </div>
      <ThumbnailGenerator user={user} updateCredits={updateCredits} addToHistory={addToHistory} />
    </div>
  );
};

export default ThumbnailPage;
