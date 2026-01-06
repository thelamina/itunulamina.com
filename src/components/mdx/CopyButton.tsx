'use client';

import { useState } from 'react';
import { cn } from '~/utils';

interface CopyButtonProps {
	text: string;
	className?: string;
}

export function CopyButton({ text, className }: CopyButtonProps) {
	const [copied, setCopied] = useState(false);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(text);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			console.error('Failed to copy:', err);
		}
	};

	return (
		<button
			onClick={handleCopy}
			className={cn(
				'absolute right-3 top-3 rounded-md p-2 transition-all',
				'bg-white/10 hover:bg-white/20 text-white/60 hover:text-white',
				'opacity-0 group-hover:opacity-100',
				className
			)}
			aria-label={copied ? 'Copied!' : 'Copy code'}
		>
			{copied ? (
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='16'
					height='16'
					viewBox='0 0 24 24'
					fill='none'
					stroke='currentColor'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
				>
					<polyline points='20 6 9 17 4 12' />
				</svg>
			) : (
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='16'
					height='16'
					viewBox='0 0 24 24'
					fill='none'
					stroke='currentColor'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
				>
					<rect width='14' height='14' x='8' y='8' rx='2' ry='2' />
					<path d='M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2' />
				</svg>
			)}
		</button>
	);
}

