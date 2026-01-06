import { getAllMdxContent, getMdxContent } from '~/lib/mdx';
import type { EoyReflection } from '../types';

interface EoyFrontmatter {
	title: string;
	summary: string;
	year: number;
}

export function getAllEoyReflections(): EoyReflection[] {
	const reflections = getAllMdxContent<EoyFrontmatter>('eoy');

	return reflections
		.map((reflection) => ({
			slug: reflection.slug,
			title: reflection.data.title,
			summary: reflection.data.summary,
			year: reflection.data.year,
			content: reflection.content,
		}))
		.sort((a, b) => b.year - a.year);
}

export function getEoyByYear(year: string): EoyReflection | undefined {
	const result = getMdxContent<EoyFrontmatter>('eoy', year);

	if (!result) return undefined;

	return {
		slug: year,
		title: result.data.title,
		summary: result.data.summary,
		year: result.data.year,
		content: result.content,
	};
}

