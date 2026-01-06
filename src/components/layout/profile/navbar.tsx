'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
	LayoutGroup,
	motion,
	useMotionValue,
	useSpring,
	useTransform,
} from 'motion/react';
import { useRef } from 'react';
import { cn } from '~/utils';
import { navItems } from '~/config/site';
import { Logo } from '~/components/logo';
import { ThemeToggle } from '~/components/theme-toggle';

const container = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: {
			staggerChildren: 0.08,
			delayChildren: 0.3,
		},
	},
};

const item = {
	hidden: { opacity: 0, x: -20, filter: 'blur(10px)' },
	show: {
		opacity: 1,
		x: 0,
		filter: 'blur(0px)',
		transition: {
			type: 'spring' as const,
			stiffness: 150,
			damping: 20,
		},
	},
};

function MagneticNavItem({
	href,
	label,
	isActive,
}: {
	href: string;
	label: string;
	isActive: boolean;
}) {
	const ref = useRef<HTMLAnchorElement>(null);
	const x = useMotionValue(0);
	const y = useMotionValue(0);

	const springConfig = { damping: 20, stiffness: 300 };
	const xSpring = useSpring(x, springConfig);
	const ySpring = useSpring(y, springConfig);

	const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
		if (!ref.current) return;
		const rect = ref.current.getBoundingClientRect();
		const centerX = rect.left + rect.width / 2;
		const centerY = rect.top + rect.height / 2;
		const distanceX = e.clientX - centerX;
		const distanceY = e.clientY - centerY;
		x.set(distanceX * 0.15);
		y.set(distanceY * 0.15);
	};

	const handleMouseLeave = () => {
		x.set(0);
		y.set(0);
	};

	// Glow effect based on hover position
	const glowX = useTransform(xSpring, [-10, 10], [-50, 50]);
	const glowY = useTransform(ySpring, [-10, 10], [-50, 50]);

	return (
		<motion.div variants={item}>
			<Link
				ref={ref}
				href={href}
				onMouseMove={handleMouseMove}
				onMouseLeave={handleMouseLeave}
				className={cn(
					'group relative flex align-middle font-serif text-sm transition-colors',
					isActive
						? 'text-neutral-900 dark:text-neutral-100'
						: 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
				)}
			>
				<motion.span
					className='relative z-10 flex h-full w-full items-center gap-1.5 rounded-lg px-[10px] py-2'
					style={{
						x: xSpring,
						y: ySpring,
					}}
				>
					{/* Hover underline effect */}
					<span className='relative'>
						{label}
						<motion.span
							className='absolute -bottom-0.5 left-0 h-px w-full origin-left bg-linear-to-r from-neutral-400 via-neutral-600 to-neutral-400 dark:from-neutral-500 dark:via-neutral-300 dark:to-neutral-500'
							initial={{ scaleX: 0 }}
							whileHover={{ scaleX: 1 }}
							transition={{
								duration: 0.3,
								ease: [0.4, 0, 0.2, 1],
							}}
						/>
					</span>

					{/* Active indicator */}
					{isActive && (
						<motion.div
							aria-hidden='true'
							className='absolute inset-0 -z-10 rounded-lg'
							layoutId='nav-active'
							transition={{
								type: 'spring',
								stiffness: 380,
								damping: 30,
							}}
						>
							{/* Glass background */}
							<div className='absolute inset-0 rounded-lg bg-linear-to-br from-neutral-100/80 via-neutral-50/50 to-neutral-200/60 backdrop-blur-sm dark:from-neutral-800/80 dark:via-neutral-700/50 dark:to-neutral-900/60' />

							{/* Border glow */}
							<div className='absolute inset-0 rounded-lg border border-neutral-200/50 dark:border-neutral-700/50' />

							{/* Inner shine */}
							<motion.div
								className='absolute inset-0 rounded-lg opacity-50'
								style={{
									background: `radial-gradient(circle at calc(50% + ${glowX}px) calc(50% + ${glowY}px), rgba(255,255,255,0.4) 0%, transparent 50%)`,
								}}
							/>
						</motion.div>
					)}
				</motion.span>

				{/* Hover glow effect for non-active items */}
				{!isActive && (
					<motion.div
						className='pointer-events-none absolute inset-0 -z-10 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100'
						style={{
							background:
								'radial-gradient(circle at 50% 50%, rgba(120,120,120,0.08) 0%, transparent 70%)',
						}}
					/>
				)}
			</Link>
		</motion.div>
	);
}

export function ProfileNavbar() {
	let pathname = usePathname() || '/';

	// Normalize pathname for active state matching
	if (pathname.includes('/blog/')) pathname = '/blog';
	if (pathname.includes('/projects/')) pathname = '/projects';

	return (
		<aside className='-mx-4 font-sans md:mx-0 md:w-[150px] md:shrink-0 md:px-0'>
			<div className='md:sticky md:top-20'>
				{/* Logo with entrance animation */}
				<motion.div
					initial={{ opacity: 0, y: -10, filter: 'blur(10px)' }}
					animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
					transition={{
						duration: 0.5,
						ease: [0.4, 0, 0.2, 1],
					}}
					className='mb-2 ml-2 flex flex-col items-start space-y-10 px-4 md:mb-8 md:ml-3 md:flex-row md:px-0'
				>
					<Logo />
				</motion.div>

				<LayoutGroup>
					<nav
						className='relative flex scroll-pr-6 flex-row items-center justify-between px-4 pb-0 md:relative md:flex-col md:items-start md:overflow-auto md:px-0'
						id='nav'
					>
						<motion.div
							className='mb-2 mt-2 flex flex-row space-x-0 pr-10 md:mb-8 md:mt-0 md:flex-col'
							variants={container}
							initial='hidden'
							animate='show'
						>
							{navItems.map(({ href, label }) => {
								const isActive = href === pathname;
								return (
									<MagneticNavItem
										key={href}
										href={href}
										label={label}
										isActive={isActive}
									/>
								);
							})}
						</motion.div>

						{/* Theme toggle with entrance animation */}
						<motion.div
							initial={{
								opacity: 0,
								scale: 0.8,
								filter: 'blur(10px)',
							}}
							animate={{
								opacity: 1,
								scale: 1,
								filter: 'blur(0px)',
							}}
							transition={{
								delay: 0.6,
								duration: 0.4,
								type: 'spring',
								stiffness: 200,
								damping: 20,
							}}
						>
							<ThemeToggle />
						</motion.div>
					</nav>
				</LayoutGroup>
			</div>
		</aside>
	);
}
