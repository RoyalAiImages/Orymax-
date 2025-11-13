import React from 'react';
import { User, Page } from '../types';
import ImageCard, { ImageCardProps } from './ImageCard';

interface HomePageProps {
  user: User;
  setActivePage: (page: Page) => void;
}

const inspirationImages: ImageCardProps[] = [
    { src: 'https://picsum.photos/seed/home1/800/450', prompt: 'A majestic lion with a crown of stars', author: 'AI Explorer' },
    { src: 'https://picsum.photos/seed/home2/800/450', prompt: 'Floating castle in a sea of clouds', author: 'Dream Weaver' },
    { src: 'https://picsum.photos/seed/home3/800/450', prompt: 'Neon-lit cyberpunk alleyway in the rain', author: 'Cyber Artist' },
    { src: 'https://picsum.photos/seed/home4/800/450', prompt: 'Ancient tree of life with glowing roots', author: 'MythMaker' },
    { src: 'https://picsum.photos/seed/home5/800/450', prompt: 'A friendly robot serving tea in a zen garden', author: 'Pixel Painter' },
    { src: 'https://picsum.photos/seed/home6/800/450', prompt: 'A surreal desert landscape with two suns', author: 'Cosmic Creator' },
];

const HomePage: React.FC<HomePageProps> = ({ user, setActivePage }) => {
  return (
    <div className="animate-fadeIn">
      <div className="mb-8 p-6 bg-light-surface dark:bg-dark-surface rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800/50">
        <h1 className="text-3xl font-bold text-light-primary dark:text-dark-primary">
          Hello, {user.name.split(' ')[0]}!
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Welcome back to Orymax. Let's create something amazing today.</p>
        <button
          onClick={() => setActivePage(Page.CREATE)}
          className="mt-4 bg-light-primary text-light-bg dark:bg-dark-primary dark:text-dark-bg font-bold py-2 px-6 rounded-full text-base hover:scale-105 transform transition-transform duration-300 shadow-lg"
        >
            Start Creating
        </button>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-light-primary dark:text-dark-primary mb-4">Inspiration</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {inspirationImages.map((image, index) => (
                <ImageCard key={index} {...image} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
