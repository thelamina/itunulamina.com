import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

async function loadGoogleFont(
	font: string,
	text: string,
	weight: number = 400
) {
	const fontFamily = font.replace(/\s+/g, '+');
	const url = `https://fonts.googleapis.com/css2?family=${fontFamily}:wght@${weight}&text=${encodeURIComponent(
		text
	)}`;
	const css = await (await fetch(url)).text();
	const resource = css.match(
		/src: url\((.+)\) format\('(opentype|truetype)'\)/
	);

	if (resource) {
		const response = await fetch(resource[1]);
		if (response.status == 200) {
			return await response.arrayBuffer();
		}
	}

	throw new Error('failed to load font data');
}

export async function GET(req: NextRequest) {
	const { searchParams } = req.nextUrl;
	const postTitle = searchParams.get('title') || 'Itunu Lamina';

	const fontName = 'Outfit';
	const fontData = await loadGoogleFont(fontName, postTitle);

	return new ImageResponse(
		(
			<div
				style={{
					height: '100%',
					width: '100%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'flex-start',
					justifyContent: 'center',
					backgroundImage: 'url(https://itunulamina.com/og-bg.png)',
				}}
			>
				<div
					style={{
						marginLeft: 190,
						marginRight: 190,
						display: 'flex',
						fontSize: 130,
						fontFamily: fontName,
						letterSpacing: '-0.05em',
						fontStyle: 'normal',
						color: 'white',
						lineHeight: '120px',
						whiteSpace: 'pre-wrap',
					}}
				>
					{postTitle}
				</div>
			</div>
		),
		{
			width: 1920,
			height: 1080,
			fonts: [
				{
					name: fontName,
					data: fontData,
					style: 'normal',
				},
			],
		}
	);
}
