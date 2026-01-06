import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getEoyByYear, getAllEoyReflections, EoyDetail } from '~/features/eoy';
import { MdxContent } from '~/components/mdx';

interface EoyPageProps {
	params: Promise<{
		year: string;
	}>;
}

export async function generateStaticParams() {
	return getAllEoyReflections().map((reflection) => ({
		year: String(reflection.year),
	}));
}

export async function generateMetadata({
	params,
}: EoyPageProps): Promise<Metadata | undefined> {
	const { year } = await params;
	const reflection = getEoyByYear(year);

	if (!reflection) return;

	const { title, summary: description } = reflection;

	return {
		title: `${year} | Reflections`,
		description,
		openGraph: {
			title,
			description,
			type: 'article',
			url: `https://itunulamina.com/eoy/${year}`,
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
		},
	};
}

export default async function EoyYearPage({ params }: EoyPageProps) {
	const { year } = await params;
	const reflection = getEoyByYear(year);

	if (!reflection) {
		notFound();
	}

	// Get all years for navigation
	const allYears = getAllEoyReflections()
		.map((r) => r.year)
		.sort((a, b) => a - b);

	const currentIndex = allYears.indexOf(reflection.year);
	const prevYear = currentIndex > 0 ? allYears[currentIndex - 1] : undefined;
	const nextYear =
		currentIndex < allYears.length - 1
			? allYears[currentIndex + 1]
			: undefined;

	return (
		<EoyDetail
			title={reflection.title}
			year={reflection.year}
			summary={reflection.summary}
			prevYear={prevYear}
			nextYear={nextYear}
		>
			<MdxContent source={reflection.content} />
		</EoyDetail>
	);
}
