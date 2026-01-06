import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');

type ContentType = 'posts' | 'projects' | 'eoy';

export function getContentDirectory(type: ContentType) {
	return path.join(contentDirectory, type);
}

export function getMdxFiles(type: ContentType) {
	const directory = getContentDirectory(type);

	if (!fs.existsSync(directory)) {
		return [];
	}

	return fs
		.readdirSync(directory)
		.filter((file) => file.endsWith('.mdx') || file.endsWith('.md'));
}

export function getMdxContent<T>(
	type: ContentType,
	slug: string
): { data: T; content: string } | null {
	const directory = getContentDirectory(type);
	const filePath = path.join(directory, `${slug}.mdx`);

	if (!fs.existsSync(filePath)) {
		const mdPath = path.join(directory, `${slug}.md`);
		if (!fs.existsSync(mdPath)) {
			return null;
		}
		const fileContent = fs.readFileSync(mdPath, 'utf-8');
		const { data, content } = matter(fileContent);
		return { data: data as T, content };
	}

	const fileContent = fs.readFileSync(filePath, 'utf-8');
	const { data, content } = matter(fileContent);
	return { data: data as T, content };
}

export function getAllMdxContent<T>(
	type: ContentType
): Array<{ slug: string; data: T; content: string }> {
	const files = getMdxFiles(type);

	return files.map((file) => {
		const slug = file.replace(/\.mdx?$/, '');
		const result = getMdxContent<T>(type, slug);

		if (!result) {
			throw new Error(`Failed to read ${type}/${file}`);
		}

		return {
			slug,
			...result,
		};
	});
}
