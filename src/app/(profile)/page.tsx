import { siteConfig } from '~/config/site';
import { HomeContent } from '~/features/home';

export default function HomePage() {
	const { name, links } = siteConfig;

	return <HomeContent name={name} links={links} />;
}
