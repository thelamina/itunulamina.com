'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { cn, formatDate } from '~/utils';

const container = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.08,
			delayChildren: 0.2,
		},
	},
};

const item = {
	hidden: { opacity: 0, x: -20 },
	visible: {
		opacity: 1,
		x: 0,
		transition: {
			duration: 0.4,
			ease: [0.25, 0.4, 0.25, 1] as const,
		},
	},
};

export interface BlogListProps {
	posts: Array<{
		slug: string;
		title: string;
		publishedAt: string;
	}>;
}

export function BlogList({ posts }: BlogListProps) {
	return (
		<section>
			<motion.h1
				className='pb-6 font-serif text-3xl font-bold'
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
			>
				Blog
			</motion.h1>

			<motion.ul
				className='space-y-4'
				initial='hidden'
				animate='visible'
				variants={container}
			>
				{posts.map((post, index) => (
					<motion.li key={post.slug} variants={item}>
						<Link
							href={`/blog/${post.slug}`}
							className={cn(
								'group inline-block border-neutral-200 px-4 py-2 text-neutral-800 no-underline transition-all duration-300 dark:border-neutral-700/80 dark:text-neutral-200',
								'hover:translate-x-2 hover:border-l-4'
							)}
						>
							<motion.div
								whileHover={{ x: 4 }}
								transition={{ duration: 0.2 }}
							>
								<p className='font-medium group-hover:text-neutral-900 dark:group-hover:text-neutral-100'>
									{post.title}
								</p>
								<div className='flex items-center gap-2 font-mono text-sm tracking-tighter text-neutral-500'>
									<motion.p
										className='text-xs font-medium'
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{
											delay: 0.3 + index * 0.05,
										}}
									>
										{formatDate(post.publishedAt)}
									</motion.p>
								</div>
							</motion.div>
						</Link>
					</motion.li>
				))}
			</motion.ul>
		</section>
	);
}
