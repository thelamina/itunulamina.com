import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostBySlug, getPublishedPosts, BlogPost } from '~/features/blog';
import { MdxContent } from '~/components/mdx';
import { getOgImageUrl } from '~/utils';
import { siteConfig } from '~/config/site';

interface BlogPostPageProps {
	params: Promise<{
		slug: string;
	}>;
}

export async function generateStaticParams() {
	return getPublishedPosts().map((post) => ({
		slug: post.slug,
	}));
}

export async function generateMetadata({
	params,
}: BlogPostPageProps): Promise<Metadata | undefined> {
	const { slug } = await params;
	const post = getPostBySlug(slug);

	if (!post) return;

	const { title, summary: description, publishedAt, image } = post;
	const imageUrl = getOgImageUrl(image, title, description);

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
			url: `https://itunulamina.com/blog/${slug}`,
			images: imageUrl ? [{ url: imageUrl }] : undefined,
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: imageUrl ? [{ url: imageUrl }] : undefined,
		},
		alternates: {
			canonical: `https://itunulamina.com/blog/${slug}`,
		},
	};
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
	const { slug } = await params;
	const post = getPostBySlug(slug);

	if (!post) {
		notFound();
	}

	return (
		<BlogPost
			title={post.title}
			publishedAt={post.publishedAt}
			summary={post.summary}
		>
				<MdxContent source={post.content} />
		</BlogPost>
	);
}
