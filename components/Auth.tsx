import React, { useState } from 'react';

type AuthMode = 'signup' | 'login';

interface AuthDetails {
    mode: 'signup' | 'login';
    email: string;
    name?: string;
    password?: string;
}
interface AuthProps {
  onAuth: (details: AuthDetails) => Promise<string | void>;
  onBack: () => void;
}

const Auth: React.FC<AuthProps> = ({ onAuth, onBack }) => {
  const [authMode, setAuthMode] = useState<AuthMode>('signup');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    form: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = { name: '', email: '', password: '', confirmPassword: '', form: '' };
    let isValid = true;

    if (authMode === 'signup' && !name.trim()) {
      newErrors.name = 'Full name is required.';
      isValid = false;
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required.';
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required.';
      isValid = false;
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long.';
      isValid = false;
    }

    if (authMode === 'signup') {
        if (!confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password.';
            isValid = false;
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match.';
            isValid = false;
        }
    }
    
    setErrors(newErrors);
    return isValid;
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    
    if (validateForm()) {
      setIsLoading(true);
      const authResult = await onAuth({
          mode: authMode,
          email,
          name,
          password
      });
      if (authResult) {
          setErrors(prev => ({...prev, form: authResult}));
      }
      setIsLoading(false);
    }
  };
  
  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>, field: keyof typeof errors) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
      if (errors[field]) {
          setErrors(prev => ({ ...prev, [field]: '' }));
      }
       if (errors.form) {
          setErrors(prev => ({ ...prev, form: '' }));
      }
  };

  const toggleAuthMode = () => {
      setAuthMode(prev => prev === 'signup' ? 'login' : 'signup');
      setErrors({ name: '', email: '', password: '', confirmPassword: '', form: '' });
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
  };

  const isDisabled = isLoading;

  return (
    <>
      <div className="relative min-h-screen flex items-center justify-center bg-light-bg dark:bg-dark-bg p-4 animate-fadeIn overflow-hidden">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob dark:mix-blend-lighten"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000 dark:mix-blend-lighten"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000 dark:mix-blend-lighten"></div>
          
          <div 
            className="w-full max-w-md bg-white/10 dark:bg-black/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20 dark:border-black/20"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={onBack} className="absolute top-4 left-4 text-light-text dark:text-dark-text hover:opacity-75 transition-opacity">&larr; Back</button>
            <div className="text-center">
              <h2 className="text-3xl font-bold text-light-primary dark:text-dark-primary">
                {authMode === 'signup' ? 'Create Your Account' : 'Welcome Back'}
              </h2>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {authMode === 'signup' ? 'Get 25 free credits to start.' : 'Sign in to continue.'}
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              {authMode === 'signup' && (
                <div>
                  <input type="text" placeholder="Full Name" value={name} onChange={handleInputChange(setName, 'name')} disabled={isDisabled} className={`w-full px-4 py-3 bg-white/20 dark:bg-black/20 rounded-lg border transition-colors focus:outline-none focus:ring-2 ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-transparent focus:ring-white/50'}`} />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
              )}
              <div>
                <input type="email" placeholder="Email Address" value={email} onChange={handleInputChange(setEmail, 'email')} disabled={isDisabled} className={`w-full px-4 py-3 bg-white/20 dark:bg-black/20 rounded-lg border transition-colors focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-transparent focus:ring-white/50'}`} />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <input type="password" placeholder="Password (min. 8 characters)" value={password} onChange={handleInputChange(setPassword, 'password')} disabled={isDisabled} className={`w-full px-4 py-3 bg-white/20 dark:bg-black/20 rounded-lg border transition-colors focus:outline-none focus:ring-2 ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-transparent focus:ring-white/50'}`} />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>
              {authMode === 'signup' && (
                <div>
                    <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={handleInputChange(setConfirmPassword, 'confirmPassword')} disabled={isDisabled} className={`w-full px-4 py-3 bg-white/20 dark:bg-black/20 rounded-lg border transition-colors focus:outline-none focus:ring-2 ${errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'border-transparent focus:ring-white/50'}`} />
                    {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                </div>
              )}

              {errors.form && <p className="text-red-500 text-sm text-center bg-red-500/10 p-2 rounded-lg">{errors.form}</p>}
              
              <button type="submit" disabled={isDisabled} className="w-full py-3 px-4 bg-light-primary text-light-bg dark:bg-dark-primary dark:text-dark-bg rounded-lg font-semibold hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center">
                {isLoading ? <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div> : (authMode === 'signup' ? 'Create Account' : 'Log In')}
              </button>
            </form>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
              {authMode === 'signup' ? 'Already have an account?' : "Don't have an account?"}
              <button onClick={toggleAuthMode} className="font-semibold text-light-primary dark:text-dark-primary hover:underline ml-1">
                 {authMode === 'signup' ? 'Log In' : 'Sign Up'}
              </button>
            </p>
          </div>
      </div>
    </>
  );
};

export default Auth;