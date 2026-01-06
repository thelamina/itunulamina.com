export const siteConfig = {
	appName: 'Itunu Lamina',
	name: 'Itunu Lamina',
	description: 'Developer, writer, and builder.',
	url: 'https://itunulamina.com',
	ogImage: 'https://itunulamina.com/og.png',
	links: {
		twitter: 'i_thelamina',
		github: 'thelamina',
		linkedin: 'thelamina',
	},
} as const;

export const navItems = [
	{ href: '/', label: 'home' },
	{ href: '/about', label: 'about' },
	{ href: '/blog', label: 'writing' },
	{ href: '/projects', label: 'building' },
] as const;
