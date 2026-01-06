'use client';

import { motion } from 'motion/react';
import { formatDate } from '~/utils';
import { type ReactNode } from 'react';

const container = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
			delayChildren: 0.1,
		},
	},
};

const item = {
	hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
	visible: {
		opacity: 1,
		y: 0,
		filter: 'blur(0px)',
		transition: {
			duration: 0.5,
			ease: [0.25, 0.4, 0.25, 1] as const,
		},
	},
};

export interface BlogPostProps {
	title: string;
	publishedAt: string;
	summary: string;
	children: ReactNode;
}

export function BlogPost({
	title,
	publishedAt,
	summary,
	children,
}: BlogPostProps) {
	return (
		<motion.section
			initial='hidden'
			animate='visible'
			variants={container}
		>
			<motion.h1
				className='max-w-[650px] font-serif text-3xl font-bold'
				variants={item}
			>
				{title}
			</motion.h1>

			<motion.div
				className='mb-8 mt-4 grid max-w-[650px] grid-cols-[auto_1fr_auto] items-center font-mono text-sm font-semibold'
				variants={item}
			>
				<motion.div
					className='rounded-md bg-neutral-100 px-2 py-1 tracking-wider dark:bg-neutral-800'
					initial={{ scale: 0.9, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{ delay: 0.3, duration: 0.3 }}
				>
					{formatDate(publishedAt)}
				</motion.div>
				<motion.div
					className='mx-2 h-[0.2em] bg-neutral-50 dark:bg-neutral-800'
					initial={{ scaleX: 0 }}
					animate={{ scaleX: 1 }}
					transition={{ delay: 0.4, duration: 0.5 }}
					style={{ originX: 0 }}
				/>
			</motion.div>

			<motion.article
				className='prose prose-neutral prose-quoteless dark:prose-invert'
				variants={item}
			>
				<motion.p
					className='mb-8 text-neutral-600 dark:text-neutral-400'
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.4, duration: 0.4 }}
				>
					{summary}
				</motion.p>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.5, duration: 0.5 }}
				>
					{children}
				</motion.div>
			</motion.article>
		</motion.section>
	);
}

