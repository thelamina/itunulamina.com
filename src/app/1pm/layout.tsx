import React from 'react';
import Link from 'next/link';
import { Logo } from '~/components/logo';
import { siteConfig } from '~/config/site';
import { AnimatedThemeToggler } from '~/components/ui/animated-theme-toggler';

const Project1PMLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='relative flex min-h-screen flex-col bg-background text-foreground'>
			{/* Floating Header */}
			<header className='sticky top-0 z-50 w-full'>
				<div className='mx-auto flex max-w-4xl items-center justify-between px-6 py-6'>
					<div className='flex items-center gap-3'>
						<Logo />
						<Link
							href='/'
							className='hidden text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-900 dark:hover:text-neutral-100 sm:inline'
						>
							← Back to portfolio
						</Link>
					</div>
					<AnimatedThemeToggler />
				</div>
			</header>

			<main className='flex-1'>{children}</main>

			<footer className='border-t border-neutral-200 dark:border-neutral-800'>
				<div className='mx-auto max-w-4xl px-6 py-8 text-center text-sm font-medium text-neutral-500'>
					&copy; {new Date().getFullYear()} {siteConfig.name}
				</div>
			</footer>
		</div>
	);
};

export default Project1PMLayout;
