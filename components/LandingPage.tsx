import React from 'react';
import { SparklesIcon, ZapIcon, ShieldCheckIcon, CreditCardIcon, MailIcon, DownloadIcon } from './icons/Icons';

interface LandingPageProps {
  onStartGenerating: () => void;
}

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
  <div className="bg-light-surface dark:bg-dark-surface p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800/50 transform hover:-translate-y-2 transition-transform duration-300">
    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-light-bg dark:bg-dark-bg border border-gray-200 dark:border-gray-800 text-light-primary dark:text-dark-primary mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2 text-light-primary dark:text-dark-primary">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400">{children}</p>
  </div>
);

const LandingPage: React.FC<LandingPageProps> = ({ onStartGenerating }) => {
  const demoImages = Array.from({ length: 6 }, (_, i) => `https://picsum.photos/seed/${i+10}/800/450?grayscale`);

  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <section className="py-20 md:py-32 text-center relative overflow-hidden">
         <div className="absolute inset-0 bg-grid-gray-900/10 dark:bg-grid-white/10 [mask-image:linear-gradient(to_bottom,white_70%,transparent_100%)]"></div>
        <div className="container mx-auto px-4 relative">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
            Create AI Images in Seconds
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-600 dark:text-gray-300 mb-8">
            Powered by Orymax. Unleash your creativity with our fast, secure, and privacy-first image generation platform.
          </p>
          <button
            onClick={onStartGenerating}
            className="bg-light-primary text-light-bg dark:bg-dark-primary dark:text-dark-bg font-bold py-3 px-8 rounded-full text-lg hover:scale-105 transform transition-transform duration-300 shadow-lg"
          >
            Start Generating for Free
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-light-surface dark:bg-dark-surface">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-light-primary dark:text-dark-primary">Why Choose Orymax?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard icon={<ZapIcon />} title="Fast Generation">Generate high-quality visuals in a flash. Our optimized AI engine delivers results without the wait.</FeatureCard>
            <FeatureCard icon={<ShieldCheckIcon />} title="Privacy-First">Your data is yours. We never store your prompts or generated images. Ever.</FeatureCard>
            <FeatureCard icon={<CreditCardIcon />} title="Free Credits">Get started immediately with 25 free credits upon signing up. No credit card required.</FeatureCard>
            <FeatureCard icon={<DownloadIcon />} title="Instant Downloads">Love what you created? Download your images in high resolution with a single click.</FeatureCard>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-light-primary dark:text-dark-primary">Simple Steps to Create Magic</h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
             <div className="text-center max-w-xs"><div className="text-4xl font-bold text-light-primary dark:text-dark-primary mb-2">1</div><h3 className="text-xl font-semibold">Sign Up</h3><p className="text-gray-600 dark:text-gray-400">Create your free account to receive 25 credits instantly.</p></div>
             <div className="text-gray-400 dark:text-gray-600 text-2xl hidden md:block">&rarr;</div>
             <div className="text-center max-w-xs"><div className="text-4xl font-bold text-light-primary dark:text-dark-primary mb-2">2</div><h3 className="text-xl font-semibold">Enter Prompt</h3><p className="text-gray-600 dark:text-gray-400">Describe your vision in words. The more detailed, the better.</p></div>
             <div className="text-gray-400 dark:text-gray-600 text-2xl hidden md:block">&rarr;</div>
             <div className="text-center max-w-xs"><div className="text-4xl font-bold text-light-primary dark:text-dark-primary mb-2">3</div><h3 className="text-xl font-semibold">Download</h3><p className="text-gray-600 dark:text-gray-400">Generate your image and download it directly to your device.</p></div>
          </div>
        </div>
      </section>

      {/* Demo Gallery */}
      <section id="gallery" className="py-20 bg-light-surface dark:bg-dark-surface">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-light-primary dark:text-dark-primary">From Imagination to Reality</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {demoImages.map((src, index) => (
              <div key={index} className="aspect-video rounded-xl overflow-hidden shadow-lg">
                <img src={src} alt={`Demo image ${index + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Footer */}
      <footer className="py-10 text-center text-gray-500 dark:text-gray-400">
        <div className="container mx-auto px-4">
          <p className="mb-2">
            Contact us at <a href="mailto:orymaxcontact@gmail.com" className="text-light-primary dark:text-dark-primary hover:underline">orymaxcontact@gmail.com</a>
          </p>
          <p>Copyright © 2025 Orymax. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
