import Image from 'next/image';
import { MDXRemote } from 'next-mdx-remote/rsc';
import type { MDXComponents } from 'mdx/types';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { cn } from '~/utils';
import { CodeBlock } from './CodeBlock';

type CalloutType = 'info' | 'warning' | 'success' | 'error' | 'note';

const calloutStyles: Record<
	CalloutType,
	{ bg: string; border: string; icon: string }
> = {
	info: {
		bg: 'bg-blue-50 dark:bg-blue-950/30',
		border: 'border-blue-500',
		icon: '💡',
	},
	warning: {
		bg: 'bg-amber-50 dark:bg-amber-950/30',
		border: 'border-amber-500',
		icon: '⚠️',
	},
	success: {
		bg: 'bg-emerald-50 dark:bg-emerald-950/30',
		border: 'border-emerald-500',
		icon: '✅',
	},
	error: {
		bg: 'bg-red-50 dark:bg-red-950/30',
		border: 'border-red-500',
		icon: '🚫',
	},
	note: {
		bg: 'bg-violet-50 dark:bg-violet-950/30',
		border: 'border-violet-500',
		icon: '📝',
	},
};

function getCalloutType(emoji?: string): CalloutType {
	if (!emoji) return 'note';
	if (['💡', 'ℹ️', '📘', '🔵'].includes(emoji)) return 'info';
	if (['⚠️', '🟡', '🟠', '⚡'].includes(emoji)) return 'warning';
	if (['✅', '✔️', '🟢', '👍'].includes(emoji)) return 'success';
	if (['🚫', '❌', '🔴', '❗'].includes(emoji)) return 'error';
	return 'note';
}

