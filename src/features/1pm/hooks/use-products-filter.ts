'use client';

import { useState, useMemo } from 'react';
import type { Product, FilterType } from '../types';

export function useProductsFilter(products: Product[]) {
	const [activeFilter, setActiveFilter] = useState<FilterType>('All');

	const filteredProducts = useMemo(() => {
		return products.filter((product) => {
			switch (activeFilter) {
				case 'Active':
					return ['Live', 'Building', 'Beta'].includes(product.status);
				case 'Archived':
					return ['Sold', 'Dead'].includes(product.status);
				default:
					return true;
			}
		});
	}, [products, activeFilter]);

	return {
		activeFilter,
		setActiveFilter,
		filteredProducts,
	};
}

