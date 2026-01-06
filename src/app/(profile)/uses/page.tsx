import type { Metadata } from 'next';
import { UsesContent, usesData } from '~/features/uses';

export const metadata: Metadata = {
	title: 'Uses',
	description: usesData.description,
};

export default function UsesPage() {
	return <UsesContent data={usesData} />;
}
