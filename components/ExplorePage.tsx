import React from 'react';
import ImageCard, { ImageCardProps } from './ImageCard';

const demoImages: ImageCardProps[] = [
    { src: 'https://picsum.photos/seed/explore1/800/450', prompt: 'A lone wanderer in a futuristic city', author: 'User123' },
    { src: 'https://picsum.photos/seed/explore2/800/450', prompt: 'Cosmic jellyfish floating through a nebula', author: 'CreativeMind' },
    { src: 'https://picsum.photos/seed/explore3/800/450', prompt: 'A steampunk library with flying books', author: 'ArtisanAI' },
    { src: 'https://picsum.photos/seed/explore4/800/450', prompt: 'Enchanted forest with glowing mushrooms', author: 'Visionary' },
    { src: 'https://picsum.photos/seed/explore5/800/450', prompt: 'Portrait of a cybernetic owl', author: 'User456' },
    { src: 'https://picsum.photos/seed/explore6/800/450', prompt: 'Floating islands in a sunset sky', author: 'Dreamer' },
    { src: 'https://picsum.photos/seed/explore7/800/450', prompt: 'An ancient dragon sleeping on a pile of gold', author: 'AI_Master' },
    { src: 'https://picsum.photos/seed/explore8/800/450', prompt: 'A retro-wave car driving into the sunset', author: 'SynthWaveFan' },
    { src: 'https://picsum.photos/seed/explore9/800/450', prompt: 'Underwater city made of crystal', author: 'AquaDream' },
    { src: 'https://picsum.photos/seed/explore10/800/450', prompt: 'A secret waterfall inside a crystal cave', author: 'GeoDreamer' },
    { src: 'https://picsum.photos/seed/explore11/800/450', prompt: 'A bioluminescent octopus exploring a sunken ship', author: 'DeepSeaAI' },
    { src: 'https://picsum.photos/seed/explore12/800/450', prompt: 'A medieval knight with a laser sword', author: 'FuturePast' },
    { src: 'https://picsum.photos/seed/explore13/800/450', prompt: 'A house built on the back of a giant turtle', author: 'Wanderer' },
    { src: 'https://picsum.photos/seed/explore14/800/450', prompt: 'An astronaut playing guitar on the moon', author: 'Starman' },
    { src: 'https://picsum.photos/seed/explore15/800/450', prompt: 'A vibrant marketplace in a fantasy city', author: 'WorldBuilder' },
    { src: 'https://picsum.photos/seed/explore16/800/450', prompt: 'Portrait of a woman made of flowers', author: 'FloraArt' },
    { src: 'https://picsum.photos/seed/explore17/800/450', prompt: 'A tiny fox sleeping in a teacup', author: 'CuteCreator' },
    { src: 'https://picsum.photos/seed/explore18/800/450', prompt: 'A glass apple with a galaxy inside', author: 'AbstractAI' },
];

const ExplorePage: React.FC = () => {
  return (
    <div className="animate-fadeIn">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-light-primary dark:text-dark-primary">
          Explore Creations
        </h1>
        <p className="text-gray-500 dark:text-gray-400">Discover what others are creating with Orymax.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {demoImages.map((image, index) => (
          <ImageCard key={index} {...image} />
        ))}
      </div>
    </div>
  );
};

export default ExplorePage;
