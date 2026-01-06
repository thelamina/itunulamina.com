'use client';

import { motion } from 'motion/react';
import type { UsesData, UsesCategory, UsesItem } from '../types';

const container = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.08,
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

const listItem = {
	hidden: { opacity: 0, x: -15 },
	visible: {
		opacity: 1,
		x: 0,
		transition: {
			duration: 0.3,
			ease: [0.25, 0.4, 0.25, 1] as const,
		},
	},
};

function UsesCategorySection({
	category,
	index,
}: {
	category: UsesCategory;
	index: number;
}) {
	return (
		<>
			<motion.h3 id={category.id} variants={item}>
				{category.title}
			</motion.h3>
			<motion.ul
				initial='hidden'
				animate='visible'
				variants={{
					hidden: { opacity: 0 },
					visible: {
						opacity: 1,
						transition: {
							staggerChildren: 0.05,
							delayChildren: 0.2 + index * 0.1,
						},
					},
				}}
			>
				{category.items.map((usesItem) => (
					<UsesListItem key={usesItem.name} item={usesItem} />
				))}
			</motion.ul>
		</>
	);
}

function UsesListItem({ item: usesItem }: { item: UsesItem }) {
	if (usesItem.link) {
		return (
			<motion.li variants={listItem}>
				{usesItem.name} (
				<a
					href={usesItem.link}
					target='_blank'
					rel='noopener noreferrer'
				>
					Settings / Extensions
				</a>
				)
			</motion.li>
		);
	}

	return <motion.li variants={listItem}>{usesItem.name}</motion.li>;
}

export interface UsesContentProps {
	data: UsesData;
}

export function UsesContent({ data }: UsesContentProps) {
	return (
		<motion.section initial='hidden' animate='visible' variants={container}>
			<motion.h1
				className='mb-8 font-serif text-3xl font-bold'
				variants={item}
			>
				{data.title}
			</motion.h1>

			<motion.p
				className='mb-8 mt-2 text-neutral-700 dark:text-neutral-300'
				variants={item}
			>
				{data.description}
			</motion.p>

			<motion.div
				className='prose prose-neutral dark:prose-invert'
				variants={container}
			>
				{data.categories.map((category, index) => (
					<UsesCategorySection
						key={category.id}
						category={category}
						index={index}
					/>
				))}
			</motion.div>
		</motion.section>
	);
}
