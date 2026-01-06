'use client';

import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';
import type { Product } from '../types';
import { ProductCard } from './product-card';
import { ProductsFilter } from './products-filter';
import { StatsBar } from './stats-bar';
import { useProductsFilter } from '../hooks';
import { calculateStats } from '../utils';

const containerVariants = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: {
			staggerChildren: 0.05,
		},
	},
	exit: {
		opacity: 0,
		transition: {
			duration: 0.15,
		},
	},
};

export interface ProductsListProps {
	products: Product[];
}

export function ProductsList({ products }: ProductsListProps) {
	const { activeFilter, setActiveFilter, filteredProducts } =
		useProductsFilter(products);
	const stats = calculateStats(products);

	return (
		<section className='relative min-h-screen'>
			{/* Background Pattern */}
			<div className='pointer-events-none fixed inset-0 -z-10'>
				<div className='absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-size-[14px_24px] mask-[radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]' />
			</div>

			<div className='mx-auto max-w-3xl px-4 py-12 md:py-20'>
				{/* Hero */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
					className='mb-12 text-center'
				>
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.2 }}
						className='mb-4 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/80 px-3 py-1.5 text-sm font-medium text-neutral-600 shadow-sm backdrop-blur-sm dark:border-neutral-800 dark:bg-neutral-900/80 dark:text-neutral-400'
					>
						<Sparkles className='h-3.5 w-3.5 text-amber-500' />
						Building in Public
					</motion.div>

					<h1 className='mb-4 font-serif text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 md:text-5xl'>
						<span className='bg-linear-to-r from-neutral-900 via-neutral-700 to-neutral-900 bg-clip-text text-transparent dark:from-neutral-100 dark:via-neutral-300 dark:to-neutral-100'>
							1pm
						</span>
					</h1>

					<p className='mx-auto mb-8 max-w-md text-base leading-relaxed text-neutral-600 dark:text-neutral-400'>
						One Project Month. Shipping SaaS products, learning from failures.
					</p>

					<StatsBar stats={stats} />
				</motion.div>

				{/* Filters */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.3 }}
					className='mb-6'
				>
					<ProductsFilter
						activeFilter={activeFilter}
						onFilterChange={setActiveFilter}
					/>
				</motion.div>

				{/* Products List */}
				<AnimatePresence mode='wait'>
					<motion.div
						key={activeFilter}
						variants={containerVariants}
						initial='hidden'
						animate='show'
						exit='hidden'
						className='grid gap-3'
					>
						{filteredProducts.map((product, index) => (
							<ProductCard key={product.name} product={product} index={index} />
						))}
					</motion.div>
				</AnimatePresence>

				{filteredProducts.length === 0 && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className='py-12 text-center text-neutral-500'
					>
						No projects in this category yet.
					</motion.div>
				)}
			</div>
		</section>
	);
}

