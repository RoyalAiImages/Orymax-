import React, { useState } from 'react';
import { User, HistoryItem } from '../types';
import { generateThumbnail } from '../services/geminiService';
import { ThumbnailIcon, DownloadIcon } from './icons/Icons';
import CreditPurchaseModal from './CreditPurchaseModal';
import { thumbnailPrompts } from './constants';

interface ThumbnailGeneratorProps {
  user: User;
  updateCredits: (cost: number) => void;
  addToHistory: (item: HistoryItem) => void;
}

const ThumbnailGenerator: React.FC<ThumbnailGeneratorProps> = ({ user, updateCredits, addToHistory }) => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isCreditModalOpen, setIsCreditModalOpen] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<string>('16:9');

  const THUMBNAIL_GENERATION_COST = 10;
  const cost = user.isAdmin ? 0 : THUMBNAIL_GENERATION_COST;
  const aspectRatios = ['16:9', '4:3', '1:1'];

  const handleInspireMe = () => {
    const randomPrompt = thumbnailPrompts[Math.floor(Math.random() * thumbnailPrompts.length)];
    setPrompt(randomPrompt);
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError("Please describe the thumbnail you want to create.");
      return;
    }
    if (user.credits < cost) {
      setError(`You need at least ${cost} credits to generate a thumbnail.`);
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const imageUrl = await generateThumbnail(prompt, aspectRatio);
      setGeneratedImage(imageUrl);
      if (cost > 0) {
        updateCredits(cost);
      }
      addToHistory({ prompt: `Thumbnail: ${prompt}`, imageUrl, timestamp: Date.now() });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDownload = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = `thumbnail_${prompt.slice(0, 20).replace(/\s/g, '_') || 'generated'}.jpeg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-fadeIn">
        <div className="bg-light-surface dark:bg-dark-surface p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800/50">
          <h2 className="text-2xl sm:text-3xl font-bold mb-1 text-light-primary dark:text-dark-primary">Thumbnail Generation</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Describe your thumbnail. Be specific for the best results, including any text you want.</p>
          
          <div className="relative">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., A shocked gamer with an exploding spaceship in the background, with the text 'IMPOSSIBLE!'"
              className="w-full h-28 p-4 pr-12 text-base bg-light-bg dark:bg-dark-bg rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary outline-none resize-none transition-colors"
              disabled={isLoading}
            />
          </div>

          <div className="flex flex-wrap items-center justify-between mt-4 gap-4">
             <div>
                <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 mr-2">Aspect Ratio:</span>
                <div className="inline-flex rounded-lg shadow-sm bg-light-bg dark:bg-dark-bg border border-gray-300 dark:border-gray-700">
                    {aspectRatios.map((ratio) => (
                        <button
                            key={ratio}
                            onClick={() => setAspectRatio(ratio)}
                            className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                                aspectRatio === ratio
                                    ? 'bg-light-primary text-light-bg dark:bg-dark-primary dark:text-dark-bg'
                                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800'
                            } first:rounded-l-md last:rounded-r-md`}
                            disabled={isLoading}
                        >
                            {ratio}
                        </button>
                    ))}
                </div>
            </div>
            <button
              onClick={handleInspireMe}
              className="text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-light-primary dark:hover:text-dark-primary transition-colors disabled:opacity-50"
              disabled={isLoading}
            >
              Inspire Me ✨
            </button>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={handleGenerate}
              disabled={isLoading || user.credits < cost}
              className="w-full sm:w-auto flex-grow bg-light-primary text-light-bg dark:bg-dark-primary dark:text-dark-bg font-bold py-3 px-8 rounded-full text-lg hover:scale-105 transform transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <ThumbnailIcon />
                  <span>Generate {user.isAdmin ? '(Free)' : `(${cost} Credits)`}</span>
                </>
              )}
            </button>
            <button
              onClick={() => setIsCreditModalOpen(true)}
              className="w-full sm:w-auto px-6 py-3 text-sm font-medium text-light-primary dark:text-dark-primary bg-transparent border border-light-primary dark:border-dark-primary rounded-full hover:bg-light-primary hover:text-light-bg dark:hover:bg-dark-primary dark:hover:text-dark-bg transition-colors"
            >
              Buy Credits
            </button>
          </div>
          
          {user.credits < cost && !isLoading && (
             <p className="text-red-500 text-center mt-4 text-sm">You need at least {cost} credits to generate a thumbnail.</p>
          )}

          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </div>

        {generatedImage && (
          <div className="mt-8 bg-light-surface dark:bg-dark-surface p-4 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800/50 animate-fadeIn">
            <div className="aspect-video rounded-xl overflow-hidden relative group">
                <img src={generatedImage} alt={prompt} className="w-full h-full object-cover" />
                 <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                   <button onClick={handleDownload} className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors" aria-label="Download Thumbnail">
                     <DownloadIcon />
                   </button>
                 </div>
            </div>
          </div>
        )}
      <CreditPurchaseModal
        isOpen={isCreditModalOpen}
        onClose={() => setIsCreditModalOpen(false)}
        user={user}
      />
    </div>
  );
};

export default ThumbnailGenerator;