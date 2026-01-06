export interface UsesItem {
	name: string;
	link?: string;
}

export interface UsesCategory {
	id: string;
	title: string;
	items: UsesItem[];
}

export interface UsesData {
	title: string;
	description: string;
	categories: UsesCategory[];
}

