import { Page } from '../types';
import { HomeIcon, CompassIcon, WandIcon, HistoryIcon, LibraryIcon, ShieldCheckIcon, HelpCircleIcon, ChatIcon, UserIcon } from './icons/Icons';

export const navItems = [
  { page: Page.HOME, icon: HomeIcon },
  { page: Page.CREATE, icon: WandIcon },
  { page: Page.CHAT, icon: ChatIcon },
  { page: Page.EXPLORE, icon: CompassIcon },
  { page: Page.HISTORY, icon: HistoryIcon },
  { page: Page.LIBRARY, icon: LibraryIcon },
  { page: Page.PROFILE, icon: UserIcon },
  { page: Page.FAQ, icon: HelpCircleIcon },
  { page: Page.ADMIN, icon: ShieldCheckIcon },
];

export const imagePrompts: string[] = [
  "A majestic lion with a crown of stars, photorealistic, 4k",
  "Floating castle in a sea of clouds, detailed, fantasy art",
  "Neon-lit cyberpunk alleyway in the rain, cinematic lighting",
  "Ancient tree of life with glowing roots, mystical, vibrant colors",
  "A friendly robot serving tea in a tranquil zen garden, high detail",
  "A surreal desert landscape with two suns and purple sand",
  "Underwater city made of crystal, bioluminescent creatures swimming by",
  "A steampunk library with flying books and intricate clockwork",
  "Portrait of a warrior queen made of liquid metal, abstract",
  "A tiny, fluffy creature discovering a giant, glowing mushroom forest",
];

export const thumbnailPrompts: string[] = [
    "A gamer with a shocked expression, an exploding spaceship in the background, vibrant colors, text 'INSANE LUCK!'",
    "A YouTuber unboxing a mysterious glowing box, cinematic lighting, dramatic, text 'WHAT'S INSIDE?!'",
    "Side-by-side comparison of a cheap vs expensive gadget, clear labels, text 'Is it Worth It?'",
    "A delicious-looking pizza with melting cheese, close-up shot, food photography, text 'Ultimate Pizza Recipe'",
    "A travel vlogger standing on a mountain peak at sunrise, epic landscape, text 'I CLIMBED IT!'",
    "A cartoon scientist mixing colorful potions that are bubbling over, fun and energetic, text 'CRAZY EXPERIMENTS!'",
    "A stylized drawing of a brain with glowing connections, dark background, text 'LEARN FASTER'",
    "A person meditating in a beautiful, serene landscape, calm and peaceful, text 'Find Your Peace'",
];