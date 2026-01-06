import type { Metadata } from 'next';
import { siteConfig } from '~/config/site';
import { AboutContent } from '~/features/about';

export const metadata: Metadata = {
	title: 'About',
	description:
		'Software engineer passionate about frontend and mobile development.',
};

export default function AboutPage() {
	const { links } = siteConfig;

	return <AboutContent links={links} />;
}
