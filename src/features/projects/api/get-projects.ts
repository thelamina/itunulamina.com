import { getAllMdxContent, getMdxContent } from '~/lib/mdx';
import type { Project } from '../types';

interface ProjectFrontmatter {
	title: string;
	summary: string;
	publishedAt: string;
	image?: string;
	externalUrl?: string;
}

export function getAllProjects(): Project[] {
	const projects = getAllMdxContent<ProjectFrontmatter>('projects');

	return projects
		.map((project) => ({
			slug: project.slug,
			title: project.data.title,
			summary: project.data.summary,
			publishedAt: project.data.publishedAt,
			content: project.content,
			image: project.data.image,
			externalUrl: project.data.externalUrl,
		}))
		.sort(
			(a, b) =>
				new Date(b.publishedAt).getTime() -
				new Date(a.publishedAt).getTime()
		);
}

export function getProjectBySlug(slug: string): Project | undefined {
	const result = getMdxContent<ProjectFrontmatter>('projects', slug);

	if (!result) return undefined;

	return {
		slug,
		title: result.data.title,
		summary: result.data.summary,
		publishedAt: result.data.publishedAt,
		content: result.content,
		image: result.data.image,
		externalUrl: result.data.externalUrl,
	};
}
