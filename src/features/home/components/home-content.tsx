'use client';

import Image from 'next/image';
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
			staggerChildren: 0.12,
			delayChildren: 0.1,
		},
	},
};

const item = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
			ease: [0.25, 0.4, 0.25, 1] as const,
		},
	},
};

const socialItem = {
	hidden: { opacity: 0, x: -10 },
	visible: {
		opacity: 1,
		x: 0,
		transition: {
			duration: 0.3,
			ease: [0.25, 0.4, 0.25, 1] as const,
		},
	},
};

function About() {
	return (
		<>
			Hey, I&apos;m Itunu—a <b>Software Engineer</b> passionate about
			frontend and mobile development, crafting exceptional web and mobile
			experiences.
		</>
	);
}

function Bio() {
	return (
		<>
			I love the artistic fusion of code and design, specializing in
			frontend and mobile development. With expertise in React, Next.js,
			and React Native, I&apos;ve mentored developers and contributed to
			early-stage startups, building scalable and visually compelling
			digital experiences.
		</>
	);
}

export interface HomeContentProps {
	name: string;
	links: {
		twitter: string;
		github: string;
		linkedin: string;
	};
}

export function HomeContent({ name, links }: HomeContentProps) {
	return (
		<motion.section initial='hidden' animate='visible' variants={container}>
			<motion.h1
				className='font-serif text-3xl font-bold'
				variants={item}
			>
				{name}
			</motion.h1>

			<motion.p
				className='my-5 max-w-[460px] text-neutral-800 dark:text-neutral-200'
				variants={item}
			>
				<About />
			</motion.p>

			<motion.div
				className='my-8 flex flex-col items-start md:flex-row md:items-center'
				variants={item}
			>
				<motion.div
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{
						duration: 0.6,
						delay: 0.3,
						ease: [0.25, 0.4, 0.25, 1],
					}}
					whileHover={{
						scale: 1.05,
						filter: 'grayscale(0%)',
						transition: { duration: 0.3 },
					}}
				>
					<Image
						alt={name}
						className='rounded-full grayscale transition-all duration-500 hover:grayscale-0'
						src='/avatar.png'
						width={100}
						height={100}
						priority
					/>
				</motion.div>

				<motion.div
					className='ml-0 mt-8 space-y-2 text-neutral-500 dark:text-neutral-400 md:ml-6 md:mt-0'
					initial='hidden'
					animate='visible'
					variants={{
						hidden: { opacity: 0 },
						visible: {
							opacity: 1,
							transition: {
								staggerChildren: 0.1,
								delayChildren: 0.5,
							},
						},
					}}
				>
					<motion.a
						variants={socialItem}
						rel='noopener noreferrer'
						target='_blank'
						href={`https://github.com/${links.github}`}
						className='flex items-center gap-2 transition-colors hover:text-neutral-800 dark:hover:text-neutral-200'
						whileHover={{ x: 4 }}
					>
						<GitHubIcon /> {links.github}
					</motion.a>
					<motion.a
						variants={socialItem}
						rel='noopener noreferrer'
						target='_blank'
						href={`https://www.linkedin.com/in/${links.linkedin}`}
						className='flex items-center gap-2 transition-colors hover:text-neutral-800 dark:hover:text-neutral-200'
						whileHover={{ x: 4 }}
					>
						<LinkedInIcon /> {links.linkedin}
					</motion.a>
					<motion.a
						variants={socialItem}
						rel='noopener noreferrer'
						target='_blank'
						href={`https://x.com/${links.twitter}`}
						className='flex items-center gap-2 transition-colors hover:text-neutral-800 dark:hover:text-neutral-200'
						whileHover={{ x: 4 }}
					>
						<TwitterIcon /> {links.twitter}
					</motion.a>
				</motion.div>
			</motion.div>

			<motion.p
				className='my-5 max-w-[600px] text-neutral-800 dark:text-neutral-200'
				variants={item}
			>
				<Bio />
			</motion.p>

			<motion.ul
				className='font-sm mt-8 flex flex-col space-x-0 space-y-2 text-neutral-500 dark:text-neutral-400 md:flex-row md:space-x-4 md:space-y-0'
				variants={item}
			>
				<li>
					<motion.a
						className='flex items-center transition-all hover:text-neutral-700 dark:hover:text-neutral-200'
						rel='noopener noreferrer'
						target='_blank'
						href={`https://x.com/${links.twitter}`}
						whileHover={{ x: 4 }}
					>
						<ArrowIcon />
						<p>follow me on X</p>
					</motion.a>
				</li>
			</motion.ul>
		</motion.section>
	);
}
