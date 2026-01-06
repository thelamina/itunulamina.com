import type { Product, ProductStats } from '../types';

export function calculateStats(products: Product[]): ProductStats {
	return {
		shipped: products.length,
		live: products.filter((p) => p.status === 'Live' || p.status === 'Beta')
			.length,
		mrr: products.reduce((acc, p) => {
			if (!p.revenue?.includes('/mo')) return acc;
			return acc + (parseInt(p.revenue.replace(/[^0-9]/g, '')) || 0);
		}, 0),
	};
}

