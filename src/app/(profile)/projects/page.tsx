import type { Metadata } from 'next';
import { getAllProjects, ProjectsList } from '~/features/projects';

export const metadata: Metadata = {
	title: 'Projects',
	description: "Some of the projects I've been involved in.",
};

export default function ProjectsPage() {
	const projects = getAllProjects().map((project) => ({
		slug: project.slug,
		title: project.title,
		summary: project.summary,
		image: project.image,
		externalUrl: project.externalUrl,
	}));

	return <ProjectsList projects={projects} />;
}
