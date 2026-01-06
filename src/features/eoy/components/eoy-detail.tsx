'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowLeft, ArrowRight, ChevronDown } from 'lucide-react';
import { type ReactNode, useRef } from 'react';

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: 0.15, delayChildren: 0.3 },
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 30 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.8, ease: [0.25, 0.4, 0.25, 1] as const },
	},
};

const DIVIDER_CLASSES =
	'h-px bg-linear-to-r from-transparent via-eoy-accent to-transparent opacity-30';
const NAV_LINK_CLASSES =
	'text-sm font-normal text-muted-foreground transition-colors hover:text-eoy-accent';
const YEAR_LABEL_CLASSES =
	'text-lg font-light font-(family-name:--font-cormorant)';

interface YearNavLinkProps {
	year: number;
	direction: 'prev' | 'next';
}

function YearNavLink({ year, direction }: YearNavLinkProps) {
	const isPrev = direction === 'prev';
	const Arrow = isPrev ? ArrowLeft : ArrowRight;

	return (
		<Link
			href={`/eoy/${year}`}
			className='group flex items-center gap-3 text-muted-foreground transition-colors hover:text-eoy-accent'
		>
			{isPrev && (
				<Arrow
					size={20}
					className='transition-transform group-hover:-translate-x-1'
				/>
			)}
			<div className={isPrev ? '' : 'text-right'}>
				<span className='block text-xs font-normal tracking-wider opacity-60'>
					{isPrev ? 'Previous' : 'Next'}
				</span>
				<span className={YEAR_LABEL_CLASSES}>{year}</span>
			</div>
			{!isPrev && (
				<Arrow
					size={20}
					className='transition-transform group-hover:translate-x-1'
				/>
			)}
		</Link>
	);
}

export interface EoyDetailProps {
	title: string;
	year: number;
	summary: string;
	prevYear?: number;
	nextYear?: number;
	children: ReactNode;
}

export function EoyDetail({
	title,
	year,
	summary,
	prevYear,
	nextYear,
	children,
}: EoyDetailProps) {
	const heroRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: heroRef,
		offset: ['start start', 'end start'],
	});

	const yearY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
	const yearOpacity = useTransform(scrollYProgress, [0, 0.5], [0.13, 0]);
	const headerOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

	const displayTitle = title.replace(`${year} - `, '');

	return (
		<div className='relative min-h-screen overflow-hidden'>
			<div className='eoy-grain' />

			<div className='pointer-events-none fixed inset-0'>
				<div className='absolute left-1/2 top-0 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-eoy-accent opacity-[0.03] blur-[150px]' />
			</div>

			<header
				ref={heroRef}
				className='relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6'
			>
				<motion.div
					className='eoy-year-display absolute select-none'
					style={{ y: yearY, opacity: yearOpacity }}
				>
					{year}
				</motion.div>

				<motion.div
					className='relative z-10 text-center'
					style={{ opacity: headerOpacity }}
					initial='hidden'
					animate='visible'
					variants={containerVariants}
				>
					<motion.div
						variants={itemVariants}
						className='mb-8 text-2xl tracking-[0.5em] text-eoy-accent opacity-60'
					>
						✦
					</motion.div>

					<motion.span
						variants={itemVariants}
						className='mb-4 block text-sm font-normal leading-relaxed tracking-[0.3em] text-eoy-accent'
					>
						YEAR {year}
					</motion.span>

					<motion.h1
						variants={itemVariants}
						className='mb-8 max-w-4xl text-4xl font-light tracking-tight leading-tight font-(family-name:--font-cormorant) md:text-6xl lg:text-7xl'
					>
						{displayTitle}
					</motion.h1>

					<motion.p
						variants={itemVariants}
						className='mx-auto max-w-2xl text-lg font-normal leading-relaxed text-muted-foreground'
					>
						{summary}
					</motion.p>

					<motion.div
						variants={itemVariants}
						className={`mx-auto mt-12 w-24 ${DIVIDER_CLASSES}`}
					/>
				</motion.div>

				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 0.4 }}
					transition={{ delay: 1.5 }}
					className='absolute bottom-12 animate-bounce'
				>
					<ChevronDown size={24} strokeWidth={1} />
				</motion.div>
			</header>

			<motion.article
				className='relative z-10 mx-auto max-w-3xl px-6 pb-32'
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.8, duration: 1 }}
			>
				<div className='eoy-prose prose prose-lg'>{children}</div>

				<div className={`my-16 ${DIVIDER_CLASSES}`} />

				<nav className='flex items-center justify-between'>
					{prevYear ? (
						<YearNavLink year={prevYear} direction='prev' />
					) : (
						<div />
					)}

					<Link href='/eoy' className={NAV_LINK_CLASSES}>
						All Reflections
					</Link>

					{nextYear ? (
						<YearNavLink year={nextYear} direction='next' />
					) : (
						<div />
					)}
				</nav>

				<div className='mt-16 text-center'>
					<Link href='/' className={NAV_LINK_CLASSES}>
						← Back to portfolio
					</Link>
				</div>
			</motion.article>
		</div>
	);
}
