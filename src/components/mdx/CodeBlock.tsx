'use client';

import { useRef } from 'react';
import { cn } from '~/utils';
import { CopyButton } from './CopyButton';

interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
	children?: React.ReactNode;
}

export function CodeBlock({ children, className, ...props }: CodeBlockProps) {
	const preRef = useRef<HTMLPreElement>(null);

	const getCodeText = () => {
		if (preRef.current) {
			const codeElement = preRef.current.querySelector('code');
			return codeElement?.textContent || '';
		}
		return '';
	};

	return (
		<div className='group relative'>
			<pre
				ref={preRef}
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
			<CopyButton text={getCodeText()} />
		</div>
	);
}

