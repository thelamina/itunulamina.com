'use client';

import { motion, useMotionTemplate, useMotionValue } from 'motion/react';
import Link from 'next/link';
import { ArrowUpRight, TrendingUp } from 'lucide-react';
import { cn } from '~/utils';
import type { Product } from '../types';
import { StatusBadge } from './status-badge';
import type { MouseEvent } from 'react';

const itemVariants = {
	hidden: { opacity: 0, y: 15, filter: 'blur(8px)' },
	show: (index: number) => ({
		opacity: 1,
		y: 0,
		filter: 'blur(0px)',
		transition: {
			type: 'spring' as const,
			stiffness: 150,
			damping: 20,
			delay: index * 0.05,
		},
	}),
};

export interface ProductCardProps {
	product: Product;
	index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);

	function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
		const { left, top } = currentTarget.getBoundingClientRect();
		mouseX.set(clientX - left);
		mouseY.set(clientY - top);
	}

	return (
		<motion.div
			variants={{
				hidden: itemVariants.hidden,
				show: itemVariants.show(index),
			}}
			className='group relative'
		>
			<Link
				href={product.url}
				onMouseMove={handleMouseMove}
				className='relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-neutral-200/80 bg-white/50 p-4 backdrop-blur-sm transition-all duration-300 hover:border-neutral-300 hover:shadow-xl hover:shadow-neutral-200/40 dark:border-neutral-800/80 dark:bg-neutral-900/50 dark:hover:border-neutral-700 dark:hover:shadow-neutral-900/40 sm:flex-row sm:items-center sm:gap-5 sm:p-5'
			>
				{/* Spotlight effect */}
				<motion.div
					className='pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100'
					style={{
						background: useMotionTemplate`
							radial-gradient(
								300px circle at ${mouseX}px ${mouseY}px,
								rgba(120, 119, 198, 0.08),
								transparent 80%
							)
						`,
					}}
				/>

				{/* Gradient Background */}
				<div
					className={cn(
						'absolute inset-0 bg-linear-to-br opacity-40 transition-opacity group-hover:opacity-70',
						product.gradient
					)}
				/>

				{/* Icon */}
				<div className='relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-xl shadow-sm ring-1 ring-neutral-200/50 transition-transform duration-300 group-hover:scale-105 dark:bg-neutral-800 dark:ring-neutral-700/50'>
					{product.icon}
				</div>

				{/* Content */}
				<div className='relative flex min-w-0 flex-1 flex-col gap-1.5 sm:gap-1'>
					<div className='flex items-center gap-2'>
						<h3 className='truncate font-serif text-base font-bold text-neutral-900 dark:text-neutral-100 sm:text-lg'>
							{product.name}
						</h3>
						<StatusBadge status={product.status} compact />
					</div>
					<p className='line-clamp-1 text-sm text-neutral-500 dark:text-neutral-400'>
						{product.description}
					</p>
					<div className='flex flex-wrap items-center gap-2 pt-1'>
						<time className='text-xs text-neutral-400'>
							{new Date(product.date).toLocaleDateString('en-US', {
								month: 'short',
								year: 'numeric',
							})}
						</time>
						{product.tags.slice(0, 2).map((tag) => (
							<span
								key={tag}
								className='rounded-md bg-neutral-100 px-1.5 py-0.5 text-xs text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400'
							>
								{tag}
							</span>
						))}
					</div>
				</div>

				{/* Revenue & Arrow */}
				<div className='relative flex shrink-0 items-center gap-3'>
					{product.revenue && (
						<div className='flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400'>
							<TrendingUp className='h-3 w-3' />
							{product.revenue}
						</div>
					)}
					<div className='flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-neutral-400 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:bg-neutral-900 group-hover:text-white dark:bg-neutral-800 dark:group-hover:bg-white dark:group-hover:text-neutral-900'>
						<ArrowUpRight className='h-4 w-4' />
					</div>
				</div>

				{/* Bottom accent line */}
				<div className='absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-linear-to-r from-violet-500 via-blue-500 to-cyan-500 transition-transform duration-500 group-hover:scale-x-100' />
			</Link>
		</motion.div>
	);
}

