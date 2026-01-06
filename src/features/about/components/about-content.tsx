'use client';

import { motion } from 'motion/react';
import {
	GitHubIcon,
	TwitterIcon,
	LinkedInIcon,
	ArrowIcon,
} from '~/components/ui';

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

function SocialLink({
	href,
	icon: Icon,
	label,
	index,
}: {
	href: string;
	icon: React.ComponentType;
	label: string;
	index: number;
}) {
	return (
		<motion.a
			rel='noopener noreferrer'
			target='_blank'
			href={href}
			className='group relative flex w-full items-center justify-between overflow-hidden rounded-lg border border-neutral-200 p-4 text-neutral-800 no-underline transition-colors dark:border-neutral-800 dark:text-neutral-200'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{
				duration: 0.4,
				delay: 0.6 + index * 0.1,
				ease: [0.25, 0.4, 0.25, 1],
			}}
			whileHover={{ scale: 1.02, y: -2 }}
			whileTap={{ scale: 0.98 }}
		>
			<motion.div
				className='absolute left-0 top-0 h-full w-full bg-linear-to-r from-neutral-100 to-neutral-200/50 dark:from-neutral-800 dark:to-neutral-700/50'
				initial={{ x: '-100%' }}
				whileHover={{ x: 0 }}
				transition={{ duration: 0.3, ease: 'easeOut' }}
			/>
			<div className='relative flex items-center'>
				<Icon />
				<div className='ml-3'>{label}</div>
			</div>
			<motion.div
				className='relative'
				whileHover={{ x: 4 }}
				transition={{ duration: 0.2 }}
			>
				<ArrowIcon />
			</motion.div>
		</motion.a>
	);
}

export interface AboutContentProps {
	links: {
		twitter: string;
		github: string;
		linkedin: string;
	};
}

export function AboutContent({ links }: AboutContentProps) {
	return (
		<motion.section initial='hidden' animate='visible' variants={container}>
			<motion.h1
				className='font-serif text-3xl font-bold'
				variants={item}
			>
				About Me
			</motion.h1>

			<motion.p
				className='my-5 text-neutral-800 dark:text-neutral-200'
				variants={item}
			>
				Hey, I&apos;m Itunu — most folks call me <b>IT</b>.
			</motion.p>

			<motion.div
				className='prose prose-neutral text-neutral-800 dark:prose-invert dark:text-neutral-200'
				variants={container}
			>
				<motion.p variants={item}>
					I&apos;m a seasoned software engineer with a deep passion
					for frontend and mobile development. I craft web and mobile
					applications that users love, blending performance, design,
					and seamless experiences.
				</motion.p>

				<motion.hr
					initial={{ scaleX: 0, opacity: 0 }}
					animate={{ scaleX: 1, opacity: 1 }}
					transition={{
						duration: 0.8,
						delay: 0.3,
						ease: [0.25, 0.4, 0.25, 1],
					}}
					style={{ originX: 0 }}
				/>

				<motion.p variants={item}>
					But it doesn&apos;t stop there! I&apos;m obsessed with{' '}
					<b>software performance, developer tools, and security.</b>{' '}
					You know that feeling when an app runs seamlessly, blazing
					fast? Yeah, that&apos;s what I strive for. I love{' '}
					<b>optimizing code and improving performance</b> to ensure a
					smooth and snappy user experience. And when it comes to
					developer tools, I&apos;m all about finding ways to refine
					workflows and make development effortless.
				</motion.p>

				<motion.p variants={item}>
					I&apos;m a firm believer in{' '}
					<b>continuous learning and growth.</b> This field moves at
					warp speed, and I&apos;m always up for diving into new
					challenges head-on. Whether it&apos;s experimenting with the
					latest frameworks or exploring new tools or techniques,
					I&apos;m all about pushing the boundaries of what&apos;s
					possible.
				</motion.p>

				<motion.p className='mb-8' variants={item}>
					For me, the user experience is everything. A well-designed
					interface isn&apos;t just aesthetics—it&apos;s what keeps
					users engaged. I create interfaces that are not only
					intuitive but also visually stunning, so users keep coming
					back for more, ensuring that your app looks and feels
					amazing across all devices.
				</motion.p>

				<div className='flex flex-col gap-2 md:flex-row md:gap-2'>
					<SocialLink
						href={`https://github.com/${links.github}`}
						icon={GitHubIcon}
						label='GitHub'
						index={0}
					/>
					<SocialLink
						href={`https://www.linkedin.com/in/${links.linkedin}`}
						icon={LinkedInIcon}
						label='LinkedIn'
						index={1}
					/>
					<SocialLink
						href={`https://x.com/${links.twitter}`}
						icon={TwitterIcon}
						label='X'
						index={2}
					/>
				</div>
			</motion.div>
		</motion.section>
	);
}
