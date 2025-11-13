import React, { useState } from 'react';
import { User, HistoryItem } from '../types';
import ImageGenerator from './ImageGenerator';
import ThumbnailGenerator from './ThumbnailGenerator';
import { WandIcon, ThumbnailIcon } from './icons/Icons';

interface CreatePageProps {
  user: User;
  updateCredits: (cost: number) => void;
  addToHistory: (item: HistoryItem) => void;
}

type GeneratorType = 'image' | 'thumbnail';

const CreatePage: React.FC<CreatePageProps> = ({ user, updateCredits, addToHistory }) => {
  const [activeGenerator, setActiveGenerator] = useState<GeneratorType>('image');

  const pageDetails = {
    image: {
      title: 'Image Generator',
      description: 'Bring your ideas to life with stunning visuals.',
    },
    thumbnail: {
      title: 'AI Thumbnail Maker',
      description: 'Generate a 4K quality thumbnail in just one prompt.',
    },
  };

  const TabButton: React.FC<{
    isActive: boolean;
    onClick: () => void;
    icon: React.ReactNode;
    label: string;
  }> = ({ isActive, onClick, icon, label }) => (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full transition-colors ${
        isActive
          ? 'bg-light-primary text-light-bg dark:bg-dark-primary dark:text-dark-bg'
          : 'bg-light-surface dark:bg-dark-surface hover:bg-gray-200 dark:hover:bg-gray-800'
      }`}
    >
      {icon}
      {label}
    </button>
  );

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-light-primary dark:text-dark-primary">
          {pageDetails[activeGenerator].title}
        </h1>
        <p className="text-gray-500 dark:text-gray-400">{pageDetails[activeGenerator].description}</p>
      </div>

      <div className="mb-6 flex items-center justify-center gap-2 p-2 bg-light-surface dark:bg-dark-surface rounded-full">
        <TabButton 
          isActive={activeGenerator === 'image'}
          onClick={() => setActiveGenerator('image')}
          icon={<WandIcon className="w-4 h-4" />}
          label="Image"
        />
        <TabButton 
          isActive={activeGenerator === 'thumbnail'}
          onClick={() => setActiveGenerator('thumbnail')}
          icon={<ThumbnailIcon className="w-4 h-4" />}
          label="Thumbnail"
        />
      </div>

      <div>
        {activeGenerator === 'image' && (
          <ImageGenerator user={user} updateCredits={updateCredits} addToHistory={addToHistory} />
        )}
        {activeGenerator === 'thumbnail' && (
          <ThumbnailGenerator user={user} updateCredits={updateCredits} addToHistory={addToHistory} />
        )}
      </div>
    </div>
  );
};

export default CreatePage;
