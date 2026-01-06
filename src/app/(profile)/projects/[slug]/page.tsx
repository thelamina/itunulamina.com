import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProjectBySlug, getAllProjects, ProjectDetail } from '~/features/projects';
import { MdxContent } from '~/components/mdx';
import { siteConfig } from '~/config/site';

interface ProjectPageProps {
	params: Promise<{
		slug: string;
	}>;
}

export async function generateStaticParams() {
	return getAllProjects().map((project) => ({
		slug: project.slug,
	}));
}

export async function generateMetadata({
	params,
}: ProjectPageProps): Promise<Metadata | undefined> {
	const { slug } = await params;
	const project = getProjectBySlug(slug);

	if (!project) return;

	const { title, summary: description, publishedAt, image } = project;
	return {
		title,
		description,
		openGraph: {
			title,
			description,
			siteName: siteConfig.appName,
			authors: [siteConfig.name],
			type: 'article',
			publishedTime: publishedAt,
			url: `https://itunulamina.com/projects/${slug}`,
			images: image
				? [{ url: `https://itunulamina.com${image}` }]
				: undefined,
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
		},
		alternates: {
			canonical: `https://itunulamina.com/projects/${slug}`,
		},
	};
}

export default async function ProjectPage({ params }: ProjectPageProps) {
	const { slug } = await params;
	const project = getProjectBySlug(slug);

	if (!project) {
		notFound();
	}

	return (
		<ProjectDetail
			title={project.title}
			summary={project.summary}
			image={project.image}
			externalUrl={project.externalUrl}
		>
				<MdxContent source={project.content} />
		</ProjectDetail>
	);
}
