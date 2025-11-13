import React from 'react';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

const positionClasses = {
  top: 'bottom-full mb-2 left-1/2 -translate-x-1/2',
  bottom: 'top-full mt-2 left-1/2 -translate-x-1/2',
  left: 'right-full mr-2 top-1/2 -translate-y-1/2',
  right: 'left-full ml-2 top-1/2 -translate-y-1/2',
};

const arrowClasses = {
  top: 'top-full left-1/2 -translate-x-1/2 border-x-transparent border-t-gray-800 dark:border-t-gray-900',
  bottom: 'bottom-full left-1/2 -translate-x-1/2 border-x-transparent border-b-gray-800 dark:border-b-gray-900',
  left: 'left-full top-1/2 -translate-y-1/2 border-y-transparent border-l-gray-800 dark:border-l-gray-900',
  right: 'right-full top-1/2 -translate-y-1/2 border-y-transparent border-r-gray-800 dark:border-r-gray-900',
};


const Tooltip: React.FC<TooltipProps> = ({ text, children, position = 'top' }) => {
  return (
    <div className="relative group flex items-center justify-center">
      {children}
      <div className={`absolute w-max bg-gray-800 dark:bg-gray-900 text-white text-xs rounded-lg py-1.5 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50 ${positionClasses[position]}`}>
        {text}
        <div className={`absolute w-0 h-0 border-4 ${arrowClasses[position]}`}></div>
      </div>
    </div>
  );
};

export default Tooltip;
