import { ProductsList, getProducts } from '~/features/1pm';

export default function OnePmPage() {
	const products = getProducts();

	return <ProductsList products={products} />;
}
