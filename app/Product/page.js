


const Products = {
    "product1": {
        id: "product1",
        name: "Product 1",
        description: "This is the first product.",
        price: 19.99
    },
    "product2": {
        id: "product2",
        name: "Product 2",
        description: "This is the second product.",
        price: 29.99
    },
    "product3": {
        id: "product3",
        name: "Product 3",
        description: "This is the third product.",
        price: 39.99
    }
};

const ProductPage = () => {
  return (
    <div  className="p-4 bg-gray-100 min-h-screen flex flex-col items-center justify-center space-y-4 ">
        <h1>Product Page</h1>
        <ul>
            {Object.entries(Products).map(([key, product]) => (
                <li key={key}>
                    <h2>{product.name}</h2>
                    <a  href={`/Product/${key}`} className="text-blue-500 hover:underline">
                        Details
                    </a>
                </li>
            ))}
        </ul>
    </div>
  );
}

export default ProductPage;

export const metadata = {
  title: "Product Page - Jonathan Okana Portfolio",
  description: "Explore our range of products and their details.",
  keywords: ["Jonathan Okana", "portfolio", "products", "details"],
};


