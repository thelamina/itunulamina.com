import type { MDXComponents } from 'mdx/types';
import { components } from '~/components/mdx/MdxContent';

export function useMDXComponents(baseComponents: MDXComponents): MDXComponents {
	return {
		...baseComponents,
		...components,
	};
}
