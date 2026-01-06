export type ProductStatus = 'Live' | 'Building' | 'Beta' | 'Sold' | 'Dead';

export type FilterType = 'All' | 'Active' | 'Archived';

export interface Product {
	name: string;
	description: string;
	status: ProductStatus;
	url: string;
	date: string;
	tags: string[];
	revenue?: string;
	icon?: string;
	gradient: string;
}

export interface ProductStats {
	shipped: number;
	live: number;
	mrr: number;
}

