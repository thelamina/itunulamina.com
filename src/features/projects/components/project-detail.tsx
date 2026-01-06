'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowIcon } from '~/components/ui';
import { type ReactNode } from 'react';

const container = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.08,
			delayChildren: 0.05,
		},
	},
};

const item = {
	hidden: { opacity: 0, y: 16 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.4,
			ease: [0.25, 0.4, 0.25, 1] as const,
		},
	},
};

export interface ProjectDetailProps {
	title: string;
	summary: string;
	image?: string;
	externalUrl?: string;
	children: ReactNode;
}

export function ProjectDetail({
	title,
	summary,
	externalUrl,
	children,
}: ProjectDetailProps) {
	return (
		<motion.section initial='hidden' animate='visible' variants={container}>
			{/* Back Link */}
			<motion.div className='mb-8' variants={item}>
				<Link
					href='/projects'
					className='group inline-flex items-center gap-2 text-sm text-neutral-500 transition-colors hover:text-neutral-900 dark:hover:text-neutral-100'
				>
					<span className='transition-transform group-hover:-translate-x-0.5'>
						←
					</span>
					Back to Projects
				</Link>
			</motion.div>

			{/* Header */}
			<motion.header className='mb-8' variants={item}>
				<h1 className='font-serif text-3xl font-bold'>{title}</h1>
				<p className='mt-4 text-neutral-600 dark:text-neutral-400'>
					{summary}
				</p>

				{externalUrl && (
					<motion.a
						href={externalUrl}
						target='_blank'
						rel='noopener noreferrer'
						className='mt-4 inline-flex items-center gap-2 border-b border-neutral-300 pb-0.5 text-sm font-medium text-neutral-700 transition-colors hover:border-neutral-900 hover:text-neutral-900 dark:border-neutral-600 dark:text-neutral-300 dark:hover:border-neutral-100 dark:hover:text-neutral-100'
						whileHover={{ x: 2 }}
					>
						View Live Project <ArrowIcon />
					</motion.a>
				)}
			</motion.header>

			{/* Divider */}
			<motion.div
				className='mb-8 h-px bg-neutral-200 dark:bg-neutral-800'
				initial={{ scaleX: 0 }}
				animate={{ scaleX: 1 }}
				transition={{
					duration: 0.6,
					delay: 0.2,
					ease: [0.25, 0.4, 0.25, 1],
				}}
				style={{ originX: 0 }}
			/>

			{/* Content */}
			<motion.article
				className='prose prose-neutral prose-img:rounded-xl prose-img:border prose-img:border-neutral-200 dark:prose-invert dark:prose-img:border-neutral-800'
				variants={item}
			>
				{children}
			</motion.article>
		</motion.section>
	);
}
