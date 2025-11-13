import React, { useState, useEffect, useRef } from 'react';
import { User } from '../types';
import { chatService } from '../services/chatService';
import { SendIcon, UserIcon } from './icons/Icons';
import MarkdownRenderer from './MarkdownRenderer';

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

interface ChatPageProps {
  user: User;
  updateCredits: (cost: number) => void;
}

const TypingIndicator: React.FC = () => (
  <div className="flex items-center space-x-1">
    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:0.2s]"></div>
    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:0.4s]"></div>
  </div>
);


const ChatPage: React.FC<ChatPageProps> = ({ user, updateCredits }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const CHAT_COST = 1;
  const cost = user.isAdmin ? 0 : CHAT_COST;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

   useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    if (user.credits < cost) {
      setError(`You need at least ${cost} credit to send a message.`);
      return;
    }

    const newUserMessage: Message = { sender: 'user', text: input };
    setMessages(prev => [...prev, newUserMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);
    
    // Optimistically deduct credits
    if(cost > 0) {
        updateCredits(cost);
    }
    
    try {
        setMessages(prev => [...prev, { sender: 'ai', text: '' }]);

        await chatService.sendMessage(input, (chunk) => {
            const chunkText = chunk.text;
            setMessages(prev => {
                const lastMessage = prev[prev.length - 1];
                if (lastMessage && lastMessage.sender === 'ai') {
                    const updatedMessages = [...prev];
                    updatedMessages[prev.length - 1] = { ...lastMessage, text: lastMessage.text + chunkText };
                    return updatedMessages;
                }
                return prev;
            });
        });

    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred.';
        setError(`Failed to get response: ${errorMessage}`);
        // Revert optimistic credit deduction on failure
        if (cost > 0) {
            updateCredits(-cost);
        }
        // Remove the empty AI message placeholder
        setMessages(prev => prev.slice(0, -1));
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] sm:h-[calc(100vh-6rem)] max-w-4xl mx-auto animate-fadeIn">
      <div className="flex-grow overflow-y-auto pr-4 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
             {msg.sender === 'ai' && (
              <div className="w-8 h-8 rounded-full bg-light-surface dark:bg-dark-surface flex items-center justify-center flex-shrink-0 border border-gray-200 dark:border-gray-800">
                <span className="text-sm font-bold">RA</span>
              </div>
            )}
            <div className={`max-w-xl p-3 rounded-2xl ${msg.sender === 'user' ? 'bg-blue-500 text-white rounded-br-none' : 'bg-light-surface dark:bg-dark-surface text-light-text dark:text-dark-text rounded-bl-none'}`}>
              <MarkdownRenderer content={msg.text} />
            </div>
             {msg.sender === 'user' && (
              <div className="w-8 h-8 rounded-full bg-light-surface dark:bg-dark-surface flex items-center justify-center flex-shrink-0 border border-gray-200 dark:border-gray-800">
                <UserIcon className="w-5 h-5 text-gray-500" />
              </div>
            )}
          </div>
        ))}
        {isLoading && (
            <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-light-surface dark:bg-dark-surface flex items-center justify-center flex-shrink-0 border border-gray-200 dark:border-gray-800">
                    <span className="text-sm font-bold">RA</span>
                </div>
                <div className="max-w-md p-3 rounded-2xl bg-light-surface dark:bg-dark-surface rounded-bl-none">
                    <TypingIndicator />
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
         {error && <p className="text-red-500 text-center text-sm mb-2">{error}</p>}
        <div className="relative flex items-center bg-light-surface dark:bg-dark-surface rounded-xl p-2 border border-gray-200 dark:border-gray-800 focus-within:ring-2 focus-within:ring-light-primary dark:focus-within:ring-dark-primary">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Ask me anything..."
            className="w-full bg-transparent p-2 pr-12 text-base outline-none resize-none max-h-40"
            rows={1}
            disabled={isLoading}
            aria-label="Chat input"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-light-primary text-light-bg dark:bg-dark-primary dark:text-dark-bg disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
            aria-label="Send message"
          >
            <SendIcon className="w-5 h-5" />
          </button>
        </div>
        <p className="text-xs text-center text-gray-400 mt-2">
            Chat cost: {user.isAdmin ? 'Free' : `${cost} credit per message`}.
        </p>
      </div>
    </div>
  );
};

export default ChatPage;
