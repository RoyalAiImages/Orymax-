import React, { useState } from 'react';
import { CopyIcon } from './icons/Icons';

interface MarkdownRendererProps {
  content: string;
}

const CodeBlock: React.FC<{ code: string }> = ({ code }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-light-bg dark:bg-dark-bg my-2 rounded-lg relative border border-gray-200 dark:border-gray-700">
            <button
                onClick={handleCopy}
                className="absolute top-2 right-2 p-1.5 bg-gray-200 dark:bg-gray-800 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
                aria-label="Copy code"
            >
                <CopyIcon className="w-4 h-4" />
            </button>
            <pre className="p-4 pt-10 overflow-x-auto text-sm">
                <code>{code}</code>
            </pre>
            {copied && <span className="absolute top-2 left-2 text-xs text-green-500 bg-green-500/10 px-2 py-1 rounded">Copied!</span>}
        </div>
    );
};


const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
    // This regex splits the text by code blocks, keeping the delimiters
    const parts = content.split(/(```[\s\S]*?```)/g);

    return (
        <div className="prose prose-sm dark:prose-invert max-w-none text-light-text dark:text-dark-text">
            {parts.map((part, index) => {
                if (part.startsWith('```')) {
                    const code = part.replace(/^```(?:\w+\n)?/, '').replace(/```$/, '');
                    return <CodeBlock key={index} code={code} />;
                }

                return part.split('\n').map((line, lineIndex) => {
                    // Basic bold and italic
                    line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                    line = line.replace(/\*(.*?)\*/g, '<em>$1</em>');
                    
                    // Unordered list
                    if (/^(\s*-\s|\s*\*\s)/.test(line)) {
                        return <ul key={`${index}-${lineIndex}`} className="list-disc pl-5"><li dangerouslySetInnerHTML={{ __html: line.replace(/^(\s*-\s|\s*\*\s)/, '') }} /></ul>;
                    }
                    // Ordered list
                    if (/^\s*\d+\.\s/.test(line)) {
                        return <ol key={`${index}-${lineIndex}`} className="list-decimal pl-5"><li dangerouslySetInnerHTML={{ __html: line.replace(/^\s*\d+\.\s/, '') }} /></ol>;
                    }

                    return <p key={`${index}-${lineIndex}`} dangerouslySetInnerHTML={{ __html: line }} style={{ margin: 0 }} />;
                });
            })}
        </div>
    );
};

export default MarkdownRenderer;
