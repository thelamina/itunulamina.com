import type { Metadata } from 'next';
// import '../globals.css';
import './eoy.css';
import { AnimatedThemeToggler } from '~/components/ui/animated-theme-toggler';

export const metadata: Metadata = {
	title: {
		template: '%s | Reflections',
		default: 'End of Year Reflections',
	},
	description:
		'Annual reflections on life, growth, faith, and the lessons learned.',
};

export default function EoyLayout({ children }: { children: React.ReactNode }) {
	return (
		// <html lang='en' suppressHydrationWarning>
		<div className={`eoy-body antialiased`}>
			{children}
			<AnimatedThemeToggler className='fixed bottom-4 left-4 z-50' />
		</div>
		// </html>
	);
}
