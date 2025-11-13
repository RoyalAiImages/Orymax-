import React from 'react';
import { User } from '../types';
import { CloseIcon } from './icons/Icons';

interface CreditPlan {
  credits: number;
  price: number;
  priceId: string;
}

const plans: CreditPlan[] = [
  { credits: 200, price: 199, priceId: 'plan_1' },
  { credits: 500, price: 499, priceId: 'plan_2' },
  { credits: 1500, price: 999, priceId: 'plan_3' },
];

interface CreditPurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
}

const CreditPurchaseModal: React.FC<CreditPurchaseModalProps> = ({ isOpen, onClose, user }) => {
  if (!isOpen) return null;

  const handlePurchase = (plan: CreditPlan) => {
    const email = 'orymaxcontact@gmail.com';
    const subject = 'Credit Plan Subscription Request';
    const body = `Hello,\n\nI'd like to subscribe to the ${plan.credits} credits per day plan for ₹${plan.price} per month.\n\nMy Orymax account email is: ${user?.email || '[Please enter your account email here]'}\n\nThank you.`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="credit-modal-title"
    >
      <div 
        className="bg-light-surface dark:bg-dark-surface w-full max-w-lg rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800/50 p-6 sm:p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
            onClick={onClose} 
            className="absolute top-4 right-4 text-gray-400 hover:text-light-primary dark:hover:text-dark-primary transition-colors"
            aria-label="Close"
        >
          <CloseIcon />
        </button>
        <h2 id="credit-modal-title" className="text-2xl sm:text-3xl font-bold text-center mb-2 text-light-primary dark:text-dark-primary">Subscription Plans</h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-6">Choose a monthly plan for daily credits. The credits will be added manually after payment.</p>

        <div className="space-y-4">
          {plans.map((plan) => (
            <div key={plan.priceId} className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-light-bg dark:bg-dark-bg hover:border-light-primary dark:hover:border-dark-primary transition-colors">
              <div>
                <h3 className="font-bold text-lg text-light-primary dark:text-dark-primary">{plan.credits} Credits <span className="text-sm font-normal text-gray-500 dark:text-gray-400">/ day</span></h3>
                <p className="text-gray-500 dark:text-gray-400">Billed monthly</p>
              </div>
              <button 
                onClick={() => handlePurchase(plan)}
                className="px-6 py-2 text-sm font-semibold bg-light-primary text-light-bg dark:bg-dark-primary dark:text-dark-bg rounded-full hover:bg-opacity-90 transition-all"
              >
                ₹{plan.price}<span className="text-xs font-normal">/mo</span>
              </button>
            </div>
          ))}
        </div>
        <p className="text-xs text-center text-gray-400 dark:text-gray-500 mt-6">
            You will be redirected to your email client to complete the purchase request.
        </p>
      </div>
    </div>
  );
};

export default CreditPurchaseModal;