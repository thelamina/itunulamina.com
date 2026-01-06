export function getOgImageUrl(
	image: string | undefined,
	title: string,
	description: string
) {
	return image
		? `https://itunulamina.com${image}`
		: `https://itunulamina.com/api/og?title=${encodeURIComponent(
				title
		  )}&description=${encodeURIComponent(description)}`;
}
