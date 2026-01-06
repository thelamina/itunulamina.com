import type { Metadata } from 'next';
import { getAllEoyReflections, EoyList } from '~/features/eoy';

export const metadata: Metadata = {
	title: 'Reflections',
	description:
		'Annual reflections on life, growth, faith, and the lessons learned.',
};

export default function EoyPage() {
	const reflections = getAllEoyReflections().map((reflection) => ({
		slug: reflection.slug,
		year: reflection.year,
		title: reflection.title,
		summary: reflection.summary,
	}));

	return <EoyList reflections={reflections} />;
}
