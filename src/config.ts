import type {
  LicenseConfig,
  NavBarConfig,
  ProfileConfig,
  SiteConfig,
} from './types/config'
import { LinkPreset } from './types/config'

export const siteConfig: SiteConfig = {
  title: 'Fenixia',
  subtitle: 'Blog Site',
  lang: 'es',
  themeHue: 300,
  banner: {
    enable: true,
    src: 'assets/images/banner.png',
  },
}

export const navBarConfig: NavBarConfig = {
  links: [
    LinkPreset.Home,
    LinkPreset.Archive,
    LinkPreset.About,
    {
      name: 'HTB',
      url: 'https://app.hackthebox.com/profile/1511032',
      external: true,
    },
  ],
}

export const profileConfig: ProfileConfig = {
  avatar: 'assets/images/avatar.png',
  name: 'Fenixia',
  bio: '|EJPTv2|',
  links: [
    {
      name: 'HackTheBox',
      icon: 'octicon:package-16',
      url: 'https://app.hackthebox.com/profile/1511032',
    },
    {
      name: 'GitHub',
      icon: 'fa6-brands:github',
      url: 'https://github.com/fen1x1a/fen1x1a.github.io',
    },
  ],
}

export const licenseConfig: LicenseConfig = {
  enable: true,
  name: 'CC BY-NC-SA 4.0',
  url: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
}
