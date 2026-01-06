import type { ProductStats } from '../types';

export interface StatsBarProps {
	stats: ProductStats;
}

export function StatsBar({ stats }: StatsBarProps) {
	return (
		<div className='mx-auto inline-flex items-center gap-6 rounded-xl border border-neutral-200/50 bg-white/50 px-6 py-3 backdrop-blur-sm dark:border-neutral-800/50 dark:bg-neutral-900/50'>
			<div className='text-center'>
				<div className='text-2xl font-bold text-neutral-900 dark:text-neutral-100'>
					{stats.shipped}
				</div>
				<div className='text-xs text-neutral-500'>Shipped</div>
			</div>
			<div className='h-6 w-px bg-neutral-200 dark:bg-neutral-800' />
			<div className='text-center'>
				<div className='text-2xl font-bold text-neutral-900 dark:text-neutral-100'>
					{stats.live}
				</div>
				<div className='text-xs text-neutral-500'>Live</div>
			</div>
			<div className='h-6 w-px bg-neutral-200 dark:bg-neutral-800' />
			<div className='text-center'>
				<div className='text-2xl font-bold text-emerald-600 dark:text-emerald-400'>
					${stats.mrr}
				</div>
				<div className='text-xs text-neutral-500'>MRR</div>
			</div>
		</div>
	);
}

