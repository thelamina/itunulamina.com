import type { NextConfig } from 'next';
import createMDX from '@next/mdx';

const nextConfig: NextConfig = {
	/* config options here */
	pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
	reactCompiler: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'itunulamina.com',
			},
			{
				protocol: 'https',
				hostname: 'cdn.hashnode.com',
			},
		],
	},
};

// Note: With Turbopack, plugins must use string names and serializable options only.
// Function-based options (like rehype-pretty-code callbacks) are not supported.
const withMDX = createMDX({
	options: {
		remarkPlugins: ['remark-gfm'],
		rehypePlugins: [
			'rehype-slug',
			[
				'rehype-pretty-code',
				{ theme: 'night-owl', keepBackground: false },
			],
			[
				'rehype-autolink-headings',
				{ properties: { className: ['anchor'] } },
			],
		],
	},
});

export default withMDX(nextConfig);
