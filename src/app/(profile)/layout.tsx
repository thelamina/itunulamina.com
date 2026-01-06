import { ProfileNavbar } from '~/components/layout/profile';
import { siteConfig } from '~/config/site';

export default function ProfileLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className='flex h-full max-w-4xl flex-col px-4 pt-8 md:flex-row md:pt-20 lg:mx-auto lg:pt-32'>
			<ProfileNavbar />

			<main className='flex min-w-0 flex-auto flex-col px-2 pt-6 md:px-0 md:pt-0'>
				{children}
				<footer className='pb-8 pt-20 text-center text-sm font-medium text-neutral-500'>
					&copy; {new Date().getFullYear()} {siteConfig.name}
				</footer>
			</main>
		</div>
	);
}
