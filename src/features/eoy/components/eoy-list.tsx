'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const container = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.2,
			delayChildren: 0.5,
		},
	},
};

const item = {
	hidden: { opacity: 0, y: 40 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.8,
			ease: [0.25, 0.4, 0.25, 1] as const,
		},
	},
};

export interface EoyListProps {
	reflections: Array<{
		slug: string;
		year: number;
		title: string;
		summary: string;
	}>;
}

export function EoyList({ reflections }: EoyListProps) {
	return (
		<div className='relative min-h-screen overflow-hidden'>
			{/* Grain overlay */}
			<div className='eoy-grain' />

			{/* Background decorative elements */}
			<div className='pointer-events-none fixed inset-0'>
				<div className='absolute left-1/2 top-1/4 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-(--eoy-accent) opacity-[0.02] blur-[120px]' />
			</div>

			{/* Content */}
			<div className='relative z-10'>
				{/* Hero */}
				<header className='flex min-h-[70vh] flex-col items-center justify-center px-6 text-center'>
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 1, ease: [0.25, 0.4, 0.25, 1] }}
						className='mb-8 text-2xl tracking-[0.5em] text-(--eoy-accent) opacity-60'
					>
						✦
					</motion.div>

					<motion.h1
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							duration: 1,
							delay: 0.2,
							ease: [0.25, 0.4, 0.25, 1],
						}}
						className='mb-6 text-5xl font-light tracking-tight leading-tight font-(family-name:--font-cormorant) md:text-7xl lg:text-8xl'
					>
						Reflections
					</motion.h1>

					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 1, delay: 0.5 }}
						className='max-w-lg font-normal leading-relaxed text-(--eoy-text-muted)'
					>
						Annual letters to myself—on life, growth, faith, and the
						lessons that shaped each passing year.
					</motion.p>

					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 0.4 }}
						transition={{ duration: 1, delay: 1 }}
						className='mt-16 animate-bounce'
					>
						<svg
							width='24'
							height='24'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeWidth='1'
							className='text-(--eoy-accent)'
						>
							<path d='M12 5v14M5 12l7 7 7-7' />
						</svg>
					</motion.div>
				</header>

				{/* Reflections list */}
				<motion.section
					className='mx-auto max-w-4xl px-6 pb-32'
					initial='hidden'
					animate='visible'
					variants={container}
				>
					<motion.div variants={item} className='mb-16 h-px bg-linear-to-r from-transparent via-(--eoy-accent) to-transparent opacity-30' />

					<div className='space-y-8'>
						{reflections
							.sort((a, b) => b.year - a.year)
							.map((reflection, index) => (
								<motion.article
									key={reflection.slug}
									variants={item}
									className='group'
								>
								<Link href={`/eoy/${reflection.year}`}>
									<div className='relative overflow-hidden rounded-2xl border border-(--eoy-border) bg-gradient-to-br from-white/[0.02] to-white/[0.01] p-8 backdrop-blur-sm transition-all duration-500 hover:border-[rgba(201,169,98,0.3)] hover:from-white/[0.04] hover:to-white/[0.02] md:p-12'>
										{/* Year watermark */}
										<div className='eoy-year-display absolute -right-8 -top-8 select-none'>
											{reflection.year}
										</div>

										<div className='relative z-10'>
											<div className='mb-4 flex items-center gap-4'>
												<span className='text-sm font-normal tracking-[0.2em] text-(--eoy-accent)'>
													YEAR {reflection.year}
												</span>
												<div className='h-px flex-1 bg-(--eoy-border)' />
											</div>

											<h2 className='mb-4 text-2xl font-light tracking-tight leading-tight font-(family-name:--font-cormorant) md:text-3xl'>
												{reflection.title.replace(
													`${reflection.year} - `,
													''
												)}
											</h2>

											<p className='mb-6 line-clamp-2 font-normal leading-relaxed text-(--eoy-text-muted)'>
												{reflection.summary}
											</p>

											<div className='flex items-center gap-2 text-sm text-(--eoy-accent) transition-transform duration-300 group-hover:translate-x-2'>
												<span className='font-normal'>
													Read reflection
												</span>
												<ArrowRight size={16} />
											</div>
										</div>
									</div>
								</Link>
								</motion.article>
							))}
					</div>

					<motion.div variants={item} className='mt-16 h-px bg-linear-to-r from-transparent via-(--eoy-accent) to-transparent opacity-30' />

					<motion.footer
						variants={item}
						className='mt-16 text-center'
					>
						<Link
							href='/'
							className='text-sm font-normal text-(--eoy-text-muted) transition-colors hover:text-(--eoy-accent)'
						>
							← Back to portfolio
						</Link>
					</motion.footer>
				</motion.section>
			</div>
		</div>
	);
}
