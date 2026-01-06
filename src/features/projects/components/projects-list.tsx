'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { ArrowIcon } from '~/components/ui';

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

export interface ProjectsListProps {
	projects: Array<{
		slug: string;
		title: string;
		summary: string;
		image?: string;
		externalUrl?: string;
	}>;
}

export function ProjectsList({ projects }: ProjectsListProps) {
	const router = useRouter();

	return (
		<motion.section initial='hidden' animate='visible' variants={container}>
			<motion.h1
				className='font-serif text-3xl font-bold'
				variants={item}
			>
				Projects
			</motion.h1>

			<motion.p
				className='my-5 text-neutral-800 dark:text-neutral-200'
				variants={item}
			>
				I help teams turn ideas into products people actually want to
				use. I&apos;ve worked with startups and growing companies to
				build things that look great, work smoothly, and make an impact.
				Here&apos;s the proof.
			</motion.p>

			<div className='prose prose-neutral dark:prose-invert'>
				<motion.hr
					initial={{ scaleX: 0, opacity: 0 }}
					animate={{ scaleX: 1, opacity: 1 }}
					transition={{
						duration: 0.8,
						delay: 0.2,
						ease: [0.25, 0.4, 0.25, 1],
					}}
					style={{ originX: 0 }}
				/>
			</div>

			{/* Project Grid */}
			<motion.div
				className='mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2'
				variants={container}
			>
				{projects.map((project, index) => (
					<motion.article
						key={project.slug}
						className='group h-full cursor-pointer'
						variants={item}
						custom={index}
						onClick={() => router.push(`/projects/${project.slug}`)}
					>
						<motion.div
							className='flex h-full flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900/60'
							whileHover={{ y: -2 }}
							transition={{ duration: 0.2 }}
						>
							{/* Image Container */}
							<div className='relative h-40 w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800'>
								{project.image ? (
									<>
										<Image
											alt={project.title}
											src={project.image}
											fill
											className='object-cover object-top transition-transform duration-500 group-hover:scale-105'
										/>
										{/* Dark Gradient Overlay */}
										<div className='absolute inset-0 bg-linear-to-t from-black/40 via-black/10 to-transparent' />
									</>
								) : (
									<div className='flex h-full items-center justify-center'>
										<span className='font-serif text-2xl font-bold text-neutral-300 dark:text-neutral-600'>
											{project.title.charAt(0)}
										</span>
									</div>
								)}

								{/* Visit Link - Floating on Image */}
								{project.externalUrl && (
									<motion.a
										href={project.externalUrl}
										target='_blank'
										rel='noopener noreferrer'
										className='absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-neutral-700 shadow-sm backdrop-blur-sm transition-all hover:bg-white hover:shadow-md dark:bg-neutral-900/90 dark:text-neutral-200 dark:hover:bg-neutral-900'
										onClick={(e) => e.stopPropagation()}
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
									>
										<span>Visit</span>
										<ArrowIcon />
									</motion.a>
								)}
							</div>

							{/* Content */}
							<div className='flex flex-1 flex-col p-4'>
								<h2 className='font-serif text-lg font-semibold text-neutral-900 dark:text-neutral-100'>
									{project.title}
								</h2>
								<p className='mt-2 flex-1 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400'>
									{project.summary}
								</p>
							</div>
						</motion.div>
					</motion.article>
				))}
			</motion.div>

			{/* Closing Text */}
			<motion.p
				className='mt-10 text-sm text-neutral-500 dark:text-neutral-400'
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.6, duration: 0.5 }}
			>
				Each one taught me something new — and I&apos;m always excited
				for the next challenge.
			</motion.p>

			{/* Open to Opportunities */}
			<motion.div
				className='mx-auto mt-8 inline-flex w-auto items-center justify-center gap-3 rounded-full border border-neutral-200 bg-neutral-50 px-4 py-3 text-center dark:border-neutral-800 dark:bg-neutral-900/50'
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.8, duration: 0.5 }}
			>
				<span className='relative flex h-2.5 w-2.5'>
					<span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75' />
					<span className='relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500' />
				</span>
				<p className='text-sm font-medium text-neutral-600 dark:text-neutral-400'>
					Open to new opportunities and collaborations
				</p>
			</motion.div>
		</motion.section>
	);
}
