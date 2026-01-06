import { cn } from '~/utils';
import type { ProductStatus } from '../types';

const statusConfig = {
	Live: {
		label: 'Live',
		class:
			'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
		dot: 'bg-emerald-500',
		pulse: true,
	},
	Building: {
		label: 'Building',
		class:
			'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
		dot: 'bg-amber-500',
		pulse: false,
	},
	Beta: {
		label: 'Beta',
		class: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
		dot: 'bg-blue-500',
		pulse: false,
	},
	Sold: {
		label: 'Sold',
		class:
			'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20',
		dot: 'bg-violet-500',
		pulse: false,
	},
	Dead: {
		label: 'Archived',
		class:
			'bg-neutral-500/10 text-neutral-500 dark:text-neutral-400 border-neutral-500/20',
		dot: 'bg-neutral-400',
		pulse: false,
	},
} as const;

export interface StatusBadgeProps {
	status: ProductStatus;
	compact?: boolean;
}

export function StatusBadge({ status, compact = false }: StatusBadgeProps) {
	const { label, class: className, dot, pulse } = statusConfig[status];

	return (
		<span
			className={cn(
				'inline-flex items-center gap-1.5 rounded-full border text-xs font-medium',
				compact ? 'px-2 py-0.5' : 'px-2.5 py-1',
				className
			)}
		>
			<span className='relative flex h-1.5 w-1.5'>
				{pulse && (
					<span
						className={cn(
							'absolute inline-flex h-full w-full animate-ping rounded-full opacity-75',
							dot
						)}
					/>
				)}
				<span
					className={cn('relative inline-flex h-1.5 w-1.5 rounded-full', dot)}
				/>
			</span>
			{label}
		</span>
	);
}

