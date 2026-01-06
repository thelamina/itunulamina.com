'use client';

import { Filter, Rocket, Archive } from 'lucide-react';
import { cn } from '~/utils';
import type { FilterType } from '../types';

const filters: { label: string; value: FilterType; icon: typeof Filter }[] = [
	{ label: 'All', value: 'All', icon: Filter },
	{ label: 'Active', value: 'Active', icon: Rocket },
	{ label: 'Archived', value: 'Archived', icon: Archive },
];

export interface ProductsFilterProps {
	activeFilter: FilterType;
	onFilterChange: (filter: FilterType) => void;
}

export function ProductsFilter({
	activeFilter,
	onFilterChange,
}: ProductsFilterProps) {
	return (
		<div className='flex items-center justify-center gap-2'>
			{filters.map((filter) => {
				const Icon = filter.icon;
				const isActive = activeFilter === filter.value;
				return (
					<button
						key={filter.value}
						onClick={() => onFilterChange(filter.value)}
						className={cn(
							'flex cursor-pointer items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all',
							isActive
								? 'bg-neutral-900 text-white shadow-lg shadow-neutral-900/20 dark:bg-white dark:text-neutral-900'
								: 'bg-white/50 text-neutral-600 hover:bg-white hover:text-neutral-900 dark:bg-neutral-800/50 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100'
						)}
					>
						<Icon className='h-3.5 w-3.5' />
						{filter.label}
					</button>
				);
			})}
		</div>
	);
}

