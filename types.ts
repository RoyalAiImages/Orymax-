// FIX: Removed self-import of `Page` which caused a circular dependency and declaration conflict.
export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

export interface HistoryItem {
  prompt: string;
  imageUrl: string;
  timestamp: number;
}

export interface User {
  name: string;
  email: string;
  credits: number;
  password?: string;
  lastWeeklyCredit?: number;
  history?: HistoryItem[];
  isAdmin?: boolean;
  createdAt?: number;
}

export enum Page {
  HOME = 'Home',
  CREATE = 'Create',
  CHAT = 'Chat',
  EXPLORE = 'Explore',
  HISTORY = 'History',
  LIBRARY = 'Library',
  PROFILE = 'Profile',
  ADMIN = 'Admin',
  CONTACT = 'Contact',
  FAQ = 'FAQ',
}