function Callout({
	emoji,
	type,
	children,
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement> & {
	emoji?: string;
	type?: CalloutType;
}) {
	const calloutType = type || getCalloutType(emoji);
	const styles = calloutStyles[calloutType];
	const displayEmoji = emoji || styles.icon;

	return (
		<div
			className={cn(
				'my-6 flex gap-3 rounded-sm border-l-4 px-4 py-3',
				styles.bg,
				styles.border,
				className
			)}
			{...props}
		>
			<span
				className='mt-0.5 text-lg select-none shrink-0'
				aria-hidden='true'
			>
				{displayEmoji}
			</span>
			<div className='min-w-0 text-sm leading-relaxed text-foreground/80 [&>p]:m-0'>
				{children}
			</div>
		</div>
	);
}

export const components: MDXComponents = {
	h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
		<h1
			className={cn(
				'mt-2 scroll-m-20 text-4xl font-bold tracking-tight',
				className
			)}
			{...props}
		/>
	),
	h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
		<h2
			className={cn(
				'mt-10 scroll-m-20 border-b pb-1 text-3xl font-semibold tracking-tight first:mt-0',
				className
			)}
			{...props}
		/>
	),
	h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
		<h3
			className={cn(
				'mt-8 scroll-m-20 text-2xl font-semibold tracking-tight',
				className
			)}
			{...props}
		/>
	),
	h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
		<h4
			className={cn(
				'mt-8 scroll-m-20 text-xl font-semibold tracking-tight',
				className
			)}
			{...props}
		/>
	),
	h5: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
		<h5
			className={cn(
				'mt-8 scroll-m-20 text-lg font-semibold tracking-tight',
				className
			)}
			{...props}
		/>
	),
	h6: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
		<h6
			className={cn(
				'mt-8 scroll-m-20 text-base font-semibold tracking-tight',
				className
			)}
			{...props}
		/>
	),
	a: ({
		className,
		href,
		...props
	}: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
		const isExternal = href?.startsWith('http') || href?.startsWith('//');
		return (
			<a
				className={cn(
					'font-medium underline underline-offset-4 decoration-primary/50 hover:decoration-primary transition-colors',
					className
				)}
				href={href}
				{...(isExternal && {
					target: '_blank',
					rel: 'noopener noreferrer',
				})}
				{...props}
			/>
		);
	},
	p: ({
		className,
		...props
	}: React.HTMLAttributes<HTMLParagraphElement>) => (
		<p className={cn('leading-7 not-first:mt-6', className)} {...props} />
	),
	ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
		<ul
			className={cn('my-6 ml-6 list-disc [&>li]:mt-2', className)}
			{...props}
		/>
	),
	ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
		<ol
			className={cn('my-6 ml-6 list-decimal [&>li]:mt-2', className)}
			{...props}
		/>
	),
	li: ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
		<li className={cn('leading-7', className)} {...props} />
	),
	blockquote: ({
		className,
		children,
		...props
	}: React.HTMLAttributes<HTMLQuoteElement>) => (
		<blockquote
			className={cn(
				'relative my-8 rounded-r-lg border-l-4 border-primary/60 bg-muted/30 py-4 pl-14 pr-6',
				className
			)}
			{...props}
		>
			<svg
				className='absolute left-4 top-2 size-8 text-primary/30'
				viewBox='0 0 24 24'
				fill='currentColor'
				aria-hidden='true'
			>
				<path d='M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z' />
			</svg>
			<div className='relative italic text-muted-foreground [&>p]:m-0'>
				{children}
			</div>
		</blockquote>
	),
	img: ({
		className,
		alt,
		...props
	}: React.ImgHTMLAttributes<HTMLImageElement>) => (
		// eslint-disable-next-line @next/next/no-img-element
		<img
			className={cn('rounded-lg border bg-muted', className)}
			alt={alt}
			{...props}
		/>
	),
	hr: ({ ...props }) => (
		<hr className='my-4 md:my-8 border-muted' {...props} />
	),
	table: ({
		className,
		...props
	}: React.HTMLAttributes<HTMLTableElement>) => (
		<div className='my-6 w-full overflow-y-auto'>
			<table className={cn('w-full', className)} {...props} />
		</div>
	),
	tr: ({
		className,
		...props
	}: React.HTMLAttributes<HTMLTableRowElement>) => (
		<tr
			className={cn('m-0 border-t p-0 even:bg-muted', className)}
			{...props}
		/>
	),
	th: ({
		className,
		...props
	}: React.HTMLAttributes<HTMLTableCellElement>) => (
		<th
			className={cn(
				'border px-4 py-2 text-left font-bold [[align=center]]:text-center [[align=right]]:text-right',
				className
			)}
			{...props}
		/>
	),
	td: ({
		className,
		...props
	}: React.HTMLAttributes<HTMLTableCellElement>) => (
		<td
			className={cn(
				'border px-4 py-2 text-left [[align=center]]:text-center [[align=right]]:text-right',
				className
			)}
			{...props}
		/>
	),
	pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
		<CodeBlock {...props} />
	),
	code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => {
		// Check if this is inline code (not inside a pre block)
		const isInline = !className?.includes('language-');
		return (
			<code
				className={cn(
					'font-sans text-[0.9em]',
					isInline &&
						'rounded border border-primary/20 font-medium bg-[#011627]/10 px-1.5 py-0.5 text-primary dark:bg-primary/10',
					className
				)}
				{...props}
			/>
		);
	},
	Image: (props) => (
		<Image
			className='my-6 rounded-lg border bg-muted'
			alt={props.alt || ''}
			{...props}
		/>
	),
	Callout,
};

interface MdxContentProps {
	source: string;
}

export function MdxContent({ source }: MdxContentProps) {
	return (
		<MDXRemote
			source={source}
			components={components}
			options={{
				mdxOptions: {
					remarkPlugins: [remarkGfm],
					rehypePlugins: [
						rehypeSlug,
						[
							rehypePrettyCode,
							{ theme: 'night-owl', keepBackground: false },
						],
						[
							rehypeAutolinkHeadings,
							{ properties: { className: ['anchor'] } },
						],
					],
				},
			}}
		/>
	);
}
