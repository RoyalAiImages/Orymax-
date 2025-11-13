import React, { useState } from 'react';
import { ChevronDownIcon } from './icons/Icons';

const faqData = [
    {
        question: "How do I get credits?",
        answer: "You start with 25 free credits upon signing up, and you'll receive another 25 free credits automatically each week. If you need more, you can subscribe to a monthly plan for daily credits by clicking the 'Credits' button in the header."
    },
    {
        question: "How many credits does it cost to generate an image?",
        answer: "Each image generation costs 5 credits. This cost is deducted from your balance only after the image is successfully created. Generation is free for admin accounts."
    },
    {
        question: "What happens if I run out of credits?",
        answer: "If your credit balance is too low, you won't be able to generate new images. You can either wait for your weekly free credit top-up or purchase a subscription plan to continue creating without interruption."
    },
    {
        question: "What kind of images can I create?",
        answer: "You can create almost anything you can imagine! The AI generates high-quality images from text prompts, covering various styles from photorealistic portraits and landscapes to abstract art and fantasy scenes. The more descriptive your prompt, the better the result."
    },
    {
        question: "Can I use the generated images for commercial purposes?",
        answer: "Yes, you have full ownership of the images you create. You can use them for personal, educational, or commercial projects without any restrictions."
    },
    {
        question: "How can I see my past creations?",
        answer: "All of your generated images are automatically saved to your account. You can view, revisit, and download your entire creation gallery by navigating to the 'History' page."
    },
    {
        question: "Is my data and my creations private?",
        answer: "Absolutely. We have a strict privacy-first policy. Your prompts and the images you generate are never stored on our servers. Everything is processed and then forgotten, ensuring your creative work remains yours alone."
    }
];


const FAQItem: React.FC<{ question: string; answer: string; isOpen: boolean; onClick: () => void; }> = ({ question, answer, isOpen, onClick }) => {
    return (
        <div className="border-b border-gray-200 dark:border-gray-800">
            <button
                onClick={onClick}
                className="w-full flex justify-between items-center text-left py-5 px-2 hover:bg-gray-100 dark:hover:bg-gray-800/50 rounded-lg"
                aria-expanded={isOpen}
            >
                <span className="text-lg font-medium text-light-primary dark:text-dark-primary">{question}</span>
                <ChevronDownIcon className={`w-6 h-6 text-gray-500 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <div
                className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
            >
                <div className="overflow-hidden">
                    <p className="pt-2 pb-5 px-2 text-gray-600 dark:text-gray-400 leading-relaxed">
                        {answer}
                    </p>
                </div>
            </div>
        </div>
    )
};


const FAQPage: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="max-w-4xl mx-auto animate-fadeIn px-4">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-light-primary dark:text-dark-primary">
                    Frequently Asked Questions
                </h1>
                <p className="text-lg text-gray-500 dark:text-gray-400 mt-2">
                    Find answers to common questions about Orymax.
                </p>
            </div>
            <div className="bg-light-surface dark:bg-dark-surface p-4 sm:p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800/50">
                {faqData.map((faq, index) => (
                    <FAQItem
                        key={index}
                        question={faq.question}
                        answer={faq.answer}
                        isOpen={openIndex === index}
                        onClick={() => handleToggle(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default FAQPage;
