import React, { useState } from 'react';
import { DownloadIcon } from './icons/Icons';

export interface ImageCardProps {
  src: string;
  prompt: string;
  author: string;
}

const ImageCard: React.FC<ImageCardProps> = ({ src, prompt, author }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleDownload = (e: React.MouseEvent) => {
        e.stopPropagation();
        const link = document.createElement('a');
        link.href = src;
        link.download = `${prompt.slice(0, 20).replace(/\s/g, '_') || 'explore_image'}.jpeg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div 
            className="relative aspect-video rounded-xl overflow-hidden shadow-lg group cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <img src={src} alt={prompt} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
            <div 
                className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent transition-transform duration-300 ${isHovered ? 'translate-y-0' : 'translate-y-full'}`}
            >
                <p className="text-white text-sm font-semibold truncate">{prompt}</p>
                <p className="text-gray-300 text-xs">by {author}</p>
            </div>
            <button 
                onClick={handleDownload}
                className={`absolute top-3 right-3 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-all duration-300 ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
                aria-label="Download Image"
            >
                <DownloadIcon />
            </button>
        </div>
    );
};

export default ImageCard;