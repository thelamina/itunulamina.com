import { getAllMdxContent, getMdxContent } from '~/lib/mdx';
import type { Post } from '../types';

interface PostFrontmatter {
	title: string;
	summary: string;
	publishedAt: string;
	status: 'draft' | 'published';
	image?: string;
}

export function getPublishedPosts(): Post[] {
	const posts = getAllMdxContent<PostFrontmatter>('posts');

	return posts
		.filter((post) => post.data.status === 'published')
		.map((post) => ({
			slug: post.slug,
			title: post.data.title,
			summary: post.data.summary,
			publishedAt: post.data.publishedAt,
			status: post.data.status,
			content: post.content,
			image: post.data.image,
		}))
		.sort(
			(a, b) =>
				new Date(b.publishedAt).getTime() -
				new Date(a.publishedAt).getTime()
		);
}

export function getPostBySlug(slug: string): Post | undefined {
	const result = getMdxContent<PostFrontmatter>('posts', slug);

	if (!result) return undefined;

	return {
		slug,
		title: result.data.title,
		summary: result.data.summary,
		publishedAt: result.data.publishedAt,
		status: result.data.status,
		content: result.content,
		image: result.data.image,
	};
}

export function getAllPosts(): Post[] {
	const posts = getAllMdxContent<PostFrontmatter>('posts');

	return posts
		.map((post) => ({
			slug: post.slug,
			title: post.data.title,
			summary: post.data.summary,
			publishedAt: post.data.publishedAt,
			status: post.data.status,
			content: post.content,
			image: post.data.image,
		}))
		.sort(
			(a, b) =>
				new Date(b.publishedAt).getTime() -
				new Date(a.publishedAt).getTime()
		);
}
