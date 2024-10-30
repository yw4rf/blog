import type {
  LicenseConfig,
  NavBarConfig,
  ProfileConfig,
  SiteConfig,
} from './types/config'
import { LinkPreset } from './types/config'

export const siteConfig: SiteConfig = {
  title: 'Yw4rf',
  subtitle: 'Website',
  lang: 'es',         // 'en', 'zh_CN', 'zh_TW', 'ja'
  themeColor: {
    hue: 270,         // Default hue for the theme color, from 0 to 360. e.g. red: 0, teal: 200, cyan: 250, pink: 345
    fixed: false,     // Hide the theme color picker for visitors
  },
  banner: {
    enable: true,
    src: 'assets/images/banner.png',
    position: 'center', // Equivalent to object-position, defaults center
  },
  favicon: [    // Leave this array empty to use the default favicon
    // {
    //   src: '/favicon/icon.png',    // Path of the favicon, relative to the /public directory
    //   theme: 'dark',              // (Optional) Either 'light' or 'dark', set only if you have different favicons for light and dark mode
    //   // sizes: '32x32',              // (Optional) Size of the favicon, set only if you have favicons of different sizes
    // }
  ]
}

export const navBarConfig: NavBarConfig = {
  links: [
    LinkPreset.Home,
    LinkPreset.Archive,
    LinkPreset.About,
    {
      name: 'Contact',
      url: 'https://t.me/yw4rf',
      external: true,
    },
  ],
}

export const profileConfig: ProfileConfig = {
  avatar: 'assets/images/avatar.jpg',  // Relative to the /src directory. Relative to the /public directory if it starts with '/'
  name: 'Yw4rf',
  bio: 'Cybersecurity Enthusiast with Hands-on Penetration Testing Experience | CTF Player | Computer Networks Student',
  links: [
    {
      name: 'Telegram',
      icon: 'fa6-brands:telegram',
      url: 'https://t.me/yw4rf',
    },{
      name: 'Linkedin',
      icon: 'fa6-brands:linkedin',
      url: 'https://linkedin.com/in/yw4rf',
    },{
      name: 'Twitter',
      icon: 'fa6-brands:twitter',
      url: 'https://x.com/yw4rf',
    },
    {
      name: 'GitHub',
      icon: 'fa6-brands:github',
      url: 'https://github.com/yw4rf',
    },
  ],
}

export const licenseConfig: LicenseConfig = {
  enable: true,
  name: 'CC BY-NC-SA 4.0',
  url: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
}
