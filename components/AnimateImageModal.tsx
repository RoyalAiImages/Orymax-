import React, { useState, useEffect } from 'react';
import { User } from '../types';
import { animateImage } from '../services/geminiService';
import { CloseIcon, FilmIcon, DownloadIcon } from './icons/Icons';

interface AnimateImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  user: User;
  updateCredits: (cost: number) => void;
}

// Helper to convert data URL to base64 string and mime type
const dataURLtoBase64AndMime = (dataurl: string) => {
    const arr = dataurl.split(','),
        match = arr[0].match(/:(.*?);/);
    
    if (!match || !match[1]) {
        throw new Error("Invalid data URL");
    }

    const mime = match[1];
    return { base64: arr[1], mimeType: mime };
};

const AnimateImageModal: React.FC<AnimateImageModalProps> = ({ isOpen, onClose, imageUrl, user, updateCredits }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Animating...');
  const [error, setError] = useState<string | null>(null);
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
  
  const [hasApiKey, setHasApiKey] = useState(false);
  const [isCheckingApiKey, setIsCheckingApiKey] = useState(true);

  const ANIMATION_COST = 5;
  const cost = user.isAdmin ? 0 : ANIMATION_COST;

  useEffect(() => {
    if (isOpen) {
      const checkKey = async () => {
        setIsCheckingApiKey(true);
        try {
          const keyStatus = await window.aistudio.hasSelectedApiKey();
          setHasApiKey(keyStatus);
        } catch (e) {
            console.error("Error checking for API key:", e);
            setHasApiKey(false);
        } finally {
            setIsCheckingApiKey(false);
        }
      };
      checkKey();
    }
  }, [isOpen]);

  const handleSelectKey = async () => {
    try {
        await window.aistudio.openSelectKey();
        // Assume key selection is successful to avoid race conditions.
        setHasApiKey(true);
        setError(null);
    } catch (e) {
        console.error("Error opening select key dialog:", e);
        setError("Could not open the API key selection dialog.");
    }
  };

  const handleAnimate = async () => {
    if (user.credits < cost) {
      setError(`You need at least ${cost} credits to animate an image.`);
      return;
    }

    setIsLoading(true);
    setLoadingMessage('Initializing animation...');
    setError(null);
    setGeneratedVideo(null);

    try {
      const { base64, mimeType } = dataURLtoBase64AndMime(imageUrl);

      const loadingMessages = [
        'Warming up the animation engine...',
        'Rendering video frames...',
        'This can take a few minutes...',
        'Finalizing the video...'
      ];
      let messageIndex = 0;
      const interval = setInterval(() => {
        setLoadingMessage(loadingMessages[messageIndex % loadingMessages.length]);
        messageIndex++;
      }, 8000);

      const videoUrl = await animateImage(base64, mimeType);
      
      clearInterval(interval);
      setGeneratedVideo(videoUrl);
      if (cost > 0) {
        updateCredits(cost);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred during animation.';
       if (errorMessage.includes("NOT_FOUND") || errorMessage.includes("Requested entity was not found")) {
        setError("Animation failed. Your API key may not have access to the Veo model. Please select a different key and try again.");
        setHasApiKey(false);
      } else {
        setError(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (isLoading) return;
    setGeneratedVideo(null);
    setError(null);
    onClose();
  };

  const renderContent = () => {
    if (generatedVideo) {
        return (
             <a
                href={generatedVideo}
                download="orymax_animated_image.mp4"
                className="w-full text-center bg-green-500 text-white font-bold py-3 px-6 rounded-full text-lg hover:bg-green-600 transform transition-colors duration-300 shadow-lg flex items-center justify-center gap-2"
            >
                <DownloadIcon />
                Download Video
            </a>
        );
    }
    
    if (isCheckingApiKey) {
        return <div className="text-center text-gray-500 dark:text-gray-400 p-8">Checking for API key...</div>;
    }

    if (!hasApiKey) {
        return (
            <>
                <p className="text-gray-500 dark:text-gray-400 mb-4 text-center">
                    This feature requires a Google AI Studio API key with the Veo model enabled.
                </p>
                 <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-400 hover:underline mb-4 block text-center">Learn about billing for Veo</a>
                <button
                    onClick={handleSelectKey}
                    className="w-full bg-blue-500 text-white font-bold py-3 px-6 rounded-full text-lg hover:bg-blue-600 transition-colors duration-300 shadow-lg"
                >
                    Select API Key
                </button>
            </>
        );
    }


    return (
        <>
            <p className="text-gray-500 dark:text-gray-400 mb-6">Bring your static image to life. This will cost {cost} credits.</p>
            <button
                onClick={handleAnimate}
                disabled={isLoading || user.credits < cost}
                className="w-full bg-light-primary text-light-bg dark:bg-dark-primary dark:text-dark-bg font-bold py-3 px-6 rounded-full text-lg hover:scale-105 transform transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center gap-2"
            >
                {isLoading ? (
                <>
                    <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-sm">{loadingMessage}</span>
                </>
                ) : (
                <>
                    <FilmIcon />
                    <span>Animate {user.isAdmin ? '(Free)' : `(${cost} Credits)`}</span>
                </>
                )}
            </button>
            {user.credits < cost && !isLoading && (
              <p className="text-center text-red-500 mt-3 text-sm">You don't have enough credits to animate.</p>
            )}
        </>
    );
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fadeIn"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-light-surface dark:bg-dark-surface w-full max-w-4xl rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800/50 p-6 sm:p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-light-primary dark:hover:text-dark-primary transition-colors z-10"
          aria-label="Close"
          disabled={isLoading}
        >
          <CloseIcon />
        </button>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2 flex-shrink-0">
             <div className="aspect-video rounded-xl overflow-hidden relative bg-gray-100 dark:bg-gray-900">
                {generatedVideo ? (
                    <video src={generatedVideo} className="w-full h-full object-cover" controls autoPlay loop />
                ) : (
                    <img src={imageUrl} alt="Image to animate" className="w-full h-full object-cover" />
                )}
             </div>
          </div>

          <div className="md:w-1/2 flex flex-col justify-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-light-primary dark:text-dark-primary">Animate Image</h2>
            {renderContent()}
            {error && <p className="text-red-500 text-center mt-4 text-sm">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimateImageModal;
