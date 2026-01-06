import type { UsesData } from '../types';

export const usesData: UsesData = {
	title: 'Uses',
	description:
		"Here's what tech I'm currently using for coding, videos, and music.",
	categories: [
		{
			id: 'computer-office',
			title: 'Computer / Office',
			items: [
				{ name: '14" Macbook Pro M4 Pro' },
				{ name: '29" LG UltraWide Monitor' },
				{ name: 'Logitech Z207 Speaker' },
			],
		},
		{
			id: 'coding',
			title: 'Coding',
			items: [
				{
					name: 'Editor: VSCode, Cursor',
					link: 'https://gist.github.com',
				},
				{ name: 'Theme: Night Owl' },
				{ name: 'Terminal: Ghostty / zsh' },
			],
		},
		{
			id: 'software',
			title: 'Software',
			items: [
				{ name: 'Spotify' },
				{ name: 'Google Tasks' },
				{ name: 'Google Keep' },
				{ name: 'Texts' },
			],
		},
		{
			id: 'other-tech',
			title: 'Other Tech',
			items: [{ name: 'Apple iPhone' }, { name: 'Google Pixel' }],
		},
	],
};
