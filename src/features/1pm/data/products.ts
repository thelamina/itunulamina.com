import type { Product } from '../types';

export const products: Product[] = [
	{
		name: 'TaxLemon',
		description:
			'Authoritative tax determination system. Calculates which taxes apply, how much is payable, and why — all traceable to law.',
		status: 'Building',
		url: '#',
		date: '2025-01-01',
		tags: ['Finance', 'SaaS', 'B2C'],
		icon: '🍋',
		gradient: 'from-yellow-500/20 via-lime-500/10 to-transparent',
	},
	{
		name: 'Beam',
		description:
			'Mobile screencast app for casting media files and mirroring your screen to TVs, projectors, and monitors — no auth required.',
		status: 'Building',
		url: '#',
		date: '2025-01-15',
		tags: ['Mobile', 'Utility', 'React Native'],
		icon: '📡',
		gradient: 'from-cyan-500/20 via-blue-500/10 to-transparent',
	},
	{
		name: 'Virtual Event Platform',
		description:
			'Production-ready virtual event platform with ticketing, payments, brand booths, networking, and video calls.',
		status: 'Building',
		url: '#',
		date: '2024-12-01',
		tags: ['Events', 'SaaS', 'Full-Stack'],
		icon: '🎪',
		gradient: 'from-violet-500/20 via-purple-500/10 to-transparent',
	},
	{
		name: 'Photos App',
		description:
			'Modern photo viewer connected to Google Drive with admin panel, blog, events, and PIN-protected downloads.',
		status: 'Building',
		url: '#',
		date: '2024-11-01',
		tags: ['Gallery', 'Next.js', 'Supabase'],
		icon: '📸',
		gradient: 'from-rose-500/20 via-pink-500/10 to-transparent',
	},
];

export function getProducts(): Product[] {
	return [...products].sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
	);
}
