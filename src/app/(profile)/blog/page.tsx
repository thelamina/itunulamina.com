import type { Metadata } from 'next';
import { getPublishedPosts, BlogList } from '~/features/blog';

export const metadata: Metadata = {
	title: 'Blog',
	description: 'Read my thoughts on software development, design, and more.',
};

export default function BlogPage() {
	const posts = getPublishedPosts()
		.sort(
		(a, b) =>
			new Date(b.publishedAt).getTime() -
			new Date(a.publishedAt).getTime()
		)
		.map((post) => ({
			slug: post.slug,
			title: post.title,
			publishedAt: post.publishedAt,
		}));

	return <BlogList posts={posts} />;
}
