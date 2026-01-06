import type { Metadata } from 'next';
import {
	DM_Sans,
	Outfit,
	Roboto_Slab,
	Fira_Code,
	Crimson_Pro,
	Cormorant_Garamond,
} from 'next/font/google';
import { siteConfig } from '~/config/site';
import './globals.css';
import { ThemeProvider } from '~/components';

const robotoSlab = Roboto_Slab({
	subsets: ['latin'],
	variable: '--font-roboto-slab',
});

const dmSans = DM_Sans({
	weight: ['400', '500', '700'],
	subsets: ['latin'],
	variable: '--font-dm-sans',
});

const outfit = Outfit({
	subsets: ['latin'],
	variable: '--font-outfit',
});

const firaCode = Fira_Code({
	subsets: ['latin'],
	variable: '--font-fira-code',
});

const cormorant = Cormorant_Garamond({
	subsets: ['latin'],
	weight: ['300', '400', '500', '600', '700'],
	variable: '--font-cormorant',
	display: 'swap',
});

const crimson = Crimson_Pro({
	subsets: ['latin'],
	weight: ['300', '400', '500', '600'],
	variable: '--font-crimson',
	display: 'swap',
});

export const metadata: Metadata = {
	metadataBase: new URL(siteConfig.url),
	title: {
		default: siteConfig.name,
		template: `%s | ${siteConfig.name}`,
	},
	description: siteConfig.description,
	openGraph: {
		title: siteConfig.name,
		description: siteConfig.description,
		url: siteConfig.url,
		siteName: siteConfig.name,
		images: [
			{
				url: siteConfig.ogImage,
				width: 1920,
				height: 1080,
			},
		],
		locale: 'en-US',
		type: 'website',
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	twitter: {
		title: siteConfig.name,
		card: 'summary_large_image',
	},
	icons: {
		shortcut: '/favicon.ico',
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang='en'
			className={`${outfit.variable} ${robotoSlab.variable} ${dmSans.variable} ${firaCode.variable} ${cormorant.variable} ${crimson.variable}`}
			suppressHydrationWarning
		>
			<body
				className={`bg-background text-foreground antialiased transition-colors`}
			>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem
				>
					<>
						<div className='fixed left-0 top-0 -z-10 h-screen w-screen bg-linear-to-b from-white from-0% via-70% to-neutral-100 to-100% transition-colors dark:from-[#0a0a0a]/90 dark:to-black' />
						{children}
					</>
					{/* Background gradient */}
				</ThemeProvider>
			</body>
		</html>
	);
}
