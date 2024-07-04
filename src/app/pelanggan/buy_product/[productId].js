import { useRouter } from 'next/router';

export default function BuyProductPage() {
  const router = useRouter();
  const { productId } = router.query;

  // Here you can fetch product details using the productId from the query parameter
  // For demonstration purposes, let's assume you fetch the product details from an API
  // Replace this with actual logic to fetch product details as per your application

  // Dummy product details
  const product = {
    _id: productId,
    name: 'Sample Product',
    price: 100,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Buy Product</h1>
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
        <p className="text-gray-700 mb-2">Price: ${product.price}</p>
        <p className="text-gray-700 mb-4">{product.description}</p>
        <form>
          {/* Your form elements for purchasing the product */}
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
            Purchase
          </button>
        </form>
      </div>
    </div>
  );
}