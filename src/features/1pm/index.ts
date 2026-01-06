// Data
export { products, getProducts } from './data/products';

// Components
export {
	StatusBadge,
	type StatusBadgeProps,
	ProductCard,
	type ProductCardProps,
	ProductsFilter,
	type ProductsFilterProps,
	StatsBar,
	type StatsBarProps,
	ProductsList,
	type ProductsListProps,
} from './components';

// Hooks
export { useProductsFilter } from './hooks';

// Utils
export { calculateStats } from './utils';

// Types
export type {
	Product,
	ProductStatus,
	FilterType,
	ProductStats,
} from './types';

