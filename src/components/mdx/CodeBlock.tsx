'use client';

import { cn } from '~/utils';
import { CopyButton } from './CopyButton';

interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
	children?: React.ReactNode;
}

export function CodeBlock({ children, className, ...props }: CodeBlockProps) {
	return (
		<div className='group relative'>
			<pre
				className={cn(
					'mb-4 mt-6 overflow-x-auto border-0 rounded-lg p-4 text-sm',
					'bg-[#011627] text-[#d6deeb]',
					'[&>code]:bg-transparent [&>code]:p-0 [&>code]:text-inherit',
					className
				)}
				{...props}
			>
				{children}
			</pre>
			<CopyButton />
		</div>
	);
}

