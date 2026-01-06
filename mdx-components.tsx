import type { MDXComponents } from 'mdx/types';
import { MdxContent } from '~/components/mdx/MdxContent';

export function useMDXComponents(baseComponents: MDXComponents): MDXComponents {
	return {
		...baseComponents,
		...MdxContent,
	};
}
