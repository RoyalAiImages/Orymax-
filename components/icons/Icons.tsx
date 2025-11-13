import React from 'react';

const Icon: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {children}
  </svg>
);

// FIX: Add missing GoogleIcon and GitHubIcon for OAuth buttons.
export const GoogleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.386-7.439-7.574s3.344-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"/>
    </svg>
);

export const GitHubIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
);

export const SunIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Icon className={className}>
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </Icon>
);

export const MoonIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Icon className={className}>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </Icon>
);

export const UserIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Icon className={className}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </Icon>
);

export const WalletIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}>
        <path d="M19 7V4a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" />
        <path d="M3 5h18" />
        <path d="M12.5 15.5a2.5 2.5 0 0 1 0-5" />
    </Icon>
);

export const SparklesIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}>
        <path d="m12 3-1.9 3.8-3.8 1.9 3.8 1.9L12 14.4l1.9-3.8 3.8-1.9-3.8-1.9z"/>
        <path d="M5 9.5 3.1 11.4 5 13.3l1.9-1.9z"/>
        <path d="M19 9.5 17.1 11.4 19 13.3l1.9-1.9z"/>
        <path d="m12 17-1.9 3.8-3.8 1.9 3.8 1.9L12 22.4l1.9-3.8 3.8-1.9-3.8-1.9z"/>
    </Icon>
);

export const ZapIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}>
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
    </Icon>
);

export const ShieldCheckIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        <path d="m9 12 2 2 4-4"></path>
    </Icon>
);

export const CreditCardIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}>
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
        <line x1="1" y1="10" x2="23" y2="10"></line>
    </Icon>
);

export const MailIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}>
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
        <polyline points="22,6 12,13 2,6"></polyline>
    </Icon>
);

export const DownloadIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="7 10 12 15 17 10"></polyline>
        <line x1="12" y1="15" x2="12" y2="3"></line>
    </Icon>
);

export const WandIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}>
        <path d="M15 4V2m0 20v-2m5-13h2M2 9h2m12.5-2.5L17 4M4 17l2.5-2.5M19.5 19.5L17 17"/>
        <path d="M9 6a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3z"/>
        <path d="M12 3v1m0 16v1M3 12h1m16 0h1m-4.2-7.8L17 3m-12.8 12.8L3 17"/>
        <path d="M12 9a3 3 0 0 1 3 3 3 3 0 0 1-3 3 3 3 0 0 1-3-3 3 3 0 0 1 3-3z"/>
    {/* FIX: Corrected typo in closing tag from Ico to Icon. */}
    </Icon>
);

{/* FIX: Add ThumbnailIcon for ThumbnailGenerator component. */}
export const ThumbnailIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}>
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <circle cx="9" cy="9" r="2"></circle>
        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
    </Icon>
);

{/* FIX: Add FilmIcon for AnimateImageModal component. */}
export const FilmIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}>
        <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect>
        <line x1="7" y1="2" x2="7" y2="22"></line>
        <line x1="17" y1="2" x2="17" y2="22"></line>
        <line x1="2" y1="12" x2="22" y2="12"></line>
        <line x1="2" y1="7" x2="7" y2="7"></line>
        <line x1="2" y1="17" x2="7" y2="17"></line>
        <line x1="17" y1="17" x2="22" y2="17"></line>
        <line x1="17" y1="7" x2="22" y2="7"></line>
    </Icon>
);

export const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}>
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </Icon>
);

export const CompassIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}>
        <circle cx="12" cy="12" r="10"></circle>
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
    </Icon>
);

export const LibraryIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}>
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
    </Icon>
);

export const HomeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}>
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </Icon>
);

export const HistoryIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}>
        <path d="M1 4v6h6"></path>
        <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
    </Icon>
);

export const TrashIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}>
        <polyline points="3 6 5 6 21 6"></polyline>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        <line x1="10" y1="11" x2="10" y2="17"></line>
        <line x1="14" y1="11" x2="14" y2="17"></line>
    </Icon>
);

export const DashboardIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Icon className={className}>
    <rect x="3" y="3" width="7" height="7"></rect>
    <rect x="14" y="3" width="7" height="7"></rect>
    <rect x="14" y="14" width="7" height="7"></rect>
    <rect x="3" y="14" width="7" height="7"></rect>
  </Icon>
);

export const ClockIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Icon className={className}>
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </Icon>
);

export const DiamondIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Icon className={className}>
    <path d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41L13.7 2.71a2.41 2.41 0 0 0-3.41 0z"></path>
  </Icon>
);

export const LogoutIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Icon className={className}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
    <polyline points="16 17 21 12 16 7"></polyline>
    <line x1="21" y1="12" x2="9" y2="12"></line>
  </Icon>
);

export const LightbulbIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Icon className={className}>
    <path d="M15.09 16.05A6.47 6.47 0 0 1 12 18a6.47 6.47 0 0 1-3.09-1.95m0 0A6.5 6.5 0 1 1 12 6.5a6.51 6.51 0 0 1 3.09 1.95"></path>
    <path d="M12 2v4"></path>
    <path d="M12 18v4"></path>
    <path d="M8.5 21h7"></path>
  </Icon>
);

export const HelpCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Icon className={className}>
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
    <line x1="12" y1="17" x2="12.01" y2="17"></line>
  </Icon>
);

export const ChevronDownIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Icon className={className}>
    <polyline points="6 9 12 15 18 9"></polyline>
  </Icon>
);

export const ChevronUpIcon: React.FC<{ className?: string }> = ({ className }) => (
  <Icon className={className}>
    <polyline points="18 15 12 9 6 15"></polyline>
  </Icon>
);

export const ChatIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </Icon>
);

export const SendIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}>
        <line x1="22" y1="2" x2="11" y2="13"></line>
        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
    </Icon>
);

export const CopyIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}>
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
    </Icon>
);