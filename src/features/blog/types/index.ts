export interface Post {
	slug: string;
	title: string;
	summary: string;
	publishedAt: string;
	status: 'draft' | 'published';
	content: string;
	image?: string;
}
